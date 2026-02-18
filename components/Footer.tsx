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
