import type { Metadata } from "next";
import Link from "next/link";
import {
  IconAI, IconMonitor, IconSpark, IconMegaphone,
  IconCloud, IconLink, IconCheck, IconX, IconArrow, IconLayers,
} from "@/components/Icons";
import { Cover } from "@/components/ui/cover";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "OneReign — AI Platforms, Automation & Custom Software",
  description:
    "OneReign builds AI platforms, automation workflows, and custom software for modern businesses. Explore Conesta and RUBL — products built to replace chaos with clarity.",
};

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
    desc: "Infrastructure that scales. Cloud architecture supporting reliability, security, and delivery.",
    items: ["Cloud architecture (AWS, GCP)", "CI/CD pipelines", "Containerization and orchestration", "Performance optimization"],
  },
  {
    num: "06", Icon: IconLink, title: "Integration & Support",
    desc: "Make your tools work together. We integrate and modernize existing systems into unified workflows.",
    items: ["Tool and platform integrations", "Legacy system modernization", "API development and orchestration", "Long-term managed support"],
  },
];

const comparison = [
  {
    ourWay: "Redesign the process first",
    oldWay: "Bolt AI onto broken processes",
    stat: "70% of AI failures stem from poor underlying workflows. We fix the foundation first.",
  },
  {
    ourWay: "One integrated system",
    oldWay: "Stack tools until something works",
    stat: "Fragmented tech stacks cost companies 30% of their productive time.",
  },
  {
    ourWay: "Everything connected by design",
    oldWay: "Build features and hope they connect",
    stat: "Unified system architecture reduces long-term technical debt by up to 50%.",
  },
  {
    ourWay: "Launch and iterate",
    oldWay: "Launch and pray",
    stat: "Continuous feedback loops improve user retention by 3x.",
  },
];

