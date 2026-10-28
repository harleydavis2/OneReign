import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../posts";
import Button from "@/components/ui/Button";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — OneReign Engineering`,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | OneReign`,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.postMeta}>
            <Link href="/blog" className={styles.backLink}>
              ← Back to Journal
            </Link>
            <span className={styles.divider}>·</span>
            <span className={styles.postDate}>{post.date}</span>
            <span className={styles.divider}>·</span>
            <span className={styles.postCategory}>{post.category}</span>
          </div>

          <h1 className={styles.heroH1}>{post.title}</h1>
          <p className={styles.authorRow}>
            Written by <strong>{post.author}</strong> · Issue {post.issue}
          </p>
        </div>
      </section>

      <section className={styles.articleSection}>
        <div className="container">
          <div className={styles.contentLayout}>
            <article className={styles.article}>
              {post.content.split("\n\n").map((paragraph, idx) => {
                const text = paragraph.trim();
                if (!text) return null;

                if (text.startsWith("###")) {
                  return (
                    <h2 key={idx} className={styles.h2}>
                      {text.replace("###", "").trim()}
                    </h2>
                  );
                }

                if (text.startsWith("*") || text.startsWith("-")) {
                  return (
                    <ul key={idx} className={styles.ul}>
                      {text.split("\n").map((li, lIdx) => (
                        <li key={lIdx} className={styles.li}>
                          {li.replace(/^[\*\-]\s*/, "")}
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (
                  text.startsWith("1.") ||
                  text.startsWith("2.") ||
                  text.startsWith("3.")
                ) {
                  return (
                    <ol key={idx} className={styles.ol}>
                      {text.split("\n").map((li, lIdx) => (
                        <li key={lIdx} className={styles.li}>
                          {li.replace(/^\d+\.\s*/, "")}
                        </li>
                      ))}
                    </ol>
                  );
                }

                // Render bold elements within text
                const parts = text.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={idx} className={styles.p}>
                    {parts.map((part, pIdx) =>
                      pIdx % 2 === 1 ? <strong key={pIdx}>{part}</strong> : part
                    )}
                  </p>
                );
              })}
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.blogCta}>
                <span className="eyebrow">Operational Systems</span>
                <h3 className={styles.blogCtaTitle}>Facing this challenge?</h3>
                <p className={styles.blogCtaText}>
                  We design and build production software that replaces operational friction with clear, reliable automation.
                </p>
                <Button variant="primary" href="/contact" className={styles.ctaBtn}>
                  Book a 30-min call →
                </Button>
              </div>

              <div className={styles.authorCard}>
                <h4 className={styles.authorHeading}>About the Author</h4>
                <p className={styles.authorDesc}>
                  <strong>{post.author}</strong> is a builder at OneReign, engineering production AI architectures, graph systems, and business platforms.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
