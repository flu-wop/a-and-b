import Link from "next/link";
import Image from "next/image";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Browse Inventory" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "https://www.ebay.com/str/atob", label: "eBay Store →", external: true },
];

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-orange" style={{ background: "linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 30%, #333333 60%, #1C1C1C 100%)" }}>
      {/* Rivet strip */}
      <div className="flex items-center gap-5 px-8 py-2 bg-bg-card border-b border-[#333]">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="w-3 h-3 rounded-full block shrink-0"
            style={{
              background: "radial-gradient(circle at 35% 35%, #555, #222)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.8), inset 0 1px rgba(255,255,255,0.08)",
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0">
                <Image src="/logo-icon.png" alt="A&B Supply & Surplus" fill className="object-contain" sizes="48px" />
              </div>
              <div>
                <p className="text-2xl text-white leading-none font-display tracking-widest">
                  A&amp;B Supply &amp; Surplus
                </p>
                <p className="text-xs text-orange tracking-widest uppercase font-condensed">
                  Industrial Surplus Specialists
                </p>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Family-owned and operated. Trusted source for quality industrial surplus, heavy equipment parts,
              hydraulics, electrical, and CNC/metalworking supplies.
            </p>
            <a
              href="https://www.ebay.com/str/atob"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange self-start mt-2"
              style={{ fontSize: "0.9rem", padding: "0.6rem 1.4rem" }}
            >
              Shop Our eBay Store
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="eyebrow mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-text-muted hover:text-orange-bright transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="eyebrow mb-4">Contact Us</h3>
            <address className="not-italic flex flex-col gap-3">
              <div>
                <p className="text-white font-semibold">Bryan Arfsten</p>
                <p className="text-text-muted text-sm">Owner, A&amp;B Supply &amp; Surplus</p>
              </div>
              <a href="tel:6083710746" className="flex items-center gap-2 text-text-primary hover:text-orange-bright transition-colors group">
                <PhoneIcon className="w-4 h-4 text-orange shrink-0" />
                <span className="font-semibold tracking-wide">608-371-0746</span>
              </a>
              <a href="mailto:arfsten18@gmail.com" className="flex items-center gap-2 text-text-primary hover:text-orange-bright transition-colors text-sm break-all">
                <MailIcon className="w-4 h-4 text-orange shrink-0" />
                arfsten18@gmail.com
              </a>
            </address>
            <div className="mt-4 p-3 rounded border border-[#333] bg-bg-card">
              <p className="text-xs text-text-dim uppercase tracking-wider mb-1 font-condensed">eBay Seller</p>
              <p className="text-orange-bright text-sm font-semibold">★ Top-Rated Seller</p>
              <a
                href="https://www.ebay.com/str/atob"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-dim hover:text-orange transition-colors mt-1 block"
              >
                ebay.com/str/atob →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-dim border-t border-[#2A2A2A]">
          <p>© {new Date().getFullYear()} A&amp;B Supply &amp; Surplus. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-orange transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-orange transition-colors">Terms of Service</a>
            <p className="font-condensed tracking-wider">Family-Owned &amp; Operated · Michigan</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
