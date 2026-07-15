import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../posts";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | OneReign Blog`,
    description: post.summary,
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
        <div className={styles.heroBg} />
        <div className="container">
          <div className={styles.postMeta}>
            <Link href="/blog" className={styles.backLink}>← Back to Blog</Link>
            <span className={styles.divider}>·</span>
            <span className={styles.postDate}>{post.date}</span>
            <span className={styles.divider}>·</span>
            <span className={styles.postCategory}>{post.category}</span>
          </div>
          <h1 className={styles.heroH1}>{post.title}</h1>
          <p className={styles.authorRow}>By <strong>{post.author}</strong> — Issue {post.issue}</p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className={styles.contentLayout}>
            <article className={styles.article}>
              {post.content.split('\n\n').map((paragraph, idx) => {
                const text = paragraph.trim();
                if (!text) return null;
                
                if (text.startsWith('###')) {
                  return <h3 key={idx} className={styles.h3}>{text.replace('###', '').trim()}</h3>;
                }
                
                if (text.startsWith('*') || text.startsWith('-')) {
                  return (
                    <ul key={idx} className={styles.ul}>
                      {text.split('\n').map((li, lIdx) => (
                        <li key={lIdx} className={styles.li}>{li.replace(/^[\*\-]\s*/, '')}</li>
                      ))}
                    </ul>
                  );
                }

                if (text.startsWith('1.') || text.startsWith('2.') || text.startsWith('3.')) {
                  return (
                    <ol key={idx} className={styles.ol}>
                      {text.split('\n').map((li, lIdx) => (
                        <li key={lIdx} className={styles.li}>{li.replace(/^\d+\.\s*/, '')}</li>
                      ))}
                    </ol>
                  );
                }

                // Render bold elements within text
                const parts = text.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={idx} className={styles.p}>
                    {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx}>{part}</strong> : part)}
                  </p>
                );
              })}
            </article>

            <aside className={styles.sidebar}>
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

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
