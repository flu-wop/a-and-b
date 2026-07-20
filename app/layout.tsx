import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/CartDrawer";

// This must always point to wherever the site is actually live. It was
// hardcoded to absupplysurplus.com before that domain was ever connected to
// this Vercel project — meaning link previews (texts, social shares) pointed
// to a domain that didn't resolve to the site. Pull from the same env var
// Stripe redirects use, with the working Vercel URL as a safe fallback.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://a-and-b.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "A&B Supply & Surplus | Industrial Surplus & Heavy Equipment Parts",
    template: "%s | A&B Supply & Surplus",
  },
  description:
    "Quality industrial surplus, heavy equipment parts & attachments, hydraulics, electrical, CNC/metalworking and more. Family-owned and operated. Shop our eBay store.",
  keywords: [
    "industrial surplus",
    "heavy equipment parts",
    "hydraulics surplus",
    "CNC metalworking parts",
    "electrical surplus",
    "A&B Supply Surplus",
    "Bryan Arfsten",
    "eBay industrial parts",
  ],
  openGraph: {
    title: "A&B Supply & Surplus",
    description: "Industrial Surplus & Heavy Equipment Parts – Family-Owned & Trusted",
    url: SITE_URL,
    siteName: "A&B Supply & Surplus",
    images: [{ url: "/family-cartoon.png", width: 1536, height: 1024, alt: "A&B Supply & Surplus — Bryan, family, and dog" }],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
