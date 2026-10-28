import React from "react";
import Button from "./Button";
import siteContent from "@/content/site";
import styles from "./CtaBand.module.css";

interface CtaBandProps {
  heading?: string;
  subheading?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  email?: string;
  className?: string;
}

export default function CtaBand({
  heading = "Tell us what's broken. We'll show you what's possible.",
  subheading = "Book a 30-minute discovery session with our engineering team. No pitch, just clear architecture.",
  primaryCtaText = "Book a free 30-min call",
  primaryCtaHref = "/contact",
  email = siteContent.contact.email,
  className = "",
}: CtaBandProps) {
  return (
    <section className={`${styles.ctaSection} ${className}`.trim()}>
      <div className="container">
        <div className={styles.ctaBox}>
          <div className={styles.content}>
            <span className="eyebrow">Start the conversation</span>
            <h2 className={styles.heading}>{heading}</h2>
            {subheading && <p className={styles.subheading}>{subheading}</p>}

            <div className={styles.actions}>
              <Button variant="primary" href={primaryCtaHref}>
                {primaryCtaText} →
              </Button>

              <div className={styles.emailWrapper}>
                <span className={styles.orText}>or direct email:</span>
                <a href={`mailto:${email}`} className={styles.emailLink}>
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
