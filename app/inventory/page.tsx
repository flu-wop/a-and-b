import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Browse A&B Supply & Surplus inventory: heavy equipment parts, hydraulics, electrical, CNC/metalworking, hardware and more.",
};

const CATEGORIES = [
  { id: "heavy-equipment", icon: "🚜", title: "Heavy Equipment Parts & Attachments", tagline: "Keep your machines running", description: "We stock a wide range of heavy equipment parts including buckets, quick couplers, cutting edges, pins, bushings, ground engagement tools, and various attachments for excavators, wheel loaders, skid steers, bulldozers, and more.", examples: ["Excavator buckets & thumbs", "Quick couplers & pins", "Cutting edges & wear plates", "Hydraulic cylinders", "Undercarriage parts", "Counterweights & ballast"], ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=heavy+equipment", image: "/cat-heavy-equipment.jpg" },
  { id: "hydraulics", icon: "🔧", title: "Hydraulics", tagline: "The power behind the machine", description: "From surplus hydraulic cylinders and pump units to valves, hoses, fittings, and manifolds — we source quality hydraulic components for industrial and construction applications. Many items are new-old-stock (NOS) or professionally rebuilt.", examples: ["Hydraulic cylinders", "Pumps & motors", "Directional control valves", "Hoses & fittings", "Hydraulic manifolds", "Power units (HPU)"], ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=hydraulic", image: "/cat-hydraulics.jpg" },
  { id: "electrical", icon: "⚡", title: "Electrical & Controls", tagline: "Tested surplus electrical components", description: "Surplus and new-old-stock electrical components for industrial applications. Contactors, circuit breakers, motor starters, VFDs/drives, PLCs, relays, panel components, wire duct, and more.", examples: ["Motor starters & contactors", "VFDs / variable frequency drives", "PLCs & I/O modules", "Circuit breakers & fuses", "Terminal blocks & wire duct", "Sensors & proximity switches"], ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=electrical", image: "/cat-electrical.jpg" },
  { id: "cnc-metalworking", icon: "🏭", title: "CNC & Metalworking", tagline: "Precision tools & machine components", description: "Quality surplus CNC tooling, workholding, and machine components for machinists and job shops. Carbide inserts, end mills, tool holders, vises, chucks, and various accessories from name brands at surplus prices.", examples: ["Carbide inserts (indexed & solid)", "End mills & drills", "Tool holders & boring bars", "Vises & clamps", "Chucks & collets", "Measuring tools & gauges"], ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=cnc+metalworking", image: "/cat-cnc.jpg" },
  { id: "hardware", icon: "🔩", title: "Hardware & Fasteners", tagline: "By the piece or by the pound", description: "Bulk and individual hardware: bolts, nuts, washers, anchor bolts, specialty fasteners, set screws, and more. Great for shops and job sites looking to stock up on quality hardware at below-retail prices.", examples: ["Grade 5 & 8 bolts", "Hex nuts & lock nuts", "Specialty & metric fasteners", "Anchor bolts", "Set screws & socket head cap", "Washers (flat, lock, fender)"], ebayUrl: "https://www.ebay.com/sch/i.html?_ssn=atob&_nkw=fasteners+hardware", image: "/cat-hardware.jpg" },
  { id: "general-surplus", icon: "📦", title: "General Industrial Surplus", tagline: "Always something new in the warehouse", description: "We regularly acquire full warehouse lots and machine shop liquidations — a constantly changing selection of pneumatics, bearings, motors, pumps, material handling equipment, safety gear, and much more.", examples: ["Bearings & pillow blocks", "Air cylinders & fittings", "Electric motors", "Chain & sprockets", "Material handling", "Shop equipment & supplies"], ebayUrl: "https://www.ebay.com/str/atob", image: "/cat-general.jpg" },
];

export default function InventoryPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #111111 0%, #1A1A1A 50%, #111111 100%)", borderBottom: "3px solid #E8900A" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(135deg, #E8900A 0px, #E8900A 1px, transparent 1px, transparent 60px)" }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="text-[#E8900A] text-sm tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>All Sales via eBay</p>
          <h1 className="text-5xl sm:text-6xl text-white mb-4" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>Browse Our Inventory</h1>
          <p className="text-[#A0A0A0] text-lg max-w-xl mx-auto mb-8">Click any category to browse current listings on eBay. New items added regularly.</p>
          <a href="https://www.ebay.com/str/atob" target="_blank" rel="noopener noreferrer" className="btn-orange text-xl">🛒 View All eBay Listings</a>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col gap-20">
        {CATEGORIES.map((cat, i) => (
          <section key={cat.id} id={cat.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`relative rounded-lg overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`} style={{ border: "2px solid #333", boxShadow: "0 0 30px rgba(232,144,10,0.1), 0 20px 50px rgba(0,0,0,0.6)", minHeight: "260px", background: "#1C1C1C" }}>
              <Image src={cat.image} alt={cat.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-10">{cat.icon}</div>
              <div className="absolute top-0 left-0 w-20 h-1" style={{ background: "#E8900A" }} />
            </div>

            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{cat.icon}</span>
                <p className="text-[#E8900A] text-xs tracking-[0.3em] uppercase font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{cat.tagline}</p>
              </div>
              <h2 className="text-3xl sm:text-4xl text-white mb-4" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>{cat.title}</h2>
              <p className="text-[#A0A0A0] text-sm leading-relaxed mb-6">{cat.description}</p>
              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase text-[#666] mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Common Items:</p>
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                  {cat.examples.map((ex) => (
                    <p key={ex} className="text-[#A0A0A0] text-sm flex items-start gap-1.5"><span className="text-[#E8900A] mt-0.5">›</span>{ex}</p>
                  ))}
                </div>
              </div>
              <a href={cat.ebayUrl} target="_blank" rel="noopener noreferrer" className="btn-orange">🛒 Browse {cat.title} on eBay</a>
            </div>
          </section>
        ))}
      </div>

      <section className="py-16 px-4 text-center" style={{ background: "#1C1C1C", borderTop: "3px solid #E8900A" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl text-white mb-4" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>Don&apos;t See What You Need?</h2>
          <p className="text-[#A0A0A0] mb-8">We source new inventory constantly. Call Bryan directly — we may have it before it&apos;s listed.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:6083710746" className="btn-orange text-xl">📞 Call 608-371-0746</a>
            <a href="mailto:arfsten18@gmail.com" className="btn-ghost">✉️ Email Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
