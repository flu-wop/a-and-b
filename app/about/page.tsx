import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet Bryan Arfsten and the family behind A&B Supply & Surplus — Wisconsin-based industrial surplus specialists.",
};

const VALUES = [
  {
    title: "Personally Inspected",
    desc: "Every item is hands-on inspected before listing. No surprises on delivery.",
    Icon: InspectIcon,
  },
  {
    title: "Ships Fast",
    desc: "We know downtime costs money. Most orders leave the warehouse next day.",
    Icon: ShipIcon,
  },
  {
    title: "Honest Descriptions",
    desc: "We describe condition straight — good and bad. Photos show exactly what you get.",
    Icon: HonestIcon,
  },
  {
    title: "Hassle-Free Returns",
    desc: "If something's not right, we make it right. Period.",
    Icon: ReturnIcon,
  },
  {
    title: "Wisconsin-Based",
    desc: "Family-owned, Wisconsin-rooted. Supporting American industry one part at a time.",
    Icon: LocationIcon,
  },
  {
    title: "Industry Knowledge",
    desc: "We know our inventory. Have a technical question? Call Bryan directly.",
    Icon: WrenchIcon,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section
        className="relative pt-32 pb-20 px-4 overflow-hidden border-b-[3px] border-orange"
        style={{ background: "linear-gradient(135deg, #111111 0%, #1A1A1A 50%, #111111 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(135deg, #E8900A 0px, #E8900A 1px, transparent 1px, transparent 60px)" }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="eyebrow mb-3">Our Story</p>
          <h1 className="text-5xl sm:text-6xl text-white mb-6 font-display">
            About A&amp;B Supply &amp; Surplus
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            A Wisconsin family business with a warehouse full of quality industrial parts and the
            work ethic to back it up.
          </p>
        </div>
      </section>

      {/* Meet Bryan */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div
                className="relative rounded-lg overflow-hidden"
                style={{
                  border: "2px solid #333",
                  boxShadow: "0 0 60px rgba(232,144,10,0.15), 0 30px 80px rgba(0,0,0,0.8)",
                }}
              >
                <Image
                  src="/family-cartoon.png"
                  alt="Bryan Arfsten and family"
                  width={700}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
                {/* Corner accents */}
                <div className="absolute top-0 left-0" aria-hidden="true">
                  <div className="w-12 h-1 bg-orange" />
                  <div className="w-1 h-12 bg-orange" />
                </div>
                <div className="absolute bottom-0 right-0" aria-hidden="true">
                  <div className="w-12 h-1 bg-orange" />
                  <div className="w-1 h-12 bg-orange" />
                </div>
              </div>
              <div className="mt-4 p-3 rounded text-center text-sm bg-bg-card border border-[#333] text-text-dim font-condensed tracking-wide">
                Bryan, the family, and one very good dog — Wisconsin
              </div>
            </div>

            <div className="order-1 lg:order-2 flex flex-col gap-6">
              <div>
                <p className="eyebrow mb-3">Meet the Owner</p>
                <h2 className="text-4xl sm:text-5xl text-white mb-4 font-display">
                  Hi, I&apos;m{" "}
                  <span className="text-orange-bright italic">Bryan Arfsten.</span>
                </h2>
              </div>
              <div className="flex flex-col gap-4 text-text-muted leading-relaxed text-sm">
                <p>
                  A&amp;B Supply &amp; Surplus started from a simple belief: quality industrial parts shouldn&apos;t
                  be hard to find or overpriced. I&apos;ve spent years in and around heavy equipment and
                  manufacturing, and I know firsthand the headache of hunting down a specific part when a
                  machine is down.
                </p>
                <p>
                  What started as a side operation has grown into a full warehouse with thousands of
                  listings on eBay. We source surplus from machine shops, equipment auctions, construction
                  companies, and more.
                </p>
                <p>
                  This is a family business. You get real answers from real people who stand behind every
                  sale. If you have a question, call me directly.
                </p>
              </div>
              <div
                className="p-5 rounded-lg bg-bg-card border border-[#333]"
                style={{ borderLeft: "4px solid #E8900A" }}
              >
                <p className="text-white font-bold text-lg mb-1">Bryan Arfsten</p>
                <p className="eyebrow mb-3">Owner &amp; Operator</p>
                <a href="tel:6083710746" className="flex items-center gap-2 text-text-primary hover:text-orange-bright transition-colors text-sm mb-2">
                  <span aria-hidden="true" className="text-orange">📞</span>
                  <span className="font-semibold tracking-wide">608-371-0746</span>
                </a>
                <a href="mailto:arfsten18@gmail.com" className="flex items-center gap-2 text-text-primary hover:text-orange-bright transition-colors text-sm">
                  <span aria-hidden="true" className="text-orange">✉</span>
                  arfsten18@gmail.com
                </a>
                <p className="text-xs text-text-dim mt-3 font-condensed tracking-wide">
                  Same-day callbacks. Real answers, no runaround.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warehouse photos */}
      <section
        className="py-20 px-4 border-t border-b border-[#2A2A2A]"
        style={{ background: "#161616" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Our Operation</p>
            <h2 className="text-4xl sm:text-5xl text-white font-display">Inside Our Warehouse</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="relative rounded-lg overflow-hidden"
              style={{ border: "2px solid #333", minHeight: "260px", background: "#1C1C1C" }}
            >
              <Image
                src="/warehouse-hero.jpg"
                alt="A&B Supply & Surplus warehouse"
                width={700}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-bg-deep/90">
                <p className="text-text-primary text-sm font-semibold font-condensed">
                  Thousands of parts ready to ship
                </p>
              </div>
            </div>
            <div
              className="relative rounded-lg overflow-hidden"
              style={{ border: "2px solid #333", minHeight: "260px", background: "#1C1C1C" }}
            >
              <Image
                src="/logo-banner.png"
                alt="A&B Supply & Surplus"
                width={700}
                height={400}
                className="w-full h-64 object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-bg-deep/90">
                <p className="text-text-primary text-sm font-semibold font-condensed">
                  Industrial surplus specialists
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl text-white font-display">Why Buyers Trust Us</h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((val) => (
              <div key={val.title} className="category-card">
                <val.Icon className="w-8 h-8 text-orange mb-4" />
                <h3 className="text-text-primary font-semibold text-base mb-2 font-condensed tracking-wide">
                  {val.title}
                </h3>
                <p className="text-text-dim text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center border-t-[3px] border-orange bg-bg-card">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl text-white mb-4 font-display">
            Ready to find your part?
          </h2>
          <p className="text-text-muted mb-8">
            Browse our full inventory on eBay or reach out directly — Bryan picks up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.ebay.com/str/atob" target="_blank" rel="noopener noreferrer" className="btn-orange text-lg">
              Shop on eBay
            </a>
            <Link href="/contact" className="btn-ghost">Contact Bryan</Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────
function InspectIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
}
function ShipIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
}
function HonestIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>;
}
function ReturnIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>;
}
function LocationIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function WrenchIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>;
}
