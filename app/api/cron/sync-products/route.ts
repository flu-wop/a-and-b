import { NextResponse } from "next/server";
import { syncProductsFromEbay } from "@/lib/sync-products";

export const runtime = "nodejs";
export const maxDuration = 60;

// Vercel Cron automatically sends `Authorization: Bearer ${CRON_SECRET}` for
// scheduled invocations when CRON_SECRET is set in env vars — this rejects
// any request that doesn't carry it, so this endpoint can't be hit by anyone
// just guessing the URL.
export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncProductsFromEbay();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
