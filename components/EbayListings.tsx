"use client";

import { useEffect, useState } from "react";

const COUNT = 6;

interface Listing {
  itemId: string;
  title: string;
  price: string;
  imageUrl: string;
  viewItemURL: string;
  condition: string;
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

// Static fallback listings — real categories from the store
const FALLBACK_LISTINGS: Listing[] = [
  { itemId: "1", title: "Hydraulic Cylinder — Industrial Surplus", price: "$189.00", imageUrl: "", viewItemURL: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=hydraulic+cylinder", condition: "Surplus" },
  { itemId: "2", title: "Allen-Bradley PLC Module — New Old Stock", price: "$342.00", imageUrl: "", viewItemURL: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=allen+bradley+plc", condition: "NOS" },
  { itemId: "3", title: "Excavator Quick Coupler — Heavy Equipment", price: "$415.00", imageUrl: "", viewItemURL: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=excavator+coupler", condition: "Used" },
  { itemId: "4", title: "VFD Variable Frequency Drive — Tested", price: "$275.00", imageUrl: "", viewItemURL: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=vfd+drive", condition: "Tested" },
  { itemId: "5", title: "Carbide End Mill Set — CNC Tooling Lot", price: "$98.00", imageUrl: "", viewItemURL: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=carbide+end+mill", condition: "New" },
  { itemId: "6", title: "Electric Motor 3HP — Industrial Surplus", price: "$165.00", imageUrl: "", viewItemURL: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=electric+motor", condition: "Surplus" },
];

function ListingCard({ item }: { item: Listing }) {
  return (
    <a
      href={item.viewItemURL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-1"
      style={{
        background: "#1C1C1C",
        border: "1px solid #2A2A2A",
        boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#E8900A")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#2A2A2A")}
    >
      {/* Image / placeholder */}
      <div className="relative w-full overflow-hidden flex items-center justify-center" style={{ height: 180, background: "#111" }}>
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" className="w-32 h-24 opacity-30" aria-hidden="true">
            <rect x="10" y="30" width="140" height="70" rx="4" fill="none" stroke="#E8900A" strokeWidth="2" />
            <rect x="30" y="45" width="40" height="40" rx="2" fill="#E8900A" opacity="0.3" />
            <rect x="85" y="50" width="50" height="8" rx="2" fill="#E8900A" opacity="0.4" />
            <rect x="85" y="65" width="35" height="6" rx="2" fill="#555" />
            <rect x="85" y="77" width="42" height="6" rx="2" fill="#555" />
          </svg>
        )}
        <span className="absolute top-3 left-3 text-xs font-condensed font-semibold tracking-wider uppercase px-2 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.75)", color: "#A0A0A0" }}>
          {item.condition}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-text-primary text-sm font-semibold leading-snug line-clamp-2 font-condensed tracking-wide group-hover:text-orange-bright transition-colors">
          {item.title}
        </p>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-orange-bright font-display text-2xl">{item.price}</span>
          <span className="flex items-center gap-1 text-xs text-orange font-condensed font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            View on eBay <ArrowIcon className="w-3 h-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function EbayListings() {
  const [listings, setListings] = useState<Listing[]>(FALLBACK_LISTINGS);
  const [live, setLive] = useState(false);

  useEffect(() => {
    fetch("/api/ebay-listings")
      .then((r) => r.json())
      .then((data) => {
        const items = data.itemSummaries ?? [];
        if (items.length === 0) return;
        const parsed: Listing[] = items.slice(0, COUNT).map((item: any) => ({
          itemId: item.itemId,
          title: item.title ?? "",
          price: item.price?.value ? `$${Number(item.price.value).toFixed(2)}` : "",
          imageUrl: item.image?.imageUrl ?? item.thumbnailImages?.[0]?.imageUrl ?? "",
          viewItemURL: item.itemWebUrl ?? "https://www.ebay.com/str/atob",
          condition: item.condition ?? "Surplus",
        }));
        setListings(parsed);
        setLive(true);
      })
      .catch(() => {/* keep fallback */});
  }, []);

  return (
    <section className="py-20 px-4" style={{ background: "#161616" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">{live ? "Live on eBay Now" : "From Our Store"}</p>
          <h2 className="text-4xl sm:text-5xl text-white font-display">Featured Listings</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => <ListingCard key={item.itemId} item={item} />)}
        </div>

        <div className="text-center mt-12">
          <a href="https://www.ebay.com/str/atob" target="_blank" rel="noopener noreferrer" className="btn-orange text-lg">
            Shop All 686 Listings on eBay
          </a>
        </div>
      </div>
    </section>
  );
}
