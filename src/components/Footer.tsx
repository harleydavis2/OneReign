"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          if (rect.top < viewportHeight && rect.bottom > 0) {
            const currentDist = viewportHeight - rect.top;
            const progress = Math.max(0, Math.min(1, currentDist / (rect.height || 200)));

            // 0% progress = white on 'O' (left side, position 85%)
            // 100% progress = white on 'N' (right side, position 15%)
            const offset = 85 - progress * 70;
            containerRef.current.style.setProperty("--bg-offset-x", `${offset}%`);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className={styles.footer} ref={containerRef}>
      <div className={styles.container}>

        {/* Top Section: Contact Card & Links */}
        <div className={styles.topSection}>
          <div className={styles.contactCard}>
            <h3 className={styles.contactTitle}>Get in touch</h3>

            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>Est. 2025 · Remote / Global</span>
              </div>

              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:hello@onereign.co" className={styles.contactLink}>hello@onereign.co</a>
              </div>
            </div>

            <div className={styles.socialsRow}>
              <a href="https://linkedin.com/company/onereign" target="_blank" rel="noopener noreferrer" className={styles.socialIconBox} aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://github.com/onereign" target="_blank" rel="noopener noreferrer" className={styles.socialIconBox} aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://twitter.com/onereign" target="_blank" rel="noopener noreferrer" className={styles.socialIconBox} aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.linksColumns}>
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Company</h4>
              <Link href="/pricing" className={styles.columnLink}>Pricing</Link>
              <Link href="/about" className={styles.columnLink}>About us</Link>
              <Link href="/blog" className={styles.columnLink}>Blog</Link>
              <Link href="/privacy" className={styles.columnLink}>Terms & policies</Link>
              <a href="#" className={styles.columnLink}>Video launches</a>
              <a href="#" className={styles.columnLink}>
                Merch <span className={styles.badge}>new</span>
              </a>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Products</h4>
              <Link href="/products#conesta" className={styles.columnLink}>Conesta</Link>
              <Link href="/products#rubl" className={styles.columnLink}>RUBL</Link>
              <a href="#" className={styles.columnLink}>AI Platforms</a>
              <a href="#" className={styles.columnLink}>Workflows</a>
              <a href="#" className={styles.columnLink}>Software</a>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Services</h4>
              <a href="#" className={styles.columnLink}>Design services</a>
              <a href="#" className={styles.columnLink}>Automation</a>
              <a href="#" className={styles.columnLink}>Web development</a>
              <a href="#" className={styles.columnLink}>Consulting</a>
              <Link href="/contact" className={styles.columnLink}>Contact sales</Link>
            </div>
          </div>
        </div>

        {/* Middle Row: AI Guide */}
        <div className={styles.middleRow}>
          <a href="#" className={styles.topLink}>
            <span className={styles.sparkle}>✦</span> Hey AI, your official guide to OneReign
          </a>
        </div>

        {/* Bottom Section: Giant brand text */}
        <div className={styles.bottomSection}>
          <div className={styles.brandContainer}>
            <span className={styles.brandText}>ONEREIGN</span>
            <span className={styles.punctuation}>
              <span className={styles.star}>*</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
