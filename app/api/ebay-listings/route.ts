import { NextResponse } from "next/server";

const CLIENT_ID = "BryanArf-AampBSup-PRD-5a92c9933-d733c707";
const STORE_USERNAME = "arfsten19"; // seller account username the store runs under
const COUNT = 6;

// The old Finding API (svcs.ebay.com) was fully decommissioned by eBay on
// 2025-02-05. This route uses the replacement — the Browse API — which
// requires an OAuth application access token via the client-credentials grant.

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAppAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const secret = process.env.EBAY_CLIENT_SECRET;
  if (!secret) {
    throw new Error("EBAY_CLIENT_SECRET is not set in environment variables");
  }

  const basicAuth = Buffer.from(`${CLIENT_ID}:${secret}`).toString("base64");

  const res = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "https://api.ebay.com/oauth/api_scope",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`eBay OAuth token request failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.value;
}

export async function GET() {
  try {
    const token = await getAppAccessToken();

    const url =
      `https://api.ebay.com/buy/browse/v1/item_summary/search` +
      `?filter=sellers:{${STORE_USERNAME}}` +
      `&sort=newlyListed` +
      `&limit=${COUNT}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `eBay Browse API error (${res.status}): ${text}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
