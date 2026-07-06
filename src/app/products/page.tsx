import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Our Products — Conesta & RUBL",
  description:
    "Explore OneReign's products. Conesta is an AI-powered collaborative learning platform. RUBL puts your sales pipeline on autopilot.",
};

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroBg} />
        <div className="container">
          <p className="eyebrow">Our Products</p>
          <h1 className={styles.pageHeroH1}>
            Designed. Built. <span className={styles.accent}>Shipped.</span>
          </h1>
          <p className={styles.pageHeroSub}>
            We don&apos;t just build for clients — we build our own. These are AI-native products built by OneReign, live and growing.
          </p>

          <div className={styles.productNav}>
            <a href="#conesta" className={styles.productNavBtn}>
              <span className={styles.productNavNum}>01</span>
              Learning Platform →
            </a>
            <a href="#rubl" className={styles.productNavBtn}>
              <span className={styles.productNavNum}>02</span>
              RUBL Revenue Platform →
            </a>
          </div>
        </div>
      </section>

      {/* Conesta */}
      <section className={`section ${styles.productSection}`} id="conesta">
        <div className="container">
          <div className={styles.productLayout}>
            <div className={styles.productInfo}>
              <div className={styles.productCategoryTag}>Learning Platform</div>
              <h2 className={styles.productH2}>
                Learn Together,<br />Grow Together.
              </h2>
              <p className={styles.productDesc}>
                A student-first knowledge marketplace. AI-powered roadmaps, real-time study rooms, and a community-driven resource library — built for how students actually learn.
              </p>
              <a
                href="https://conesta.in"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-primary ${styles.productCta}`}
              >
                Visit Conesta →
              </a>
            </div>

            <div className={styles.productFeatures}>
              <h3 className={styles.featuresTitle}>Key Features</h3>
              {[
                { icon: "🧠", title: "AI-generated study paths", desc: "Personalised learning roadmaps powered by Claude API" },
                { icon: "🤝", title: "Real-time collaboration", desc: "Live study rooms for peer-to-peer learning sessions" },
                { icon: "📚", title: "Community resource library", desc: "Crowdsourced and curated educational content" },
                { icon: "⚡", title: "Built on Claude API", desc: "AI architecture designed for intelligent knowledge delivery" },
              ].map((f) => (
                <div key={f.title} className={styles.featureRow}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <div>
                    <p className={styles.featureName}>{f.title}</p>
                    <p className={styles.featureDesc}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RUBL */}
      <section className={`section ${styles.productSection}`} id="rubl" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className={`${styles.productLayout} ${styles.productLayoutReverse}`}>
            <div className={styles.productInfo}>
              <div className={`${styles.productCategoryTag} ${styles.rublTag}`}>Revenue Platform</div>
              <h2 className={styles.productH2}>
                Sell more. Do less.<br />
                <span className={styles.accent}>Automate everything.</span>
              </h2>
              <p className={styles.productDesc}>
                An AI-powered revenue platform that eliminates manual work in sales. One platform, three AI agents — CRM, marketing, and demos — all on autopilot.
              </p>
              <a
                href="https://rubl.in"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-primary ${styles.productCta}`}
              >
                Visit RUBL →
              </a>
            </div>

            <div className={styles.productAgents}>
              <h3 className={styles.featuresTitle}>Three AI Agents</h3>
              {[
                { num: "01", title: "CRM", desc: "Intelligent pipeline management — track, prioritise, and close deals automatically." },
                { num: "02", title: "Studio", desc: "AI marketing content creation — generate campaigns, copy, and assets on demand." },
                { num: "03", title: "Showcase", desc: "Automated product demos — let AI present your product while you sleep." },
              ].map((a) => (
                <div key={a.title} className={styles.agentCard}>
                  <span className={styles.agentNum}>{a.num}</span>
                  <div>
                    <p className={styles.agentTitle}>{a.title}</p>
                    <p className={styles.agentDesc}>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
