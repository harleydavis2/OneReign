"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import Button from "@/components/ui/Button";
import Logo from "@/components/Logo";
import siteContent from "@/content/site";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const scrollPosRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  // Scroll detection for transparent -> blur (24px threshold)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Handle body scroll lock & escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };

    if (menuOpen) {
      scrollPosRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.documentElement.setAttribute("data-menu-open", "true");
      window.dispatchEvent(
        new CustomEvent("onereign:menu-toggle", { detail: { open: true } })
      );
      window.addEventListener("keydown", handleKeyDown);
    } else {
      const savedY = scrollPosRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-menu-open");
      if (savedY) window.scrollTo(0, savedY);
      window.dispatchEvent(
        new CustomEvent("onereign:menu-toggle", { detail: { open: false } })
      );
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Focus trap inside mobile overlay
  useEffect(() => {
    if (!menuOpen) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const focusable = overlay.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const timer = setTimeout(() => first.focus(), 50);

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTab);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleTab);
    };
  }, [menuOpen]);

  return (
    <div
      className={`${styles.headerWrapper} ${
        isScrolled ? styles.headerScrolled : styles.headerTransparent
      }`}
    >
      <header className={styles.header}>
        <div className={styles.inner}>
          {/* Brand Logo & Identity */}
          <Logo variant="mark+name" href="/" />

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            <ul className={styles.navList}>
              {siteContent.navigation.map((item) => {
                const isActive =
                  item.href === pathname ||
                  (item.href !== "/" &&
                    pathname?.startsWith(item.href) &&
                    !item.href.includes("#"));

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${
                        isActive ? styles.navLinkActive : ""
                      }`}
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
            <Button
              variant="primary"
              href={siteContent.cta.navHref}
              className={styles.navCta}
            >
              {siteContent.cta.navAction}
            </Button>
          </div>

          {/* Mobile Hamburger Toggle (>=44px tap target) */}
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
      </header>

      {/* Accessible Full-Screen Mobile Menu Overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          id="mobile-nav"
          className={styles.mobileOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          <div className={styles.mobileTopBar}>
            <div onClick={() => setMenuOpen(false)}>
              <Logo variant="mark+name" href="/" />
            </div>
            <button
              type="button"
              className={styles.mobileCloseBtn}
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className={styles.mobileContent}>
            <nav aria-label="Mobile Navigation" className={styles.mobileNavContainer}>
              <ul className={styles.mobileList}>
                {siteContent.navigation.map((item, idx) => {
                  const isActive =
                    item.href === pathname ||
                    (item.href !== "/" &&
                      pathname?.startsWith(item.href) &&
                      !item.href.includes("#"));

                  return (
                    <motion.li
                      key={item.label}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.28,
                        delay: prefersReducedMotion ? 0 : 0.08 + idx * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={styles.mobileRowItem}
                    >
                      <Link
                        href={item.href}
                        className={`${styles.mobileLink} ${
                          isActive ? styles.mobileLinkActive : ""
                        }`}
                        onClick={() => setMenuOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span>{item.label}</span>
                        <span className={styles.mobileLinkArrow} aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.28,
                delay: prefersReducedMotion ? 0 : 0.08 + siteContent.navigation.length * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={styles.mobileAction}
            >
              <Button
                variant="primary"
                href={siteContent.cta.heroPrimaryHref}
                onClick={() => setMenuOpen(false)}
                className={styles.mobileCta}
              >
                {siteContent.cta.heroPrimary} →
              </Button>
              <p className={styles.mobileMeta}>
                {siteContent.brand.established} · {siteContent.brand.location}
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
