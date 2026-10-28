"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import styles from "./Cta.module.css";

export default function Cta() {
  return (
    <section className={styles.ctaSection} id="cta">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.contentWrapper}>
        <h2 className={styles.heading}>
          <span className={styles.headingLine}>Build Smart.</span>
          <span className={styles.headingLine}>Run Better.</span>
        </h2>

        <div className={styles.actionsRow}>
          <Button variant="secondary" href="/works">
            See our work
          </Button>
          <Button variant="primary" href="/contact">
            Get in touch
          </Button>
        </div>
      </div>

      {/* Huge OneReign logo mark partly cropped by section bottom */}
      <motion.div
        className={styles.logoWrapper}
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <Image
          src="/logo-mark.png"
          alt="OneReign logo mark"
          width={700}
          height={700}
          priority={false}
          className={styles.logoImage}
        />
      </motion.div>
    </section>
  );
}

