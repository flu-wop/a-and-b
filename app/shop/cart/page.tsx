"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalCents } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
          customer_email: email || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        // Checkout isn't wired up yet (no Stripe keys) — surface that clearly
        // instead of a raw 500/undefined crash.
        setError(
          data.error?.includes("STRIPE") || res.status === 500
            ? "Online checkout isn't turned on yet — we're still setting it up. Check back soon, or reach out directly to order."
            : data.error || "Something went wrong starting checkout."
        );
        return;
      }
      if (data.url) window.location.href = data.url;
    } catch {
      setError("Couldn't reach checkout. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <main style={{ minHeight: "100vh", background: "#0d0d0d", padding: "100px 20px 60px", textAlign: "center" }}>
        <p style={{ color: "#A89880", marginBottom: 16 }}>Your cart is empty.</p>
        <Link href="/shop" style={{ color: "#D97706", fontWeight: 600 }}>Back to Shop</Link>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0d0d0d", padding: "100px 20px 60px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h1 style={{ color: "#F5EDD8", fontSize: 28, marginBottom: 24 }}>Your Cart</h1>

        {items.map((i) => (
          <div key={i.product_id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #222" }}>
            <div>
              <p style={{ color: "#F5EDD8" }}>{i.title}</p>
              <p style={{ color: "#666", fontSize: 13 }}>${(i.price_cents / 100).toFixed(2)} each</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="number"
                min={1}
                max={i.max_quantity}
                value={i.quantity}
                onChange={(e) => updateQuantity(i.product_id, parseInt(e.target.value, 10) || 1)}
                style={{ width: 50, background: "#1a1a1a", color: "#eee", border: "1px solid #333", borderRadius: 4, padding: 4, textAlign: "center" }}
              />
              <button onClick={() => removeItem(i.product_id)} style={{ color: "#c0392b", background: "none", border: "none", cursor: "pointer" }}>
                Remove
              </button>
            </div>
          </div>
        ))}

        <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", fontSize: 20, color: "#F5EDD8" }}>
          <span>Total</span>
          <span style={{ color: "#D97706", fontWeight: 700 }}>${(totalCents / 100).toFixed(2)}</span>
        </div>

        <input
          type="email"
          placeholder="Email for order confirmation"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginTop: 20, background: "#1a1a1a", color: "#eee", border: "1px solid #333", borderRadius: 6, padding: 10 }}
        />

        <button
          onClick={handleCheckout}
          disabled={loading}
          style={{ width: "100%", marginTop: 16, background: loading ? "#555" : "#D97706", color: "#111", fontWeight: 700, border: "none", borderRadius: 6, padding: "14px 0", cursor: loading ? "default" : "pointer" }}
        >
          {loading ? "Redirecting to checkout..." : "Checkout"}
        </button>

        {error && (
          <div style={{ marginTop: 16, padding: 12, background: "#2a1414", border: "1px solid #7f1d1d", borderRadius: 6, color: "#fca5a5" }}>
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
