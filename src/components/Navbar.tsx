"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./Navbar.module.css";

const SpinningLogo = dynamic(() => import("./SpinningLogo"), { ssr: false });

const navLinks = [
  { label: "01 · Home", href: "/" },
  { label: "02 · Approach", href: "/#approach" },
  { label: "03 · Services", href: "/#services" },
  { label: "04 · Products", href: "/products" },
  { label: "05 · Blog", href: "/blog" },
  { label: "06 · Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <Suspense fallback={<div className={styles.logoFallback}>O</div>}>
          <SpinningLogo size={36} />
          </Suspense>
          <span className={styles.logoText}>ONEREIGN</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/pricing" className={`btn btn-primary ${styles.ctaBtn}`} onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
        </nav>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
