import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FeaturedProducts from "@/components/FeaturedProducts";
import { getActiveProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "A&B Supply & Surplus | Industrial Surplus & Heavy Equipment Parts",
  description:
    "Family-owned industrial surplus dealer. Heavy equipment parts, hydraulics, electrical, CNC/metalworking and more. Personally inspected, fast shipping.",
};

const TRUST_ITEMS = [
  { number: "400+", label: "eBay Listings" },
  { number: "100%", label: "Family-Owned" },
  { number: "5★", label: "Seller Rating" },
  { number: "Fast", label: "Shipping" },
];

export const dynamic = "force-dynamic";

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const products = await getActiveProducts();
  const featured = products.slice(0, 6);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #111111 0%, #1A1A1A 40%, #111111 70%, #0D0D0D 100%)",
        }}
      >
        {/* Diagonal stripe texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(135deg, #E8900A 0px, #E8900A 1px, transparent 1px, transparent 60px)" }}
          aria-hidden="true"
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: "linear-gradient(to bottom, transparent, #111111)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-28 pb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight drop-shadow-lg font-display">
            Parts that ship{" "}
            <span className="text-orange-bright italic">tomorrow.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white mb-3 font-condensed font-semibold tracking-wide drop-shadow">
            Industrial Surplus &amp; Heavy Equipment Parts — Family-Owned Since Day One
          </p>
          <p className="text-text-muted text-base mb-10 max-w-xl mx-auto drop-shadow">
            We source, personally inspect, and ship quality surplus parts for construction,
            manufacturing, agriculture, and more. Thousands of listings live on eBay right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/shop" className="btn-orange text-lg">
              Shop Direct
            </Link>
            <a
              href="https://www.ebay.com/str/atob"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Shop on eBay
            </a>
          </div>
          <p className="mt-5 text-sm text-text-muted drop-shadow">
            Have a question?{" "}
            <a href="tel:6083710746" className="font-bold text-white hover:text-orange-bright transition-colors">
              Call Bryan: 608-371-0746
            </a>
          </p>
          <p className="mt-1 text-xs text-text-dim font-condensed tracking-wide">
            Real person. Same-day callbacks.
          </p>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────────── */}
      <section
        className="border-t-[3px] border-orange border-b border-[#333]"
        style={{ background: "linear-gradient(90deg, #1C1C1C 0%, #2A2A2A 50%, #1C1C1C 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-3xl font-display leading-none text-orange-bright">
                  {item.number}
                </span>
                <span className="text-xs text-text-dim tracking-widest uppercase mt-1 font-condensed">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS (Shop Direct) ──────────────────────────────── */}
      <FeaturedProducts products={featured} />

      {/* ── FAMILY SECTION ────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 border-t border-b border-[#2A2A2A]"
        style={{ background: "#161616" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div
                className="relative rounded-lg overflow-hidden"
                style={{ border: "2px solid #333", boxShadow: "0 0 40px rgba(232,144,10,0.15)" }}
              >
                <Image
                  src="/family-cartoon.png"
                  alt="Bryan Arfsten and family"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div>
              <p className="eyebrow mb-3">Family-Owned &amp; Operated</p>
              <h2 className="text-4xl sm:text-5xl text-white mb-6 leading-tight font-display">
                The real people{" "}
                <span className="text-orange-bright italic">behind the parts.</span>
              </h2>
              <div className="flex flex-col gap-4 text-text-muted text-sm leading-relaxed">
                <p>
                  I&apos;m Bryan Arfsten — owner and operator of A&amp;B Supply &amp; Surplus. What started
                  as a passion for finding value in quality surplus equipment has grown into a trusted eBay
                  store with thousands of satisfied customers.
                </p>
                <p>
                  Every item we list has been personally inspected. We shoot straight about condition, ship
                  fast, and stand behind what we sell. That&apos;s the family promise.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/about" className="btn-ghost">Our Story</Link>
                <Link href="/contact" className="btn-ghost">Get in Touch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT STRIP ─────────────────────────────────────────────────── */}
      <section
        className="border-t-[3px] border-orange"
        style={{ background: "linear-gradient(135deg, #1C1C1C 0%, #222 50%, #1C1C1C 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl text-white mb-1 font-display">
                Don&apos;t see the part you need?
              </h3>
              <p className="text-text-muted text-sm">
                We source new inventory constantly — call Bryan and we may have it before it&apos;s listed.
              </p>
              <p className="text-xs text-text-dim mt-1 font-condensed tracking-wide">
                Same-day callbacks. No sales pitch.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center shrink-0">
              <a href="tel:6083710746" className="btn-orange">Call 608-371-0746</a>
              <Link href="/contact" className="btn-ghost">Send a Message</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
