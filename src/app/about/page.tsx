import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About — AI-First. System-Focused.",
  description:
    "Meet the team behind Conesta and RUBL — building operational intelligence for modern businesses.",
};

const founders = [
  {
    name: "Jabez Paul Asir",
    role: "CEO · Full-Stack Visionary",
    tagline: "Where vision meets execution.",
    initials: "JP",
  },
  {
    name: "Ermars Castar",
    role: "CTO · Backend Developer",
    tagline: "Where code meets architecture.",
    initials: "EC",
  },
  {
    name: "Pranov Prahaladh R",
    role: "CFO · UI / UX Designer",
    tagline: "Where strategy meets design.",
    initials: "PR",
  },
];

const whyPoints = [
  { title: "AI-Native", desc: "Built with AI at the core, not bolted on" },
  { title: "Systems Thinking", desc: "We redesign processes, not just tools" },
  { title: "Real Products", desc: "We build and run our own platforms" },
  { title: "Global Remote", desc: "Distributed team, worldwide delivery" },
  { title: "Integrated Approach", desc: "Everything connected by design" },
  { title: "Outcome-Focused", desc: "We measure success by results" },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroBg} />
        <div className="container">
          <p className="eyebrow">About OneReign</p>
          <h1 className={styles.pageHeroH1}>
            AI should make work<br />
            <span className={styles.accent}>disappear.</span><br />
            Not multiply it.
          </h1>
          <p className={styles.pageHeroSub}>
            We are an AI-first company working globally, founded by engineers who saw businesses drowning in disconnected tools. OneReign exists to build the operational backbone for modern businesses — through scalable systems, AI-driven platforms, and a relentless focus on real outcomes.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="section" id="founders" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <p className="eyebrow">The Team</p>
          <h2 className={styles.sectionH2}>Meet the founders.</h2>
          <div className={styles.foundersGrid}>
            {founders.map((f) => (
              <div key={f.name} className={`card ${styles.founderCard}`}>
                <div className={styles.founderAvatar}>
                  <span>{f.initials}</span>
                </div>
                <div className={styles.founderInfo}>
                  <h3 className={styles.founderName}>{f.name}</h3>
                  <p className={styles.founderRole}>{f.role}</p>
                  <p className={styles.founderTagline}>&ldquo;{f.tagline}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section" id="why">
        <div className="container">
          <div className={styles.whyLayout}>
            <div className={styles.whyLeft}>
              <p className="eyebrow">Why Us</p>
              <h2 className={styles.sectionH2}>Systems that<br />actually work.</h2>
              <p className={styles.bodyText}>
                Engineers who saw businesses drowning in disconnected tools. We built OneReign to fix that — permanently.
              </p>
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: "32px" }}>
                Work With Us →
              </Link>
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
    </>
  );
}
