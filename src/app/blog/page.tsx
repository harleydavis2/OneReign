import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog — Insights & Updates",
  description:
    "Product launches, engineering deep-dives, and industry insights from the OneReign team.",
};

const posts = [
  { issue: "014", date: "16 APR 2026", category: "Insights", slug: "why-90-percent-of-startups-fail", title: "Why 90% of Startups Fail — And It's Not What You Think (2026 Data)", author: "Jabez Paul Asir", summary: "Startup failure isn't about bad ideas. 966 startups shut down in 2024 alone. New data shows operational friction, not lack of funding, is the real killer." },
  { issue: "013", date: "14 APR 2026", category: "Insights", slug: "founder-burnout-crisis", title: "The Founder Burnout Crisis No One Is Talking About", author: "Jabez Paul Asir", summary: "73% of tech founders experience shadow burnout. 49% consider quitting. Here's what the 2025 data actually says — and what to do about it." },
  { issue: "012", date: "12 APR 2026", category: "Insights", slug: "crm-is-a-graveyard", title: "Why Your CRM Is a Graveyard (And What Replaces It)", author: "Jabez Paul Asir", summary: "50% of CRM implementations fail. Reps spend 9 hours/week on data entry. 37% fabricate data. The CRM model is broken — here's what comes next." },
  { issue: "011", date: "10 APR 2026", category: "Engineering", slug: "building-conesta-ai-first", title: "Building Conesta with AI-First Architecture", author: "Jabez Paul Asir", summary: "How we designed Conesta's learning engine from scratch — AI-generated study paths, real-time collaboration, and why we chose to build on Claude API." },
  { issue: "010", date: "09 APR 2026", category: "Insights", slug: "follow-up-failure-killing-revenue", title: "The Follow-Up Failure That's Killing Your Revenue", author: "Jabez Paul Asir", summary: "76% of qualified leads get zero follow-up. 80% of deals need 5+ touchpoints. Here's the data on the biggest sales leak in your business." },
  { issue: "009", date: "07 APR 2026", category: "Insights", slug: "42-saas-tools", title: "42 SaaS Tools and Nothing Works Together", author: "Ermars Castar", summary: "The average small company uses 42 SaaS apps. SaaS costs per employee hit $9,100/year. Half those licences are unused. Here's the real cost of tool sprawl." },
  { issue: "008", date: "05 APR 2026", category: "Insights", slug: "systems-thinking-beats-tool-shopping", title: "Why Systems Thinking Beats Tool Shopping", author: "Jabez Paul Asir", summary: "Most businesses buy tools. We build systems. Here's why connecting the dots matters more than adding another SaaS subscription." },
  { issue: "007", date: "03 APR 2026", category: "Insights", slug: "future-of-product-demos", title: "The Future of Product Demos Is AI — And Nobody's Built It Yet", author: "Jabez Paul Asir", summary: "The demo platform market is projected to hit $7.8B by 2033. Interactive demos get 8–32% CTR vs 3.7% for other CTAs. Here's the gap nobody has filled." },
  { issue: "006", date: "01 APR 2026", category: "Insights", slug: "hidden-cost-of-operational-chaos", title: "The Hidden Cost of Operational Chaos in Small Businesses", author: "Pranov Prahaladh R", summary: "42% of company knowledge lives in one person's head. 88% of small businesses face cash flow disruptions." },
  { issue: "005", date: "30 MAR 2026", category: "Insights", slug: "first-sales-hire-fail", title: "Your First Sales Hire Will Probably Fail. Here's Why.", author: "Jabez Paul Asir", summary: "A bad first sales hire sets your startup back 12+ months. Average ramp time is 6–9 months." },
  { issue: "004", date: "28 MAR 2026", category: "Product", slug: "introducing-rubl", title: "Introducing RUBL — Sales on Autopilot", author: "Ermars Castar", summary: "RUBL is our revenue intelligence platform that unifies CRM, AI marketing, and automated product demos." },
  { issue: "003", date: "26 MAR 2026", category: "Engineering", slug: "ai-is-the-salt", title: "AI Is the Salt, Not the Steak", author: "Ermars Castar", summary: "88% of organisations use AI. Only 6% extract real value. 60% of AI initiatives will be abandoned by 2026." },
  { issue: "002", date: "24 MAR 2026", category: "Insights", slug: "data-driven-vs-gut-feel", title: "Data-Driven vs. Gut Feel: Why 58% of Companies Are Guessing", author: "Pranov Prahaladh R", summary: "58% of companies base half their decisions on gut feel. Data-driven orgs show 25% higher EBITDA." },
  { issue: "001", date: "22 MAR 2026", category: "Engineering", slug: "all-in-one-platform-trap", title: "The All-in-One Platform Trap: Lessons from Bitrix, Odoo, and Zoho", author: "Ermars Castar", summary: "You can do everything in Bitrix24 — just not well. Why all-in-one platforms fail." },
];

const categoryColors: Record<string, string> = {
  Insights: "#60a5fa",
  Engineering: "#a78bfa",
  Product: "#34d399",
  Company: "#f59e0b",
};

const authors = [
  { name: "Jabez Paul Asir", role: "CEO, OneReign", initials: "JP", posts: 8 },
  { name: "Ermars Castar", role: "CTO, OneReign", initials: "EC", posts: 4 },
  { name: "Pranov Prahaladh R", role: "CFO, OneReign", initials: "PR", posts: 2 },
];

export default function BlogPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.heroBg} />
        <div className="container">
          <p className="eyebrow">Blog</p>
          <h1 className={styles.heroH1}>Insights &amp; Updates</h1>
          <p className={styles.heroSub}>
            Product launches, engineering deep-dives, and industry insights from the OneReign team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.postsList}>
              {posts.map((post) => (
                <article key={post.issue} className={styles.postCard}>
                  <div className={styles.postMeta}>
                    <span className={styles.postIssue}>{post.issue}</span>
                    <span
                      className={styles.postCategory}
                      style={{ color: categoryColors[post.category] || "var(--accent)", borderColor: `${categoryColors[post.category]}33` || "var(--accent-mid)" }}
                    >
                      {post.category}
                    </span>
                    <span className={styles.postDate}>{post.date}</span>
                  </div>
                  <h2 className={styles.postTitle}>
                    <Link href={`/blog/${post.slug}`} className={styles.postTitleLink}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className={styles.postSummary}>{post.summary}</p>
                  <div className={styles.postFooter}>
                    <span className={styles.postAuthor}>{post.author}</span>
                    <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                      Read →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Authors</h3>
                {authors.map((a) => (
                  <div key={a.name} className={styles.authorCard}>
                    <div className={styles.authorAvatar}>{a.initials}</div>
                    <div>
                      <p className={styles.authorName}>{a.name}</p>
                      <p className={styles.authorRole}>{a.role}</p>
                      <p className={styles.authorPosts}>{a.posts} posts</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Categories</h3>
                {Object.entries(categoryColors).map(([cat, color]) => (
                  <div key={cat} className={styles.catRow}>
                    <span className={styles.catDot} style={{ background: color }} />
                    <span className={styles.catName}>{cat}</span>
                  </div>
                ))}
              </div>

              <div className={styles.blogCta}>
                <p className={styles.blogCtaLabel}>WORKING ON THE SAME PROBLEM?</p>
                <p className={styles.blogCtaText}>We build operational systems that solve it.</p>
                <Link href="/contact" className="btn btn-primary" style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}>
                  Get in touch →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
