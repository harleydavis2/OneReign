"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import Button from "@/components/ui/Button";
import styles from "./Cta.module.css";

export default function Cta() {
  const shouldReduceMotion = useReducedMotion();

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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

      {/* Interactive 3D Emblem with Holographic Aura & Floating Levitation */}
      <motion.div
        className={styles.logoOuter}
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <div
          className={styles.logoWrapper}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Pulsing Holographic Energy Aura */}
          <motion.div
            className={styles.logoGlowAura}
            animate={
              shouldReduceMotion
                ? { opacity: 0.7, scale: 1 }
                : {
                    scale: [0.94, 1.08, 0.94],
                    opacity: [0.55, 0.85, 0.55],
                  }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating and 3D Tilting Logo Container */}
          <motion.div
            className={styles.tiltContainer}
            style={
              shouldReduceMotion
                ? {}
                : {
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }
            }
            animate={
              shouldReduceMotion
                ? { y: 0 }
                : {
                    y: [-6, 6, -6],
                  }
            }
            transition={{
              y: {
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          >
            <Image
              src="/logo-mark.png"
              alt="OneReign logo mark"
              width={260}
              height={303}
              quality={95}
              priority={false}
              className={styles.logoImage}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
