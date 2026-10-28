import type { Metadata } from "next";
import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/ui/CtaBand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Quiet — Case Study",
  description:
    "Find your peaceful place. Cafes, libraries, parks and coworking spaces near you, scored live by the people who were just there.",
  alternates: {
    canonical: "/products/quiet",
  },
  openGraph: {
    title: "Quiet — Case Study | OneReign",
    description:
      "Architecture and design case study for Quiet: Android app built for RevenueCat Shipaton 2026. Supabase Postgres 17, PostGIS geo-queries, and live Quiet Score.",
    images: ["/images/products/faultline-detail-desktop.png"],
  },
};

const features = [
  {
    title: "Explore",
    desc: "Sort nearby spaces by nearest or quietest first with instant geographic feedback.",
  },
  {
    title: "Map",
    desc: "OpenStreetMap integration powered by osmdroid, showing real-time quiet markers.",
  },
  {
    title: "Human Filters",
    desc: "Filter by venue category, distance radius, minimum score, indoor/outdoor, and open now.",
  },
  {
    title: "Place Detail",
    desc: "Live Quiet Score, recent visitor count, operating hours, walking directions, and bookmarks.",
  },
  {
    title: "Report in Seconds",
    desc: "Ultra-fast four-factor slider: noise, crowd, solo comfort, and friction (1–5 scale).",
  },
  {
    title: "Saved Places",
    desc: "Organize personal sanctuaries and favorite quiet spots for instant offline lookup.",
  },
  {
    title: "Why This Score AI",
    desc: "Optional AI contextual summary explaining venue scores, cached per new report.",
  },
  {
    title: "Quiet Alerts",
    desc: "Background push notifications alerting you when a saved place drops into calm thresholds.",
  },
  {
    title: "Premium Paywall",
    desc: "Deeper filters (75+ and 90+ score) via RevenueCat. Finding a place is never locked.",
  },
];

const roadmapItems = [
  {
    deliverable: "Schema, RLS, geo queries, seed data, hosted API",
    status: "Live",
    tag: "live",
  },
  {
    deliverable: "Explore, Map, Filters, Detail, Report, Saved",
    status: "Built",
    tag: "built",
  },
  {
    deliverable: "AI explanations, quiet alerts, Premium paywall, monitoring",
    status: "In review",
    tag: "review",
  },
  {
    deliverable: "Quiet-time forecasts",
    status: "Planned",
    tag: "planned",
  },
  {
    deliverable: "Saved zones, streaks and Quiet Gems",
    status: "Planned",
    tag: "planned",
  },
  {
    deliverable: "Store listing, release build and demo video",
    status: "Planned",
    tag: "planned",
  },
];

const techStack = [
  "Kotlin 2.0",
  "Jetpack Compose",
  "Material 3",
  "osmdroid / OpenStreetMap",
  "Supabase",
  "PostgreSQL 17",
  "PostGIS",
  "Edge Functions",
  "OpenRouter",
  "OneSignal",
  "RevenueCat",
  "Sentry",
];

