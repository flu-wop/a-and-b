import { getDb, initDb } from "@/lib/db";
import { isAdmin, AdminLocked } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminProducts({ searchParams }: { searchParams: { key?: string } }) {
  if (!isAdmin(searchParams)) return <AdminLocked />;

  await initDb();
  const db = getDb();
  const rows = (await db.execute("SELECT * FROM products ORDER BY created_at DESC")).rows as any[];

  return (
    <main style={{ padding: 40, fontFamily: "system-ui", color: "#F5EDD8", background: "#0d0d0d", minHeight: "100vh" }}>
      <h1 style={{ color: "#D97706" }}>Products ({rows.length})</h1>
      <p style={{ color: "#A89880", marginBottom: 24 }}>
        Site catalog. To add items in bulk, use the import script — this view is for spot checks and status changes.
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", color: "#A89880", borderBottom: "1px solid #333" }}>
            <th style={{ padding: 8 }}>SKU</th>
            <th style={{ padding: 8 }}>Title</th>
            <th style={{ padding: 8 }}>Price</th>
            <th style={{ padding: 8 }}>Qty</th>
            <th style={{ padding: 8 }}>Status</th>
            <th style={{ padding: 8 }}>eBay Item</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} style={{ borderTop: "1px solid #222" }}>
              <td style={{ padding: 8 }}>{r.sku}</td>
              <td style={{ padding: 8 }}>{r.title}</td>
              <td style={{ padding: 8 }}>${(r.price_cents / 100).toFixed(2)}</td>
              <td style={{ padding: 8 }}>{r.quantity}</td>
              <td style={{ padding: 8 }}>{r.status}</td>
              <td style={{ padding: 8 }}>{r.ebay_item_id || "—"}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={6} style={{ padding: 16, color: "#888" }}>No products yet.</td></tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
