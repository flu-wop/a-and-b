import { getValidSellerToken } from "@/lib/ebay-seller-auth";

// Trading API is XML/SOAP-style, unlike the Browse API used elsewhere in
// this project. This is the only reliable way to end a *classic* eBay
// listing (not managed through the newer Inventory API) — the modern REST
// APIs don't cover ending arbitrary existing listings created outside them.
export async function endEbayListing(itemId: string): Promise<{ success: boolean; message: string }> {
  const token = await getValidSellerToken();
  if (!token) {
    return { success: false, message: "No seller token — Bryan hasn't authorized eBay access yet (visit /api/ebay/auth)" };
  }

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<EndFixedPriceItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <ItemID>${itemId}</ItemID>
  <EndingReason>NotAvailable</EndingReason>
</EndFixedPriceItemRequest>`;

  try {
    const res = await fetch("https://api.ebay.com/ws/api.dll", {
      method: "POST",
      headers: {
        "X-EBAY-API-SITEID": "0",
        "X-EBAY-API-COMPATIBILITY-LEVEL": "967",
        "X-EBAY-API-CALL-NAME": "EndFixedPriceItem",
        "X-EBAY-API-IAF-TOKEN": token,
        "Content-Type": "text/xml",
      },
      body: xml,
    });

    const text = await res.text();
    const ack = /<Ack>(\w+)<\/Ack>/.exec(text)?.[1];

    if (ack === "Success" || ack === "Warning") {
      return { success: true, message: `Listing ${itemId} ended (${ack})` };
    }
    return { success: false, message: `EndFixedPriceItem failed for ${itemId}: ${text.slice(0, 500)}` };
  } catch (err) {
    return { success: false, message: `EndFixedPriceItem request error for ${itemId}: ${(err as Error).message}` };
  }
}
