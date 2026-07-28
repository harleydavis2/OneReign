"use client";
import React, { useState, useRef } from "react";
import {
  IconAI, IconMonitor, IconSpark, IconMegaphone,
  IconCloud, IconLink
} from "@/components/Icons";
import styles from "@/app/page.module.css";

const services = [
  {
    num: "01", Icon: IconAI, title: "AI & Automation",
    desc: "AI systems that execute, not just assist. Replaces repetitive manual work across operations.",
    items: ["AI agents and workflow automation", "Marketing and communication automation", "Intelligent data processing", "Custom LLM integrations"],
  },
  {
    num: "02", Icon: IconMonitor, title: "Custom Software",
    desc: "Built around your business — not templates. Scalable, secure platforms tailored to your needs.",
    items: ["Web applications", "Mobile applications", "Backend systems and APIs", "Internal dashboards"],
  },
  {
    num: "03", Icon: IconSpark, title: "AI Products",
    desc: "From idea to AI-powered product. We help founders design, build, and launch AI-native products.",
    items: ["AI-first product architecture", "Model and API integration", "MVP to production execution", "Product UX and workflows"],
  },
  {
    num: "04", Icon: IconMegaphone, title: "Marketing Systems",
    desc: "End-to-end marketing powered by AI. Planning, content, distribution, analytics — one workflow.",
    items: ["Marketing automation platforms", "WhatsApp, SMS, email automation", "Lead management systems", "Performance analytics"],
  },
  {
    num: "05", Icon: IconCloud, title: "Cloud & DevOps",
    desc: "Infrastructure built to scale effortlessly. High reliability, zero downtime, automated deployments.",
    items: ["Cloud architecture and migration", "DevOps and CI/CD pipelines", "Microservices and APIs", "Security and compliance"],
  },
  {
    num: "06", Icon: IconLink, title: "Integrations & APIs",
    desc: "Connect every tool in your stack into one unified system. No data silos, no manual entry.",
    items: ["API design and development", "Third-party tool integrations", "Data pipeline automation", "Real-time sync systems"],
  },
];

export default function ServicesSection() {
  const [activeCard, setActiveCard] = useState<number>(2); // Default center card
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeCard < services.length - 1) {
        setActiveCard((prev) => prev + 1);
      } else if (diff < 0 && activeCard > 0) {
        setActiveCard((prev) => prev - 1);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="section" id="services" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className="eyebrow">What We Build</p>
          <h2>Custom Software.<br />Real Outcomes.</h2>
          <p className={styles.sectionBody}>
            Six focused service areas. One integrated approach to building systems that deliver real outcomes.
          </p>
        </div>

        {/* Mobile & Desktop Interactive 3D Fanned Card Deck */}
        <div 
          className={styles.servicesGrid}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {services.map((s, index) => {
            const total = services.length;
            const mid = (total - 1) / 2;
            const diffHover = index - mid;
            const diffActive = index - activeCard;

            const zValHover = Math.floor(10 + (mid - Math.abs(diffHover)) * 10);
            const zValActive = 100 - Math.abs(diffActive) * 10;
            const isSelected = activeCard === index;

            return (
              <div
                key={s.num}
                className={`card ${styles.serviceCard} ${isSelected ? styles.activeCard : ""}`}
                style={{
                  "--i": diffHover,
                  "--abs-i": Math.abs(diffHover),
                  "--z": zValHover,
                  "--mi": diffActive,
                  "--m-abs-i": Math.abs(diffActive),
                  "--mz": zValActive,
                } as React.CSSProperties}
                onClick={() => setActiveCard(index)}
              >
                <div className={styles.serviceTopRow}>
                  <span className={styles.serviceNum}>{s.num}</span>
                  <span className={styles.serviceIconWrap}><s.Icon size={20} /></span>
                </div>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <ul className={styles.serviceList}>
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Mobile / Touch interactive service pills */}
        <div className={styles.mobileServicePills}>
          {services.map((s, index) => (
            <button
              key={s.num}
              className={`${styles.mobilePillBtn} ${activeCard === index ? styles.activePillBtn : ""}`}
              onClick={() => setActiveCard(index)}
              aria-label={`Select service ${s.title}`}
            >
              {s.num}
            </button>
          ))}
        </div>

        <p className={styles.deckHelper}>Hover or tap a service to inspect</p>
      </div>
    </section>
  );
}
