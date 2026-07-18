import { getDb, initDb } from "@/lib/db";

export interface Product {
  id: number;
  sku: string;
  ebay_item_id: string | null;
  title: string;
  description: string | null;
  brand: string | null;
  condition: string | null;
  category: string | null;
  price_cents: number;
  quantity: number;
  image_url: string | null;
  status: string;
}

export async function getActiveProducts(): Promise<Product[]> {
  await initDb();
  const db = getDb();
  const res = await db.execute(
    `SELECT * FROM products WHERE status = 'active' AND quantity > 0 ORDER BY created_at DESC`
  );
  return res.rows as unknown as Product[];
}

export async function getProductById(id: number): Promise<Product | null> {
  await initDb();
  const db = getDb();
  const res = await db.execute({ sql: `SELECT * FROM products WHERE id = ?`, args: [id] });
  return (res.rows[0] as unknown as Product) ?? null;
}
