import type { Metadata } from "next";

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
    Illustration: HeavyEquipmentIllustration,
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
    Illustration: HydraulicsIllustration,
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
    Illustration: ElectricalIllustration,
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
    Illustration: CncIllustration,
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
    Illustration: HardwareIllustration,
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
    Illustration: SurplusIllustration,
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
            {/* Illustration */}
            <div
              className={`relative rounded-lg overflow-hidden flex items-center justify-center ${i % 2 === 1 ? "lg:order-2" : ""}`}
              style={{
                border: "2px solid #333",
                boxShadow: "0 0 30px rgba(232,144,10,0.08), 0 20px 50px rgba(0,0,0,0.6)",
                minHeight: "260px",
                background: "#1C1C1C",
              }}
            >
              <cat.Illustration />
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

// ─── Category Illustrations ───────────────────────────────────────────────────

function HeavyEquipmentIllustration() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-6" aria-hidden="true">
      {/* Ground */}
      <rect x="0" y="210" width="400" height="50" fill="#161616" />
      <line x1="0" y1="210" x2="400" y2="210" stroke="#333" strokeWidth="2" />
      {/* Excavator body */}
      <rect x="80" y="160" width="140" height="50" rx="4" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
      {/* Cab */}
      <rect x="170" y="130" width="60" height="35" rx="3" fill="#222" stroke="#444" strokeWidth="1.5" />
      <rect x="178" y="136" width="22" height="14" rx="1" fill="#1a3a4a" stroke="#E8900A" strokeWidth="0.5" />
      {/* Tracks */}
      <rect x="70" y="200" width="160" height="18" rx="9" fill="#333" stroke="#555" strokeWidth="1.5" />
      <circle cx="90" cy="209" r="8" fill="#444" stroke="#666" strokeWidth="1" />
      <circle cx="210" cy="209" r="8" fill="#444" stroke="#666" strokeWidth="1" />
      {/* Arm */}
      <line x1="175" y1="140" x2="270" y2="90" stroke="#E8900A" strokeWidth="8" strokeLinecap="round" />
      <line x1="270" y1="90" x2="310" y2="130" stroke="#C8700A" strokeWidth="7" strokeLinecap="round" />
      {/* Bucket */}
      <path d="M305 128 L335 120 L340 148 L305 150 Z" fill="#333" stroke="#E8900A" strokeWidth="1.5" />
      <line x1="310" y1="148" x2="315" y2="160" stroke="#555" strokeWidth="2" />
      <line x1="320" y1="148" x2="325" y2="160" stroke="#555" strokeWidth="2" />
      <line x1="330" y1="147" x2="335" y2="159" stroke="#555" strokeWidth="2" />
      {/* Orange accent dots */}
      <circle cx="340" cy="50" r="3" fill="#E8900A" opacity="0.4" />
      <circle cx="50" cy="80" r="2" fill="#E8900A" opacity="0.3" />
      <circle cx="360" cy="180" r="2" fill="#E8900A" opacity="0.3" />
    </svg>
  );
}

function HydraulicsIllustration() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-6" aria-hidden="true">
      {/* Main cylinder body */}
      <rect x="60" y="90" width="200" height="80" rx="6" fill="#2A2A2A" stroke="#444" strokeWidth="2" />
      {/* Cylinder end caps */}
      <rect x="50" y="85" width="20" height="90" rx="4" fill="#333" stroke="#555" strokeWidth="1.5" />
      <rect x="260" y="85" width="20" height="90" rx="4" fill="#333" stroke="#555" strokeWidth="1.5" />
      {/* Piston rod extending */}
      <rect x="280" y="118" width="80" height="24" rx="3" fill="#444" stroke="#666" strokeWidth="1.5" />
      <rect x="355" y="112" width="18" height="36" rx="4" fill="#333" stroke="#555" strokeWidth="1.5" />
      {/* Hydraulic lines */}
      <path d="M80 85 Q80 50 120 50 L200 50 Q240 50 240 85" fill="none" stroke="#E8900A" strokeWidth="3" strokeDasharray="6,3" />
      <circle cx="120" cy="50" r="5" fill="#E8900A" />
      <circle cx="200" cy="50" r="5" fill="#E8900A" />
      {/* Pressure gauge */}
      <circle cx="155" cy="130" r="18" fill="#1C1C1C" stroke="#555" strokeWidth="1.5" />
      <circle cx="155" cy="130" r="13" fill="#161616" stroke="#444" strokeWidth="1" />
      <line x1="155" y1="130" x2="163" y2="122" stroke="#E8900A" strokeWidth="2" strokeLinecap="round" />
      {/* Mounting brackets */}
      <rect x="90" y="165" width="12" height="20" rx="2" fill="#333" stroke="#555" strokeWidth="1" />
      <rect x="220" y="165" width="12" height="20" rx="2" fill="#333" stroke="#555" strokeWidth="1" />
      {/* Labels */}
      <text x="155" y="220" textAnchor="middle" fill="#666" fontSize="11" fontFamily="sans-serif">HYDRAULIC CYLINDER</text>
    </svg>
  );
}

