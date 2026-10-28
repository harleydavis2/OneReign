import type { Metadata, Viewport } from "next";
import "./globals.css";
import { interTight, instrumentSerif } from "./fonts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SmoothScroll from "@/components/providers/SmoothScroll";
import siteContent from "@/content/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0B0D",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.brand.canonicalUrl),
  title: {
    default: `${siteContent.brand.name} — ${siteContent.brand.tagline}`,
    template: `%s | ${siteContent.brand.name}`,
  },
  description: siteContent.brand.subtitle,
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
  authors: [{ name: siteContent.brand.legalName }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    url: siteContent.brand.canonicalUrl,
    siteName: siteContent.brand.name,
    title: `${siteContent.brand.name} — ${siteContent.brand.tagline}`,
    description: siteContent.brand.subtitle,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteContent.brand.name} — ${siteContent.brand.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteContent.brand.name} — ${siteContent.brand.tagline}`,
    description: siteContent.brand.subtitle,
    images: ["/og-image.png"],
  },
  formatDetection: {
    telephone: false,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteContent.brand.name,
  legalName: siteContent.brand.legalName,
  url: siteContent.brand.canonicalUrl,
  logo: `${siteContent.brand.canonicalUrl}/logo-full.png`,
  email: siteContent.contact.email,
  telephone: "+91 8667768636",
  sameAs: [
    siteContent.socials.linkedin,
    siteContent.contact.whatsappUrl,
  ].filter(Boolean),
  address: {
    "@type": "PostalAddress",
    addressCountry: "Global",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="bg-bg text-text antialiased">
        <SmoothScroll>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-bg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </SmoothScroll>
      </body>
    </html>
  );
}
