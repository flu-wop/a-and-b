"use client";

import { useState } from "react";

export default function ImportForm({ adminKey }: { adminKey: string }) {
  const [csv, setCsv] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleImport() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/admin/import-products?key=${encodeURIComponent(adminKey)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Import failed");
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
    <div style={{ maxWidth: 700 }}>
      <textarea
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
        placeholder="Paste the raw CSV content here..."
        rows={14}
        style={{
          width: "100%",
          background: "#1a1a1a",
          color: "#eee",
          border: "1px solid #333",
          borderRadius: 6,
          padding: 12,
          fontFamily: "monospace",
          fontSize: 12,
        }}
      />
      <button
        onClick={handleImport}
        disabled={loading || !csv.trim()}
        style={{
          marginTop: 16,
          background: loading ? "#555" : "#D97706",
          color: "#111",
          fontWeight: 700,
          border: "none",
          borderRadius: 6,
          padding: "10px 24px",
          cursor: loading ? "default" : "pointer",
        }}
      >
        {loading ? "Importing..." : "Run Import"}
      </button>

      {error && (
        <div style={{ marginTop: 16, padding: 12, background: "#2a1414", border: "1px solid #7f1d1d", borderRadius: 6, color: "#fca5a5" }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 16, padding: 12, background: "#14241a", border: "1px solid #166534", borderRadius: 6 }}>
          <p>Imported: {result.imported} · Skipped: {result.skipped} · Total rows: {result.total}</p>
          {result.skippedReasons?.length > 0 && (
            <details style={{ marginTop: 8 }}>
              <summary style={{ cursor: "pointer", color: "#A89880" }}>Skipped row details</summary>
              <ul style={{ marginTop: 8, fontSize: 12, color: "#A89880" }}>
                {result.skippedReasons.map((r: string, i: number) => <li key={i}>{r}</li>)}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
