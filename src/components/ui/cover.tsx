"use client";
import React from "react";
import styles from "./Cover.module.css";

interface CoverProps {
  children: React.ReactNode;
  className?: string;
}

export function Cover({ children, className = "" }: CoverProps) {
  const sparkles = Array.from({ length: 8 }, (_, i) => i);
  const beams = Array.from({ length: 4 }, (_, i) => i);

  return (
    <span className={`${styles.coverContainer} ${className}`}>
      {/* Background Beams/Lines (Warp Speed Effect) */}
      <span className={styles.beamContainer}>
        {beams.map((b) => (
          <span key={b} className={`${styles.beam} ${styles[`beam${b}`]}`} />
        ))}
      </span>

      {/* Floating Sparkles / Particles */}
      <span className={styles.sparkleContainer}>
        {sparkles.map((s) => (
          <span key={s} className={`${styles.sparkle} ${styles[`sparkle${s}`]}`} />
        ))}
      </span>

      {/* Text Wrapper */}
      <span className={styles.textWrapper}>
        {children}
        {/* Glow Layer */}
        <span className={styles.textGlow}>{children}</span>
        {/* Shine Sweep Highlight */}
        <span className={styles.textShine} />
      </span>
    </span>
  );
}
