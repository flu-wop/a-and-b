// Interim shipping calculation: tiered by order subtotal, NOT actual weight.
// This avoids the keyword/weight-guessing mistakes made earlier on eBay
// freight classification (small pneumatic cylinders getting flagged as heavy
// freight, etc.) — a wrong flat guess is safer than a wrong "smart" guess.
//
// These dollar amounts are placeholders. Once `weight_oz` and `box_size` are
// actually populated on synced products (a later phase), this should be
// replaced with real carrier-rate lookups or accurate flat rates based on
// actual shipping cost data, not this guess.
export function calculateShippingCents(subtotalCents: number): { amountCents: number; label: string } {
  const dollars = subtotalCents / 100;

  if (dollars < 50) return { amountCents: 1299, label: "Standard Shipping" };
  if (dollars < 150) return { amountCents: 1799, label: "Standard Shipping" };
  if (dollars < 500) return { amountCents: 2499, label: "Standard Shipping" };
  return { amountCents: 3999, label: "Standard Shipping (Heavy/Large Item)" };
}
