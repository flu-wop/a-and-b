import { fetchAllSellerItems } from "@/lib/ebay";
import { getDb, initDb } from "@/lib/db";

export interface SyncResult {
  total: number;
  synced: number;
  created: number;
  updated: number;
  archived: number;
  failed: number;
}

// Same real, verified top-level categories used for the storefront nav
// (confirmed working — see lib/ebay.ts / earlier storefront work). Matching
// against real eBay category IDs here instead of guessing from title
// keywords avoids the exact kind of misclassification that happened with
// freight/weight keyword guessing before (small parts flagged incorrectly).
const KNOWN_CATEGORIES: Record<string, string> = {
  "92074": "Electrical Equipment & Supplies",
  "42892": "Industrial Automation & Motion Controls",
  "183978": "Hydraulics, Pneumatics, Pumps & Plumbing",
  "257887": "Heavy Equipment, Parts & Attachments",
  "11804": "CNC, Metalworking & Manufacturing",
  "183900": "Fasteners & Hardware",
  "181939": "Test, Measurement & Inspection",
  "26261": "Surplus & Misc Industrial",
};

function matchCategory(item: any): string {
  const categories: { categoryId: string }[] = item.categories ?? [];
  for (const cat of categories) {
    if (KNOWN_CATEGORIES[cat.categoryId]) return KNOWN_CATEGORIES[cat.categoryId];
  }
  return "Surplus & Misc Industrial"; // fallback bucket, matches the catch-all storefront category
}

export async function syncProductsFromEbay(): Promise<SyncResult> {
  await initDb();
  const db = getDb();

  const items = await fetchAllSellerItems();

  const beforeCountRes = await db.execute(`SELECT COUNT(*) as c FROM products`);
  const beforeCount = Number((beforeCountRes.rows[0] as any).c);

  let failed = 0;
  const seenEbayIds: string[] = [];
  const statements: { sql: string; args: any[] }[] = [];

  for (const item of items) {
    const ebayItemId = item.itemId;
    const title = item.title ?? "";
    const priceCents = item.price?.value ? Math.round(Number(item.price.value) * 100) : 0;
    const condition = item.condition ?? "";
    const imageUrl = item.image?.imageUrl ?? item.thumbnailImages?.[0]?.imageUrl ?? "";
    const category = matchCategory(item);
    // Browse API doesn't reliably expose live quantity in the summary view —
    // default to 1 (in stock) rather than guessing a number that could be wrong.
    const quantity = item.estimatedAvailabilities?.[0]?.estimatedAvailableQuantity ?? 1;

    if (!ebayItemId || !title) {
      failed++;
      continue;
    }
    seenEbayIds.push(ebayItemId);

    // Single upsert per item instead of a SELECT-then-INSERT/UPDATE pair —
    // the original version did ~1,800 sequential round trips for 916 items
    // and blew past the function's time limit. This plus db.batch() below
    // sends everything in one shot.
    statements.push({
      sql: `
        INSERT INTO products (sku, ebay_item_id, title, price_cents, quantity, condition, image_url, category, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')
        ON CONFLICT(ebay_item_id) DO UPDATE SET
          title = excluded.title,
          price_cents = excluded.price_cents,
          quantity = excluded.quantity,
          condition = excluded.condition,
          image_url = excluded.image_url,
          category = excluded.category,
          status = 'active',
          updated_at = datetime('now')
      `,
      args: [ebayItemId, ebayItemId, title, priceCents, quantity, condition, imageUrl, category],
    });
  }

  if (statements.length > 0) {
    await db.batch(
      statements.map((s) => ({ sql: s.sql, args: s.args })),
      "write"
    );
  }

  // Anything previously synced but no longer in the live eBay results has
  // sold, ended, or was pulled — mark it archived so it drops off /shop
  // instead of continuing to show as buyable.
  let archived = 0;
  if (seenEbayIds.length > 0) {
    const placeholders = seenEbayIds.map(() => "?").join(",");
    const result = await db.execute({
      sql: `UPDATE products SET status = 'archived', updated_at = datetime('now') WHERE ebay_item_id IS NOT NULL AND ebay_item_id NOT IN (${placeholders}) AND status = 'active'`,
      args: seenEbayIds,
    });
    archived = Number(result.rowsAffected ?? 0);
  }

  const afterCountRes = await db.execute(`SELECT COUNT(*) as c FROM products`);
  const afterCount = Number((afterCountRes.rows[0] as any).c);
  const created = Math.max(0, afterCount - beforeCount);
  const synced = statements.length;
  const updated = Math.max(0, synced - created);

  return { total: items.length, synced, created, updated, archived, failed };
}
