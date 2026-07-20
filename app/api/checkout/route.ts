import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getDb, initDb } from "@/lib/db";
import { calculateShippingCents } from "@/lib/shipping";

export const runtime = "nodejs";

// Cart items reserve inventory for 15 minutes while the buyer is on Stripe's page.
const RESERVATION_MINUTES = 15;

export async function POST(req: Request) {
  const body = await req.json();
  const { items, customer_email } = body as {
    items: { product_id: number; quantity: number }[];
    customer_email?: string;
  };

  if (!items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    // Fails loudly and clearly rather than letting `new Stripe(undefined)`
    // throw an unhandled exception that surfaces as a generic 500/crash page.
    return NextResponse.json(
      { error: "STRIPE_NOT_CONFIGURED: checkout isn't set up yet" },
      { status: 503 }
    );
  }

  await initDb();
  const db = getDb();

  // Clean up expired reservations first so freed-up stock is visible.
  await db.execute(`DELETE FROM reservations WHERE expires_at < datetime('now')`);

  const line_items = [];
  const reservedProductIds: number[] = [];

  for (const item of items) {
    const productRes = await db.execute({
      sql: `SELECT * FROM products WHERE id = ? AND status = 'active'`,
      args: [item.product_id],
    });
    const product = productRes.rows[0] as any;
    if (!product) {
      return NextResponse.json(
        { error: `An item in your cart is no longer available (id ${item.product_id}).` },
        { status: 409 }
      );
    }

    // Check nothing else is currently reserving this item.
    const activeReservation = await db.execute({
      sql: `SELECT id FROM reservations WHERE product_id = ? AND expires_at > datetime('now')`,
      args: [item.product_id],
    });
    if (activeReservation.rows.length > 0) {
      return NextResponse.json(
        { error: `"${product.title}" is currently being purchased by someone else. Try again in a few minutes.` },
        { status: 409 }
      );
    }

    if (item.quantity > product.quantity) {
      return NextResponse.json(
        { error: `Only ${product.quantity} of "${product.title}" in stock.` },
        { status: 409 }
      );
    }

    line_items.push({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: product.price_cents,
        product_data: {
          name: product.title,
          metadata: { sku: product.sku, product_id: String(product.id) },
        },
      },
    });
    reservedProductIds.push(product.id);
  }

  const stripe = getStripe();
  const subtotalCents = line_items.reduce((sum, li) => sum + li.price_data.unit_amount * li.quantity, 0);
  const shipping = calculateShippingCents(subtotalCents);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items,
    shipping_address_collection: { allowed_countries: ["US"] },
    // Sales tax: OFF by default. Stripe Tax must be enabled in the Stripe
    // Dashboard (with an origin address configured) before this can work —
    // turning it on here before that's done would make checkout error out.
    // Once Stripe Tax is set up, set STRIPE_AUTOMATIC_TAX_ENABLED=true in
    // Vercel and this activates automatically, no code change needed.
    ...(process.env.STRIPE_AUTOMATIC_TAX_ENABLED === "true"
      ? { automatic_tax: { enabled: true } }
      : {}),
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: shipping.amountCents, currency: "usd" },
          display_name: shipping.label,
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/inventory?canceled=1`,
    customer_email,
    metadata: {
      product_ids: JSON.stringify(items.map((i) => ({ id: i.product_id, qty: i.quantity }))),
    },
  });

  // Lock the inventory for the reservation window, tied to this session.
  const expiresAt = new Date(Date.now() + RESERVATION_MINUTES * 60 * 1000).toISOString();
  for (const productId of reservedProductIds) {
    await db.execute({
      sql: `INSERT INTO reservations (product_id, stripe_session_id, expires_at) VALUES (?, ?, ?)`,
      args: [productId, session.id, expiresAt],
    });
  }

  return NextResponse.json({ url: session.url });
}
