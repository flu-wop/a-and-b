import { getDb, initDb } from "@/lib/db";
import { isAdmin, AdminLocked } from "@/lib/admin-auth";
import SyncButton from "./SyncButton";

export const dynamic = "force-dynamic";

export default async function AdminProducts({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const resolvedParams = await searchParams;
  if (!isAdmin(resolvedParams)) return <AdminLocked />;

  await initDb();
  const db = getDb();
  const rows = (await db.execute("SELECT * FROM products ORDER BY created_at DESC")).rows as any[];

  return (
    <main style={{ padding: "100px 40px 40px", fontFamily: "system-ui", color: "#F5EDD8", background: "#0d0d0d", minHeight: "100vh" }}>
      <h1 style={{ color: "#D97706" }}>Products ({rows.length})</h1>
      <p style={{ color: "#A89880", marginBottom: 16 }}>
        Auto-synced from eBay every night, or trigger it manually below. SKU shown is the eBay item ID —
        the public API can't see your internal custom label, only Bryan's own seller login can.
      </p>
      <SyncButton adminKey={resolvedParams.key!} />
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