export default function QuietCaseStudyPage() {
  const quietSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Quiet",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Android",
    description:
      "Find your peaceful place. Cafes, libraries, parks and coworking spaces near you, scored live by the people who were just there.",
    author: {
      "@type": "Organization",
      name: "OneReign",
      url: "https://one-reign.vercel.app",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quietSchema) }}
      />
      {/* ── Header ─────────────────────────────────── */}
      <section className={styles.caseHero}>
        <div className="container">
          <div className={styles.backNav}>
            <Link href="/products" className={styles.backLink}>
              ← Back to Products
            </Link>
          </div>

          <div className={styles.metaRow}>
            <StatusBadge status="In progress" />
            <span className={styles.eventBadge}>RevenueCat Shipaton 2026</span>
            <span className={styles.platformBadge}>Android Native (Kotlin 2.0)</span>
          </div>

          <h1 className={styles.title}>Quiet</h1>
          <p className={styles.tagline}>&ldquo;Find your peaceful place.&rdquo;</p>

          <p className={styles.oneLiner}>
            Cafes, libraries, parks and coworking spaces near you, scored live by the people who were just there.
          </p>

          <div className={styles.headerCtas}>
            <Button
              variant="primary"
              href="https://github.com/rajeshr20/Quiet-App"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow Progress on GitHub ↗
            </Button>
          </div>
        </div>
      </section>

      {/* ── Visual Section: Phone Frame Placeholder ── */}
      <section className={styles.visualSection}>
        <div className="container">
          <div className={styles.phoneShowcase}>
            <ScreenshotFrame
              type="phone"
              alt="Quiet Android Application — Explore View"
              width={390}
              height={844}
              placeholderText="Explore view: Bangalore cafes & libraries scored live by real visitors."
            />
          </div>
          <p className={styles.caption}>
            Figure 1.0: Android Pixel 7 (API 35) target frame for Quiet. Displays real-time nearby spaces sorted by Quiet Score.
          </p>
        </div>
      </section>

      {/* ── Content Layout ──────────────────────────── */}
      <div className="container">
        <div className={styles.contentLayout}>
          <div className={styles.mainContent}>
            {/* 1. Problem */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">The Problem</span>
              <h2 className={styles.sectionHeading}>Maps Tell You Where, Not How It Feels</h2>
              <p>
                Standard map applications tell you where a place is, its menu, or opening hours. They cannot answer the one question people care about when they need to focus or decompress: <strong>&ldquo;Where can I go quietly, right now?&rdquo;</strong>
              </p>
              <p>
                Quiet is not a bloated mapping app with reviews and social commentary. It is a low-friction utility engineered to help people decide where to go in under 10 seconds.
              </p>
            </section>

            {/* 2. How It Works (The Loop) */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">The Core Loop</span>
              <h2 className={styles.sectionHeading}>Find → Visit → Report → Better Map</h2>
              <p>
                The app operates on a virtuous community feedback loop:
              </p>
              <div className={styles.loopGrid}>
                <div className={styles.loopStep}>
                  <span className={styles.stepNum}>1. FIND</span>
                  <p>Browse calm spaces near your current coordinates, ordered by score or distance.</p>
                </div>
                <div className={styles.loopStep}>
                  <span className={styles.stepNum}>2. VISIT</span>
                  <p>Get directions and spend time working, reading, or relaxing in peace.</p>
                </div>
                <div className={styles.loopStep}>
                  <span className={styles.stepNum}>3. REPORT</span>
                  <p>Spend 5 seconds rating noise, crowd, comfort, and friction from 1 to 5.</p>
                </div>
                <div className={styles.loopStep}>
                  <span className={styles.stepNum}>4. UPDATE</span>
                  <p>Postgres aggregates reports instantly into a live Quiet Score for everyone.</p>
                </div>
              </div>
            </section>

            {/* 3. The Quiet Score Diagram */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">Mathematical Model</span>
              <h2 className={styles.sectionHeading}>The Quiet Score (0 to 100)</h2>
              <p>
                Four 1–5 ratings are summed, divided by 20, and multiplied by 100:
              </p>

              <div className={styles.scoreFormulaBox}>
                <div className={styles.formulaEquation}>
                  <code>Quiet Score = ((Noise + Crowd + Solo Comfort + Low Friction) / 20) × 100</code>
                </div>
                <div className={styles.formulaExample}>
                  <span className={styles.exampleLabel}>Live Calculation Example:</span>
                  <p>Noise: 3 · Crowd: 2 · Comfort: 4 · Friction: 4</p>
                  <p><strong>(3 + 2 + 4 + 4) / 20 × 100 = 65 / 100</strong></p>
                </div>
              </div>

              <div className={styles.rulesCallout}>
                <h4 className={styles.rulesTitle}>Three Strict Design Rules</h4>
                <ul className={styles.rulesList}>
                  <li><strong>One scale everywhere:</strong> 5 is always the calm/quiet end; 1 is always loud/congested.</li>
                  <li><strong>No misleading zeroes:</strong> A location with no visitor reports displays &ldquo;New&rdquo; rather than a fake score of 0.</li>
                  <li><strong>Single database authority:</strong> The score exists strictly in the SQL function <code>quiet_score()</code> in Supabase Postgres, ensuring the mobile app, alerts, and AI explanations all read the exact same number.</li>
                </ul>
              </div>
            </section>

            {/* 4. Features */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">Product Capabilities</span>
              <h2 className={styles.sectionHeading}>9 Focused Features</h2>
              <div className={styles.featuresGrid}>
                {features.map((feat) => (
                  <div key={feat.title} className={styles.featCard}>
                    <h3 className={styles.featTitle}>{feat.title}</h3>
                    <p className={styles.featDesc}>{feat.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Architecture (4 Layers) */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">System Architecture</span>
              <h2 className={styles.sectionHeading}>Four Decoupled Layers</h2>

              <div className={styles.architectureStack}>
                <div className={styles.archLayer}>
                  <div className={styles.archHeader}>
                    <span className={styles.layerTag}>Layer 1</span>
                    <span className={styles.layerTitle}>App (Client)</span>
                  </div>
                  <p className={styles.archDesc}>
                    Kotlin 2.0 + Jetpack Compose (Material 3) in a single modular package. osmdroid handles offline-friendly vector tiles.
                  </p>
                </div>

                <div className={styles.archLayer}>
                  <div className={styles.archHeader}>
                    <span className={styles.layerTag}>Layer 2</span>
                    <span className={styles.layerTitle}>Data (Postgres 17 + PostGIS)</span>
                  </div>
                  <p className={styles.archDesc}>
                    Supabase PostgreSQL 17 with PostGIS spatial indexing. Stored procedures <code>nearby_places()</code>, <code>place_detail()</code>, and <code>quiet_score()</code> handle heavy geo calculations. Row Level Security (RLS) active on all 5 tables.
                  </p>
                </div>

                <div className={styles.archLayer}>
                  <div className={styles.archHeader}>
                    <span className={styles.layerTag}>Layer 3</span>
                    <span className={styles.layerTitle}>Functions (Edge Workers)</span>
                  </div>
                  <p className={styles.archDesc}>
                    Supabase Edge Functions <code>explain-score</code> (cached AI explanation per new report) and <code>notify-quiet-places</code> (pg_cron polling every 15 minutes).
                  </p>
                </div>

                <div className={styles.archLayer}>
                  <div className={styles.archHeader}>
                    <span className={styles.layerTag}>Layer 4</span>
                    <span className={styles.layerTitle}>Services (Optional Integrations)</span>
                  </div>
                  <p className={styles.archDesc}>
                    OpenRouter (LLM explanations), OneSignal (push alerts), RevenueCat (paywall entitlement), Sentry (crash logging). Each service is strictly optional; the core app runs flawlessly without them.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Security and Privacy */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">Trust & Privacy</span>
              <h2 className={styles.sectionHeading}>Security by Design</h2>
              <ul className={styles.securityList}>
                <li><strong>Row Level Security:</strong> RLS enforced across all five Postgres database tables.</li>
                <li><strong>Service-role isolation:</strong> Notification and cron alert functions execute under service-role privileges only.</li>
                <li><strong>Zero git secrets:</strong> All keys and configuration variables managed exclusively in environment secret stores.</li>
                <li><strong>Privacy-first telemetry:</strong> Sentry crash reports carry an anonymous user ID only — never emails, IP addresses, or location histories.</li>
                <li><strong>Prompt injection defense:</strong> Visitor notes reach AI summarization models as quoted, sanitized data strings, never as executable instructions.</li>
              </ul>
            </section>

            {/* 7. Status / Roadmap Table */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">Development Roadmap</span>
              <h2 className={styles.sectionHeading}>Shipaton 2026 Deliverables</h2>

              <div className={styles.tableWrapper}>
                <table className={styles.roadmapTable}>
                  <thead>
                    <tr>
                      <th>Module / Component</th>
                      <th className={styles.textRight}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roadmapItems.map((item, idx) => (
                      <tr key={idx}>
                        <td className={styles.roadName}>{item.deliverable}</td>
                        <td className={styles.textRight}>
                          <span className={`${styles.statusPill} ${styles[item.tag]}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 8. Team and Role */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">Team & Attribution</span>
              <h2 className={styles.sectionHeading}>Shipaton 2026 Team</h2>
              <p>
                Quiet is being built for the RevenueCat Shipaton 2026 by a focused three-person team:
              </p>
              <div className={styles.teamGrid}>
                <div className={styles.teamCard}>
                  <h4 className={styles.memberName}>R Rajesh</h4>
                  <span className={styles.memberRole}>Backend &amp; Database Architecture</span>
                  <p className={styles.memberDesc}>
                    Schema design, PostgreSQL 17 RLS security, PostGIS spatial queries, seed data, and hosted API endpoints.
                  </p>
                </div>

                <div className={styles.teamCard}>
                  <h4 className={styles.memberName}>Harley Davis</h4>
                  <span className={styles.memberRole}>Frontend &amp; Android UI</span>
                  <p className={styles.memberDesc}>
                    Kotlin 2.0 application, Jetpack Compose Material 3 implementation, and osmdroid integration.
                  </p>
                </div>

                <div className={styles.teamCard}>
                  <h4 className={styles.memberName}>Allen</h4>
                  <span className={styles.memberRole}>Product, AI &amp; Operations</span>
                  <p className={styles.memberDesc}>
                    Product specifications, RevenueCat paywall strategy, OpenRouter prompts, and release operations.
                  </p>
                </div>
              </div>
            </section>

            {/* 9. Tech Stack Chips */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">Technologies Used</span>
              <h2 className={styles.sectionHeading}>Tech Stack</h2>
              <div className={styles.chipsRow}>
                {techStack.map((tech) => (
                  <span key={tech} className={styles.chip}>{tech}</span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h4 className={styles.sidebarTitle}>Project Overview</h4>
              <dl className={styles.metaList}>
                <div>
                  <dt>Product</dt>
                  <dd>Quiet</dd>
                </div>
                <div>
                  <dt>Platform</dt>
                  <dd>Android Native</dd>
                </div>
                <div>
                  <dt>Event</dt>
                  <dd>RevenueCat Shipaton 2026</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd><StatusBadge status="In progress" /></dd>
                </div>
                <div>
                  <dt>Rajesh&apos;s Role</dt>
                  <dd>Backend (Supabase / Postgres 17 / PostGIS)</dd>
                </div>
              </dl>

              <div className={styles.sidebarActions}>
                <Button
                  variant="primary"
                  href="https://github.com/rajeshr20/Quiet-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.fullWidthBtn}
                >
                  Follow on GitHub ↗
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <CtaBand
        heading="Building a mobile product or custom API?"
        subheading="We build high-performance native apps, scalable cloud databases, and resilient backend systems."
        primaryCtaText="Start a conversation"
        primaryCtaHref="/contact"
      />
    </>
  );
}
