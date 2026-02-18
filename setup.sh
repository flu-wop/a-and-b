#!/bin/bash

# ============================================================
# A&B Supply & Surplus — Auto Setup Script
# Run this from inside your ab-supply-surplus project folder
# ============================================================

echo ""
echo "🔧 A&B Supply & Surplus — Setting up your website..."
echo ""

# Create all directories
mkdir -p app/about app/inventory app/contact components public

# ============================================================
# tailwind.config.ts
# ============================================================
cat > tailwind.config.ts << 'ENDOFFILE'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#E8900A",
          "orange-bright": "#F5A623",
          "orange-dark": "#B5700A",
          gold: "#C8960C",
          "metal-light": "#B8B8B8",
          "metal-mid": "#888888",
          "metal-dark": "#444444",
          "bg-deep": "#111111",
          "bg-dark": "#1A1A1A",
          "bg-card": "#222222",
          "bg-raised": "#2A2A2A",
          charcoal: "#1C1C1C",
          "rivet-gray": "#3A3A3A",
          "text-primary": "#E8E8E8",
          "text-muted": "#A0A0A0",
        }
      },
      fontFamily: {
        display: ["'Bebas Neue'", "Impact", "sans-serif"],
        heading: ["'Black Han Sans'", "'Anton'", "sans-serif"],
        body: ["'Barlow'", "'Barlow Condensed'", "sans-serif"],
      },
      boxShadow: {
        "orange-glow": "0 0 20px rgba(232,144,10,0.4), 0 0 60px rgba(232,144,10,0.15)",
        "card-lift": "0 4px 24px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05)",
      },
      animation: {
        "pulse-orange": "pulse-orange 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-orange": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(232,144,10,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(245,166,35,0.7)" },
        },
      }
    },
  },
  plugins: [],
};
export default config;
ENDOFFILE
echo "✅ tailwind.config.ts"

# ============================================================
# postcss.config.mjs
# ============================================================
cat > postcss.config.mjs << 'ENDOFFILE'
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
export default config;
ENDOFFILE
echo "✅ postcss.config.mjs"

# ============================================================
# next.config.ts
# ============================================================
cat > next.config.ts << 'ENDOFFILE'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ebayimg.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
};

export default nextConfig;
ENDOFFILE
echo "✅ next.config.ts"

# ============================================================
# app/globals.css
# ============================================================
cat > app/globals.css << 'ENDOFFILE'
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@400;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --orange: #E8900A;
  --orange-bright: #F5A623;
  --orange-dark: #B5700A;
  --gold: #C8960C;
  --metal-light: #B8B8B8;
  --bg-deep: #111111;
  --bg-dark: #1A1A1A;
  --bg-card: #222222;
  --bg-raised: #2A2A2A;
  --text-primary: #E8E8E8;
  --text-muted: #A0A0A0;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  background-color: #111111;
  color: #E8E8E8;
  font-family: 'Barlow', sans-serif;
  -webkit-font-smoothing: antialiased;
}

.font-display {
  font-family: 'Bebas Neue', Impact, sans-serif;
  letter-spacing: 0.04em;
}

.metal-plate {
  background: linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 30%, #333333 60%, #1C1C1C 100%);
  position: relative;
}

.metal-plate::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg, transparent, transparent 2px,
    rgba(255,255,255,0.015) 2px,
    rgba(255,255,255,0.015) 4px
  );
  pointer-events: none;
}

.btn-orange {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #E8900A 0%, #F5A623 50%, #B5700A 100%);
  color: #111111;
  font-family: 'Bebas Neue', Impact, sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.08em;
  padding: 0.85rem 2.5rem;
  border-radius: 4px;
  border: 1px solid #F5A623;
  box-shadow: 0 0 20px rgba(232,144,10,0.4), 0 4px 12px rgba(0,0,0,0.5);
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.btn-orange::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
  transition: left 0.4s ease;
}

