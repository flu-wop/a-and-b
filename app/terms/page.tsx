import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of sale for A&B Supply & Surplus.",
};

export default function TermsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0d0d0d", padding: "80px 20px 60px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", color: "#D4CBB8" }}>
        <h1 style={{ color: "#F5EDD8", fontSize: 32, marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ color: "#A89880", marginBottom: 32, fontSize: 14 }}>Last updated: July 2026</p>

        <Section title="Product Condition">
          We sell surplus, new-old-stock, and used industrial equipment. Listings describe
          condition to the best of our knowledge, but items are sold as-is unless otherwise
          stated. Buyers are responsible for verifying an item's suitability for their specific
          application before use.
        </Section>

        <Section title="No Warranty on Use">
          A&B Supply & Surplus makes no warranty, express or implied, regarding fitness for a
          particular purpose. Industrial parts should be inspected and tested by a qualified
          professional before being placed into service, particularly for safety-critical
          applications.
        </Section>

        <Section title="Pricing & Availability">
          Prices and availability are subject to change without notice. Because our inventory is
          also sold on eBay and in person, an item may occasionally sell out between when you view
          it and when you complete checkout — in that case, we'll notify you and issue a refund.
        </Section>

        <Section title="Shipping">
          Shipping costs are calculated at checkout. We ship to U.S. addresses. Estimated delivery
          times are provided in good faith but are not guaranteed.
        </Section>

        <Section title="Returns">
          If an item arrives damaged, defective, or not as described, contact us within 14 days of
          delivery to arrange a return or exchange. Buyer is responsible for return shipping
          unless the return is due to our error.
        </Section>

        <Section title="Governing Law">
          These terms are governed by the laws of the State of Michigan, without regard to its
          conflict of law provisions.
        </Section>

        <Section title="Contact">
          Questions about an order or these terms? Reach out through our{" "}
          <a href="/contact" style={{ color: "#D97706" }}>contact page</a>.
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2 style={{ color: "#F5EDD8", fontSize: 18, marginBottom: 8 }}>{title}</h2>
      <p style={{ lineHeight: 1.7, fontSize: 15 }}>{children}</p>
    </section>
  );
}