function ElectricalIllustration() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-6" aria-hidden="true">
      {/* Control panel box */}
      <rect x="60" y="40" width="280" height="180" rx="6" fill="#1C1C1C" stroke="#444" strokeWidth="2" />
      <rect x="70" y="50" width="260" height="160" rx="4" fill="#161616" stroke="#333" strokeWidth="1" />
      {/* Circuit breakers row */}
      {[0,1,2,3,4,5].map(i => (
        <g key={i}>
          <rect x={85 + i*42} y="65" width="28" height="50" rx="3" fill="#222" stroke="#444" strokeWidth="1" />
          <rect x={91 + i*42} y="70" width="16" height="30" rx="2" fill={i === 2 ? "#E8900A" : "#2A2A2A"} stroke="#555" strokeWidth="1" />
          <circle cx={99 + i*42} cy="107" r="4" fill={i === 2 ? "#F5A623" : "#333"} />
        </g>
      ))}
      {/* PLC module */}
      <rect x="85" y="130" width="110" height="60" rx="3" fill="#1a2a1a" stroke="#2a4a2a" strokeWidth="1.5" />
      <text x="140" y="148" textAnchor="middle" fill="#4CAF50" fontSize="8" fontFamily="monospace">PLC MODULE</text>
      {[0,1,2,3,4,5,6,7].map(i => (
        <circle key={i} cx={95 + i*13} cy="170" r="3" fill={i % 3 === 0 ? "#4CAF50" : "#333"} />
      ))}
      {/* VFD */}
      <rect x="210" y="130" width="100" height="60" rx="3" fill="#1a1a2a" stroke="#2a2a4a" strokeWidth="1.5" />
      <text x="260" y="148" textAnchor="middle" fill="#E8900A" fontSize="8" fontFamily="monospace">VFD DRIVE</text>
      <rect x="220" y="155" width="80" height="20" rx="2" fill="#111" stroke="#333" strokeWidth="1" />
      <line x1="230" y1="165" x2="230" y2="158" stroke="#E8900A" strokeWidth="1.5" />
      <line x1="242" y1="165" x2="242" y2="160" stroke="#E8900A" strokeWidth="1.5" />
      <line x1="254" y1="165" x2="254" y2="156" stroke="#E8900A" strokeWidth="1.5" />
      <line x1="266" y1="165" x2="266" y2="159" stroke="#E8900A" strokeWidth="1.5" />
      <line x1="278" y1="165" x2="278" y2="162" stroke="#E8900A" strokeWidth="1.5" />
      <line x1="290" y1="165" x2="290" y2="157" stroke="#E8900A" strokeWidth="1.5" />
    </svg>
  );
}

function CncIllustration() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-6" aria-hidden="true">
      {/* Machine bed */}
      <rect x="40" y="180" width="320" height="20" rx="3" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
      {/* Column */}
      <rect x="280" y="60" width="40" height="130" rx="3" fill="#222" stroke="#444" strokeWidth="1.5" />
      {/* Spindle head */}
      <rect x="230" y="80" width="100" height="50" rx="4" fill="#2A2A2A" stroke="#555" strokeWidth="1.5" />
      {/* Spindle */}
      <rect x="273" y="130" width="14" height="35" rx="2" fill="#444" stroke="#666" strokeWidth="1" />
      {/* End mill */}
      <rect x="276" y="165" width="8" height="25" rx="1" fill="#888" stroke="#aaa" strokeWidth="1" />
      <path d="M276 190 L272 200 M280 190 L276 200 M284 190 L280 200" stroke="#aaa" strokeWidth="1.5" />
      {/* Work table */}
      <rect x="60" y="155" width="200" height="25" rx="2" fill="#1C1C1C" stroke="#444" strokeWidth="1.5" />
      {/* T-slots */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={75 + i*45} y="160" width="8" height="15" rx="1" fill="#111" stroke="#333" strokeWidth="1" />
      ))}
      {/* Workpiece */}
      <rect x="120" y="138" width="80" height="20" rx="2" fill="#333" stroke="#E8900A" strokeWidth="1.5" />
      {/* Chip marks */}
      <path d="M140 138 L145 130 M160 138 L165 130 M180 138 L185 130" stroke="#E8900A" strokeWidth="1.5" strokeOpacity="0.6" />
      {/* Axis labels */}
      <text x="55" y="175" fill="#555" fontSize="9" fontFamily="monospace">X</text>
      <text x="290" y="75" fill="#555" fontSize="9" fontFamily="monospace">Z</text>
      {/* DRO display */}
      <rect x="50" y="65" width="120" height="70" rx="3" fill="#0a0a0a" stroke="#333" strokeWidth="1.5" />
      <text x="60" y="85" fill="#4CAF50" fontSize="9" fontFamily="monospace">X: -12.450</text>
      <text x="60" y="100" fill="#4CAF50" fontSize="9" fontFamily="monospace">Y:  +8.720</text>
      <text x="60" y="115" fill="#4CAF50" fontSize="9" fontFamily="monospace">Z:  -3.100</text>
      <text x="60" y="128" fill="#E8900A" fontSize="8" fontFamily="monospace">RPM: 2400</text>
    </svg>
  );
}

