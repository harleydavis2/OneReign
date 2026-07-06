"use client";
import Link from "next/link";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import styles from "./Footer.module.css";

const SpinningLogo = dynamic(() => import("./SpinningLogo"), { ssr: false });

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
  ],
  Products: [
    { label: "Conesta", href: "/products#conesta" },
    { label: "RUBL", href: "/products#rubl" },
  ],
  "Client Services": [
    { label: "Contact", href: "/contact" },
    { label: "Partnerships", href: "/contact?ref=partner" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socials = [
  { label: "X (Twitter)", href: "https://twitter.com/onereign", icon: "𝕏" },
  { label: "GitHub", href: "https://github.com/onereign", icon: "GH" },
  { label: "LinkedIn", href: "https://linkedin.com/company/onereign", icon: "in" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Suspense fallback={<div className={styles.logoFallback}>O</div>}>
              <SpinningLogo size={36} />
              </Suspense>
              <span className={styles.logoText}>ONEREIGN</span>
            </div>
            <p className={styles.tagline}>
              AI platforms, automation workflows,<br />and custom software — built with clarity.
            </p>
            <div className={styles.socials}>
              {socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.links}>
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group} className={styles.linkGroup}>
                <h4 className={styles.groupTitle}>{group}</h4>
                <ul>
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            ONEREIGN 2026 — ALL RIGHTS RESERVED | Est. 2025 · Remote / Global
          </p>
          <a href="mailto:hello@onereign.co" className={styles.email}>
            hello@onereign.co
          </a>
        </div>
      </div>
    </footer>
  );
}
