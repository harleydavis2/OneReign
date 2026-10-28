import type { Metadata } from "next";
import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/ui/CtaBand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Faultline — Case Study",
  description:
    "Faultline finds where an organisation's documented knowledge contradicts itself, ranks each conflict by what sits downstream of it, and repairs it.",
  alternates: {
    canonical: "/products/faultline",
  },
  openGraph: {
    title: "Faultline — Case Study | OneReign",
    description:
      "How we used FalkorDB Cypher graph queries to collapse 57,291 claim pairs down to 1,666 candidates, finding internal contradictions without O(n²) LLM costs.",
    images: ["/images/products/faultline-detail-desktop.png"],
  },
};

const funnelStages = [
  {
    stage: "1. All Possible Pairs",
    mechanism: "n · (n − 1) / 2 count of combinatorial claim pairings",
    cost: "Zero tokens",
    count: "57,291",
  },
  {
    stage: "2. Graph Collapse",
    mechanism: "Claims sharing an Entity node via raw FalkorDB Cypher query",
    cost: "Single query",
    count: "1,666",
    highlight: true,
  },
  {
    stage: "3. Deterministic Prefilter",
    mechanism: "Same predicate AND (different object OR opposite polarity) in Python",
    cost: "Pure compute",
    count: "202",
  },
  {
    stage: "4. LLM Adjudication",
    mechanism: "Precedent-first evaluation, cached to disk by input hash",
    cost: "Disk-cached calls",
    count: "159",
  },
  {
    stage: "Result: Open Conflicts",
    mechanism: "CONTRADICTS edge asserted with provenance and blast-radius score",
    cost: "Ranked queue",
    count: "20",
    highlight: true,
  },
];

const techStack = [
  "FalkorDB",
  "Raw Cypher",
  "Python 3.12",
  "FastAPI",
  "React 18",
  "TypeScript",
  "Cytoscape.js",
  "Groq (Extraction)",
  "Gemini (Judging)",
  "Model Context Protocol (MCP)",
];

