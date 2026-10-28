"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { GitFork, Activity, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import styles from "./Approach.module.css";

// 36 tick marks generated for the Future-Ready rotating dial
const DIAL_TICKS = Array.from({ length: 36 }, (_, i) => {
  const angle = (i * 360) / 36;
  const rad = (angle * Math.PI) / 180;
  const cx = 90;
  const cy = 90;
  const r1 = 66;
  const isMajor = i % 6 === 0;
  const r2 = isMajor ? 82 : 75;

  const x1 = cx + r1 * Math.cos(rad);
  const y1 = cy + r1 * Math.sin(rad);
  const x2 = cx + r2 * Math.cos(rad);
  const y2 = cy + r2 * Math.sin(rad);

  return { angle, x1, y1, x2, y2, isMajor };
});

export default function Approach() {
  return (
    <section className={styles.approachSection} id="approach">
      <Container>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>Delivery Methodology</span>
          </div>
          <h2 className={styles.sectionTitle}>Our Approach</h2>
        </div>

        {/* ── Bento Layout: 3 Rows, 2 Cards per Row ─────────────────── */}
        <div className={styles.bentoContainer}>
          {/* ── ROW 1: Wide (Discovery First) + Narrow (Process Before Tools) ── */}
          <div className={styles.bentoRow}>
            {/* Card 1: Discovery First (Wide) */}
            <motion.div
              className={`${styles.bentoCard} ${styles.cardWide}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.cardTextContent}>
                <h3 className={styles.cardHeading}>Discovery First</h3>
                <p className={styles.cardBody}>
                  We begin by <strong>mapping your process</strong>, finding what is slow or broken, and <strong>agreeing clear goals</strong> before we build anything.
                </p>
              </div>

              {/* Visual 1: Row of 3 offset surface cards */}
              <div className={styles.offsetCardsTrack}>
                <div className={styles.offsetCard}>
                  <div className={styles.offsetCardHeader}>
                    <GitFork className={styles.offsetCardIcon} size={18} aria-hidden="true" />
                    <span className={styles.offsetCardTitle}>Map</span>
                  </div>
                  <p className={styles.offsetCardDesc}>
                    Operational flows & manual friction points
                  </p>
                </div>

                <div className={styles.offsetCard}>
                  <div className={styles.offsetCardHeader}>
                    <Activity className={styles.offsetCardIcon} size={18} aria-hidden="true" />
                    <span className={styles.offsetCardTitle}>Measure</span>
                  </div>
                  <p className={styles.offsetCardDesc}>
                    Team turnaround time & data handoffs
                  </p>
                </div>

                <div className={styles.offsetCard}>
                  <div className={styles.offsetCardHeader}>
                    <CheckCircle2 className={styles.offsetCardIcon} size={18} aria-hidden="true" />
                    <span className={styles.offsetCardTitle}>Decide</span>
                  </div>
                  <p className={styles.offsetCardDesc}>
                    Target architecture & measurable ROI
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Process Before Tools (Narrow) */}
            <motion.div
              className={`${styles.bentoCard} ${styles.cardNarrow}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.cardTextContent}>
                <h3 className={styles.cardHeading}>Process Before Tools</h3>
                <p className={styles.cardBody}>
                  We <strong>fix the workflow first</strong>, then automate it, so AI does not <strong>speed up a broken process</strong>.
                </p>
              </div>

              {/* Visual 2: Before / After Flow Diagram */}
              <div className={styles.flowContainer}>
                {/* Before Row */}
                <div className={styles.flowRow}>
                  <span className={`${styles.flowBadge} ${styles.flowBadgeBefore}`}>
                    Before
                  </span>
                  <div className={styles.flowSteps}>
                    <span className={styles.flowStep}>Broken Process</span>
                    <span className={styles.flowArrow}>→</span>
                    <span className={styles.flowStep}>Add AI Tools</span>
                    <span className={styles.flowArrow}>→</span>
                    <span className={`${styles.flowStepFinal} ${styles.flowStepFinalBad}`}>
                      Bottlenecks
                    </span>
                  </div>
                </div>

                {/* After Row */}
                <div className={styles.flowRow}>
                  <span className={`${styles.flowBadge} ${styles.flowBadgeAfter}`}>
                    After
                  </span>
                  <div className={styles.flowSteps}>
                    <span className={styles.flowStep}>Streamline</span>
                    <span className={styles.flowArrow}>→</span>
                    <span className={styles.flowStep}>Automate</span>
                    <span className={styles.flowArrow}>→</span>
                    <span className={`${styles.flowStepFinal} ${styles.flowStepFinalGood}`}>
                      Scale
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── ROW 2: Narrow (One Connected System) + Wide (Built to Be Reliable) ── */}
          <div className={styles.bentoRow}>
            {/* Card 3: One Connected System (Narrow) */}
            <motion.div
              className={`${styles.bentoCard} ${styles.cardNarrow}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.cardTextContent}>
                <h3 className={styles.cardHeading}>One Connected System</h3>
                <p className={styles.cardBody}>
                  Every tool, data source and agent <strong>works together</strong> instead of living in <strong>separate silos</strong>.
                </p>
              </div>

              {/* Visual 3: 5 nodes connected by animated dashed lines */}
              <div className={styles.systemDiagramWrapper}>
                <svg
                  viewBox="0 0 380 180"
                  className={styles.systemSvg}
                  aria-hidden="true"
                >
                  {/* Connecting dashed lines */}
                  <line x1="190" y1="90" x2="190" y2="30" className={styles.dashedLine} />
                  <line x1="190" y1="90" x2="190" y2="150" className={styles.dashedLine} />
                  <line x1="190" y1="90" x2="55" y2="90" className={styles.dashedLine} />
                  <line x1="190" y1="90" x2="325" y2="90" className={styles.dashedLine} />

                  {/* Satellite Node 1: AI Agents (Top) */}
                  <rect x="135" y="12" width="110" height="34" rx="8" className={styles.nodeSatellite} />
                  <text x="190" y="29" className={styles.nodeLabel}>AI AGENTS</text>

                  {/* Satellite Node 2: CRM & Tools (Left) */}
                  <rect x="8" y="73" width="94" height="34" rx="8" className={styles.nodeSatellite} />
                  <text x="55" y="90" className={styles.nodeLabel}>CRM & TOOLS</text>

                  {/* Satellite Node 3: Databases (Right) */}
                  <rect x="278" y="73" width="94" height="34" rx="8" className={styles.nodeSatellite} />
                  <text x="325" y="90" className={styles.nodeLabel}>DATABASES</text>

                  {/* Satellite Node 4: Webhooks / APIs (Bottom) */}
                  <rect x="135" y="134" width="110" height="34" rx="8" className={styles.nodeSatellite} />
                  <text x="190" y="151" className={styles.nodeLabel}>APIS & SYNC</text>

                  {/* Central Hub Node: OneReign Core */}
                  <rect x="130" y="68" width="120" height="44" rx="10" className={styles.nodeCenter} />
                  <text x="190" y="90" className={`${styles.nodeLabel} ${styles.nodeLabelCenter}`}>
                    ONEREIGN CORE
                  </text>
                </svg>
              </div>
            </motion.div>

            {/* Card 4: Built to Be Reliable (Wide) */}
            <motion.div
              className={`${styles.bentoCard} ${styles.cardWide}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.cardTextContent}>
                <h3 className={styles.cardHeading}>Built to Be Reliable</h3>
                <p className={styles.cardBody}>
                  We <strong>test the edge cases</strong> and <strong>keep clear logs</strong>, so you can see what the system did and why.
                </p>
              </div>

              {/* Visual 4: Fake log table (4 rows, Title / Type / Status, generic labels, no dates/metrics) */}
              <div className={styles.logTableWrapper}>
                <table className={styles.logTable}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.logTitle}>Payload validation</td>
                      <td className={styles.logType}>Schema Guard</td>
                      <td>
                        <span className={styles.logStatus}>
                          <span className={styles.statusDot} />
                          Verified
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.logTitle}>State synchronization</td>
                      <td className={styles.logType}>Event Stream</td>
                      <td>
                        <span className={styles.logStatus}>
                          <span className={styles.statusDot} />
                          Committed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.logTitle}>Agent routing policy</td>
                      <td className={styles.logType}>Deterministic Rule</td>
                      <td>
                        <span className={styles.logStatus}>
                          <span className={styles.statusDot} />
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.logTitle}>Edge case circuit</td>
                      <td className={styles.logType}>Fallback Action</td>
                      <td>
                        <span className={styles.logStatus}>
                          <span className={styles.statusDot} />
                          Protected
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* ── ROW 3: Wide (Smooth Handover) + Narrow (Future-Ready) ──── */}
          <div className={styles.bentoRow}>
            {/* Card 5: Smooth Handover (Wide) */}
            <motion.div
              className={`${styles.bentoCard} ${styles.cardWide}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.cardTextContent}>
                <h3 className={styles.cardHeading}>Smooth Handover</h3>
                <p className={styles.cardBody}>
                  You get <strong>documentation, access and a walkthrough</strong>, so your team can <strong>run it after launch</strong>.
                </p>
              </div>

              {/* Visual 5: Table titled "What you get" with Included chips in #C6FF4D */}
              <div className={styles.handoverTableWrapper}>
                <div className={styles.handoverHeader}>What you get</div>
                <div className={styles.handoverList}>
                  <div className={styles.handoverItem}>
                    <span className={styles.handoverName}>Documentation</span>
                    <span className={styles.includedChip}>Included</span>
                  </div>
                  <div className={styles.handoverItem}>
                    <span className={styles.handoverName}>Dashboard access</span>
                    <span className={styles.includedChip}>Included</span>
                  </div>
                  <div className={styles.handoverItem}>
                    <span className={styles.handoverName}>Runbook</span>
                    <span className={styles.includedChip}>Included</span>
                  </div>
                  <div className={styles.handoverItem}>
                    <span className={styles.handoverName}>Walkthrough</span>
                    <span className={styles.includedChip}>Included</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 6: Future-Ready (Narrow) */}
            <motion.div
              className={`${styles.bentoCard} ${styles.cardNarrow}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.cardTextContent}>
                <h3 className={styles.cardHeading}>Future-Ready</h3>
                <p className={styles.cardBody}>
                  Built to <strong>grow as your business grows</strong>.
                </p>
              </div>

              {/* Visual 6: Rotating ring of tick marks around OneReign logo mark */}
              <div className={styles.rotatingDialContainer}>
                <svg
                  viewBox="0 0 180 180"
                  className={styles.dialSvg}
                  aria-hidden="true"
                >
                  {/* Concentric subtle guide rings */}
                  <circle
                    cx="90"
                    cy="90"
                    r="60"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.06)"
                    strokeWidth="1"
                  />
                  <circle
                    cx="90"
                    cy="90"
                    r="84"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.04)"
                    strokeWidth="1"
                  />

                  {/* 36 Radial tick marks */}
                  {DIAL_TICKS.map((t, i) => (
                    <line
                      key={i}
                      x1={t.x1}
                      y1={t.y1}
                      x2={t.x2}
                      y2={t.y2}
                      stroke={
                        t.isMajor ? "var(--accent)" : "rgba(255, 255, 255, 0.25)"
                      }
                      strokeWidth={t.isMajor ? 1.5 : 1}
                      strokeLinecap="round"
                    />
                  ))}
                </svg>

                {/* Center OneReign logo mark */}
                <div className={styles.centerLogoWrapper}>
                  <Image
                    src="/logo-mark.png"
                    alt="OneReign logo mark"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
