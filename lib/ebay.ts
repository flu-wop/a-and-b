export const EBAY_CLIENT_ID = "BryanArf-AampBSup-PRD-5a92c9933-d733c707";
export const EBAY_STORE_USERNAME = "arfsten19";
export const EBAY_BUSINESS_INDUSTRIAL_CATEGORY = "12576";

// The old Finding API (svcs.ebay.com) was fully decommissioned by eBay on
// 2025-02-05. All eBay calls in this project use the replacement — the
// Browse API — which requires an OAuth application access token via the
// client-credentials grant.

let cachedToken: { value: string; expiresAt: number } | null = null;

export async function getEbayAppAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const secret = process.env.EBAY_CLIENT_SECRET;
  if (!secret) {
    throw new Error("EBAY_CLIENT_SECRET is not set in environment variables");
  }

  const basicAuth = Buffer.from(`${EBAY_CLIENT_ID}:${secret}`).toString("base64");

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

// Fetches ALL of the seller's active items across pages. Browse API caps at
// 200 per request, so this walks offset by offset until exhausted.
export async function fetchAllSellerItems(): Promise<any[]> {
  const token = await getEbayAppAccessToken();
  const items: any[] = [];
  const pageSize = 200;
  let offset = 0;
  let total = Infinity;

  while (offset < total) {
    const params = new URLSearchParams({
      category_ids: EBAY_BUSINESS_INDUSTRIAL_CATEGORY,
      filter: `sellers:{${EBAY_STORE_USERNAME}}`,
      limit: String(pageSize),
      offset: String(offset),
    });
    const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?${params.toString()}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`eBay Browse API error (${res.status}): ${text}`);
    }

    const data = await res.json();

    // Same safety rule as the widget: never silently proceed on a mangled
    // filter that would otherwise pull in every seller's items on eBay.
    if (data.warnings?.length) {
      throw new Error(`eBay Browse API returned warnings: ${JSON.stringify(data.warnings)}`);
    }

    items.push(...(data.itemSummaries ?? []));
    total = data.total ?? items.length;
    offset += pageSize;

    // Hard safety cap so a bug can't spin this into an infinite loop against
    // a live API.
    if (offset > 5000) break;
  }

  return items;
}
