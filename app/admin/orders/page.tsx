import { getDb, initDb } from "@/lib/db";
import { isAdmin, AdminLocked } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminOrders({ searchParams }: { searchParams: { key?: string } }) {
  if (!isAdmin(searchParams)) return <AdminLocked />;

  await initDb();
  const db = getDb();
  const orders = (await db.execute("SELECT * FROM orders ORDER BY created_at DESC")).rows as any[];

  return (
    <main style={{ padding: 40, fontFamily: "system-ui", color: "#F5EDD8", background: "#0d0d0d", minHeight: "100vh" }}>
      <h1 style={{ color: "#D97706" }}>Orders ({orders.length})</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
        <thead>
          <tr style={{ textAlign: "left", color: "#A89880", borderBottom: "1px solid #333" }}>
            <th style={{ padding: 8 }}>Date</th>
            <th style={{ padding: 8 }}>Customer</th>
            <th style={{ padding: 8 }}>Email</th>
            <th style={{ padding: 8 }}>Total</th>
            <th style={{ padding: 8 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} style={{ borderTop: "1px solid #222" }}>
              <td style={{ padding: 8 }}>{o.created_at}</td>
              <td style={{ padding: 8 }}>{o.customer_name}</td>
              <td style={{ padding: 8 }}>{o.customer_email}</td>
              <td style={{ padding: 8 }}>${(o.amount_cents / 100).toFixed(2)}</td>
              <td style={{ padding: 8 }}>{o.status}</td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr><td colSpan={5} style={{ padding: 16, color: "#888" }}>No orders yet.</td></tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
