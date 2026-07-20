import { getDb, initDb } from "@/lib/db";
import { EBAY_CLIENT_ID } from "@/lib/ebay";

// This is SEPARATE from the app-level token in lib/ebay.ts. That one reads
// public listing data. This one is Bryan's own seller authorization, and is
// required to end/revise his listings (eBay will never let an app do that
// with just an app-level key — has to be the seller's own consent).
const SCOPES = [
  "https://api.ebay.com/oauth/api_scope",
  "https://api.ebay.com/oauth/api_scope/sell.inventory",
  "https://api.ebay.com/oauth/api_scope/sell.account",
].join(" ");

export function getEbayAuthUrl(): string {
  const ruName = process.env.EBAY_RUNAME;
  if (!ruName) throw new Error("EBAY_RUNAME is not set — create a redirect URL name in the eBay Developer Portal first");

  const params = new URLSearchParams({
    client_id: EBAY_CLIENT_ID,
    redirect_uri: ruName,
    response_type: "code",
    scope: SCOPES,
  });
  return `https://auth.ebay.com/oauth2/authorize?${params.toString()}`;
}

async function tokenRequest(body: URLSearchParams) {
  const secret = process.env.EBAY_CLIENT_SECRET;
  if (!secret) throw new Error("EBAY_CLIENT_SECRET is not set");
  const basicAuth = Buffer.from(`${EBAY_CLIENT_ID}:${secret}`).toString("base64");

  const res = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`eBay seller token request failed (${res.status}): ${text}`);
  }
  return res.json();
}

export async function exchangeCodeForSellerToken(code: string) {
  const ruName = process.env.EBAY_RUNAME!;
  const data = await tokenRequest(
    new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: ruName })
  );

  await initDb();
  const db = getDb();
  const expiresAt = new Date(Date.now() + data.expires_in * 1000).toISOString();

  await db.execute({
    sql: `
      INSERT INTO ebay_seller_tokens (id, access_token, refresh_token, expires_at, updated_at)
      VALUES (1, ?, ?, ?, datetime('now'))
      ON CONFLICT(id) DO UPDATE SET
        access_token = excluded.access_token,
        refresh_token = excluded.refresh_token,
        expires_at = excluded.expires_at,
        updated_at = datetime('now')
    `,
    args: [data.access_token, data.refresh_token, expiresAt],
  });
}

// Returns a valid access token, refreshing first if it's expired or close to
// it. Returns null if Bryan hasn't authorized yet — callers must handle that
// (skip ending the listing, don't crash) rather than throwing.
export async function getValidSellerToken(): Promise<string | null> {
  await initDb();
  const db = getDb();
  const res = await db.execute(`SELECT * FROM ebay_seller_tokens WHERE id = 1`);
  const row = res.rows[0] as any;
  if (!row) return null;

  const expiresAt = new Date(row.expires_at).getTime();
  if (expiresAt > Date.now() + 5 * 60 * 1000) {
    return row.access_token as string;
  }

  // Expired or close to it — refresh.
  try {
    const data = await tokenRequest(
      new URLSearchParams({ grant_type: "refresh_token", refresh_token: row.refresh_token })
    );
    const newExpiresAt = new Date(Date.now() + data.expires_in * 1000).toISOString();
    await db.execute({
      sql: `UPDATE ebay_seller_tokens SET access_token = ?, expires_at = ?, updated_at = datetime('now') WHERE id = 1`,
      args: [data.access_token, newExpiresAt],
    });
    return data.access_token as string;
  } catch (err) {
    console.error("eBay seller token refresh failed:", err);
    return null;
  }
}
