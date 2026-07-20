import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How A&B Supply & Surplus collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0d0d0d", padding: "80px 20px 60px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", color: "#D4CBB8" }}>
        <h1 style={{ color: "#F5EDD8", fontSize: 32, marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: "#A89880", marginBottom: 32, fontSize: 14 }}>Last updated: July 2026</p>

        <Section title="What We Collect">
          When you place an order or contact us, we collect your name, email address, shipping
          address, and order details. Payment card information is collected and processed
          directly by Stripe, our payment processor — we never see or store your full card number.
        </Section>

        <Section title="How We Use It">
          We use your information to process orders, ship products, send order confirmations, and
          respond to inquiries. We do not sell, rent, or trade your personal information to third
          parties for marketing purposes.
        </Section>

        <Section title="Third-Party Services">
          We use Stripe for payment processing and Resend for transactional emails (order
          confirmations). These providers process your data only as needed to complete those
          services and are bound by their own privacy policies.
        </Section>

        <Section title="Cookies">
          Our site uses minimal, functional cookies — for example, to keep items in your cart
          between page loads. We do not use tracking cookies for advertising.
        </Section>

        <Section title="Data Retention">
          We retain order records as needed for accounting, warranty, and legal purposes. You may
          request deletion of your personal information by contacting us, subject to our
          obligation to retain transaction records as required by law.
        </Section>

        <Section title="Contact">
          Questions about this policy or your data? Reach out through our{" "}
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
