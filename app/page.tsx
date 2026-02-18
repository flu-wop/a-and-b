import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A&B Supply & Surplus | Industrial Surplus & Heavy Equipment Parts",
  description: "Family-owned industrial surplus dealer. Heavy equipment parts, hydraulics, electrical, CNC/metalworking and more.",
};

const CATEGORIES = [
  { icon: "⚙️", title: "Heavy Equipment Parts & Attachments", desc: "Buckets, blades, couplers, pins, and more for excavators, loaders, and dozers.", ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=heavy+equipment" },
  { icon: "🔧", title: "Hydraulics", desc: "Cylinders, pumps, valves, hoses, and fittings for all makes and applications.", ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=hydraulic" },
  { icon: "⚡", title: "Electrical & Controls", desc: "Switches, contactors, drives, PLCs, and panel components — tested surplus.", ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=electrical" },
  { icon: "🏭", title: "CNC & Metalworking", desc: "Tooling, fixtures, inserts, vises, chucks, and CNC machine components.", ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=cnc+metalworking" },
  { icon: "🔩", title: "Hardware & Fasteners", desc: "Bulk bolts, nuts, specialty fasteners, and precision hardware.", ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=fasteners" },
  { icon: "📦", title: "General Industrial Surplus", desc: "Pneumatics, sensors, bearings, motors, and a huge variety of industrial goods.", ebayUrl: "https://www.ebay.com/str/atob" },
];

const TRUST_ITEMS = [
  { number: "400+", label: "eBay Listings" },
  { number: "100%", label: "Family-Owned" },
  { number: "5★", label: "Seller Rating" },
  { number: "Fast", label: "Shipping" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/warehouse-hero.jpg" alt="A&B Supply & Surplus Warehouse" fill priority className="object-cover object-top" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(17,17,17,0.3) 0%, rgba(17,17,17,0.2) 40%, rgba(17,17,17,0.9) 100%)" }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-[420px]">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight drop-shadow-lg" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>
            Industrial Surplus &amp; <span style={{ color: "#F5A623" }}>Heavy Equipment Parts</span>
          </h1>
          <p className="text-lg sm:text-xl text-white mb-3 font-semibold tracking-wide drop-shadow" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Quality Recycled &amp; New — Thousands of Listings on eBay
          </p>
          <p className="text-gray-300 text-base mb-10 max-w-xl mx-auto drop-shadow">
            Family-owned and operated. We source, test, and ship quality surplus parts for construction, manufacturing, agriculture, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://www.ebay.com/str/atob" target="_blank" rel="noopener noreferrer" className="btn-orange text-xl">🛒 Shop Full Inventory on eBay</a>
            <Link href="/inventory" className="btn-ghost">Browse Categories →</Link>
          </div>
          <p className="mt-6 text-gray-300 text-sm drop-shadow">
            Have a question?{" "}
            <a href="tel:6083710746" className="font-bold tracking-wide text-white hover:text-yellow-400 transition-colors">
              Call Bryan: 608-371-0746
            </a>
          </p>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: "linear-gradient(90deg, #1C1C1C 0%, #2A2A2A 50%, #1C1C1C 100%)", borderTop: "3px solid #E8900A", borderBottom: "1px solid #333" }}>
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-3xl font-black leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#F5A623" }}>{item.number}</span>
                <span className="text-xs text-gray-400 tracking-widest uppercase mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-yellow-500 text-sm tracking-widest uppercase mb-3 font-semibold">What We Carry</p>
          <h2 className="text-4xl sm:text-5xl text-white" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>Browse Our Inventory</h2>
          <div className="w-20 h-1 mx-auto mt-4" style={{ background: "linear-gradient(90deg, #E8900A, #C8960C, transparent)" }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <a key={cat.title} href={cat.ebayUrl} target="_blank" rel="noopener noreferrer" className="category-card group cursor-pointer">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{cat.icon}</span>
                <div className="flex-1">
                  <h3 className="text-gray-100 font-bold text-base mb-2 group-hover:text-yellow-400 transition-colors">{cat.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{cat.desc}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-yellow-600 text-xs font-semibold tracking-wider uppercase">
                <span>Shop on eBay</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="https://www.ebay.com/str/atob" target="_blank" rel="noopener noreferrer" className="btn-orange text-xl">🛒 View All Listings on eBay</a>
        </div>
      </section>

      {/* FAMILY SECTION */}
      <section className="py-20 px-4" style={{ background: "#161616", borderTop: "1px solid #2A2A2A", borderBottom: "1px solid #2A2A2A" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden" style={{ border: "2px solid #333", boxShadow: "0 0 40px rgba(232,144,10,0.15)" }}>
                <Image src="/family-cartoon.png" alt="Bryan Arfsten and family" width={600} height={400} className="w-full h-auto object-cover" />
              </div>
            </div>
            <div>
              <p className="text-yellow-500 text-sm tracking-widest uppercase mb-3 font-semibold">Family-Owned &amp; Operated</p>
              <h2 className="text-4xl sm:text-5xl text-white mb-6 leading-tight" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>
                The Real People<br /><span style={{ color: "#F5A623" }}>Behind the Parts</span>
              </h2>
              <div className="flex flex-col gap-4 text-gray-400 text-sm leading-relaxed">
                <p>Hi, I&apos;m Bryan Arfsten — owner and operator of A&amp;B Supply &amp; Surplus. What started as a passion for finding value in quality surplus equipment has grown into a trusted eBay store with thousands of satisfied customers.</p>
                <p>Every item we list has been personally inspected. We shoot straight about condition, ship fast, and stand behind what we sell. That&apos;s the family promise.</p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/about" className="btn-ghost">Our Story →</Link>
                <Link href="/contact" className="btn-ghost">Get in Touch →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section style={{ background: "linear-gradient(135deg, #1C1C1C 0%, #222 50%, #1C1C1C 100%)", borderTop: "3px solid #E8900A" }}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl text-white mb-1" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.06em" }}>Have a Specific Part in Mind?</h3>
              <p className="text-gray-400 text-sm">Don&apos;t see it listed? Reach out — we source parts regularly and may have what you need.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center shrink-0">
              <a href="tel:6083710746" className="btn-orange">📞 608-371-0746</a>
              <Link href="/contact" className="btn-ghost">Send a Message</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
