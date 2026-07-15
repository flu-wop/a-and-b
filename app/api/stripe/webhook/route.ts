import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getDb, initDb } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = getStripe();
  const sig = req.headers.get("stripe-signature")!;
  const raw = await req.text(); // RAW body — must not be parsed before verifying

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: `Webhook signature failed: ${(err as Error).message}` }, { status: 400 });
  }

  await initDb();
  const db = getDb();

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as any;
    const productIds: { id: number; qty: number }[] = JSON.parse(s.metadata?.product_ids || "[]");

    // Idempotency: if this session was already recorded, do nothing.
    const existing = await db.execute({
      sql: `SELECT id FROM orders WHERE stripe_session_id = ?`,
      args: [s.id],
    });
    if (existing.rows.length > 0) {
      return NextResponse.json({ received: true, note: "already processed" });
    }

    const orderRes = await db.execute({
      sql: `INSERT INTO orders (customer_name, customer_email, shipping_address, amount_cents, stripe_session_id, status)
            VALUES (?, ?, ?, ?, ?, 'paid')`,
      args: [
        s.customer_details?.name || "Unknown",
        s.customer_details?.email || s.customer_email || "",
        JSON.stringify(s.shipping_details || s.customer_details?.address || {}),
        s.amount_total,
        s.id,
      ],
    });
    const orderId = Number(orderRes.lastInsertRowid);

    for (const item of productIds) {
      const productRes = await db.execute({ sql: `SELECT * FROM products WHERE id = ?`, args: [item.id] });
      const product = productRes.rows[0] as any;
      if (!product) continue;

      await db.execute({
        sql: `INSERT INTO order_items (order_id, product_id, sku, title, unit_price_cents, quantity) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [orderId, product.id, product.sku, product.title, product.price_cents, item.qty],
      });

      const remaining = product.quantity - item.qty;
      await db.execute({
        sql: `UPDATE products SET quantity = ?, status = ?, updated_at = datetime('now') WHERE id = ?`,
        args: [remaining, remaining <= 0 ? "sold" : "active", product.id],
      });

      // TODO(next phase): call eBay Trading API here to end/revise the matching
      // eBay listing (product.ebay_item_id) so it can't sell there too.

      await db.execute({ sql: `DELETE FROM reservations WHERE product_id = ?`, args: [product.id] });
    }
  }

  return NextResponse.json({ received: true });
}
