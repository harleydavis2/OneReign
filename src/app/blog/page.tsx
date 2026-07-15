import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "./posts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog — Insights & Updates",
  description:
    "Product launches, engineering deep-dives, and industry insights from the OneReign team.",
};

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
