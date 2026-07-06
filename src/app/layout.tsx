import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "OneReign — AI Platforms, Automation & Custom Software",
    template: "%s | OneReign",
  },
  description:
    "OneReign builds AI platforms, automation workflows, and custom software for modern businesses. Explore Conesta and RUBL — products built to replace chaos with clarity.",
  keywords: ["AI platforms", "automation", "custom software", "Conesta", "RUBL", "OneReign"],
  authors: [{ name: "OneReign Private Limited" }],
  openGraph: {
    type: "website",
    url: "https://OneReign.co",
    siteName: "OneReign",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
