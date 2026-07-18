import { fetchAllSellerItems } from "@/lib/ebay";
import { getDb, initDb } from "@/lib/db";

export interface SyncResult {
  total: number;
  created: number;
  updated: number;
  archived: number;
  failed: number;
}

export async function syncProductsFromEbay(): Promise<SyncResult> {
  await initDb();
  const db = getDb();

  const items = await fetchAllSellerItems();

  let created = 0;
  let updated = 0;
  let failed = 0;
  const seenEbayIds: string[] = [];

  for (const item of items) {
    const ebayItemId = item.itemId;
    const title = item.title ?? "";
    const priceCents = item.price?.value ? Math.round(Number(item.price.value) * 100) : 0;
    const condition = item.condition ?? "";
    const imageUrl = item.image?.imageUrl ?? item.thumbnailImages?.[0]?.imageUrl ?? "";
    // Browse API doesn't reliably expose live quantity in the summary view —
    // default to 1 (in stock) rather than guessing a number that could be wrong.
    const quantity = item.estimatedAvailabilities?.[0]?.estimatedAvailableQuantity ?? 1;

    if (!ebayItemId || !title) {
      failed++;
      continue;
    }
    seenEbayIds.push(ebayItemId);

    try {
      const existing = await db.execute({
        sql: `SELECT id FROM products WHERE ebay_item_id = ?`,
        args: [ebayItemId],
      });

      if (existing.rows.length > 0) {
        await db.execute({
          sql: `UPDATE products SET title = ?, price_cents = ?, quantity = ?, condition = ?, image_url = ?, status = 'active', updated_at = datetime('now') WHERE ebay_item_id = ?`,
          args: [title, priceCents, quantity, condition, imageUrl, ebayItemId],
        });
        updated++;
      } else {
        // No true custom SKU available from the public API — use the eBay
        // item ID as the sku value so it still satisfies the unique/not-null
        // constraint and is traceable back to the source listing.
        await db.execute({
          sql: `INSERT INTO products (sku, ebay_item_id, title, price_cents, quantity, condition, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'active')`,
          args: [ebayItemId, ebayItemId, title, priceCents, quantity, condition, imageUrl],
        });
        created++;
      }
    } catch {
      failed++;
    }
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

  return { total: items.length, created, updated, archived, failed };
}
