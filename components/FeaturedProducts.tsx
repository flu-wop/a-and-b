"use client";

import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  const { addItem, items } = useCart();

  if (products.length === 0) return null;

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <p className="eyebrow mb-3">Shop Direct — No eBay Fees</p>
        <h2 className="text-4xl sm:text-5xl text-white font-display">Featured Listings</h2>
        <div className="section-divider" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
        {products.map((p) => {
          const inCart = items.find((i) => i.product_id === p.id);
          const atMax = inCart && inCart.quantity >= p.quantity;
          return (
            <div key={p.id} style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column" }}>
              <div style={{ height: 140, background: "#111", borderRadius: 6, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#444", fontSize: 12 }}>
                {p.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image_url}
                    alt={p.title}
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) parent.textContent = "Image unavailable";
                    }}
                  />
                ) : (
                  "No image"
                )}
              </div>
              <p style={{ color: "#F5EDD8", fontSize: 14, fontWeight: 600, flex: 1 }}>{p.title}</p>
              <p style={{ color: "#D97706", fontSize: 20, fontWeight: 700, marginTop: 8 }}>
                ${(p.price_cents / 100).toFixed(2)}
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
                  marginTop: 8,
                }}
              >
                {atMax ? "Max in cart" : inCart ? `In cart (${inCart.quantity})` : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <a href="/shop" className="btn-orange text-lg">
          Shop All Direct Listings
        </a>
      </div>
    </section>
  );
}