function HardwareIllustration() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-6" aria-hidden="true">
      {/* Storage bins */}
      {[0,1,2].map(row => (
        [0,1,2,3].map(col => (
          <g key={`${row}-${col}`}>
            <rect x={40 + col*85} y={40 + row*65} width="72" height="52" rx="3"
              fill="#1C1C1C" stroke="#333" strokeWidth="1.5" />
            <rect x={44 + col*85} y={44 + row*65} width="64" height="8" rx="1"
              fill={row===0 ? "#E8900A" : row===1 ? "#C8700A" : "#555"} opacity="0.7" />
            {/* Bolts inside bin */}
            {[0,1,2].map(b => (
              <g key={b}>
                <line x1={52 + col*85 + b*20} y1={56 + row*65} x2={52 + col*85 + b*20} y2={82 + row*65}
                  stroke="#666" strokeWidth="3" strokeLinecap="round" />
                <circle cx={52 + col*85 + b*20} cy={56 + row*65} r="4"
                  fill="#444" stroke="#666" strokeWidth="1" />
              </g>
            ))}
          </g>
        ))
      ))}
      {/* Large bolt in foreground */}
      <g transform="translate(310 60)">
        <rect x="0" y="0" width="24" height="8" rx="2" fill="#555" stroke="#777" strokeWidth="1" />
        <rect x="8" y="8" width="8" height="40" fill="#666" stroke="#888" strokeWidth="1" />
        <path d="M8 48 L4 60 M12 48 L12 60 M16 48 L20 60" stroke="#777" strokeWidth="2" />
      </g>
      {/* Hex nut */}
      <polygon points="340,140 352,133 364,140 364,154 352,161 340,154" fill="#444" stroke="#E8900A" strokeWidth="1.5" />
      <circle cx="352" cy="147" r="6" fill="#111" stroke="#666" strokeWidth="1" />
    </svg>
  );
}

function SurplusIllustration() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-6" aria-hidden="true">
      {/* Warehouse shelf */}
      <rect x="30" y="50" width="12" height="180" fill="#222" stroke="#333" strokeWidth="1" />
      <rect x="358" y="50" width="12" height="180" fill="#222" stroke="#333" strokeWidth="1" />
      {[0,1,2].map(i => (
        <rect key={i} x="30" y={70 + i*55} width="340" height="6" fill="#2A2A2A" stroke="#333" strokeWidth="1" />
      ))}
      {/* Motor on shelf 1 */}
      <rect x="50" y="42" width="55" height="32" rx="4" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
      <circle cx="77" cy="58" r="10" fill="#1C1C1C" stroke="#E8900A" strokeWidth="1.5" />
      <circle cx="77" cy="58" r="4" fill="#333" />
      <rect x="100" y="50" width="10" height="8" fill="#444" stroke="#555" strokeWidth="1" />
      {/* Bearing on shelf 1 */}
      <circle cx="165" cy="57" r="18" fill="#222" stroke="#444" strokeWidth="1.5" />
      <circle cx="165" cy="57" r="11" fill="#1C1C1C" stroke="#555" strokeWidth="1" />
      <circle cx="165" cy="57" r="5" fill="#111" stroke="#E8900A" strokeWidth="1" />
      {/* Pneumatic cylinder shelf 2 */}
      <rect x="50" y="95" width="90" height="28" rx="5" fill="#2A2A2A" stroke="#444" strokeWidth="1.5" />
      <rect x="135" y="100" width="35" height="18" rx="2" fill="#333" stroke="#555" strokeWidth="1" />
      <circle cx="60" cy="109" r="6" fill="#1C1C1C" stroke="#E8900A" strokeWidth="1" />
      {/* Boxes on shelf 2 */}
      <rect x="200" y="90" width="40" height="35" rx="2" fill="#2a2216" stroke="#554422" strokeWidth="1.5" />
      <line x1="200" y1="107" x2="240" y2="107" stroke="#554422" strokeWidth="1" />
      <line x1="220" y1="90" x2="220" y2="125" stroke="#554422" strokeWidth="1" />
      <rect x="248" y="90" width="40" height="35" rx="2" fill="#2a2216" stroke="#554422" strokeWidth="1.5" />
      {/* Chain on shelf 3 */}
      {[0,1,2,3,4,5,6].map(i => (
        <g key={i}>
          <ellipse cx={55 + i*18} cy={162} rx="7" ry="5" fill="none" stroke="#666" strokeWidth="2" />
          <ellipse cx={64 + i*18} cy={162} rx="5" ry="7" fill="none" stroke="#666" strokeWidth="2" />
        </g>
      ))}
      {/* Orange accent tag */}
      <rect x="320" y="88" width="30" height="14" rx="2" fill="#E8900A" />
      <text x="335" y="99" textAnchor="middle" fill="#111" fontSize="7" fontFamily="sans-serif" fontWeight="bold">SURPLUS</text>
    </svg>
  );
}
