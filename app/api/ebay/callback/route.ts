import { NextResponse } from "next/server";
import { exchangeCodeForSellerToken } from "@/lib/ebay-seller-auth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.json({ error: `eBay authorization denied: ${error}` }, { status: 400 });
  }
  if (!code) {
    return NextResponse.json({ error: "No authorization code returned by eBay" }, { status: 400 });
  }

  try {
    await exchangeCodeForSellerToken(code);
    return NextResponse.json({
      success: true,
      message: "eBay seller access authorized. The site can now end listings automatically when they sell here.",
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
