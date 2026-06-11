"use client";

import { useState } from "react";
import Link from "next/link";

// Replace YOUR_FORMSPREE_ID with your actual ID from formspree.io
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
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        const data = await res.json();
        setErrorMsg(data?.errors?.[0]?.message || "Submission failed.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please call or email directly.");
      setStatus("error");
    }
  }

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
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="eyebrow mb-3">Get in Touch</p>
          <h1 className="text-5xl sm:text-6xl text-white mb-4 font-display">Contact Us</h1>
          <p className="text-text-muted text-lg">
            Have a question about a part, need a bulk quote, or want to know if we carry something?
            We respond fast.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-2 flex flex-col gap-6">
            <div className="p-6 rounded-lg bg-bg-card border border-[#333] border-t-[3px] border-t-orange">
              <h2 className="text-2xl text-white mb-4 font-display">Direct Line to Bryan</h2>
              <div className="flex flex-col gap-4">
                <a href="tel:6083710746" className="flex items-center gap-3 group">
                  <span className="w-10 h-10 rounded flex items-center justify-center shrink-0 bg-bg-raised border border-rivet text-orange text-lg" aria-hidden="true">
                    📞
                  </span>
                  <div>
                    <p className="text-xs text-text-dim uppercase tracking-wider font-condensed">Cell Phone</p>
                    <p className="text-text-primary font-bold text-lg tracking-wider group-hover:text-orange-bright transition-colors">
                      608-371-0746
                    </p>
                  </div>
                </a>
                <a href="mailto:arfsten18@gmail.com" className="flex items-center gap-3 group">
                  <span className="w-10 h-10 rounded flex items-center justify-center shrink-0 bg-bg-raised border border-rivet text-orange text-lg" aria-hidden="true">
                    ✉
                  </span>
                  <div>
                    <p className="text-xs text-text-dim uppercase tracking-wider font-condensed">Email</p>
                    <p className="text-text-primary text-sm group-hover:text-orange-bright transition-colors break-all">
                      arfsten18@gmail.com
                    </p>
                  </div>
                </a>
                <a
                  href="https://www.ebay.com/str/atob"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <span className="w-10 h-10 rounded flex items-center justify-center shrink-0 bg-bg-raised border border-rivet text-orange text-lg" aria-hidden="true">
                    🛒
                  </span>
                  <div>
                    <p className="text-xs text-text-dim uppercase tracking-wider font-condensed">eBay Store</p>
                    <p className="text-orange text-sm group-hover:text-orange-bright transition-colors">
                      ebay.com/str/atob →
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-5 rounded-lg text-sm bg-bg-deep border border-[#2A2A2A]">
              <p className="eyebrow mb-2">Response Times</p>
              <ul className="flex flex-col gap-2 text-text-muted">
                <li>
                  <strong className="text-text-primary font-condensed">Phone:</strong> Same-day
                </li>
                <li>
                  <strong className="text-text-primary font-condensed">Email:</strong> Within a few hours
                </li>
                <li>
                  <strong className="text-text-primary font-condensed">Form:</strong> Within 24 hours
                </li>
              </ul>
            </div>

            <a
              href="https://www.ebay.com/str/atob"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
            >
              Shop Our eBay Store
            </a>
          </aside>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-lg bg-bg-card border border-[#333] border-t-[3px] border-t-orange">
              <h2 className="text-2xl text-white mb-6 font-display">Send a Message</h2>

              {status === "success" ? (
                <div
                  className="p-6 rounded-lg text-center"
                  style={{ background: "rgba(232,144,10,0.08)", border: "2px solid #E8900A" }}
                >
                  <p className="text-4xl mb-3" aria-hidden="true">✅</p>
                  <p className="text-orange-bright text-xl font-bold mb-2 font-display tracking-widest">
                    Message Received!
                  </p>
                  <p className="text-text-muted text-sm">
                    Bryan will get back to you soon. For urgent inquiries, call{" "}
                    <a href="tel:6083710746" className="text-white font-bold hover:text-orange-bright transition-colors">
                      608-371-0746
                    </a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-text-dim uppercase tracking-wider mb-1.5 font-condensed">
                        Your Name <span className="text-orange">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Smith"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-dim uppercase tracking-wider mb-1.5 font-condensed">
                        Email <span className="text-orange">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-text-dim uppercase tracking-wider mb-1.5 font-condensed">
                      Phone <span className="text-text-dim">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="555-123-4567"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-text-dim uppercase tracking-wider mb-1.5 font-condensed">
                      What are you looking for? <span className="text-orange">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="e.g. Excavator bucket pins, hydraulic valve..."
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-text-dim uppercase tracking-wider mb-1.5 font-condensed">
                      Message <span className="text-orange">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Describe the part, quantity needed, make/model of machine, any part numbers you have..."
                      className="input-field resize-y"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded px-4 py-3">
                      ⚠️ {errorMsg}
                    </p>
                  )}

                  <button type="submit" disabled={status === "loading"} className="btn-orange">
                    {status === "loading" ? "Sending…" : "Send Message"}
                  </button>
                  <p className="text-xs text-text-dim text-center font-condensed tracking-wide -mt-2">
                    No spam. Bryan replies personally.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
