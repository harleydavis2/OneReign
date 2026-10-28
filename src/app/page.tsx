import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import ProductCard from "@/components/ui/ProductCard";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";
import Cta from "@/components/Cta";
import TechStack from "@/components/TechStack";
import Introduction from "@/components/Introduction";
import StudioMockup from "@/components/StudioMockup";
import Works from "@/components/Works";
import Approach from "@/components/Approach";
import Proof from "@/components/Proof";
import Faq from "@/components/Faq";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
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
          <div className={styles.heroCenter}>
            <div className={styles.heroPill}>
              <span className={styles.heroPillDot} />
              <span>AI Platforms & Custom Software · Est. 2025</span>
            </div>

            <h1 className={styles.heroH1}>
              We build the <span className={styles.heroH1Italic}>systems</span>
              <br />
              <span className={styles.heroH1Italic}>your business</span> runs on.
            </h1>

            <p className={styles.heroSub}>
              OneReign designs and ships AI agents, automation workflows and custom software — so your team stops doing repetitive work and starts moving faster.
            </p>

            <div className={styles.heroCtas}>
              <Button variant="primary" href="/contact">
                Book a free 30-min call →
              </Button>
              <Button variant="secondary" href="/products">
                See our products
              </Button>
            </div>

            <div className={styles.trustLine}>
              <span className={styles.trustDot} aria-hidden="true" />
              <span>
                {siteContent.brand.location} · {siteContent.brand.established} · {siteContent.contact.email}
              </span>
            </div>
          </div>

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
      <Section
        id="products"
        eyebrow="Flagship Products"
        heading="Software we engineer and run."
        intro="We don't just consult on systems — we build, ship, and operate them. Explore our real production systems."
      >
        <div className={styles.productsStack}>
          {/* Product A: Faultline */}
          <ProductCard
            id="faultline"
            name="Faultline"
            tagline="Finds where company knowledge contradicts itself."
            status="Live"
            eventOrContext="Graph Hacks 2026 (FalkorDB × WeMakeDevs)"
            description="Faultline finds where an organisation's documented knowledge contradicts itself, ranks each conflict by what sits downstream of it, and repairs it."
            caseStudyHref="/products/faultline"
            externalHref="https://faultline-production-f69d.up.railway.app/conflicts/conflict-0b1fd48ed309"
            externalLabel="Live Demo ↗"
            screenshotSrc="/images/products/faultline-detail-desktop.png"
            screenshotAlt="Faultline knowledge graph and conflict resolver desktop view"
            frameType="browser"
            urlBarText="https://faultline-production-f69d.up.railway.app"
            tags={["FalkorDB", "Cypher", "FastAPI", "Python 3.12", "React", "Cytoscape.js"]}
          />

          {/* Product B: Quiet */}
          <ProductCard
            id="quiet"
            name="Quiet"
            tagline="Find your peaceful place."
            status="In progress"
            eventOrContext="RevenueCat Shipaton 2026"
            description="Cafes, libraries, parks and coworking spaces near you, scored live by the people who were just there."
            caseStudyHref="/products/quiet"
            externalHref="https://github.com/rajeshr20/Quiet-App"
            externalLabel="GitHub ↗"
            screenshotSrc="/images/products/quiet-score-mobile.png"
            screenshotAlt="Quiet Android application running on Pixel 7"
            frameType="phone"
            tags={["Android", "Kotlin 2.0", "Jetpack Compose", "Supabase", "PostGIS", "RevenueCat"]}
          />
        </div>
      </Section>

      {/* ── Section: Final High-Impact CTA ──────────── */}
      <Cta />
    </>
  );
}
