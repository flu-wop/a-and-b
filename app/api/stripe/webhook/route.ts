import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getDb, initDb } from "@/lib/db";
import { sendOrderEmails } from "@/lib/email";
import { endEbayListing } from "@/lib/ebay-end-listing";

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
    const emailItems: { title: string; sku: string; quantity: number; unit_price_cents: number }[] = [];

    for (const item of productIds) {
      const productRes = await db.execute({ sql: `SELECT * FROM products WHERE id = ?`, args: [item.id] });
      const product = productRes.rows[0] as any;
      if (!product) continue;

      await db.execute({
        sql: `INSERT INTO order_items (order_id, product_id, sku, title, unit_price_cents, quantity) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [orderId, product.id, product.sku, product.title, product.price_cents, item.qty],
      });
      emailItems.push({ title: product.title, sku: product.sku, quantity: item.qty, unit_price_cents: product.price_cents });

      const remaining = product.quantity - item.qty;
      await db.execute({
        sql: `UPDATE products SET quantity = ?, status = ?, updated_at = datetime('now') WHERE id = ?`,
        args: [remaining, remaining <= 0 ? "sold" : "active", product.id],
      });

      // Stop the same item from also selling on eBay. Never let a failure
      // here break the webhook — the sale on the site already succeeded and
      // must not be rolled back over an eBay API hiccup.
      if (remaining <= 0 && product.ebay_item_id) {
        try {
          const result = await endEbayListing(product.ebay_item_id);
          if (!result.success) console.error("eBay end-listing failed:", result.message);
        } catch (err) {
          console.error("eBay end-listing threw:", err);
        }
      }

      await db.execute({ sql: `DELETE FROM reservations WHERE product_id = ?`, args: [product.id] });
    }

    // Never let an email failure look like an order failure — payment and
    // fulfillment already succeeded by this point.
    try {
      await sendOrderEmails({
        orderId,
        customerName: s.customer_details?.name || "Unknown",
        customerEmail: s.customer_details?.email || s.customer_email || "",
        amountCents: s.amount_total,
        items: emailItems,
      });
    } catch (err) {
      console.error("Order email send threw:", err);
    }
  }

  return NextResponse.json({ received: true });
}
