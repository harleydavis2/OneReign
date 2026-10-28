import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Top: Brand info and Link columns */}
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand} aria-label="OneReign Home">
              <span className={styles.mark} aria-hidden="true">
                <span className={styles.markBar} />
                <span className={styles.markBar} />
                <span className={styles.markBar} />
              </span>
              <span className={styles.wordmark}>ONEREIGN</span>
            </Link>

            <p className={styles.description}>
              We build the systems your business runs on. AI agents, automated workflows, and custom software engineered for operational clarity.
            </p>

            <div className={styles.metaBadge}>
              <span className={styles.metaDot} aria-hidden="true" />
              <span>Est. 2025 · Remote / Global</span>
            </div>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Navigation</h4>
              <ul className={styles.linkList}>
                <li><Link href="/#services" className={styles.link}>Services</Link></li>
                <li><Link href="/products" className={styles.link}>Products</Link></li>
                <li><Link href="/#approach" className={styles.link}>Approach</Link></li>
                <li><Link href="/blog" className={styles.link}>Blog</Link></li>
                <li><Link href="/pricing" className={styles.link}>Pricing</Link></li>
                <li><Link href="/about" className={styles.link}>About</Link></li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Flagship Products</h4>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/products/faultline" className={styles.link}>
                    Faultline <span className={styles.subTag}>Live</span>
                  </Link>
                </li>
                <li>
                  <Link href="/products/quiet" className={styles.link}>
                    Quiet <span className={styles.subTagMuted}>In progress</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Contact & Connect</h4>
              <ul className={styles.linkList}>
                <li>
                  <a href="mailto:hello@onereign.co" className={styles.link}>
                    hello@onereign.co
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/company/onereign"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <Link href="/contact" className={styles.link}>
                    Book a call ↗
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar: Legal & Copyright */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2025–2026 OneReign Private Limited. All rights reserved.
          </p>

          <div className={styles.legalLinks}>
            <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
            <span className={styles.sep}>·</span>
            <Link href="/terms" className={styles.legalLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
