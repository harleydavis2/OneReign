"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/ui/CtaBand";
import styles from "./page.module.css";

const founders = [
  {
    id: "rajesh",
    name: "R Rajesh",
    role: "CEO & Founder",
    badge: "CEO",
    category: ["all", "founders", "executive"],
    tagline: "Driving systems, graph intelligence & operations.",
    bio: "Chief Executive Officer at OneReign. Driving corporate vision, architectural backbone, and operational workflows that empower modern enterprises globally. Core contributor to Faultline (FalkorDB) and Quiet backend architecture.",
    initials: "RR",
    image: "/team/r-rajesh.jpg",
    skills: ["System Architecture", "Graph Databases (FalkorDB)", "PostgreSQL 17 / PostGIS", "Enterprise Workflow"],
  },
  {
    id: "nikil",
    name: "Nikil",
    role: "CMO",
    badge: "CMO",
    category: ["all", "executive"],
    tagline: "Leading global growth & product strategy.",
    bio: "Chief Marketing Officer at OneReign. Leading global growth, brand strategy, client engagements, and product marketing.",
    initials: "N",
    image: "/team/nikil.jpg",
    skills: ["Global Growth", "Revenue Ops", "Strategic Alliances", "Product Marketing"],
  },
  {
    id: "allen",
    name: "Allen Mathew",
    role: "CTO & Co-Founder",
    badge: "CTO",
    category: ["all", "founders", "engineering", "executive"],
    tagline: "Building core AI platforms & products.",
    bio: "Chief Technology Officer at OneReign. Pioneering AI-native platforms and technical architecture. Focused on multi-agent intelligence, technical scalability, and platform engineering.",
    initials: "AM",
    image: "/team/allen-mathew.jpg",
    skills: ["AI Platforms", "Multi-Agent Systems", "Full-Stack Dev", "Platform Reliability"],
  },
  {
    id: "harley",
    name: "Harley Davis",
    role: "COO & Co-Founder",
    badge: "COO",
    category: ["all", "founders", "engineering", "executive"],
    tagline: "Where code meets architecture.",
    bio: "Chief Operating Officer at OneReign. Driving operational execution, systems architecture, cloud reliability, Android UI development for Quiet, and infrastructure automation.",
    initials: "HD",
    image: "/team/harley-davis.jpg",
    skills: ["Cloud Architecture", "Jetpack Compose / Kotlin", "DevOps Pipelines", "Security Systems"],
  },
];

const categories = [
  { id: "all", label: "All Builders" },
  { id: "founders", label: "Founders" },
  { id: "executive", label: "Executive" },
  { id: "engineering", label: "Engineering & Product" },
];

const whyPoints = [
  { title: "Systems First", desc: "We redesign and codify operational processes before automating a single step." },
  { title: "Engineering Depth", desc: "No shallow wrappers. We build graph engines, PostGIS spatial queries, and native apps." },
  { title: "Production Proven", desc: "We build, deploy, and operate our own software (Faultline, Quiet) in public." },
  { title: "Remote / Global", desc: "Distributed engineering team delivering systems worldwide with sub-24h turnaround." },
  { title: "Type-Safe Contracts", desc: "Everything is connected by strict schemas, predictable APIs, and zero fragile dependencies." },
  { title: "Outcome-Driven", desc: "No billing bloat. Every project delivers measured operational speed and clarity." },
];

function FounderPortrait({ initials, image, name, badge }: { initials: string; image?: string; name: string; badge: string }) {
  const [imgSrc, setImgSrc] = useState<string | null>(image || null);

  return (
    <div className={styles.portraitHeroFrame}>
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={`Portrait of ${name}`}
          width={400}
          height={400}
          className={styles.portraitPhoto}
          onError={() => setImgSrc(null)}
        />
      ) : (
        <span className={styles.portraitInitials}>{initials}</span>
      )}
      <div className={styles.portraitOverlay} />
      <div className={styles.portraitBadge}>{badge}</div>
    </div>
  );
}

function ModalAvatar({ initials, image, name }: { initials: string; image?: string; name: string }) {
  const [imgSrc, setImgSrc] = useState<string | null>(image || null);

  return (
    <div className={styles.modalAvatar}>
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={`Avatar of ${name}`}
          width={80}
          height={80}
          className={styles.modalPhoto}
          onError={() => setImgSrc(null)}
        />
      ) : (
        <span className={styles.modalInitials}>{initials}</span>
      )}
    </div>
  );
}

