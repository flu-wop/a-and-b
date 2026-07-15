// Simple shared gate for all /admin/* pages.
// Usage in a server component:
//   if (!isAdmin(searchParams)) return <AdminLocked />;
export function isAdmin(searchParams: { key?: string }): boolean {
  return !!process.env.ADMIN_PASSWORD && searchParams.key === process.env.ADMIN_PASSWORD;
}

export function AdminLocked() {
  return (
    <main style={{ padding: 40, fontFamily: "system-ui", background: "#111", color: "#eee", minHeight: "100vh" }}>
      <h1>Unauthorized</h1>
      <p>Append <code>?key=YOUR_ADMIN_PASSWORD</code> to the URL.</p>
    </main>
  );
}
