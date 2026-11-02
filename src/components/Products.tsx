"use client";

import React from "react";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/ui/ProductCard";
import styles from "./Products.module.css";

export default function Products() {
  return (
    <section className={styles.productsSection} id="products">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <Container>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>Flagship Products</span>
          </div>
          <h2 className={styles.heading}>Software we engineer and run.</h2>
          <p className={styles.intro}>
            We don&apos;t just consult on systems — we build, ship, and operate
            them. Explore our real production systems.
          </p>
        </div>

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
            tags={[
              "FalkorDB",
              "Cypher",
              "FastAPI",
              "Python 3.12",
              "React",
              "Cytoscape.js",
            ]}
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
            tags={[
              "Android",
              "Kotlin 2.0",
              "Jetpack Compose",
              "Supabase",
              "PostGIS",
              "RevenueCat",
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