export default function AboutPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedMember, setSelectedMember] = useState<typeof founders[0] | null>(null);

  const filteredFounders = founders.filter((f) => f.category.includes(activeCategory));

  return (
    <>
      {/* ── Page Hero ───────────────────────────────── */}
      <section className={styles.pageHero}>
        <div className="container">
          <span className="eyebrow">About OneReign</span>
          <h1 className={styles.pageHeroH1}>
            AI should eliminate manual work.<br />
            Not multiply it.
          </h1>
          <p className={styles.pageHeroSub}>
            Founded in 2025 by systems engineers who saw businesses drowning in disconnected SaaS subscriptions and broken manual workflows. OneReign builds the operational backbone for modern companies — through scalable systems, AI-driven platforms, and a relentless focus on verified clarity.
          </p>
        </div>
      </section>

      {/* ── Team Section ────────────────────────────── */}
      <section className={styles.teamSection} id="founders">
        <div className="container">
          <div className={styles.teamHeaderRow}>
            <div className={styles.teamHeaderLeft}>
              <span className="eyebrow">The Leadership</span>
              <h2 className={styles.sectionH2}>Meet the Builders.</h2>
              <p className={styles.teamSub}>
                Engineers, architects, and product strategists shaping autonomous systems and graph-native software.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className={styles.filterTabs}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.activeFilter : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.foundersGrid}>
            {filteredFounders.map((f) => (
              <div
                key={f.name}
                className={styles.founderCard}
                onClick={() => setSelectedMember(f)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedMember(f);
                  }
                }}
              >
                <FounderPortrait initials={f.initials} image={f.image} name={f.name} badge={f.badge} />

                <div className={styles.founderCardContent}>
                  <h3 className={styles.founderName}>{f.name}</h3>
                  <p className={styles.founderRole}>{f.role} · OneReign</p>
                  <p className={styles.founderTagline}>&ldquo;{f.tagline}&rdquo;</p>

                  <div className={styles.inspectBtn}>
                    <span>View Bio</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bio Modal ───────────────────────────────── */}
      {selectedMember && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedMember(null)}>
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className={styles.modalClose}
              onClick={() => setSelectedMember(null)}
              aria-label="Close dialog"
            >
              ✕
            </button>
            <div className={styles.modalHeader}>
              <ModalAvatar initials={selectedMember.initials} image={selectedMember.image} name={selectedMember.name} />
              <div>
                <div className={styles.roleBadge}>{selectedMember.badge}</div>
                <h3 id="modal-title" className={styles.modalName}>{selectedMember.name}</h3>
                <p className={styles.modalRole}>{selectedMember.role} · OneReign</p>
              </div>
            </div>
            <p className={styles.modalBio}>{selectedMember.bio}</p>
            <div className={styles.skillsSection}>
              <h4 className={styles.skillsTitle}>Core Disciplines</h4>
              <div className={styles.skillsGrid}>
                {selectedMember.skills.map((skill) => (
                  <span key={skill} className={styles.skillPill}>{skill}</span>
                ))}
              </div>
            </div>
            <div className={styles.modalActions}>
              <Button
                variant="primary"
                href="/contact"
                onClick={() => setSelectedMember(null)}
                className={styles.modalCta}
              >
                Connect with {selectedMember.name.split(" ")[0]} →
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Why OneReign ────────────────────────────── */}
      <section className={styles.whySection} id="why">
        <div className="container">
          <div className={styles.whyLayout}>
            <div className={styles.whyLeft}>
              <span className="eyebrow">Our Principles</span>
              <h2 className={styles.sectionH2}>Engineered for operational clarity.</h2>
              <p className={styles.bodyText}>
                We refuse to ship brittle boilerplate. Every system we build has verified test coverage, explicit error handling, and documentation that actually matches production behavior.
              </p>
              <div style={{ marginTop: "32px" }}>
                <Button variant="primary" href="/contact">
                  Work with us →
                </Button>
              </div>
            </div>
            <div className={styles.whyGrid}>
              {whyPoints.map((p, i) => (
                <div key={p.title} className={styles.whyCard}>
                  <span className={styles.whyNum}>0{i + 1}</span>
                  <h4 className={styles.whyTitle}>{p.title}</h4>
                  <p className={styles.whyDesc}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Ready to eliminate repetitive work?"
        subheading="Book a 30-minute introductory call directly with our engineering team."
        primaryCtaText="Book a free 30-min call"
        primaryCtaHref="/contact"
      />
    </>
  );
}
