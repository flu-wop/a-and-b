import { isAdmin, AdminLocked } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminAuctionScout({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const resolvedParams = await searchParams;
  if (!isAdmin(resolvedParams)) return <AdminLocked />;

  return (
    <main style={{ padding: 40, fontFamily: "system-ui", color: "#F5EDD8", background: "#0d0d0d", minHeight: "100vh" }}>
      <h1 style={{ color: "#D97706" }}>Auction Scout</h1>
      <p style={{ color: "#A89880", marginTop: 8 }}>
        Admin-gated, matching the products/orders pages. This is the shell —
        the scraping backend still needs Railway/Render (or Vercel Pro) hosting,
        and the React component you already built needs to be dropped in here.
      </p>
    </main>
  );
}
