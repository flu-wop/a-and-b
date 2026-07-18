import { NextResponse } from "next/server";
import { getEbayAppAccessToken, EBAY_STORE_USERNAME, EBAY_BUSINESS_INDUSTRIAL_CATEGORY } from "@/lib/ebay";

const COUNT = 6;

export async function GET() {
  try {
    const token = await getEbayAppAccessToken();

    // Browse API requires one of q/category_ids/epid/gtin even when filtering
    // by seller. Rather than relying on the undocumented "category_ids=0" trick
    // (reported by other developers as unreliable/unsupported), we scope to the
    // real "Business & Industrial" category — every item this store sells
    // falls under it, so this is a safe, documented, stable filter.
    //
    // IMPORTANT: the sellers filter value uses curly braces, e.g. sellers:{username}.
    // Those braces MUST be percent-encoded or fetch/undici mangles the query
    // string silently (the filter param gets dropped entirely rather than erroring
    // loudly) — hence URLSearchParams here instead of raw template-string concat.
    const params = new URLSearchParams({
      category_ids: EBAY_BUSINESS_INDUSTRIAL_CATEGORY,
      filter: `sellers:{${EBAY_STORE_USERNAME}}`,
      sort: "newlyListed",
      limit: String(COUNT),
    });
    const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?${params.toString()}`;

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

    // If the sellers filter is ever rejected again, eBay doesn't hard-error —
    // it silently falls back to unfiltered results across all of eBay (we hit
    // this once: 71M+ results instead of ~6 from this store). Treat warnings
    // as a hard failure rather than serving obviously-wrong data to the site.
    if (data.warnings?.length) {
      return NextResponse.json(
        { error: "eBay Browse API returned warnings — refusing to serve unfiltered results", warnings: data.warnings },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