export default function FaultlineCaseStudyPage() {
  return (
    <>
      {/* ── Header ─────────────────────────────────── */}
      <section className={styles.caseHero}>
        <div className="container">
          <div className={styles.backNav}>
            <Link href="/products" className={styles.backLink}>
              ← Back to Products
            </Link>
          </div>

          <div className={styles.metaRow}>
            <StatusBadge status="Live" />
            <span className={styles.eventBadge}>Graph Hacks 2026 (FalkorDB × WeMakeDevs)</span>
            <span className={styles.dateBadge}>15–18 Oct 2026</span>
          </div>

          <h1 className={styles.title}>Faultline</h1>
          <p className={styles.tagline}>
            Your company disagrees with itself; Faultline finds where.
          </p>

          <p className={styles.oneLiner}>
            Faultline finds where an organisation&apos;s documented knowledge contradicts itself, ranks each conflict by what sits downstream of it, and repairs it.
          </p>

          <div className={styles.headerCtas}>
            <Button
              variant="primary"
              href="https://faultline-production-f69d.up.railway.app/conflicts/conflict-0b1fd48ed309"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Live Demo ↗
            </Button>
            <Button
              variant="secondary"
              href="https://github.com/rajeshr20/Faultline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub Repo ↗
            </Button>
          </div>
        </div>
      </section>

      {/* ── Main Screenshot ─────────────────────────── */}
      <section className={styles.visualSection}>
        <div className="container">
          <ScreenshotFrame
            type="browser"
            src="/images/products/faultline-detail-desktop.png"
            alt="Faultline knowledge conflict resolution detail view showing evidence spans, provenance, and graph traversal"
            width={1440}
            height={900}
            priority={true}
            urlBarText="https://faultline-production-f69d.up.railway.app/conflicts/conflict-0b1fd48ed309"
          />
          <p className={styles.caption}>
            Figure 1.0: Real live deployment of Faultline on Railway. The UI displays the active conflict between Tier 1 on-call policies (15 min vs 5 min), cytoscape traversal path, and repair actions.
          </p>
        </div>
      </section>

      {/* ── Content Sections ────────────────────────── */}
      <div className="container">
        <div className={styles.contentLayout}>
          <div className={styles.mainContent}>
            {/* 1. Problem */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">The Problem</span>
              <h2 className={styles.sectionHeading}>The O(n²) Knowledge Dilemma</h2>
              <p>
                Every organisation&apos;s runbooks, wikis, architecture specs, and chat history disagree with each other somewhere. A runbook still says 30 minutes after the incident response policy moved to 15. A README cites a database decision that was superseded two ADRs ago. Nobody notices until an outage happens.
              </p>
              <p>
                Comparing every claim with every other claim is an <code>O(n²)</code> computational nightmare: the 339 claims of our Northwind demo slice already produce <strong>57,291 possible pairs</strong>. A modest corpus of 1,800 claims produces over 1.6 million pairs.
              </p>
              <p>
                Running large language models across 57,000 pairs is cost-prohibitive, introduces severe latency, and hallucinates false equivalencies. Without graph collapsing in a native graph store, building this product is not merely slower — it is mathematically impossible.
              </p>
            </section>

            {/* 2. Approach: The Funnel */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">Architecture & Approach</span>
              <h2 className={styles.sectionHeading}>The Four-Stage Graph Funnel</h2>
              <p>
                Faultline only compares claims that share a subject node in the graph. Two of the four stages cost zero tokens. Only stage 4 ever calls a model, and every single judgement is hash-cached to disk.
              </p>

              <div className={styles.tableWrapper}>
                <table className={styles.funnelTable}>
                  <thead>
                    <tr>
                      <th>Stage</th>
                      <th>Mechanism</th>
                      <th>Token Cost</th>
                      <th className={styles.textRight}>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funnelStages.map((s, idx) => (
                      <tr key={idx} className={s.highlight ? styles.highlightRow : ""}>
                        <td className={styles.stageName}>{s.stage}</td>
                        <td className={styles.stageMech}>{s.mechanism}</td>
                        <td className={styles.stageCost}>{s.cost}</td>
                        <td className={styles.stageCount}>{s.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. What We Built */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">Technical Implementation</span>
              <h2 className={styles.sectionHeading}>What We Built</h2>
              <div className={styles.featureGrid}>
                <div className={styles.featureCard}>
                  <h3 className={styles.featureTitle}>1. The Surveyor</h3>
                  <p>
                    Extracts constrained claims from documents, messages, and tickets. Every claim enforces a literal <code>evidence_span</code> substring check against the source document. If a span is not a verbatim quote, the claim is rejected. Nothing below a 0.65 confidence floor enters the graph.
                  </p>
                </div>

                <div className={styles.featureCard}>
                  <h3 className={styles.featureTitle}>2. Entity Resolution</h3>
                  <p>
                    Maps every alias to exactly one canonical <code>Entity</code> node. There are no fuzzy <code>SAME_AS</code> edges. Claims about the same thing literally point to the exact same node in FalkorDB.
                  </p>
                </div>

                <div className={styles.featureCard}>
                  <h3 className={styles.featureTitle}>3. Blast Radius Scoring</h3>
                  <p>
                    Not all contradictions matter equally. Faultline traverses downstream relationships to count how many systems, on-call engineers, and architectural decisions depend on the conflicting claim, ranking the most critical breakages at the top.
                  </p>
                </div>

                <div className={styles.featureCard}>
                  <h3 className={styles.featureTitle}>4. The Reconciler</h3>
                  <p>
                    Provides one-click repair actions: <code>DRAFT CORRECTION</code> (generates the exact markdown fix), <code>ASSIGN</code> (notifies the documented owner), <code>RESOLVE</code> (asserts a <code>RESOLVED_AS</code> edge), or <code>DISMISS</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* Additional Real Screenshots */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">Interface Gallery</span>
              <h2 className={styles.sectionHeading}>Production UI Views</h2>

              <div className={styles.galleryGrid}>
                <div className={styles.galleryItem}>
                  <ScreenshotFrame
                    type="browser"
                    src="/images/products/faultline-list-desktop.png"
                    alt="Faultline sorted conflicts list view"
                    width={1440}
                    height={900}
                    urlBarText="https://faultline-production-f69d.up.railway.app/conflicts"
                  />
                  <p className={styles.galleryCaption}>
                    Conflicts list sorted by blast radius (32.5 max score down to 14.5).
                  </p>
                </div>

                <div className={styles.galleryItem}>
                  <ScreenshotFrame
                    type="browser"
                    src="/images/products/faultline-resolved-desktop.png"
                    alt="Faultline resolved claims audit view"
                    width={1440}
                    height={900}
                    urlBarText="https://faultline-production-f69d.up.railway.app/resolved"
                  />
                  <p className={styles.galleryCaption}>
                    Resolved claims view: tracks the full audit log of superseded documents.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Tech Stack */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">Engineering Stack</span>
              <h2 className={styles.sectionHeading}>Built with Zero Budget &amp; Raw Cypher</h2>
              <div className={styles.chipsRow}>
                {techStack.map((tech) => (
                  <span key={tech} className={styles.chip}>{tech}</span>
                ))}
              </div>

              <div className={styles.calloutBox}>
                <h4 className={styles.calloutTitle}>Strict Architectural Rules</h4>
                <ul className={styles.rulesList}>
                  <li><strong>FalkorDB is the only database:</strong> No Postgres, no vector database, no second store of record.</li>
                  <li><strong>Raw Cypher, no ORM:</strong> Every query is transparent, inspectable, and optimized for sub-millisecond graph traversal.</li>
                  <li><strong>The UI renders a traversal path, never the full graph:</strong> Cytoscape canvas is capped at 40 nodes to maintain 60 FPS rendering.</li>
                  <li><strong>Every LLM call is cached by input hash:</strong> Repeated conflict judgements cost zero tokens and run instantaneously from disk.</li>
                </ul>
              </div>
            </section>

            {/* 5. Outcome & Learnings */}
            <section className={styles.sectionBlock}>
              <span className="eyebrow">Outcome & Learnings</span>
              <h2 className={styles.sectionHeading}>Hackathon Results &amp; Verification</h2>
              <p>
                Evaluated against the Northwind Logistics benchmark (312 documents, 400 support tickets, 2,000 messages, 14 planted contradictions):
              </p>
              <ul className={styles.outcomeList}>
                <li><strong>16 of the 20 surfaced conflicts</strong> corresponded to 13 of the 14 planted contradictions in the corpus (11 with the exact correct contradiction classification).</li>
                <li><strong>Under 1-second structural seed:</strong> FalkorDB loads 2,826 nodes and 823 edges in under a second.</li>
                <li><strong>Proven collapse ratio:</strong> Graph collapse compressed 57,291 theoretical comparisons to 1,666, demonstrating that graph databases are essential for knowledge consistency pipelines.</li>
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h4 className={styles.sidebarTitle}>Project Details</h4>
              <dl className={styles.metaList}>
                <div>
                  <dt>Product</dt>
                  <dd>Faultline</dd>
                </div>
                <div>
                  <dt>Event</dt>
                  <dd>Graph Hacks 2026</dd>
                </div>
                <div>
                  <dt>Partners</dt>
                  <dd>FalkorDB × WeMakeDevs</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd><StatusBadge status="Live" /></dd>
                </div>
                <div>
                  <dt>Primary Stack</dt>
                  <dd>FalkorDB, Python 3.12, FastAPI, React</dd>
                </div>
              </dl>

              <div className={styles.sidebarActions}>
                <Button
                  variant="primary"
                  href="https://faultline-production-f69d.up.railway.app/conflicts/conflict-0b1fd48ed309"
                  className={styles.fullWidthBtn}
                >
                  Live Demo ↗
                </Button>
                <Button
                  variant="secondary"
                  href="https://github.com/rajeshr20/Faultline"
                  className={styles.fullWidthBtn}
                >
                  GitHub Source ↗
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <CtaBand
        heading="Have data or knowledge systems that need clarity?"
        subheading="We build high-performance graph pipelines, data engines, and custom automation for demanding businesses."
        primaryCtaText="Book a 30-min call"
        primaryCtaHref="/contact"
      />
    </>
  );
}
