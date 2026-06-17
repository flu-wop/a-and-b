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

export default function EbayListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/ebay-listings")
      .then((r) => r.json())
      .then((data) => {
        const resp = data?.findItemsIneBayStoresResponse?.[0];
        if (resp?.ack?.[0] !== "Success") throw new Error("API error");
        const raw = resp?.searchResult?.[0]?.item ?? [];
        const parsed: Listing[] = raw.map((item: Record<string, unknown[]>) => ({
          itemId: (item.itemId as string[])[0],
          title: (item.title as string[])[0],
          price: (item.sellingStatus as Record<string, unknown[]>[])[0]?.currentPrice?.[0] as string,
          imageUrl:
            ((item.pictureURLSuperSize as string[] | undefined)?.[0]) ||
            ((item.galleryURL as string[] | undefined)?.[0]) ||
            "",
          viewItemURL: (item.viewItemURL as string[])[0],
          condition: ((item.condition as Record<string, string[]>[] | undefined)?.[0]?.conditionDisplayName?.[0]) ?? "Surplus",
        }));
        setListings(parsed);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (error || (!loading && listings.length === 0)) return null;

  return (
    <section className="py-20 px-4" style={{ background: "#161616" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Live on eBay Now</p>
          <h2 className="text-4xl sm:text-5xl text-white font-display">
            Featured Listings
          </h2>
          <div className="section-divider" />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: COUNT }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden animate-pulse"
                style={{ background: "#1C1C1C", border: "1px solid #2A2A2A", height: 320 }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((item) => {
              const priceVal =
                typeof item.price === "object"
                  ? parseFloat((item.price as unknown as Record<string, string>).__value__ ?? "0")
                  : parseFloat(String(item.price));
              return (
                <a
                  key={item.itemId}
                  href={item.viewItemURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                  style={{
                    background: "#1C1C1C",
                    border: "1px solid #2A2A2A",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor = "#E8900A")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor = "#2A2A2A")
                  }
                >
                  {/* Image */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ height: 200, background: "#111" }}
                  >
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-dim font-condensed tracking-wider text-sm">
                        A&amp;B Supply
                      </div>
                    )}
                    {/* Condition badge */}
                    <span
                      className="absolute top-3 left-3 text-xs font-condensed font-semibold tracking-wider uppercase px-2 py-0.5 rounded"
                      style={{ background: "rgba(0,0,0,0.75)", color: "#A0A0A0" }}
                    >
                      {item.condition}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 p-4">
                    <p className="text-text-primary text-sm font-semibold leading-snug line-clamp-2 font-condensed tracking-wide group-hover:text-orange-bright transition-colors">
                      {item.title}
                    </p>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="text-orange-bright font-display text-2xl">
                        ${isNaN(priceVal) ? "—" : priceVal.toFixed(2)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-orange font-condensed font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        View on eBay <ArrowIcon className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.ebay.com/str/atob"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange text-lg"
          >
            Shop All 686 Listings on eBay
          </a>
        </div>
      </div>
    </section>
  );
}
