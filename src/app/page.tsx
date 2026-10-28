import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import ServiceCard from "@/components/ui/ServiceCard";
import ProductCard from "@/components/ui/ProductCard";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";
import CtaBand from "@/components/ui/CtaBand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "OneReign — AI Platforms, Automation & Custom Software",
  description:
    "We build the systems your business runs on. OneReign designs and ships AI agents, automation workflows, and custom software so your team stops doing repetitive work.",
  alternates: {
    canonical: "/",
  },
};

const approachRows = [
  {
    num: "01",
    title: "Process Foundation",
    oldWay: "Bolt AI onto broken, undocumented workflows and hope for productivity gains.",
    ourWay: "Redesign and streamline the core operational process before automating a single step.",
  },
  {
    num: "02",
    title: "System Integration",
    oldWay: "Stack isolated SaaS subscriptions until teams spend half their day manually copying data.",
    ourWay: "Architect a single connected system where data flows seamlessly between tools and databases.",
  },
  {
    num: "03",
    title: "Architecture by Design",
    oldWay: "Build ad-hoc features independently and struggle with maintenance and technical debt.",
    ourWay: "Engineer modular, scalable architecture with typed contracts, proven databases, and clear boundaries.",
  },
  {
    num: "04",
    title: "Delivery & Iteration",
    oldWay: "Massive multi-month projects that ship all at once without real user validation.",
    ourWay: "Ship working systems incrementally, measure real operational impact, and iterate continuously.",
  },
];

