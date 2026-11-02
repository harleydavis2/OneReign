import type { Metadata } from "next";
import Cta from "@/components/Cta";
import TechStack from "@/components/TechStack";
import Introduction from "@/components/Introduction";
import Hero from "@/components/Hero";
import StudioMockup from "@/components/StudioMockup";
import Works from "@/components/Works";
import Approach from "@/components/Approach";
import Proof from "@/components/Proof";
import Faq from "@/components/Faq";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Products from "@/components/Products";
import siteContent from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "OneReign — AI Platforms, Automation & Custom Software",
  description:
    "We build the systems your business runs on. OneReign designs and ships AI agents, automation workflows, and custom software so your team stops doing repetitive work.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteContent.brand.name,
    legalName: siteContent.brand.legalName,
    url: siteContent.brand.canonicalUrl,
    logo: `${siteContent.brand.canonicalUrl}/logo-full.png`,
    description: siteContent.brand.subtitle,
    foundingDate: "2025",
    sameAs: [siteContent.socials.linkedin].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      email: siteContent.contact.email,
      contactType: "customer service",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* ── Section 1: Hero (Editorial Centered Layout with Studio Canvas) ── */}
      <section className={styles.heroSection}>
        <div className="container">
          <Hero />

          {/* Interactive Studio Canvas Mockup */}
          <StudioMockup />
        </div>
      </section>

      {/* ── Tech Stack ─────────────────────────────── */}
      <TechStack />

      {/* ── Section: Introduction ───────────────────── */}
      <Introduction />

      {/* ── Section 2: Works (3D Curved Gallery) ──────── */}
      <Works />

      {/* ── Section 3: Approach (Bento 3-Row Grid) ───── */}
      <Approach />

      {/* ── Section 4: Proof ─────────────────────────── */}
      <Proof />

      {/* ── Section 5: FAQ (Accordions + JSON-LD) ────── */}
      <Faq />

      {/* ── Section 6: Services (Grid + Platform Flexibility) ── */}
      <Services />

      {/* ── Section 4: Pricing ─────────────────────── */}
      <Pricing />

      {/* ── Section 4: Flagship Products ────────────── */}
      <Products />

      {/* ── Section: Final High-Impact CTA ──────────── */}
      <Cta />
    </>
  );
}
