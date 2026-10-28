import React from "react";
import Link from "next/link";
import {
  SiInstagram,
  SiX,
  SiWhatsapp,
} from "@icons-pack/react-simple-icons";
import siteContent, { services } from "@/content/site";
import styles from "./Footer.module.css";

// Official monochrome vector LinkedIn SVG
function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.44a1.68 1.68 0 0 0-1.69 1.69 1.68 1.68 0 0 0 1.69 1.68 1.68 1.68 0 0 0 1.68-1.68 1.68 1.68 0 0 0-1.68-1.69Z" />
    </svg>
  );
}

export default function Footer() {
  // Tile data definitions
  const potentialTiles = [
    {
      name: "Instagram",
      url: siteContent.socials?.instagram,
      icon: <SiInstagram size={18} aria-hidden="true" />,
    },
    {
      name: "LinkedIn",
      url: siteContent.socials?.linkedin,
      icon: <LinkedInIcon size={18} />,
    },
    {
      name: "X",
      url: siteContent.socials?.x || siteContent.socials?.twitter,
      icon: <SiX size={16} aria-hidden="true" />,
    },
    {
      name: "WhatsApp",
      url: siteContent.contact.whatsappUrl,
      icon: <SiWhatsapp size={18} aria-hidden="true" />,
    },
  ];

  // Rule: If a URL contains "TODO" or is missing, do not render that tile.
  const activeTiles = potentialTiles.filter(
    (tile) => tile.url && !tile.url.includes("TODO")
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* ── Top Row: Bordered Link Tiles ─────────────────────────── */}
        {activeTiles.length > 0 && (
          <div className={styles.tilesRow}>
            {activeTiles.map((tile) => (
              <a
                key={tile.name}
                href={tile.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkTile}
                aria-label={`Open OneReign ${tile.name} profile in new tab`}
              >
                <div className={styles.tileLeft}>
                  <div className={styles.tileIcon}>{tile.icon}</div>
                  <span className={styles.tileLabel}>{tile.name}</span>
                </div>
                <span className={styles.tileArrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        )}

        {/* ── 4-Column Grid with Thin Vertical Dividers ───────────── */}
        <div className={styles.columnsGrid}>
          {/* Column 1: Company */}
          <div className={styles.column}>
            <h4 className={styles.columnHeading}>Company</h4>
            <ul className={styles.linksList}>
              <li>
                <Link href="/about" className={styles.footerLink}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/works" className={styles.footerLink}>
                  Work
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={styles.footerLink}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={styles.footerLink}>
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className={styles.column}>
            <h4 className={styles.columnHeading}>Services</h4>
            <ul className={styles.linksList}>
              {services.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className={styles.footerLink}
                  >
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className={styles.column}>
            <h4 className={styles.columnHeading}>Resources</h4>
            <ul className={styles.linksList}>
              <li>
                <Link href="/blog" className={styles.footerLink}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/pricing" className={styles.footerLink}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className={styles.footerLink}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/cookies" className={styles.footerLink}>
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className={styles.column}>
            <h4 className={styles.columnHeading}>Contact</h4>
            <ul className={styles.linksList}>
              <li>
                <a
                  href={`mailto:${siteContent.contact.email}`}
                  className={styles.footerLink}
                >
                  {siteContent.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteContent.contact.telephone || "+918667768636"}`}
                  className={styles.footerLink}
                >
                  +91 8667768636
                </a>
              </li>
              <li className={styles.contactText}>Based in Bangalore, India</li>
              <li className={styles.contactText}>Serving clients worldwide</li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Line ─────────────────────────────────────────── */}
        <div className={styles.bottomLine}>
          <p className={styles.copyright}>
            © 2026 {siteContent.brand.name}. All rights reserved.
          </p>
          <p className={styles.tagline}>{siteContent.brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
