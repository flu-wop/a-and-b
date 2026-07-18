import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { getDb, initDb } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;

function isAuthed(req: Request): boolean {
  const key = new URL(req.url).searchParams.get("key");
  return !!process.env.ADMIN_PASSWORD && key === process.env.ADMIN_PASSWORD;
}

function toCents(priceStr: string): number {
  const n = parseFloat((priceStr || "0").replace(/[^0-9.]/g, ""));
  return Math.round((isNaN(n) ? 0 : n) * 100);
}

// eBay's Active Listings Report is UTF-8 with a BOM — strip it or the first
// header column name comes through mangled and every row lookup on it fails.
function stripBOM(text: string): string {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

export async function POST(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { csv } = (await req.json()) as { csv: string };
  if (!csv || typeof csv !== "string") {
    return NextResponse.json({ error: "No CSV content provided" }, { status: 400 });
  }

  let records: Record<string, string>[];
  try {
    records = parse(stripBOM(csv), {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      trim: true,
    });
  } catch (err) {
    return NextResponse.json({ error: `CSV parse failed: ${(err as Error).message}` }, { status: 400 });
  }

  await initDb();
  const db = getDb();

  let imported = 0;
  let skipped = 0;
  const skippedReasons: string[] = [];

  for (const row of records) {
    // eBay's Seller Hub export column names — matches the format already used
    // for File Exchange work elsewhere in this project.
    const sku = row["Custom label (SKU)"] || row["SKU"] || "";
    const title = row["Title"] || "";
    const itemNumber = row["Item number"] || row["Item Number"] || "";
    const priceStr = row["Current price"] || row["Start price"] || row["Price"] || "0";
    const qtyStr = row["Available quantity"] || row["Quantity"] || "1";
    const condition = row["Condition"] || "";
    const category = row["Category"] || "";
    const storeCategory = row["Store category"] || row["StoreCategory"] || "";

    if (!sku || !title) {
      skipped++;
      skippedReasons.push(`Row missing SKU or title: "${title || itemNumber || "unknown"}"`);
      continue;
    }

    const priceCents = toCents(priceStr);
    const quantity = parseInt(qtyStr, 10) || 0;

    try {
      // Upsert by SKU: re-running an import (e.g. after relisting) updates
      // existing rows instead of creating duplicates.
      const existing = await db.execute({
        sql: `SELECT id FROM products WHERE sku = ?`,
        args: [sku],
      });

      if (existing.rows.length > 0) {
        await db.execute({
          sql: `UPDATE products SET title = ?, ebay_item_id = ?, price_cents = ?, quantity = ?, condition = ?, category = ?, store_category = ?, updated_at = datetime('now') WHERE sku = ?`,
          args: [title, itemNumber, priceCents, quantity, condition, category, storeCategory, sku],
        });
      } else {
        await db.execute({
          sql: `INSERT INTO products (sku, ebay_item_id, title, price_cents, quantity, condition, category, store_category, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
          args: [sku, itemNumber, title, priceCents, quantity, condition, category, storeCategory],
        });
      }
      imported++;
    } catch (err) {
      skipped++;
      skippedReasons.push(`SKU ${sku}: ${(err as Error).message}`);
    }
  }

  return NextResponse.json({
    imported,
    skipped,
    total: records.length,
    skippedReasons: skippedReasons.slice(0, 20), // cap so the response doesn't balloon
  });
}
