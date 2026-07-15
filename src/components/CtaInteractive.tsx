"use client";

import React, { useState, useEffect } from "react";
import styles from "./CtaInteractive.module.css";

const tabData = [
  {
    btnLabel: "Broken Workflows",
    title: "PROCESS FAILURE DIAGNOSIS",
    desc: "Placing AI agents onto broken, manual workflows is the leading cause of system failures.",
    lossValue: "70%",
    lossLabel: "Project Failure Rate",
    savingValue: "-45%",
    savingLabel: "System Friction",
    type: "workflows",
    pct: 70,
  },
  {
    btnLabel: "Tool Bloat",
    title: "CONTEXT SWITCHING LOSS",
    desc: "Fragmented tool stacks bleed creative hours, increasing development and licensing overhead.",
    lossValue: "30%",
    lossLabel: "Productive Time Lost",
    savingValue: "3x",
    savingLabel: "Execution Speed",
    type: "tools",
    pct: 30,
  },
  {
    btnLabel: "Manual Tasks",
    title: "OPERATIONAL DRAIN READOUT",
    desc: "Manually typing CRM updates, generating drafts, and handling follow-ups limits company growth.",
    lossValue: "40h+",
    lossLabel: "Hours Lost / Month",
    savingValue: "95%",
    savingLabel: "Task Automation",
    type: "manual",
    pct: 95,
  },
];

export default function CtaInteractive() {
  const [activeTab, setActiveTab] = useState(0);
  const [blocksActive, setBlocksActive] = useState([true, false, true, false, true, false]);
  const activeData = tabData[activeTab];

  // Animation for tool switching blocks (Tab 1)
  useEffect(() => {
    if (activeTab !== 1) return;
    const interval = setInterval(() => {
      setBlocksActive((prev) => prev.map(() => Math.random() > 0.4));
    }, 800);
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className={styles.diagnosticBox}>
      {/* Tab selectors */}
      <div className={styles.tabs}>
        {tabData.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`${styles.tabBtn} ${activeTab === idx ? styles.activeTabBtn : ""}`}
          >
            {tab.btnLabel}
          </button>
        ))}
      </div>

      {/* Screen Interface */}
      <div className={styles.virtualScreen}>
        {/* Screen Header */}
        <div className={styles.screenHeader}>
          <div className={styles.screenTitle}>
            <span className={styles.screenPulse} />
            <span>{activeData.title}</span>
          </div>
          <span className={styles.screenVersion}>V1.02</span>
        </div>

        {/* Screen Grid Content */}
        <div className={styles.screenBody}>
          <div className={styles.diagnosticCopy}>
            <h4>Status Analysis</h4>
            <p>{activeData.desc}</p>
            
            <div className={styles.lossBadge}>
              <span className={styles.value}>{activeData.lossValue}</span>
              <span className={styles.label}>{activeData.lossLabel}</span>
            </div>

            <div className={styles.savingBadge}>
              <span className={styles.value}>{activeData.savingValue}</span>
              <span className={styles.label}>{activeData.savingLabel}</span>
            </div>
          </div>

          {/* Graphics pane */}
          <div className={styles.telemetryGraph}>
            {activeData.type === "workflows" && (
              <svg className={styles.progressRingSvg}>
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeWidth="6"
                  className={styles.ringBg}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeWidth="6"
                  className={styles.ringBar}
                  style={{ "--pct": activeData.pct } as React.CSSProperties}
                />
                <text x="50" y="52" className={styles.ringText} transform="rotate(90 50 50)">
                  {activeData.lossValue}
                </text>
                <text x="50" y="68" className={styles.ringSubtext} transform="rotate(90 50 50)">
                  CHAOS
                </text>
              </svg>
            )}

            {activeData.type === "tools" && (
              <div className={styles.switchContainer}>
                <div className={styles.switchState}>
                  {blocksActive.map((active, i) => (
                    <div
                      key={i}
                      className={`${styles.switchBlock} ${active ? styles.switchBlockActive : ""}`}
                    />
                  ))}
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.6rem", fontFamily: "var(--font-mono)" }}>
                  STACK SWITCHING
                </div>
                <div className={styles.switchOneSystem}>
                  SYSTEM
                </div>
              </div>
            )}

            {activeData.type === "manual" && (
              <svg className={styles.pipelineSvg} viewBox="0 0 120 100">
                {/* Horizontal flow line */}
                <path d="M 10,50 L 110,50" className={styles.pipeLine} />
                <path d="M 10,50 L 110,50" className={styles.pipeFlow} />
                
                {/* Central nodes */}
                <circle cx="20" cy="50" r="10" className={`${styles.pipeNode} ${styles.pipeNodeActive}`} />
                <circle cx="60" cy="50" r="12" className={`${styles.pipeNode} ${styles.pipeNodeActive}`} />
                <circle cx="100" cy="50" r="10" className={`${styles.pipeNode} ${styles.pipeNodeActive}`} />
                
                <text x="60" y="85" fill="#10b981" fontSize="8" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700">
                  FLOW ACTIVE
                </text>
              </svg>
            )}
          </div>
        </div>

        {/* Screen Footer */}
        <div className={styles.screenFooter}>
          <span>CORE ENGINE STATUS: SHIELDED</span>
          <span>
            CONSOLE READOUT<span className={styles.cursorBlink}>_</span>
          </span>
        </div>
      </div>
    </div>
  );
}
