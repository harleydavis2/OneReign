import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0B0D",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://one-reign.vercel.app"),
  title: {
    default: "OneReign — AI Platforms, Automation & Custom Software",
    template: "%s | OneReign",
  },
  description:
    "OneReign designs and ships AI agents, automation workflows, and custom software so your team stops doing repetitive work and starts moving faster.",
  keywords: [
    "AI platforms",
    "automation workflows",
    "custom software engineering",
    "AI agents",
    "systems engineering",
    "OneReign",
    "Faultline",
    "Quiet",
  ],
  authors: [{ name: "OneReign Private Limited" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://one-reign.vercel.app",
    siteName: "OneReign",
    title: "OneReign — AI Platforms, Automation & Custom Software",
    description:
      "OneReign designs and ships AI agents, automation workflows, and custom software so your team stops doing repetitive work and starts moving faster.",
    images: [
      {
        url: "/images/products/faultline-detail-desktop.png",
        width: 1200,
        height: 630,
        alt: "OneReign — Engineered AI Systems & Custom Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneReign — AI Platforms, Automation & Custom Software",
    description:
      "OneReign designs and ships AI agents, automation workflows, and custom software so your team stops doing repetitive work and starts moving faster.",
    images: ["/images/products/faultline-detail-desktop.png"],
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
