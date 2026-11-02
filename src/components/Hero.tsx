"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import Button from "@/components/ui/Button";
import siteContent from "@/content/site";
import styles from "@/app/page.module.css";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div className={styles.heroCenter}>
      {/* Eyebrow Pill */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.05 }}
        className={styles.heroPill}
      >
        <span className={styles.heroPillDot} />
        <span>AI Platforms & Custom Software · Est. 2025</span>
      </motion.div>

      {/* H1 Line-by-Line Mask Reveal */}
      <h1 className={styles.heroH1}>
        <span className="block overflow-hidden pb-1">
          <motion.span
            className="block"
            initial={prefersReducedMotion ? false : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
          >
            We build the <span className={styles.heroH1Italic}>systems</span>
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-1">
          <motion.span
            className="block"
            initial={prefersReducedMotion ? false : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
          >
            <span className={styles.heroH1Italic}>your business</span> runs on.
          </motion.span>
        </span>
      </h1>

      {/* Subtext (staggered by 90ms: 0.22 + 0.09 = 0.31s) */}
      <motion.p
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.31 }}
        className={styles.heroSub}
      >
        OneReign designs and ships AI agents, automation workflows and custom software — so your team stops doing repetitive work and starts moving faster.
      </motion.p>

      {/* CTAs (staggered by 90ms: 0.31 + 0.09 = 0.40s) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.40 }}
        className={styles.heroCtas}
      >
        <Button variant="primary" href="/contact">
          Book a free 30-min call →
        </Button>
        <Button variant="secondary" href="/products">
          See our products
        </Button>
      </motion.div>

      {/* Trust Line (staggered by 90ms: 0.40 + 0.09 = 0.49s) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.49 }}
        className={styles.trustLine}
      >
        <span className={styles.trustDot} aria-hidden="true" />
        <span>
          {siteContent.brand.location} · {siteContent.brand.established} · {siteContent.contact.email}
        </span>
      </motion.div>
    </div>
  );
}
