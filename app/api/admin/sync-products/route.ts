import { NextResponse } from "next/server";
import { syncProductsFromEbay } from "@/lib/sync-products";

export const runtime = "nodejs";
export const maxDuration = 60;

function isAuthed(req: Request): boolean {
  const key = new URL(req.url).searchParams.get("key");
  return !!process.env.ADMIN_PASSWORD && key === process.env.ADMIN_PASSWORD;
}

export async function POST(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncProductsFromEbay();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
