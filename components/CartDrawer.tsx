"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalCents } = useCart();
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
        setError(
          data.error?.includes("STRIPE") || res.status === 503
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

  if (!isOpen) return null;

  return (
    <>
      {/* backdrop */}
      <div
        onClick={closeCart}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100 }}
      />
      {/* drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(420px, 100vw)",
          background: "#0d0d0d",
          borderLeft: "1px solid #2a2a2a",
          zIndex: 101,
          display: "flex",
          flexDirection: "column",
          padding: 24,
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ color: "#F5EDD8", fontSize: 22 }}>Your Cart</h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{ background: "none", border: "none", color: "#A89880", fontSize: 24, cursor: "pointer", lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <p style={{ color: "#A89880" }}>Your cart is empty.</p>
        ) : (
          <>
            <div style={{ flex: 1 }}>
              {items.map((i) => (
                <div key={i.product_id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #222" }}>
                  <div style={{ paddingRight: 12 }}>
                    <p style={{ color: "#F5EDD8", fontSize: 14 }}>{i.title}</p>
                    <p style={{ color: "#666", fontSize: 12 }}>${(i.price_cents / 100).toFixed(2)} each</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <input
                      type="number"
                      min={1}
                      max={i.max_quantity}
                      value={i.quantity}
                      onChange={(e) => updateQuantity(i.product_id, parseInt(e.target.value, 10) || 1)}
                      style={{ width: 44, background: "#1a1a1a", color: "#eee", border: "1px solid #333", borderRadius: 4, padding: 4, textAlign: "center" }}
                    />
                    <button onClick={() => removeItem(i.product_id)} style={{ color: "#c0392b", background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", fontSize: 18, color: "#F5EDD8" }}>
              <span>Total</span>
              <span style={{ color: "#D97706", fontWeight: 700 }}>${(totalCents / 100).toFixed(2)}</span>
            </div>

            <input
              type="email"
              placeholder="Email for order confirmation"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", marginTop: 16, background: "#1a1a1a", color: "#eee", border: "1px solid #333", borderRadius: 6, padding: 10 }}
            />

            <button
              onClick={handleCheckout}
              disabled={loading}
              style={{ width: "100%", marginTop: 12, background: loading ? "#555" : "#D97706", color: "#111", fontWeight: 700, border: "none", borderRadius: 6, padding: "14px 0", cursor: loading ? "default" : "pointer" }}
            >
              {loading ? "Redirecting to checkout..." : "Checkout"}
            </button>

            {error && (
              <div style={{ marginTop: 12, padding: 12, background: "#2a1414", border: "1px solid #7f1d1d", borderRadius: 6, color: "#fca5a5", fontSize: 13 }}>
                {error}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
