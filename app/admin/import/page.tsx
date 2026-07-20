import { isAdmin, AdminLocked } from "@/lib/admin-auth";
import ImportForm from "./ImportForm";

export const dynamic = "force-dynamic";

export default async function AdminImport({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const resolvedParams = await searchParams;
  if (!isAdmin(resolvedParams)) return <AdminLocked />;

  return (
    <main style={{ padding: "100px 40px 40px", fontFamily: "system-ui", color: "#F5EDD8", background: "#0d0d0d", minHeight: "100vh" }}>
      <h1 style={{ color: "#D97706" }}>Import Products</h1>
      <p style={{ color: "#A89880", marginTop: 8, marginBottom: 24, maxWidth: 600 }}>
        From Seller Hub: Reports → Active Listings Report → download the CSV, open it, select all,
        copy, and paste the raw content below. Re-running this later updates existing SKUs instead
        of duplicating them.
      </p>
      <ImportForm adminKey={resolvedParams.key!} />
    </main>
  );
}
