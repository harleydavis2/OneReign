import React from "react";
import StatusBadge from "./StatusBadge";
import ScreenshotFrame from "./ScreenshotFrame";
import Button from "./Button";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  status: "Live" | "In progress";
  eventOrContext?: string;
  caseStudyHref: string;
  externalHref?: string;
  externalLabel?: string;
  screenshotSrc?: string;
  screenshotAlt: string;
  frameType?: "browser" | "phone";
  urlBarText?: string;
  tags?: string[];
}

export default function ProductCard({
  name,
  tagline,
  description,
  status,
  eventOrContext,
  caseStudyHref,
  externalHref,
  externalLabel,
  screenshotSrc,
  screenshotAlt,
  frameType = "browser",
  urlBarText,
  tags = [],
}: ProductCardProps) {
  return (
    <div className={styles.productCard}>
      {/* Visuvate-style hairline top light reflection & subtle radial glow */}
      <div className={styles.cardHighlight} aria-hidden="true" />
      <div className={styles.cardRadial} aria-hidden="true" />

      <div className={styles.visualCol}>
        <ScreenshotFrame
          type={frameType}
          src={screenshotSrc}
          alt={screenshotAlt}
          width={frameType === "phone" ? 390 : 1200}
          height={frameType === "phone" ? 520 : 750}
          urlBarText={urlBarText}
          placeholderText="Real Android app view captured from Pixel 7 emulator."
        />
      </div>

      <div className={styles.infoCol}>
        <div className={styles.header}>
          <div className={styles.metaRow}>
            <StatusBadge status={status} />
            {eventOrContext && <span className={styles.contextTag}>{eventOrContext}</span>}
          </div>
          <h3 className={styles.title}>{name}</h3>
          {tagline && <p className={styles.tagline}>{tagline}</p>}
        </div>

        <p className={styles.description}>{description}</p>

        {tags.length > 0 && (
          <div className={styles.tagList}>
            {tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={styles.actions}>
          <Button variant="primary" href={caseStudyHref}>
            View case study →
          </Button>

          {externalHref && (
            <Button
              variant="secondary"
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {externalLabel || "External link"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
