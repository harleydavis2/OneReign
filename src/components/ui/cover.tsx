"use client";
import React, { useState, useEffect } from "react";
import styles from "./Cover.module.css";

interface CoverProps {
  children: React.ReactNode;
  className?: string;
}

export function Cover({ children, className = "" }: CoverProps) {
  const sparkles = Array.from({ length: 8 }, (_, i) => i);
  const beams = Array.from({ length: 4 }, (_, i) => i);
  const [isMobileActive, setIsMobileActive] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches ||
                     ('ontouchstart' in window) ||
                     (navigator.maxTouchPoints > 0);
                     
    if (!isMobile) return;

    // Periodic animation loop: active for 2.5s, inactive for 3.5s
    const interval = setInterval(() => {
      setIsMobileActive(true);
      const timer = setTimeout(() => {
        setIsMobileActive(false);
      }, 2500);
      return () => clearTimeout(timer);
    }, 6000);

    // Initial trigger
    const initialTimer = setTimeout(() => {
      setIsMobileActive(true);
      setTimeout(() => setIsMobileActive(false), 2500);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, []);

  return (
    <span className={`${styles.coverContainer} ${isMobileActive ? styles.active : ""} ${className}`}>
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
