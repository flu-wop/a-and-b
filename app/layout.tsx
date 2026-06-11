import type { Metadata } from "next";
import { Bebas_Neue, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-condensed",
  display: "swap",
});

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
    url: "https://www.absupplysurplus.com",
    siteName: "A&B Supply & Surplus",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "A&B Supply & Surplus" }],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://www.absupplysurplus.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="min-h-screen flex flex-col bg-bg-deep text-text-primary">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
