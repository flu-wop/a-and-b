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
