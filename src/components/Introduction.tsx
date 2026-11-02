"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Button from "@/components/ui/Button";
import styles from "./Introduction.module.css";

interface TileItem {
  id: string;
  src: string;
  alt: string;
}

const tiles: TileItem[] = [
  {
    id: "tile-1",
    src: "/images/intro/tile-1.png",
    alt: "Faultline Knowledge Graph Contradiction Resolution Architecture",
  },
  {
    id: "tile-2",
    src: "/images/intro/tile-2.png",
    alt: "Autonomous Agent Orchestration and Deterministic Task Execution",
  },
  {
    id: "tile-3",
    src: "/images/intro/tile-3.png",
    alt: "Quiet Live PostGIS Spatial Calculation and Scoring Function",
  },
  {
    id: "tile-4",
    src: "/images/intro/tile-4.png",
    alt: "Topological Contradiction Pruning Engine",
  },
  {
    id: "tile-5",
    src: "/images/intro/tile-5.png",
    alt: "Real-time Telemetry Stream and State Machine Workflow",
  },
  {
    id: "tile-6",
    src: "/images/intro/tile-6.png",
    alt: "High-Throughput Distributed API Gateway Infrastructure",
  },
  {
    id: "tile-7",
    src: "/images/intro/tile-7.png",
    alt: "Cypher Graph Automated Alignment and Entity Resolution",
  },
  {
    id: "tile-8",
    src: "/images/intro/tile-8.png",
    alt: "Cryptographic Event Log and Immutable Audit Trail",
  },
];

const row1 = tiles.slice(0, 4);
const row2 = tiles.slice(4, 8);

export default function Introduction() {
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className={styles.introSection}>
      <div className={styles.layoutWrapper}>
        <div className={styles.columns}>
          {/* Left Column: 45% on desktop, vertically centered */}
          <div className={styles.textCol}>
            <h2 className="font-display-sans text-[clamp(32px,4vw,56px)] font-bold text-text leading-[1.1] tracking-tight">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={prefersReducedMotion ? false : { y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, ease, delay: 0.05 }}
                >
                  Systems that run.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={prefersReducedMotion ? false : { y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, ease, delay: 0.16 }}
                >
                  Results that last.
                </motion.span>
              </span>
            </h2>

            {/* Paragraph fades in */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease, delay: 0.26 }}
              className="mt-6 font-display-sans text-[18px] text-muted leading-relaxed max-w-[52ch]"
            >
              OneReign designs and ships AI agents, automation workflows and
              custom software that take repetitive work off your team. We
              combine clear strategy with careful engineering, so what we build
              keeps working after launch.
            </motion.p>

            {/* The two buttons stagger in */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease, delay: 0.35 }}
              >
                <Button variant="primary" href="/about">
                  About us
                </Button>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease, delay: 0.44 }}
              >
                <Button variant="secondary" href="/works">
                  See our work
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: 55% on desktop, bleeding to the right edge */}
          <div className={styles.mosaicCol}>
            {/* Left-edge gradient mask */}
            <div className={styles.maskLeft} aria-hidden="true" />
            {/* Top and bottom fade masks */}
            <div className={styles.maskTop} aria-hidden="true" />
            <div className={styles.maskBottom} aria-hidden="true" />

            <div className={styles.mosaicStack}>
              {/* Row 1: Marquee moving Left (30s) */}
              <div className={styles.marqueeRowLeft}>
                {/* Original tiles */}
                <div className={styles.trackGroup}>
                  {row1.map((tile) => (
                    <div key={`orig-r1-${tile.id}`} className={styles.tile}>
                      <Image
                        src={tile.src}
                        alt={tile.alt}
                        width={440}
                        height={330}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Cloned tiles for infinite seamless loop */}
                <div className={styles.trackGroup} aria-hidden="true">
                  {row1.map((tile) => (
                    <div key={`clone-r1-${tile.id}`} className={styles.tile}>
                      <Image
                        src={tile.src}
                        alt={tile.alt}
                        width={440}
                        height={330}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Marquee moving Right (38s, hidden on mobile) */}
              <div className={`${styles.marqueeRowRight} ${styles.secondRow}`}>
                {/* Original tiles */}
                <div className={styles.trackGroup}>
                  {row2.map((tile) => (
                    <div key={`orig-r2-${tile.id}`} className={styles.tile}>
                      <Image
                        src={tile.src}
                        alt={tile.alt}
                        width={440}
                        height={330}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Cloned tiles for infinite seamless loop */}
                <div className={styles.trackGroup} aria-hidden="true">
                  {row2.map((tile) => (
                    <div key={`clone-r2-${tile.id}`} className={styles.tile}>
                      <Image
                        src={tile.src}
                        alt={tile.alt}
                        width={440}
                        height={330}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
