"use client";

import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export default function ShopGrid({ products }: { products: Product[] }) {
  const { addItem, items, toggleCart } = useCart();

  if (products.length === 0) {
    return (
      <div style={{ color: "#A89880", padding: 40, textAlign: "center", border: "1px dashed #333", borderRadius: 8 }}>
        Nothing in the direct-sell catalog yet — check back soon, or browse our full inventory on eBay.
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <button onClick={toggleCart} style={{ color: "#D97706", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit" }}>
          View Cart ({items.reduce((n, i) => n + i.quantity, 0)})
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
        {products.map((p) => {
          const inCart = items.find((i) => i.product_id === p.id);
          const atMax = inCart && inCart.quantity >= p.quantity;
          return (
            <div key={p.id} style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column" }}>
              <div style={{ height: 120, background: "#111", borderRadius: 6, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#444", fontSize: 12 }}>
                {p.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image_url} alt={p.title} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                ) : (
                  "No image"
                )}
              </div>
              <p style={{ color: "#F5EDD8", fontSize: 14, fontWeight: 600, flex: 1 }}>{p.title}</p>
              <p style={{ color: "#D97706", fontSize: 20, fontWeight: 700, marginTop: 8 }}>
                ${(p.price_cents / 100).toFixed(2)}
              </p>
              <p style={{ color: "#666", fontSize: 12, marginBottom: 12 }}>
                {p.quantity} in stock{p.sku ? ` · SKU ${p.sku}` : ""}
              </p>
              <button
                onClick={() =>
                  addItem({ product_id: p.id, title: p.title, price_cents: p.price_cents, max_quantity: p.quantity })
                }
                disabled={atMax}
                style={{
                  background: atMax ? "#333" : "#D97706",
                  color: atMax ? "#888" : "#111",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: 6,
                  padding: "10px 0",
                  cursor: atMax ? "default" : "pointer",
                }}
              >
                {atMax ? "Max in cart" : inCart ? `In cart (${inCart.quantity})` : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
