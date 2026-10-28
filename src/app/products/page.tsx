import type { Metadata } from "next";
import ProductCard from "@/components/ui/ProductCard";
import CtaBand from "@/components/ui/CtaBand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Products — Faultline & Quiet",
  description:
    "Flagship software engineered and operated by OneReign: Faultline (graph-native knowledge conflict detection) and Quiet (real-time peaceful place scoring).",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Products — Faultline & Quiet | OneReign",
    description:
      "Explore OneReign's flagship products: Faultline and Quiet. Engineered for high performance, strict architecture, and real operational utility.",
    images: ["/images/products/faultline-detail-desktop.png"],
  },
};

export default function ProductsPage() {
  return (
    <>
      <section className={styles.heroSection}>
        <div className="container">
          <span className="eyebrow">Flagship Products</span>
          <h1 className={styles.heroH1}>Systems built to solve real friction.</h1>
          <p className={styles.heroSub}>
            We engineer and run production products alongside our client systems. Every product is built on clean architectural boundaries, zero fluff, and verified real-world utility.
          </p>
        </div>
      </section>

      <section className={styles.productsSection}>
        <div className="container">
          <div className={styles.productsStack}>
            {/* Product 1: Faultline */}
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
              screenshotAlt="Faultline knowledge conflict resolution dashboard and traversal graph"
              frameType="browser"
              urlBarText="https://faultline-production-f69d.up.railway.app"
              tags={["FalkorDB", "Cypher", "FastAPI", "Python 3.12", "React", "Cytoscape.js"]}
            />

            {/* Product 2: Quiet */}
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
        </div>
      </section>

      <CtaBand
        heading="Have an engineering problem worth solving?"
        subheading="Let's build systems together. Reach out to schedule a technical architecture discussion."
        primaryCtaText="Get in touch"
        primaryCtaHref="/contact"
      />
    </>
  );
}
