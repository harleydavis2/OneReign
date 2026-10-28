"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { pricing, type PricingTier } from "@/content/site";
import styles from "./Pricing.module.css";

/**
 * Strips any internal TODO notes (e.g. "TODO(rajesh): ") so that
 * no draft placeholder markers ever reach the rendered UI.
 */
function sanitizeFeatureText(text: string): string {
  return text.replace(/TODO(\([^)]*\))?:?\s*/gi, "").trim();
}

/**
 * Resolves the display price string according to business rules:
 * If it starts with "TODO", strictly render "Let's scope it".
 */
function getDisplayPrice(from: string): string {
  if (from.startsWith("TODO")) {
    return "Let's scope it";
  }
  return from;
}

export default function Pricing() {
  return (
    <section className={styles.pricingSection} id="pricing">
      {/* Ambient background glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      {/* Giant section title "Pricing" placed behind cards */}
      <div className={styles.giantTitleWrapper} aria-hidden="true">
        <span className={styles.giantTitle}>Pricing</span>
      </div>

      <Container>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>Investment & Scoping</span>
          </div>
          <h2 className={styles.sectionHeading}>
            Clear scope. Predictable investment.
          </h2>
          <p className={styles.sectionIntro}>
            Typed milestones, clear deliverables, and zero hidden lock-in. Every engagement is structured around your operational goals.
          </p>
        </div>

        {/* ── Pricing Grid (3 Cards) ─────────────────────────────── */}
        <div className={styles.pricingGrid}>
          {pricing.map((tier: PricingTier, index: number) => {
            const isMiddle = index === 1;
            const displayPrice = getDisplayPrice(tier.from);
            const isCustomOrScoped =
              displayPrice === "Let's scope it" || displayPrice === "Custom quote";

            return (
              <div key={tier.name} className={styles.cardWrapper}>
                {/* Soft radial glow behind the middle card only */}
                {isMiddle && (
                  <div className={styles.middleGlow} aria-hidden="true" />
                )}

                <div
                  className={`${styles.pricingCard} ${
                    tier.popular ? styles.pricingCardPopular : ""
                  }`}
                >
                  {/* Thin Top Highlight Line */}
                  <div
                    className={`${styles.topHighlight} ${
                      tier.popular ? styles.topHighlightAccent : ""
                    }`}
                    aria-hidden="true"
                  />

                  {/* Top: Name, Badge, Summary, Price Box */}
                  <div>
                    <div className={styles.cardHeader}>
                      <div className={styles.tierBadgeRow}>
                        <h3 className={styles.tierName}>{tier.name}</h3>
                        {tier.popular && (
                          <span className={styles.popularBadge}>Most popular</span>
                        )}
                      </div>
                      <p className={styles.tierSummary}>{tier.summary}</p>
                    </div>

                    <div className={styles.priceBox}>
                      <span className={styles.priceLabel}>
                        {isCustomOrScoped ? "Pricing Model" : "Starting from"}
                      </span>
                      <div className={styles.priceValue}>{displayPrice}</div>
                    </div>

                    {/* 4 Feature Rows Separated by Thin Lines */}
                    <ul className={styles.featuresList}>
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className={styles.featureRow}>
                          <Check
                            className={styles.featureIcon}
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                          <span className={styles.featureText}>
                            {sanitizeFeatureText(feature)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions: "Start a project" pill + "Details" text link */}
                  <div className={styles.cardActions}>
                    <Button
                      variant="primary"
                      href={tier.href || "/contact"}
                      className="w-full"
                    >
                      Start a project
                    </Button>
                    <Link
                      href="/contact"
                      className={styles.detailsLink}
                      aria-label={`View scoping details for ${tier.name}`}
                    >
                      <span>Details</span>
                      <span className={styles.detailsArrow} aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small note under cards */}
        <div className={styles.bottomNote}>
          <p className={styles.bottomNoteText}>
            Every project starts with a free call. Prices depend on scope.
          </p>
        </div>
      </Container>
    </section>
  );
}

