import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Inventory",
  description:
    "Browse A&B Supply & Surplus inventory: heavy equipment parts, hydraulics, electrical, CNC/metalworking, hardware and more.",
};

const CATEGORIES = [
  {
    id: "heavy-equipment",
    title: "Heavy Equipment Parts & Attachments",
    tagline: "Keep your machines running",
    description:
      "We stock a wide range of heavy equipment parts including buckets, quick couplers, cutting edges, pins, bushings, ground engagement tools, and various attachments for excavators, wheel loaders, skid steers, bulldozers, and more.",
    examples: [
      "Excavator buckets & thumbs",
      "Quick couplers & pins",
      "Cutting edges & wear plates",
      "Hydraulic cylinders",
      "Undercarriage parts",
      "Counterweights & ballast",
    ],
    ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=heavy+equipment",
    image: "/warehouse-hero.jpg",
  },
  {
    id: "hydraulics",
    title: "Hydraulics",
    tagline: "The power behind the machine",
    description:
      "From surplus hydraulic cylinders and pump units to valves, hoses, fittings, and manifolds — we source quality hydraulic components for industrial and construction applications. Many items are new-old-stock (NOS) or professionally rebuilt.",
    examples: [
      "Hydraulic cylinders",
      "Pumps & motors",
      "Directional control valves",
      "Hoses & fittings",
      "Hydraulic manifolds",
      "Power units (HPU)",
    ],
    ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=hydraulic",
    image: "/warehouse-hero.jpg",
  },
  {
    id: "electrical",
    title: "Electrical & Controls",
    tagline: "Tested surplus electrical components",
    description:
      "Surplus and new-old-stock electrical components for industrial applications. Contactors, circuit breakers, motor starters, VFDs/drives, PLCs, relays, panel components, wire duct, and more.",
    examples: [
      "Motor starters & contactors",
      "VFDs / variable frequency drives",
      "PLCs & I/O modules",
      "Circuit breakers & fuses",
      "Terminal blocks & wire duct",
      "Sensors & proximity switches",
    ],
    ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=electrical",
    image: "/warehouse-hero.jpg",
  },
  {
    id: "cnc-metalworking",
    title: "CNC & Metalworking",
    tagline: "Precision tools & machine components",
    description:
      "Quality surplus CNC tooling, workholding, and machine components for machinists and job shops. Carbide inserts, end mills, tool holders, vises, chucks, and various accessories from name brands at surplus prices.",
    examples: [
      "Carbide inserts (indexed & solid)",
      "End mills & drills",
      "Tool holders & boring bars",
      "Vises & clamps",
      "Chucks & collets",
      "Measuring tools & gauges",
    ],
    ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=cnc+metalworking",
    image: "/warehouse-hero.jpg",
  },
  {
    id: "hardware",
    title: "Hardware & Fasteners",
    tagline: "By the piece or by the pound",
    description:
      "Bulk and individual hardware: bolts, nuts, washers, anchor bolts, specialty fasteners, set screws, and more. Great for shops and job sites looking to stock up on quality hardware at below-retail prices.",
    examples: [
      "Grade 5 & 8 bolts",
      "Hex nuts & lock nuts",
      "Specialty & metric fasteners",
      "Anchor bolts",
      "Set screws & socket head cap",
      "Washers (flat, lock, fender)",
    ],
    ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=fasteners+hardware",
    image: "/warehouse-hero.jpg",
  },
  {
    id: "general-surplus",
    title: "General Industrial Surplus",
    tagline: "Always something new in the warehouse",
    description:
      "We regularly acquire full warehouse lots and machine shop liquidations — a constantly changing selection of pneumatics, bearings, motors, pumps, material handling equipment, safety gear, and much more.",
    examples: [
      "Bearings & pillow blocks",
      "Air cylinders & fittings",
      "Electric motors",
      "Chain & sprockets",
      "Material handling",
      "Shop equipment & supplies",
    ],
    ebayUrl: "https://www.ebay.com/str/atob",
    image: "/warehouse-hero.jpg",
  },
];

export default function InventoryPage() {
  return (
    <>
      {/* Page header */}
      <section
        className="relative pt-32 pb-16 px-4 overflow-hidden border-b-[3px] border-orange"
        style={{ background: "linear-gradient(135deg, #111111 0%, #1A1A1A 50%, #111111 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(135deg, #E8900A 0px, #E8900A 1px, transparent 1px, transparent 60px)" }}
          aria-hidden="true"
        />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="eyebrow mb-3">All Sales via eBay</p>
          <h1 className="text-5xl sm:text-6xl text-white mb-4 font-display">Browse Our Inventory</h1>
          <p className="text-text-muted text-lg max-w-xl mx-auto mb-8">
            Click any category to browse current listings on eBay. New items added regularly.
          </p>
          <a
            href="https://www.ebay.com/str/atob"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange text-lg"
          >
            View All eBay Listings
          </a>
        </div>
      </section>

      {/* Category list */}
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col gap-20">
        {CATEGORIES.map((cat, i) => (
          <section key={cat.id} id={cat.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div
              className={`relative rounded-lg overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}
              style={{
                border: "2px solid #333",
                boxShadow: "0 0 30px rgba(232,144,10,0.08), 0 20px 50px rgba(0,0,0,0.6)",
                minHeight: "260px",
                background: "#1C1C1C",
              }}
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-0 left-0 w-20 h-1 bg-orange" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <p className="eyebrow mb-2">{cat.tagline}</p>
              <h2 className="text-3xl sm:text-4xl text-white mb-4 font-display">{cat.title}</h2>
              <p className="text-text-muted text-sm leading-relaxed mb-6">{cat.description}</p>

              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase text-text-dim mb-3 font-condensed">
                  Common Items:
                </p>
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                  {cat.examples.map((ex) => (
                    <p key={ex} className="text-text-muted text-sm flex items-start gap-1.5">
                      <span className="text-orange mt-0.5" aria-hidden="true">›</span>
                      {ex}
                    </p>
                  ))}
                </div>
              </div>

              <a
                href={cat.ebayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-orange"
              >
                Browse {cat.title} on eBay
              </a>
            </div>
          </section>
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="py-16 px-4 text-center border-t-[3px] border-orange bg-bg-card">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl text-white mb-4 font-display">
            Don&apos;t see what you need?
          </h2>
          <p className="text-text-muted mb-3">
            We source new inventory constantly. Call Bryan — we may have it before it&apos;s listed.
          </p>
          <p className="text-xs text-text-dim mb-8 font-condensed tracking-wide">
            Same-day callbacks. No sales pitch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:6083710746" className="btn-orange text-lg">Call 608-371-0746</a>
            <a href="mailto:arfsten18@gmail.com" className="btn-ghost">Email Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
