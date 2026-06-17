import { NextResponse } from "next/server";

const APP_ID = "BryanArf-AampBSup-PRD-5a92c9933-d733c707";
const STORE_NAME = "atob";
const COUNT = 6;

export async function GET() {
  const url =
    `https://svcs.ebay.com/services/search/FindingService/v1` +
    `?OPERATION-NAME=findItemsIneBayStores` +
    `&SERVICE-VERSION=1.0.0` +
    `&SECURITY-APPNAME=${APP_ID}` +
    `&RESPONSE-DATA-FORMAT=JSON` +
    `&storeName=${STORE_NAME}` +
    `&paginationInput.entriesPerPage=${COUNT}` +
    `&sortOrder=BestMatch` +
    `&outputSelector(0)=PictureURLSuperSize` +
    `&outputSelector(1)=ConditionWithDetails`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    console.log("eBay server response status:", res.status);
    console.log("eBay server response:", JSON.stringify(data).slice(0, 300));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
