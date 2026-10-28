"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import styles from "./Navbar.module.css";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/products" },
  { label: "Approach", href: "/#approach" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const navRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Close menu on route change without cascading effect
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Brand Wordmark & Identity */}
        <Link href="/" className={styles.brand} aria-label="OneReign Home">
          <span className={styles.mark} aria-hidden="true">
            <span className={styles.markBar} />
            <span className={styles.markBar} />
            <span className={styles.markBar} />
          </span>
          <span className={styles.wordmark}>ONEREIGN</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {navItems.map((item) => {
              const isActive =
                item.href === pathname ||
                (item.href !== "/" && pathname?.startsWith(item.href) && !item.href.includes("#"));

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTA Action */}
        <div className={styles.desktopAction}>
          <Button variant="primary" href="/contact" className={styles.navCta}>
            Book a call
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          ref={menuBtnRef}
          type="button"
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      {/* Accessible Full-Width Mobile Menu Overlay */}
      <div
        id="mobile-nav"
        className={`${styles.mobileOverlay} ${menuOpen ? styles.mobileOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileContent}>
          <nav ref={navRef} aria-label="Mobile Navigation">
            <ul className={styles.mobileList}>
              {navItems.map((item) => {
                const isActive =
                  item.href === pathname ||
                  (item.href !== "/" && pathname?.startsWith(item.href) && !item.href.includes("#"));

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`}
                      onClick={() => setMenuOpen(false)}
                      tabIndex={menuOpen ? 0 : -1}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.mobileAction}>
            <Button
              variant="primary"
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className={styles.mobileCta}
            >
              Book a free 30-min call →
            </Button>
            <p className={styles.mobileMeta}>Est. 2025 · Remote / Global</p>
          </div>
        </div>
      </div>
    </header>
  );
}
