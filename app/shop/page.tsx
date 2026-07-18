import { getActiveProducts } from "@/lib/products";
import ShopGrid from "./ShopGrid";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getActiveProducts();

  return (
    <main style={{ minHeight: "100vh", background: "#0d0d0d", padding: "40px 20px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ color: "#F5EDD8", fontSize: 32, marginBottom: 8 }}>Shop Direct</h1>
        <p style={{ color: "#A89880", marginBottom: 32 }}>
          Buy straight from us — same inventory, no eBay fees passed on to you.
        </p>
        <ShopGrid products={products} />
      </div>
    </main>
  );
}
