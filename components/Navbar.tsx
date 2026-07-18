"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/shop", label: "Shop Direct" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="https://www.ebay.com/str/atob"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
              style={{ fontSize: "0.875rem", padding: "0.5rem 1.25rem" }}
            >
              Shop on eBay
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
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

      {/* Mobile drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 border-t border-[#333]" : "max-h-0"}`}
        style={{ background: "#111111" }}
      >
        <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link py-3 border-b border-[#222] text-base"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.ebay.com/str/atob"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange mt-4"
            onClick={() => setIsOpen(false)}
          >
            Shop on eBay
          </a>
        </nav>
      </div>
    </header>
  );
}
