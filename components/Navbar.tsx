"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "https://www.ebay.com/str/atob", label: "Shop on eBay", external: true },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-deep/95 backdrop-blur-md border-b border-[#333] shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-gradient-to-b from-bg-deep/90 to-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="A&B Supply & Surplus — Home">
            <div className="relative w-10 h-10 shrink-0">
              <Image src="/logo-icon.png" alt="" fill className="object-contain" sizes="40px" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl text-white group-hover:text-orange-bright transition-colors font-display tracking-widest">
                A&amp;B Supply
              </span>
              <span className="text-[10px] tracking-[0.2em] text-orange uppercase font-condensed font-semibold">
                &amp; Surplus
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="nav-link">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleCart}
              aria-label={`Open cart, ${totalCount} items`}
              style={{ position: "relative", background: "none", border: "1px solid #333", borderRadius: 6, padding: "0.5rem 0.6rem", color: "#F5EDD8", cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <CartIcon />
              {totalCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "#D97706",
                    color: "#111",
                    borderRadius: "999px",
                    fontSize: 11,
                    fontWeight: 700,
                    minWidth: 18,
                    height: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 4px",
                  }}
                >
                  {totalCount}
                </span>
              )}
            </button>
            <Link
              href="/shop"
              className="btn-orange"
              style={{ fontSize: "0.875rem", padding: "0.5rem 1.25rem" }}
            >
              Shop Direct
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleCart}
              aria-label={`Open cart, ${totalCount} items`}
              style={{ position: "relative", background: "none", border: "1px solid #333", borderRadius: 6, padding: "0.45rem 0.55rem", color: "#F5EDD8", display: "flex", alignItems: "center" }}
            >
              <CartIcon size={18} />
              {totalCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "#D97706",
                    color: "#111",
                    borderRadius: "999px",
                    fontSize: 10,
                    fontWeight: 700,
                    minWidth: 16,
                    height: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 4px",
                  }}
                >
                  {totalCount}
                </span>
              )}
            </button>
            <button
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <span className={`block w-6 h-0.5 bg-orange transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-orange transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-orange transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 border-t border-[#333]" : "max-h-0"}`}
        style={{ background: "#111111" }}
      >
        <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link py-3 border-b border-[#222] text-base"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link py-3 border-b border-[#222] text-base"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <Link href="/shop" className="btn-orange mt-4" onClick={() => setIsOpen(false)}>
            Shop Direct
          </Link>
        </nav>
      </div>
    </header>
  );
}

function CartIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
