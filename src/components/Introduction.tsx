"use client";

import React from "react";
import Image from "next/image";
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

// Row 1 (first 4 items, duplicated for infinite seamless loop)
const row1 = tiles.slice(0, 4);
const row1Loop = [...row1, ...row1];

// Row 2 (next 4 items, duplicated for infinite seamless loop)
const row2 = tiles.slice(4, 8);
const row2Loop = [...row2, ...row2];

export default function Introduction() {
  return (
    <section className={styles.introSection}>
      <div className={styles.layoutWrapper}>
        <div className={styles.columns}>
          {/* Left Column: 45% on desktop, vertically centered */}
          <div className={styles.textCol}>
            <h2 className="font-display-sans text-[clamp(32px,4vw,56px)] font-bold text-text leading-[1.1] tracking-tight">
              Systems that run.
              <br />
              Results that last.
            </h2>

            <p className="mt-6 font-display-sans text-[18px] text-muted leading-relaxed max-w-[52ch]">
              OneReign designs and ships AI agents, automation workflows and
              custom software that take repetitive work off your team. We
              combine clear strategy with careful engineering, so what we build
              keeps working after launch.
            </p>

            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <Button variant="primary" href="/about">
                About us
              </Button>
              <Button variant="secondary" href="/works">
                See our work
              </Button>
            </div>
          </div>

          {/* Right Column: 55% on desktop, bleeding to the right edge */}
          <div className={styles.mosaicCol}>
            {/* Left-edge gradient mask (200px, #0B0B0D to transparent) */}
            <div className={styles.maskLeft} aria-hidden="true" />
            {/* Top and bottom fade masks */}
            <div className={styles.maskTop} aria-hidden="true" />
            <div className={styles.maskBottom} aria-hidden="true" />

            <div className={styles.mosaicStack}>
              {/* Row 1: Marquee moving Left */}
              <div className={styles.marqueeRowLeft}>
                {row1Loop.map((tile, idx) => (
                  <div key={`row1-${tile.id}-${idx}`} className={styles.tile}>
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

              {/* Row 2: Marquee moving Right (hidden on mobile) */}
              <div className={`${styles.marqueeRowRight} ${styles.secondRow}`}>
                {row2Loop.map((tile, idx) => (
                  <div key={`row2-${tile.id}-${idx}`} className={styles.tile}>
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
    </section>
  );
}