.btn-orange:hover::before { left: 100%; }
.btn-orange:hover {
  box-shadow: 0 0 40px rgba(245,166,35,0.7), 0 6px 20px rgba(0,0,0,0.6);
  transform: translateY(-2px);
}
.btn-orange:active { transform: translateY(0); }
.btn-orange:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: #F5A623;
  font-family: 'Bebas Neue', Impact, sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  border: 2px solid #E8900A;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  background: rgba(232,144,10,0.15);
  box-shadow: 0 0 20px rgba(232,144,10,0.3);
  color: #FFB830;
}

.category-card {
  background: #222222;
  border: 1px solid #333333;
  border-top: 3px solid #E8900A;
  border-radius: 6px;
  padding: 1.5rem;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg, transparent, transparent 2px,
    rgba(255,255,255,0.01) 2px,
    rgba(255,255,255,0.01) 4px
  );
}

.category-card:hover {
  border-color: #F5A623;
  box-shadow: 0 0 20px rgba(232,144,10,0.2), 0 8px 32px rgba(0,0,0,0.5);
  transform: translateY(-3px);
}

.nav-link {
  color: #A0A0A0;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.4rem 0.1rem;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #F5A623;
  border-bottom-color: #E8900A;
}

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #1A1A1A; }
::-webkit-scrollbar-thumb { background: #3A3A3A; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #B5700A; }
::selection { background: rgba(232,144,10,0.35); color: #fff; }
*:focus-visible { outline: 2px solid #E8900A; outline-offset: 3px; }
ENDOFFILE
echo "✅ app/globals.css"

# ============================================================
# app/layout.tsx
# ============================================================
cat > app/layout.tsx << 'ENDOFFILE'
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "A&B Supply & Surplus | Industrial Surplus & Heavy Equipment Parts",
    template: "%s | A&B Supply & Surplus",
  },
  description:
    "Quality industrial surplus, heavy equipment parts & attachments, hydraulics, electrical, CNC/metalworking and more. Family-owned and operated. Shop our eBay store.",
  keywords: [
    "industrial surplus",
    "heavy equipment parts",
    "hydraulics surplus",
    "CNC metalworking parts",
    "electrical surplus",
    "A&B Supply Surplus",
    "Bryan Arfsten",
    "eBay industrial parts",
  ],
  openGraph: {
    title: "A&B Supply & Surplus",
    description: "Industrial Surplus & Heavy Equipment Parts – Family-Owned & Trusted",
    url: "https://www.absupplysurplus.com",
    siteName: "A&B Supply & Surplus",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "A&B Supply & Surplus" }],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://www.absupplysurplus.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
ENDOFFILE
echo "✅ app/layout.tsx"

# ============================================================
# app/page.tsx
# ============================================================
cat > app/page.tsx << 'ENDOFFILE'
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A&B Supply & Surplus | Industrial Surplus & Heavy Equipment Parts",
  description: "Family-owned industrial surplus dealer. Heavy equipment parts, hydraulics, electrical, CNC/metalworking and more. Shop our eBay store.",
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
  { number: "1,000+", label: "eBay Listings" },
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
          <Image src="/warehouse-hero.jpg" alt="A&B Supply & Surplus Warehouse" fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0.5) 40%, rgba(17,17,17,0.88) 100%)" }} />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(135deg, #E8900A 0px, #E8900A 1px, transparent 1px, transparent 60px)" }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          <div className="flex justify-center mb-8">
            <div className="relative w-[300px] h-[180px] sm:w-[420px] sm:h-[240px] drop-shadow-[0_8px_40px_rgba(0,0,0,0.9)]">
              <Image src="/logo-hero.png" alt="A&B Supply & Surplus" fill priority className="object-contain" sizes="(max-width: 640px) 300px, 420px" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>
            Industrial Surplus &amp; <span style={{ color: "#F5A623" }}>Heavy Equipment Parts</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#D0D0D0] mb-3 font-semibold tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Quality Recycled &amp; New — Thousands of Listings on eBay
          </p>
          <p className="text-[#A0A0A0] text-base mb-10 max-w-xl mx-auto">
            Family-owned and operated. We source, test, and ship quality surplus parts for construction, manufacturing, agriculture, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://www.ebay.com/str/atob" target="_blank" rel="noopener noreferrer" className="btn-orange text-xl">🛒 Shop Full Inventory on eBay</a>
            <Link href="/inventory" className="btn-ghost">Browse Categories →</Link>
          </div>

          <p className="mt-6 text-[#A0A0A0] text-sm">
            Have a question?{" "}
            <a href="tel:6083710746" className="font-bold tracking-wide hover:text-[#F5A623] transition-colors" style={{ color: "#E8E8E8" }}>
              Call Bryan: 608-371-0746
            </a>
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60">
          <span className="text-xs text-[#888] tracking-widest uppercase">Scroll</span>
          <div className="w-0.5 h-10 animate-bounce" style={{ background: "linear-gradient(to bottom, #E8900A, transparent)" }} />
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: "linear-gradient(90deg, #1C1C1C 0%, #2A2A2A 50%, #1C1C1C 100%)", borderTop: "3px solid #E8900A", borderBottom: "1px solid #333" }}>
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-3xl font-black leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#F5A623" }}>{item.number}</span>
                <span className="text-xs text-[#A0A0A0] tracking-widest uppercase mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#E8900A] text-sm tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>What We Carry</p>
          <h2 className="text-4xl sm:text-5xl text-white" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>Browse Our Inventory</h2>
          <div className="w-20 h-1 mx-auto mt-4" style={{ background: "linear-gradient(90deg, #E8900A, #C8960C, transparent)" }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <a key={cat.title} href={cat.ebayUrl} target="_blank" rel="noopener noreferrer" className="category-card group cursor-pointer">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{cat.icon}</span>
                <div className="flex-1">
                  <h3 className="text-[#E8E8E8] font-bold text-base mb-2 group-hover:text-[#F5A623] transition-colors" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{cat.title}</h3>
                  <p className="text-[#888] text-sm leading-relaxed">{cat.desc}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[#E8900A] text-xs font-semibold tracking-wider uppercase">
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
              <div className="relative rounded-lg overflow-hidden" style={{ border: "2px solid #333", boxShadow: "0 0 40px rgba(232,144,10,0.15), 0 20px 60px rgba(0,0,0,0.7)" }}>
                <Image src="/family-cartoon.png" alt="Bryan Arfsten and family" width={600} height={400} className="w-full h-auto object-cover" />
                <div className="absolute top-0 left-0 w-16 h-1" style={{ background: "#E8900A" }} />
                <div className="absolute top-0 left-0 w-1 h-16" style={{ background: "#E8900A" }} />
                <div className="absolute bottom-0 right-0 w-16 h-1" style={{ background: "#E8900A" }} />
                <div className="absolute bottom-0 right-0 w-1 h-16" style={{ background: "#E8900A" }} />
              </div>
            </div>

            <div>
              <p className="text-[#E8900A] text-sm tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>Family-Owned &amp; Operated</p>
              <h2 className="text-4xl sm:text-5xl text-white mb-6 leading-tight" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>
                The Real People<br /><span style={{ color: "#F5A623" }}>Behind the Parts</span>
              </h2>
              <div className="flex flex-col gap-4 text-[#A0A0A0] text-sm leading-relaxed">
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
              <p className="text-[#A0A0A0] text-sm">Don&apos;t see it listed? Reach out — we source parts regularly and may have what you need.</p>
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
ENDOFFILE
echo "✅ app/page.tsx"

# ============================================================
# app/about/page.tsx
# ============================================================
cat > app/about/page.tsx << 'ENDOFFILE'
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet Bryan Arfsten and the family behind A&B Supply & Surplus.",
};

const VALUES = [
  { icon: "🔍", title: "Personally Inspected", desc: "Every item is hands-on inspected before listing. No surprises on delivery." },
  { icon: "📦", title: "Fast Shipping", desc: "We ship quickly because we know downtime costs money. Most orders out next day." },
  { icon: "💬", title: "Straight Shooters", desc: "We describe condition honestly — good and bad. Photos show exactly what you get." },
  { icon: "🔄", title: "Hassle-Free Returns", desc: "If something's not right, we make it right. Period." },
  { icon: "🇺🇸", title: "American-Owned", desc: "Family-owned, Wisconsin-based. Supporting American industry one part at a time." },
  { icon: "⚙️", title: "Industry Knowledge", desc: "We know our inventory. Have a technical question? Call Bryan directly." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 px-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #111111 0%, #1A1A1A 50%, #111111 100%)", borderBottom: "3px solid #E8900A" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(135deg, #E8900A 0px, #E8900A 1px, transparent 1px, transparent 60px)" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[#E8900A] text-sm tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>Our Story</p>
          <h1 className="text-5xl sm:text-6xl text-white mb-6" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>About A&amp;B Supply &amp; Surplus</h1>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">A Wisconsin family business with a warehouse full of quality industrial parts and the work ethic to back it up.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-lg overflow-hidden" style={{ border: "2px solid #333", boxShadow: "0 0 60px rgba(232,144,10,0.2), 0 30px 80px rgba(0,0,0,0.8)" }}>
                <Image src="/family-cartoon.png" alt="Bryan Arfsten family" width={700} height={500} className="w-full h-auto" priority />
                <div className="absolute top-0 left-0"><div className="w-12 h-1" style={{ background: "#E8900A" }} /><div className="w-1 h-12" style={{ background: "#E8900A" }} /></div>
                <div className="absolute bottom-0 right-0"><div className="w-12 h-1" style={{ background: "#E8900A" }} /><div className="w-1 h-12" style={{ background: "#E8900A" }} /></div>
              </div>
              <div className="mt-4 p-3 rounded text-center text-sm" style={{ background: "#1C1C1C", border: "1px solid #333", color: "#888", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}>
                Bryan, the family, and one very good dog 🐕 — Wisconsin
              </div>
            </div>

            <div className="order-1 lg:order-2 flex flex-col gap-6">
              <div>
                <p className="text-[#E8900A] text-sm tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>Meet the Owner</p>
                <h2 className="text-4xl sm:text-5xl text-white mb-4" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>
                  Hi, I&apos;m <span style={{ color: "#F5A623" }}>Bryan Arfsten</span>
                </h2>
              </div>
              <div className="flex flex-col gap-4 text-[#A0A0A0] leading-relaxed">
                <p>A&amp;B Supply &amp; Surplus started from a simple belief: quality industrial parts shouldn&apos;t be hard to find or overpriced. I&apos;ve spent years in and around heavy equipment and manufacturing, and I know firsthand the headache of hunting down a specific part when a machine is down.</p>
                <p>What started as a side operation has grown into a full warehouse operation with thousands of listings on eBay. We source surplus from machine shops, equipment auctions, construction companies, and more.</p>
                <p>This is a family business. You get real answers from real people who stand behind every sale. If you have a question, call me directly.</p>
              </div>
              <div className="p-5 rounded-lg" style={{ background: "#1C1C1C", border: "1px solid #333", borderLeft: "4px solid #E8900A" }}>
                <p className="text-white font-bold text-lg mb-1">Bryan Arfsten</p>
                <p className="text-[#E8900A] text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Owner &amp; Operator</p>
                <a href="tel:6083710746" className="flex items-center gap-2 text-[#E8E8E8] hover:text-[#F5A623] transition-colors text-sm mb-2">📞 <span className="font-semibold tracking-wide">608-371-0746</span></a>
                <a href="mailto:arfsten18@gmail.com" className="flex items-center gap-2 text-[#E8E8E8] hover:text-[#F5A623] transition-colors text-sm">✉️ arfsten18@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4" style={{ background: "#161616", borderTop: "1px solid #2A2A2A", borderBottom: "1px solid #2A2A2A" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#E8900A] text-sm tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>Our Operation</p>
            <h2 className="text-4xl sm:text-5xl text-white" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>Inside Our Warehouse</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-lg overflow-hidden" style={{ border: "2px solid #333", minHeight: "260px", background: "#1C1C1C" }}>
              <Image src="/warehouse-hero.jpg" alt="A&B Supply & Surplus warehouse" width={700} height={400} className="w-full h-64 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: "rgba(17,17,17,0.9)" }}>
                <p className="text-[#E8E8E8] text-sm font-semibold">Thousands of parts ready to ship</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden" style={{ border: "2px solid #333", minHeight: "260px", background: "#1C1C1C" }}>
              <Image src="/logo-banner.png" alt="A&B Supply & Surplus banner" width={700} height={400} className="w-full h-64 object-cover object-center" />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: "rgba(17,17,17,0.9)" }}>
                <p className="text-[#E8E8E8] text-sm font-semibold">Industrial surplus specialists</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl text-white" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>Why Buyers Trust Us</h2>
            <div className="w-20 h-1 mx-auto mt-4" style={{ background: "linear-gradient(90deg, #E8900A, #C8960C, transparent)" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((val) => (
              <div key={val.title} className="category-card">
                <span className="text-3xl mb-3 block">{val.icon}</span>
                <h3 className="text-[#E8E8E8] font-bold text-base mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{val.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center" style={{ background: "#1C1C1C", borderTop: "3px solid #E8900A" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl text-white mb-4" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>Ready to Find Your Part?</h2>
          <p className="text-[#A0A0A0] mb-8">Browse our full inventory on eBay or reach out directly.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.ebay.com/str/atob" target="_blank" rel="noopener noreferrer" className="btn-orange text-xl">🛒 Shop on eBay</a>
            <Link href="/contact" className="btn-ghost">Contact Bryan →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
ENDOFFILE
echo "✅ app/about/page.tsx"

# ============================================================
# app/inventory/page.tsx
# ============================================================
cat > app/inventory/page.tsx << 'ENDOFFILE'
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
ENDOFFILE
echo "✅ app/inventory/page.tsx"

# ============================================================
# app/contact/page.tsx
# ============================================================
cat > app/contact/page.tsx << 'ENDOFFILE'
"use client";

import { useState } from "react";
import Link from "next/link";

// 👇 Replace YOUR_FORMSPREE_ID with your ID from formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORMSPREE_ID";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: formData, headers: { Accept: "application/json" } });
      if (res.ok) { setStatus("success"); (e.target as HTMLFormElement).reset(); }
      else { const data = await res.json(); setErrorMsg(data?.errors?.[0]?.message || "Submission failed."); setStatus("error"); }
    } catch { setErrorMsg("Network error. Please call or email directly."); setStatus("error"); }
  }

  return (
    <>
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #111111 0%, #1A1A1A 50%, #111111 100%)", borderBottom: "3px solid #E8900A" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(135deg, #E8900A 0px, #E8900A 1px, transparent 1px, transparent 60px)" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-[#E8900A] text-sm tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>Get in Touch</p>
          <h1 className="text-5xl sm:text-6xl text-white mb-4" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.05em" }}>Contact Us</h1>
          <p className="text-[#A0A0A0] text-lg">Have a question about a part, need a bulk quote, or want to know if we carry something? We respond fast.</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          <aside className="lg:col-span-2 flex flex-col gap-6">
            <div className="p-6 rounded-lg" style={{ background: "#1C1C1C", border: "1px solid #333", borderTop: "3px solid #E8900A" }}>
              <h2 className="text-2xl text-white mb-4" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.06em" }}>Direct Line to Bryan</h2>
              <div className="flex flex-col gap-4">
                <a href="tel:6083710746" className="flex items-center gap-3 group">
                  <span className="w-10 h-10 rounded flex items-center justify-center text-lg shrink-0" style={{ background: "#2A2A2A", border: "1px solid #3A3A3A" }}>📞</span>
                  <div><p className="text-xs text-[#888] uppercase tracking-wider">Cell Phone</p><p className="text-[#E8E8E8] font-bold text-lg tracking-wider group-hover:text-[#F5A623] transition-colors">608-371-0746</p></div>
                </a>
                <a href="mailto:arfsten18@gmail.com" className="flex items-center gap-3 group">
                  <span className="w-10 h-10 rounded flex items-center justify-center text-lg shrink-0" style={{ background: "#2A2A2A", border: "1px solid #3A3A3A" }}>✉️</span>
                  <div><p className="text-xs text-[#888] uppercase tracking-wider">Email</p><p className="text-[#E8E8E8] text-sm group-hover:text-[#F5A623] transition-colors break-all">arfsten18@gmail.com</p></div>
                </a>
                <a href="https://www.ebay.com/str/atob" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <span className="w-10 h-10 rounded flex items-center justify-center text-lg shrink-0" style={{ background: "#2A2A2A", border: "1px solid #3A3A3A" }}>🛒</span>
                  <div><p className="text-xs text-[#888] uppercase tracking-wider">eBay Store</p><p className="text-[#E8900A] text-sm group-hover:text-[#F5A623] transition-colors">ebay.com/str/atob →</p></div>
                </a>
              </div>
            </div>
            <div className="p-5 rounded-lg text-sm" style={{ background: "#161616", border: "1px solid #2A2A2A" }}>
              <p className="text-[#E8900A] font-semibold mb-2 tracking-wide uppercase text-xs" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>⏱ Response Times</p>
              <ul className="flex flex-col gap-2 text-[#A0A0A0]">
                <li>📞 <strong className="text-[#E8E8E8]">Phone:</strong> Same-day</li>
                <li>✉️ <strong className="text-[#E8E8E8]">Email:</strong> Within a few hours</li>
                <li>💬 <strong className="text-[#E8E8E8]">Form:</strong> Within 24 hours</li>
              </ul>
            </div>
            <a href="https://www.ebay.com/str/atob" target="_blank" rel="noopener noreferrer" className="btn-orange justify-center text-center">🛒 Shop Our eBay Store</a>
          </aside>

          <div className="lg:col-span-3">
            <div className="p-8 rounded-lg" style={{ background: "#1C1C1C", border: "1px solid #333", borderTop: "3px solid #E8900A" }}>
              <h2 className="text-2xl text-white mb-6" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.06em" }}>Send a Message</h2>
              {status === "success" ? (
                <div className="p-6 rounded-lg text-center" style={{ background: "rgba(232,144,10,0.1)", border: "2px solid #E8900A" }}>
                  <p className="text-4xl mb-3">✅</p>
                  <p className="text-[#F5A623] text-xl font-bold mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}>Message Received!</p>
                  <p className="text-[#A0A0A0] text-sm">Bryan will get back to you soon. For urgent inquiries, call <a href="tel:6083710746" className="text-white font-bold">608-371-0746</a>.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Your Name *</label>
                      <input type="text" name="name" required placeholder="John Smith" className="w-full rounded px-4 py-3 text-sm text-[#E8E8E8] placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#E8900A]" style={{ background: "#111", border: "1px solid #333" }} />
                    </div>
                    <div>
                      <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Email *</label>
                      <input type="email" name="email" required placeholder="you@example.com" className="w-full rounded px-4 py-3 text-sm text-[#E8E8E8] placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#E8900A]" style={{ background: "#111", border: "1px solid #333" }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Phone (optional)</label>
                    <input type="tel" name="phone" placeholder="555-123-4567" className="w-full rounded px-4 py-3 text-sm text-[#E8E8E8] placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#E8900A]" style={{ background: "#111", border: "1px solid #333" }} />
                  </div>
                  <div>
                    <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">What are you looking for? *</label>
                    <input type="text" name="subject" required placeholder="e.g. Excavator bucket pins, hydraulic valve..." className="w-full rounded px-4 py-3 text-sm text-[#E8E8E8] placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#E8900A]" style={{ background: "#111", border: "1px solid #333" }} />
                  </div>
                  <div>
                    <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Message *</label>
                    <textarea name="message" required rows={5} placeholder="Describe the part, quantity needed, make/model of machine, any part numbers you have..." className="w-full rounded px-4 py-3 text-sm text-[#E8E8E8] placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#E8900A] resize-y" style={{ background: "#111", border: "1px solid #333" }} />
                  </div>
                  {status === "error" && <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded px-4 py-3">⚠️ {errorMsg}</p>}
                  <button type="submit" disabled={status === "loading"} className="btn-orange justify-center text-xl">
                    {status === "loading" ? "Sending…" : "📨 Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
ENDOFFILE
echo "✅ app/contact/page.tsx"

# ============================================================
# components/Navbar.tsx
# ============================================================
cat > components/Navbar.tsx << 'ENDOFFILE'
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#111111]/97 backdrop-blur-md border-b border-[#333] shadow-[0_4px_30px_rgba(0,0,0,0.8)]" : "bg-gradient-to-b from-[#111111]/90 to-transparent border-b border-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <Image src="/logo-icon.png" alt="A&B Supply & Surplus" fill className="object-contain" sizes="40px" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl text-white group-hover:text-[#F5A623] transition-colors" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.1em" }}>A&amp;B Supply</span>
              <span className="text-[10px] tracking-[0.2em] text-[#E8900A] uppercase font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>&amp; Surplus</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="https://www.ebay.com/str/atob" target="_blank" rel="noopener noreferrer" className="btn-orange" style={{ fontSize: "0.9rem", padding: "0.5rem 1.25rem" }}>🛒 Shop on eBay</a>
          </div>

          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <span className={`block w-6 h-0.5 bg-[#E8900A] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#E8900A] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#E8900A] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 border-t border-[#333]" : "max-h-0"}`} style={{ background: "#111111" }}>
        <nav className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link py-3 border-b border-[#222] text-base" onClick={() => setIsOpen(false)}>{link.label}</Link>
          ))}
          <a href="https://www.ebay.com/str/atob" target="_blank" rel="noopener noreferrer" className="btn-orange mt-4 justify-center" onClick={() => setIsOpen(false)}>🛒 Shop on eBay</a>
        </nav>
      </div>
    </header>
  );
}
ENDOFFILE
echo "✅ components/Navbar.tsx"

# ============================================================
# components/Footer.tsx
# ============================================================
cat > components/Footer.tsx << 'ENDOFFILE'
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 30%, #333333 60%, #1C1C1C 100%)", borderTop: "3px solid #E8900A" }}>
      <div className="flex items-center gap-6 px-8 py-2" style={{ background: "#1C1C1C", borderBottom: "1px solid #333" }}>
        {[...Array(12)].map((_, i) => (
          <span key={i} className="w-3 h-3 rounded-full block" style={{ background: "radial-gradient(circle at 35% 35%, #555, #222)", boxShadow: "0 1px 3px rgba(0,0,0,0.8), inset 0 1px rgba(255,255,255,0.1)" }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image src="/logo-icon.png" alt="A&B Supply & Surplus" fill className="object-contain" sizes="48px" />
              </div>
              <div>
                <p className="text-2xl text-white leading-none" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.08em" }}>A&amp;B Supply &amp; Surplus</p>
                <p className="text-xs text-[#E8900A] tracking-widest uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Industrial Surplus Specialists</p>
              </div>
            </div>
            <p className="text-[#888] text-sm leading-relaxed">Family-owned and operated. Trusted source for quality industrial surplus, heavy equipment parts, hydraulics, electrical, and CNC/metalworking supplies.</p>
            <a href="https://www.ebay.com/str/atob" target="_blank" rel="noopener noreferrer" className="btn-orange self-start mt-2" style={{ fontSize: "1rem", padding: "0.6rem 1.5rem" }}>🛒 Shop Our eBay Store</a>
          </div>

          <div>
            <h3 className="text-[#E8900A] text-sm tracking-widest uppercase mb-4 font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {[{ href: "/", label: "Home" }, { href: "/inventory", label: "Browse Inventory" }, { href: "/about", label: "About Us" }, { href: "/contact", label: "Contact" }, { href: "https://www.ebay.com/str/atob", label: "eBay Store →", external: true }].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} className="text-[#A0A0A0] hover:text-[#F5A623] transition-colors text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#E8900A] text-sm tracking-widest uppercase mb-4 font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Contact Us</h3>
            <address className="not-italic flex flex-col gap-3">
              <div><p className="text-white font-semibold">Bryan Arfsten</p><p className="text-[#A0A0A0] text-sm">Owner, A&amp;B Supply &amp; Surplus</p></div>
              <a href="tel:6083710746" className="flex items-center gap-2 text-[#E8E8E8] hover:text-[#F5A623] transition-colors"><span className="text-[#E8900A]">📞</span><span className="font-semibold tracking-wide">608-371-0746</span></a>
              <a href="mailto:arfsten18@gmail.com" className="flex items-center gap-2 text-[#E8E8E8] hover:text-[#F5A623] transition-colors text-sm break-all"><span className="text-[#E8900A]">✉️</span>arfsten18@gmail.com</a>
            </address>
            <div className="mt-4 p-3 rounded border border-[#333] bg-[#1C1C1C]">
              <p className="text-xs text-[#888] uppercase tracking-wider mb-1">eBay Seller</p>
              <p className="text-[#F5A623] text-sm font-semibold">⭐ Trusted Seller</p>
              <a href="https://www.ebay.com/str/atob" target="_blank" rel="noopener noreferrer" className="text-xs text-[#888] hover:text-[#E8900A] transition-colors mt-1 block">ebay.com/str/atob →</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#555]" style={{ borderTop: "1px solid #2A2A2A" }}>
          <p>© {new Date().getFullYear()} A&amp;B Supply &amp; Surplus. All rights reserved.</p>
          <p>Family-Owned &amp; Operated 🇺🇸</p>
        </div>
      </div>
    </footer>
  );
}
ENDOFFILE
echo "✅ components/Footer.tsx"

# ============================================================
# Copy images to /public with correct names
# ============================================================
echo ""
echo "📸 Copying your images to /public..."

# Adjust these source paths if your images are in a different location
DOWNLOADS=~/Downloads

if [ -f "$DOWNLOADS/4233511986301353413.png" ]; then
  cp "$DOWNLOADS/4233511986301353413.png" public/logo-hero.png
  cp "$DOWNLOADS/4233511986301353413.png" public/warehouse-hero.jpg
  cp "$DOWNLOADS/4233511986301353413.png" public/logo-icon.png
  cp "$DOWNLOADS/4233511986301353413.png" public/logo-banner.png
  cp "$DOWNLOADS/4233511986301353413.png" public/og-image.jpg
  echo "✅ Warehouse/logo images copied"
else
  echo "⚠️  Could not find 4233511986301353413.png in ~/Downloads — copy manually to /public"
fi

if [ -f "$DOWNLOADS/1967387704268183409.png" ]; then
  cp "$DOWNLOADS/1967387704268183409.png" public/family-cartoon.png
  echo "✅ Family cartoon copied"
else
  echo "⚠️  Could not find 1967387704268183409.png in ~/Downloads — copy manually to /public"
fi

# ============================================================
# Done!
# ============================================================
echo ""
echo "============================================"
echo "✅ SETUP COMPLETE!"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. Run:  npm run dev"
echo "  2. Open: http://localhost:3000"
echo ""
echo "  3. Set up Formspree (free contact form):"
echo "     → Go to https://formspree.io"
echo "     → Create a form, copy your ID"
echo "     → Edit app/contact/page.tsx"
echo "     → Replace YOUR_FORMSPREE_ID with your real ID"
echo ""
echo "  4. When ready to deploy:"
echo "     → git init && git add . && git commit -m 'initial'"
echo "     → Push to GitHub, then import at vercel.com"
echo ""
echo "  Bryan Arfsten | 608-371-0746 | arfsten18@gmail.com"
echo "  eBay: https://www.ebay.com/str/atob"
echo ""
