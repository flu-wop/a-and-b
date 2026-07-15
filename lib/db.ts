import { createClient, type Client } from "@libsql/client";

let _db: Client | null = null;

export function getDb(): Client {
  if (_db) return _db;
  _db = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
  return _db;
}

// Call once before first read/write. Idempotent — safe to call on every request.
export async function initDb() {
  const db = getDb();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sku TEXT UNIQUE NOT NULL,
      ebay_item_id TEXT,              -- links to the live eBay listing, if any
      title TEXT NOT NULL,
      description TEXT,
      brand TEXT,
      mpn TEXT,
      condition TEXT,                 -- New / Used / For Parts
      category TEXT,
      store_category TEXT,
      price_cents INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      weight_oz INTEGER,
      box_size TEXT,
      image_url TEXT,
      status TEXT NOT NULL DEFAULT 'active',  -- active | reserved | sold | archived
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      shipping_address TEXT,          -- JSON blob from Stripe
      amount_cents INTEGER NOT NULL,
      stripe_session_id TEXT UNIQUE,
      status TEXT NOT NULL DEFAULT 'pending',  -- pending | paid | cancelled | refunded
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL REFERENCES orders(id),
      product_id INTEGER NOT NULL REFERENCES products(id),
      sku TEXT NOT NULL,
      title TEXT NOT NULL,
      unit_price_cents INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1
    )
  `);

  // One row per product currently in someone's cart+checkout-in-progress.
  // Prevents two buyers from both getting to Stripe for the same single-qty item.
  await db.execute(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL REFERENCES products(id),
      stripe_session_id TEXT,
      expires_at TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
}
