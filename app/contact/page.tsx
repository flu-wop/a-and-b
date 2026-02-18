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
