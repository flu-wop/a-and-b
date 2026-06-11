import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A&B Supply & Surplus | Industrial Surplus & Heavy Equipment Parts",
  description:
    "Family-owned industrial surplus dealer. Heavy equipment parts, hydraulics, electrical, CNC/metalworking and more. Personally inspected, fast shipping.",
};

// ─── Category data ────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    title: "Heavy Equipment Parts",
    desc: "Buckets, blades, couplers, pins, and more for excavators, loaders, and dozers.",
    ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=heavy+equipment",
    Icon: ExcavatorIcon,
  },
  {
    title: "Hydraulics",
    desc: "Cylinders, pumps, valves, hoses, and fittings for all makes and applications.",
    ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=hydraulic",
    Icon: HydraulicIcon,
  },
  {
    title: "Electrical & Controls",
    desc: "Contactors, drives, PLCs, and panel components — tested surplus.",
    ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=electrical",
    Icon: ElectricalIcon,
  },
  {
    title: "CNC & Metalworking",
    desc: "Tooling, fixtures, inserts, vises, chucks, and CNC machine components.",
    ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=cnc+metalworking",
    Icon: CncIcon,
  },
  {
    title: "Hardware & Fasteners",
    desc: "Bulk bolts, nuts, specialty fasteners, and precision hardware.",
    ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=fasteners",
    Icon: FastenerIcon,
  },
  {
    title: "General Industrial Surplus",
    desc: "Pneumatics, sensors, bearings, motors, and a wide variety of industrial goods.",
    ebayUrl: "https://www.ebay.com/str/atob",
    Icon: WarehouseIcon,
  },
];

const TRUST_ITEMS = [
  { number: "400+", label: "eBay Listings" },
  { number: "100%", label: "Family-Owned" },
  { number: "5★", label: "Seller Rating" },
  { number: "Fast", label: "Shipping" },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/warehouse-hero.jpg"
            alt="A&B Supply & Surplus warehouse"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(17,17,17,0.35) 0%, rgba(17,17,17,0.2) 40%, rgba(17,17,17,0.92) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-[420px]">
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
            <a
              href="https://www.ebay.com/str/atob"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange text-lg"
            >
              Shop Full Inventory on eBay
            </a>
            <Link href="/inventory" className="btn-ghost">
              Browse Categories
            </Link>
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

      {/* ── CATEGORIES ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">What We Carry</p>
          <h2 className="text-4xl sm:text-5xl text-white font-display">Browse Our Inventory</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.title}
              href={cat.ebayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="category-card group"
            >
              <div className="flex items-start gap-4">
                <cat.Icon className="w-8 h-8 text-orange shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-text-primary font-semibold text-base mb-2 group-hover:text-orange-bright transition-colors font-condensed tracking-wide">
                    {cat.title}
                  </h3>
                  <p className="text-text-dim text-sm leading-relaxed">{cat.desc}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-orange text-xs font-semibold tracking-wider uppercase font-condensed">
                <span>Shop on eBay</span>
                <ArrowIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.ebay.com/str/atob"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange text-lg"
          >
            View All Listings on eBay
          </a>
        </div>
      </section>

      {/* ── LISTING VIGNETTE ──────────────────────────────────────────────── */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow text-center mb-5">Live on eBay Now</p>
          <div className="bg-bg-card border border-[#333] rounded-lg overflow-hidden">
            {/* Mini eBay listing cards */}
            {[
              { title: "Hydraulic Cylinder — 4\" Bore × 24\" Stroke", condition: "Used — Tested", price: "$189.00", status: "Ships Today" },
              { title: "Allen-Bradley MicroLogix 1100 PLC 1763-L16BWA", condition: "New Old Stock", price: "$342.00", status: "3 Available" },
              { title: "Excavator Quick Coupler — CAT 308 / 311 Class", condition: "Used — Good", price: "$415.00", status: "Ships Today" },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between gap-4 px-5 py-4 ${i < 2 ? "border-b border-[#2A2A2A]" : ""}`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary text-sm font-semibold truncate font-condensed">{item.title}</p>
                  <p className="text-text-dim text-xs mt-0.5">{item.condition}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-orange-bright font-bold text-sm font-condensed">{item.price}</p>
                  <p className="text-xs text-green-400 mt-0.5">{item.status}</p>
                </div>
              </div>
            ))}
            <div className="px-5 py-3 bg-bg-raised border-t border-[#333] text-center">
              <a
                href="https://www.ebay.com/str/atob"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-muted hover:text-orange transition-colors font-condensed tracking-wider uppercase"
              >
                View all 400+ listings on eBay →
              </a>
            </div>
          </div>
        </div>
      </section>

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

// ─── SVG Icons ───────────────────────────────────────────────────────────────
function ExcavatorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 20h20M6 20V10l4-4 5 4v6M11 20v-6" /><path d="M17 14h2a1 1 0 011 1v1a1 1 0 01-1 1h-2" />
    </svg>
  );
}
function HydraulicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="6" width="14" height="12" rx="2" /><line x1="9" y1="6" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="18" /><line x1="5" y1="12" x2="19" y2="12" /><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  );
}
function ElectricalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="13 2 13 9 20 9 11 22 11 15 4 15 13 2" />
    </svg>
  );
}
function CncIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
function FastenerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
function WarehouseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
