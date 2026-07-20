import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null; // graceful no-op until configured
  if (_resend) return _resend;
  _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

interface OrderEmailData {
  orderId: number;
  customerName: string;
  customerEmail: string;
  amountCents: number;
  items: { title: string; sku: string; quantity: number; unit_price_cents: number }[];
}

export async function sendOrderEmails(order: OrderEmailData) {
  const resend = getResend();
  if (!resend) {
    // RESEND_API_KEY not set yet — don't throw, this must never break checkout
    // fulfillment, which already succeeded by the time this runs.
    console.warn("RESEND_API_KEY not set — skipping order emails");
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const owner = process.env.RESEND_TO_EMAIL; // Bryan's email — set in Vercel

  const itemsHtml = order.items
    .map((i) => `<li>${i.quantity}× ${i.title} (SKU ${i.sku}) — $${(i.unit_price_cents / 100).toFixed(2)} each</li>`)
    .join("");
  const total = `$${(order.amountCents / 100).toFixed(2)}`;

  try {
    // Customer confirmation
    if (order.customerEmail) {
      await resend.emails.send({
        from,
        to: order.customerEmail,
        subject: `Order confirmed — A&B Supply & Surplus #${order.orderId}`,
        html: `<h2>Thanks for your order!</h2>
               <p>Order #${order.orderId} — Total: <strong>${total}</strong></p>
               <ul>${itemsHtml}</ul>
               <p>We'll get this packed and shipped soon. Reach out if you have any questions.</p>`,
      });
    }

    // Owner (Bryan) notification — this is the one that actually matters for
    // fulfillment; without it, orders sit invisible in /admin/orders.
    if (owner) {
      await resend.emails.send({
        from,
        to: owner,
        subject: `New order #${order.orderId} — ${total}`,
        html: `<h2>New order on the site</h2>
               <p><strong>${order.customerName}</strong> · ${order.customerEmail}</p>
               <p>Total: <strong>${total}</strong></p>
               <ul>${itemsHtml}</ul>
               <p>View in admin: ${process.env.NEXT_PUBLIC_SITE_URL}/admin/orders</p>`,
      });
    }
  } catch (err) {
    // Never let an email failure look like an order failure — payment
    // already succeeded and the row is already saved by this point.
    console.error("Order email send failed:", err);
  }
}