const ticker = "AI & Automation ♦ Custom Software ♦ AI Products ♦ Marketing Systems ♦ Cloud & DevOps ♦ Integration ♦ Managed Support";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBadge}>
            <span className="badge">AI-First — System-Focused</span>
            <span className={styles.metaBadge}>Est. 2025 · Remote / Global</span>
          </div>
          <h1 className={styles.heroH1}>
            Your business runs<br />on <Cover>systems.</Cover><br />
            <span className={styles.heroAccent}>We build them.</span>
          </h1>
          <p className={styles.heroSub}>
            OneReign builds AI platforms, automation workflows, and custom software designed with clarity.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/contact" className="btn btn-primary">Start a Project <IconArrow size={16} /></Link>
            <Link href="#approach" className="btn btn-outline">Our Approach</Link>
          </div>
        </div>

        <div className="marquee-wrap">
          <div className="marquee-inner">
            {[...Array(4)].map((_, i) => (
              <span key={i}>{ticker}</span>
            ))}
          </div>
        </div>
      </section>
      
      {/* 3D Product Showcase Scroll Animation */}
      <section className="section" style={{ background: "var(--bg-secondary)", paddingBottom: "100px", paddingTop: "60px" }}>
        <ContainerScroll
          titleComponent={
            <>
              <p className="eyebrow" style={{ justifyContent: "center", marginBottom: "16px" }}>Platform Preview</p>
              <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 800, color: "var(--dark-blue)", lineHeight: 1.15, letterSpacing: "-0.025em" }}>
                Unleash the power of <br />
                <span className={styles.heroAccent} style={{ fontSize: "clamp(2.5rem, 5.5vw, 3.8rem)", display: "block", marginTop: "8px" }}>
                  Autonomous Workflows
                </span>
              </h2>
            </>
          }
        >
          <img
            src="/hero-ai.png"
            alt="OneReign system dashboard"
            draggable={false}
          />
        </ContainerScroll>
      </section>

      {/* Approach */}
      <section className="section" id="approach">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="eyebrow">Our Approach</p>
            <h2>We redesign the process.<br />Not just the tools.</h2>
            <p className={styles.sectionBody}>
              Most teams bolt AI onto broken processes. We start by understanding what is broken — then build a unified system that solves it permanently.
            </p>
          </div>

          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonHeader}>
              <span className={styles.ourWayLabel}>Our Way</span>
              <span className={styles.oldWayLabel}>Old Way</span>
            </div>
            {comparison.map((item, i) => (
              <div key={i} className={styles.comparisonRow}>
                <div className={styles.ourWayCell}>
                  <span className={styles.checkIcon}><IconCheck size={12} /></span>
                  <div>
                    <p className={styles.comparisonTitle}>{item.ourWay}</p>
                    <p className={styles.comparisonStat}>{item.stat}</p>
                  </div>
                </div>
                <div className={styles.vsLabel}>vs</div>
                <div className={styles.oldWayCell}>
                  <span className={styles.crossIcon}><IconX size={10} /></span>
                  <p className={styles.comparisonTitle}>{item.oldWay}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" id="services" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="eyebrow">What We Build</p>
            <h2>Custom Software.<br />Real Outcomes.</h2>
            <p className={styles.sectionBody}>
              Six focused service areas. One integrated approach to building systems that deliver real outcomes.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((s, index) => {
              const total = services.length;
              const mid = (total - 1) / 2;
              const diff = index - mid;
              const zVal = Math.floor(10 + (mid - Math.abs(diff)) * 10); // Elevated z-index order

              return (
                <div 
                  key={s.num} 
                  className={`card ${styles.serviceCard}`}
                  style={{
                    "--i": diff,
                    "--abs-i": Math.abs(diff),
                    "--z": zVal,
                  } as React.CSSProperties}
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
          <p className={styles.deckHelper}>Hover a service to bring it forward</p>
        </div>
      </section>

      {/* Manifesto */}
      <section className={`section ${styles.manifesto}`} id="manifesto">
        <div className="container">
          <div className={styles.manifestoInner}>
            <div className={styles.manifestoText}>
              <p className="eyebrow">Beyond Services</p>
              <h2>
                We don&apos;t just build for others.<br />
                <span className={styles.heroAccent}>We build for ourselves.</span>
              </h2>
              <p className={styles.sectionBody}>
                Every system we ship for clients is informed by the products we build internally. Real users, real scale, real proof.
              </p>
              <Link href="/products" className="btn btn-primary" style={{ marginTop: "32px" }}>
                See Our Products <IconArrow size={16} />
              </Link>
            </div>
            <div className={styles.manifestoStats}>
              {[
                { num: "2", label: "Live Products" },
                { num: "3+", label: "AI Agents" },
                { num: "∞", label: "Ambition" },
              ].map((s) => (
                <div key={s.label} className={styles.statCard}>
                  <span className={styles.statNum}>{s.num}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="marquee-wrap" style={{ marginTop: "80px" }}>
          <div className="marquee-inner">
            {[...Array(4)].map((_, i) => (
              <span key={i}>AI Platforms • Automation • Custom Software • Revenue Tools • Learning Systems • Product Engineering&nbsp;&nbsp;&nbsp;</span>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="section" id="products" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="eyebrow">Our Products</p>
            <h2>Built by OneReign.<br />Powered by AI.</h2>
          </div>

          <div className={styles.productsPreview}>
            <a href="https://conesta.in" target="_blank" rel="noopener noreferrer" className={`card ${styles.productCard}`}>
              <div className={styles.productCardAccent} />
              <div className={styles.productCardTag}>
                <IconLayers size={14} />
                Learning Platform
              </div>
              <h3 className={styles.productCardTitle}>Conesta</h3>
              <p className={styles.productCardDesc}>Where students learn together. AI-powered roadmaps, real-time study rooms, and a community-driven resource library.</p>
              <span className={styles.productCardCta}>Visit Conesta <IconArrow size={14} /></span>
            </a>
            <a href="https://rubl.in" target="_blank" rel="noopener noreferrer" className={`card ${styles.productCard}`}>
              <div className={styles.productCardAccentDeep} />
              <div className={styles.productCardTag}>
                <IconSpark size={14} />
                Revenue Platform
              </div>
              <h3 className={styles.productCardTitle}>rubl</h3>
              <p className={styles.productCardDesc}>Sales on autopilot. An AI-powered revenue platform with CRM, AI marketing, and automated product demos.</p>
              <span className={styles.productCardCta}>Visit RUBL <IconArrow size={14} /></span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section ${styles.ctaSection}`} id="cta">
        <div className="container">
          <div className={styles.ctaInner}>
            <h2>Ready to harness your<br /><span className={styles.heroAccent}>Op/Intelligence?</span></h2>
            <p className={styles.ctaBody}>
              Tell us what is broken. We will show you what is possible. Every project starts with a conversation — no commitment required.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/contact" className="btn btn-primary">Start a Project <IconArrow size={16} /></Link>
              <a href="mailto:hello@onereign.co" className="btn btn-outline">hello@onereign.co</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