const services = [
  {
    num: "01",
    title: "AI & Automation",
    outcome: "Replace repetitive manual operations with deterministic AI workflows and autonomous agents.",
    bullets: [
      "Custom AI agents & autonomous task execution",
      "Automated operational data pipelines",
      "Custom LLM orchestration & structured validation",
    ],
  },
  {
    num: "02",
    title: "Custom Software",
    outcome: "Production platforms built specifically around how your company operates.",
    bullets: [
      "Web applications & internal client portals",
      "Scalable backend services & typed APIs",
      "Operational dashboards & workflow engines",
    ],
  },
  {
    num: "03",
    title: "AI Products",
    outcome: "Take AI-native software ideas from technical validation to production launch.",
    bullets: [
      "AI-first product architecture & prototyping",
      "Model evaluation, fine-tuning & prompt systems",
      "Resilient product UX, guardrails & caching",
    ],
  },
  {
    num: "04",
    title: "Marketing Systems",
    outcome: "Unify content distribution, lead capture, and revenue pipelines into cohesive workflows.",
    bullets: [
      "Automated lead qualification & routing pipelines",
      "Multi-channel automated customer messaging",
      "Real-time pipeline telemetry & attribution",
    ],
  },
  {
    num: "05",
    title: "Cloud & DevOps",
    outcome: "Resilient cloud infrastructure engineered for uptime, security, and continuous delivery.",
    bullets: [
      "AWS & GCP cloud architecture & security",
      "Automated CI/CD pipelines & release tooling",
      "Containerization, orchestration & monitoring",
    ],
  },
  {
    num: "06",
    title: "Integrations & APIs",
    outcome: "Connect siloed software systems and legacy databases into unified workflows.",
    bullets: [
      "High-performance API development & orchestration",
      "Legacy database modernization & syncing",
      "Webhook architecture & event-driven messaging",
    ],
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Section 1: Hero ─────────────────────────── */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className="eyebrow">AI platforms, automation & custom software</span>

              <h1 className={styles.heroH1}>
                We build the systems your business runs on.
              </h1>

              <p className={styles.heroSub}>
                OneReign designs and ships AI agents, automation workflows and custom software — so your team stops doing repetitive work and starts moving faster.
              </p>

              <div className={styles.heroCtas}>
                <Button variant="primary" href="/contact">
                  Book a free 30-min call →
                </Button>
                <Button variant="secondary" href="/products">
                  See our products
                </Button>
              </div>

              <div className={styles.trustLine}>
                <span className={styles.trustDot} aria-hidden="true" />
                <span>Remote / Global · Est. 2025 · hello@onereign.co</span>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <ScreenshotFrame
                type="browser"
                src="/images/products/faultline-detail-desktop.png"
                alt="Faultline knowledge conflict detection interface showing live graph traversal and contradiction analysis"
                width={1440}
                height={900}
                priority={true}
                urlBarText="https://faultline-production-f69d.up.railway.app"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Approach ─────────────────────── */}
      <Section
        id="approach"
        eyebrow="Our Approach"
        heading="Systems over tool clutter."
        intro="Buying more software rarely fixes operational friction. We engineer unified workflows that eliminate manual overhead from the foundation up."
      >
        <div className={styles.approachTable}>
          <div className={styles.approachHeaderRow}>
            <span className={styles.colHeader}>Focus Area</span>
            <span className={styles.colHeader}>The Old Way</span>
            <span className={styles.colHeader}>The OneReign Way</span>
          </div>

          {approachRows.map((row) => (
            <div key={row.num} className={styles.approachRow}>
              <div className={styles.approachMeta}>
                <span className={styles.approachNum}>{row.num}</span>
                <span className={styles.approachTitle}>{row.title}</span>
              </div>
              <div className={styles.oldWayCol}>
                <span className={styles.rowLabelMobile}>Old Way:</span>
                <p className={styles.oldWayText}>{row.oldWay}</p>
              </div>
              <div className={styles.ourWayCol}>
                <span className={styles.rowLabelMobile}>OneReign Way:</span>
                <p className={styles.ourWayText}>{row.ourWay}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 3: Services ─────────────────────── */}
      <Section
        id="services"
        eyebrow="Engineering Capabilities"
        heading="Built for scale, clarity, and speed."
        intro="Six core disciplines tailored to modern companies needing production-grade automation and resilient software."
      >
        <div className={styles.servicesGrid}>
          {services.map((svc) => (
            <ServiceCard
              key={svc.num}
              num={svc.num}
              title={svc.title}
              outcome={svc.outcome}
              bullets={svc.bullets}
              href="/contact"
            />
          ))}
        </div>
      </Section>

      {/* ── Section 4: Flagship Products ────────────── */}
      <Section
        id="products"
        eyebrow="Flagship Products"
        heading="Software we engineer and run."
        intro="We don't just consult on systems — we build, ship, and operate them. Explore our real production systems."
      >
        <div className={styles.productsStack}>
          {/* Product A: Faultline */}
          <ProductCard
            id="faultline"
            name="Faultline"
            tagline="Finds where company knowledge contradicts itself."
            status="Live"
            eventOrContext="Graph Hacks 2026 (FalkorDB × WeMakeDevs)"
            description="Faultline finds where an organisation's documented knowledge contradicts itself, ranks each conflict by what sits downstream of it, and repairs it."
            caseStudyHref="/products/faultline"
            externalHref="https://faultline-production-f69d.up.railway.app/conflicts/conflict-0b1fd48ed309"
            externalLabel="Live Demo ↗"
            screenshotSrc="/images/products/faultline-detail-desktop.png"
            screenshotAlt="Faultline knowledge graph and conflict resolver desktop view"
            frameType="browser"
            urlBarText="https://faultline.onereign.co"
            tags={["FalkorDB", "Cypher", "FastAPI", "Python 3.12", "React", "Cytoscape.js"]}
          />

          {/* Product B: Quiet */}
          <ProductCard
            id="quiet"
            name="Quiet"
            tagline="Find your peaceful place."
            status="In progress"
            eventOrContext="RevenueCat Shipaton 2026"
            description="Cafes, libraries, parks and coworking spaces near you, scored live by the people who were just there."
            caseStudyHref="/products/quiet"
            externalHref="https://github.com/rajeshr20/Quiet-App"
            externalLabel="GitHub ↗"
            screenshotAlt="Quiet Android application running on Pixel 7"
            frameType="phone"
            tags={["Android", "Kotlin 2.0", "Jetpack Compose", "Supabase", "PostGIS", "RevenueCat"]}
          />
        </div>
      </Section>

      {/* ── Section 5: Final CTA Band ───────────────── */}
      <CtaBand
        heading="Tell us what's broken. We'll show you what's possible."
        subheading="Book a 30-minute discovery call directly with Rajesh and the engineering team. We'll examine your workflows and outline an actionable architecture."
        primaryCtaText="Book a free 30-min call"
        primaryCtaHref="/contact"
        email="hello@onereign.co"
      />
    </>
  );
}
