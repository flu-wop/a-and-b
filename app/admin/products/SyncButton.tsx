"use client";

import { useState } from "react";

export default function SyncButton({ adminKey }: { adminKey: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSync() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/admin/sync-products?key=${encodeURIComponent(adminKey)}`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Sync failed");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <button
        onClick={handleSync}
        disabled={loading}
        style={{
          background: loading ? "#555" : "#D97706",
          color: "#111",
          fontWeight: 700,
          border: "none",
          borderRadius: 6,
          padding: "10px 24px",
          cursor: loading ? "default" : "pointer",
        }}
      >
        {loading ? "Syncing from eBay..." : "Sync Now from eBay"}
      </button>
      {error && <p style={{ color: "#fca5a5", marginTop: 8 }}>{error}</p>}
      {result && (
        <p style={{ color: "#A89880", marginTop: 8 }}>
          {result.total} live on eBay · {result.created} new · {result.updated} updated · {result.archived} archived (sold/ended) · {result.failed} failed
        </p>
      )}
    </div>
  );
}
