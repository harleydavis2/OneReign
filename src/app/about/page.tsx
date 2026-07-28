"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const founders = [
  {
    id: "rajesh",
    name: "R Rajesh",
    role: "Founder",
    badge: "FOUNDER",
    category: ["all", "founders", "executive"],
    tagline: "Driving vision, systems & operations.",
    bio: "Founding visionary at OneReign. Architecting the operational backbone and high-performance system workflows that empower modern enterprises globally.",
    initials: "RR",
    image: "/team/r-rajesh.jpg",
    accentColor: "#1746ea",
    skills: ["System Architecture", "Operational Scaling", "AI Strategy", "Enterprise Workflow"],
  },
  {
    id: "nikil",
    name: "Nikil",
    role: "CEO",
    badge: "CEO",
    category: ["all", "executive"],
    tagline: "Leading global growth & strategy.",
    bio: "Leading OneReign's global strategy, client engagements, and product growth. Transforming complex technology into high-impact commercial outcomes.",
    initials: "N",
    image: "/team/nikil.jpg",
    accentColor: "#16a34a",
    skills: ["Global Growth", "Revenue Ops", "Strategic Alliances", "Product Leadership"],
  },
  {
    id: "allen",
    name: "Allen Mathew",
    role: "Co-Founder",
    badge: "CO-FOUNDER",
    category: ["all", "founders", "engineering"],
    tagline: "Building core AI platforms & products.",
    bio: "Co-founding engineer pioneering AI-native applications (Conesta & RUBL). Focused on multi-agent intelligence, deep technical scalability, and UX perfection.",
    initials: "AM",
    image: "/team/allen-mathew.jpg",
    accentColor: "#4576ff",
    skills: ["AI-First Tech", "Multi-Agent Systems", "Full-Stack Dev", "Platform Engineering"],
  },
  {
    id: "harley",
    name: "Harley Davis",
    role: "Co-Founder",
    badge: "CO-FOUNDER",
    category: ["all", "founders", "engineering"],
    tagline: "Where code meets architecture.",
    bio: "Co-founding systems architect driving cloud reliability, low-latency microservices, and robust infrastructure automation.",
    initials: "HD",
    image: "/team/harley-davis.jpg",
    accentColor: "#7c3aed",
    skills: ["Cloud Architecture", "DevOps Pipelines", "Microservices", "Security Systems"],
  },
];

const categories = [
  { id: "all", label: "All Builders" },
  { id: "founders", label: "Founders" },
  { id: "executive", label: "Executive" },
  { id: "engineering", label: "Engineering & Product" },
];

const whyPoints = [
  { title: "AI-Native", desc: "Built with AI at the core, not bolted on" },
  { title: "Systems Thinking", desc: "We redesign processes, not just tools" },
  { title: "Real Products", desc: "We build and run our own platforms" },
  { title: "Global Remote", desc: "Distributed team, worldwide delivery" },
  { title: "Integrated Approach", desc: "Everything connected by design" },
  { title: "Outcome-Focused", desc: "We measure success by results" },
];

function FounderPortrait({ initials, image, name, badge }: { initials: string; image?: string; name: string; badge: string }) {
  const [imgSrc, setImgSrc] = useState<string | null>(image || null);

  return (
    <div className={styles.portraitHeroFrame}>
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={name}
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
        <img
          src={imgSrc}
          alt={name}
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
    card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--mouse-x", "50%");
    card.style.setProperty("--mouse-y", "0%");
  };

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

      {/* Founders / Team */}
      <section className="section" id="founders" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className={styles.teamHeaderRow}>
            <div className={styles.teamHeaderLeft}>
              <p className="eyebrow">The Leadership</p>
              <h2 className={styles.sectionH2}>Meet the Builders.</h2>
              <p className={styles.teamSub}>
                Engineers, architects, and product strategists shaping the future of autonomous systems.
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
                className={`${styles.founderCard} ${f.role === "Founder" ? styles.isFounderCard : ""}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setSelectedMember(f)}
              >
                <div className={styles.cardGlow} />
                <div className={styles.cardLightReflect} />
                
                {/* Executive Portrait Frame */}
                <FounderPortrait initials={f.initials} image={f.image} name={f.name} badge={f.badge} />
                
                <div className={styles.founderCardContent}>
                  <h3 className={styles.founderName}>{f.name}</h3>
                  <p className={styles.founderRole}>{f.role} · OneReign</p>
                  <p className={styles.founderTagline}>&ldquo;{f.tagline}&rdquo;</p>
                  
                  <div className={styles.inspectBtn}>
                    <span>View Bio</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Bio Spotlight Modal */}
      {selectedMember && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedMember(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedMember(null)} aria-label="Close">
              ✕
            </button>
            <div className={styles.modalHeader}>
              <ModalAvatar initials={selectedMember.initials} image={selectedMember.image} name={selectedMember.name} />
              <div>
                <div className={styles.roleBadge}>{selectedMember.badge}</div>
                <h3 className={styles.modalName}>{selectedMember.name}</h3>
                <p className={styles.modalRole}>{selectedMember.role} · OneReign</p>
              </div>
            </div>
            <p className={styles.modalBio}>{selectedMember.bio}</p>
            <div className={styles.skillsSection}>
              <h4>Core Capabilities</h4>
              <div className={styles.skillsGrid}>
                {selectedMember.skills.map((skill) => (
                  <span key={skill} className={styles.skillPill}>{skill}</span>
                ))}
              </div>
            </div>
            <div className={styles.modalActions}>
              <Link href="/contact" className="btn btn-primary" onClick={() => setSelectedMember(null)}>
                Connect with {selectedMember.name.split(" ")[0]}
              </Link>
            </div>
          </div>
        </div>
      )}

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
