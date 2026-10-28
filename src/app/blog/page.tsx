import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "./posts";
import Button from "@/components/ui/Button";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog — Engineering Deep Dives & Systems Thinking",
  description:
    "Engineering insights, graph database architectures, and operational automation from the OneReign team.",
  alternates: {
    canonical: "/blog",
  },
};

const categoryTags: Record<string, string> = {
  Engineering: "var(--accent)",
  Insights: "#60A5FA",
  Product: "#FBBF24",
  Culture: "#A1A1AA",
};

export default function BlogPage() {
  const uniqueAuthors = Array.from(new Set(posts.map((p) => p.author))).map((name) => ({
    name,
    count: posts.filter((p) => p.author === name).length,
    initials: name
      .split(" ")
      .map((part) => part[0])
      .join(""),
  }));

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <span className="eyebrow">Engineering Journal</span>
          <h1 className={styles.heroH1}>Systems, Architecture &amp; Operations</h1>
          <p className={styles.heroSub}>
            Real post-mortems, graph database experiments, and systems engineering principles written directly by our builders.
          </p>
        </div>
      </section>

      <section className={styles.blogSection}>
        <div className="container">
          <div className={styles.layout}>
            {/* Posts List */}
            <div className={styles.postsList}>
              {posts.map((post) => (
                <article key={post.slug} className={styles.postCard}>
                  <div className={styles.postMeta}>
                    <span className={styles.postIssue}>ISSUE {post.issue}</span>
                    <span
                      className={styles.postCategory}
                      style={{
                        color: categoryTags[post.category] || "var(--accent)",
                        borderColor: "var(--border)",
                      }}
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
                    <span className={styles.postAuthor}>By {post.author}</span>
                    <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                      Read article →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Contributors</h3>
                <div className={styles.authorsList}>
                  {uniqueAuthors.map((a) => (
                    <div key={a.name} className={styles.authorRow}>
                      <div className={styles.authorAvatar}>{a.initials}</div>
                      <div>
                        <p className={styles.authorName}>{a.name}</p>
                        <p className={styles.authorCount}>{a.count} articles</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Categories</h3>
                <div className={styles.categoriesList}>
                  {Object.entries(categoryTags).map(([cat, color]) => (
                    <div key={cat} className={styles.catRow}>
                      <span className={styles.catDot} style={{ backgroundColor: color }} />
                      <span className={styles.catName}>{cat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.ctaCard}>
                <h4 className={styles.ctaTitle}>Have a broken workflow?</h4>
                <p className={styles.ctaText}>
                  We design and deploy automation pipelines that eliminate manual friction.
                </p>
                <Button variant="primary" href="/contact" className={styles.ctaBtn}>
                  Book a discovery call →
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
