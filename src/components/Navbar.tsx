"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import Logo from "@/components/Logo";
import siteContent from "@/content/site";
import styles from "./Navbar.module.css";

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

  // Handle escape key, body scroll lock, and mobile menu state for floating elements
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
      document.documentElement.setAttribute("data-menu-open", "true");
      window.dispatchEvent(
        new CustomEvent("onereign:menu-toggle", { detail: { open: true } })
      );
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
      document.documentElement.removeAttribute("data-menu-open");
      window.dispatchEvent(
        new CustomEvent("onereign:menu-toggle", { detail: { open: false } })
      );
    }

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
      document.documentElement.removeAttribute("data-menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className={styles.headerWrapper}>
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
            <Button
              variant="primary"
              href={siteContent.cta.navHref}
              className={styles.navCta}
            >
              {siteContent.cta.navAction}
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
                href={siteContent.cta.heroPrimaryHref}
                onClick={() => setMenuOpen(false)}
                className={styles.mobileCta}
              >
                {siteContent.cta.heroPrimary} →
              </Button>
              <p className={styles.mobileMeta}>
                {siteContent.brand.established} · {siteContent.brand.location}
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
