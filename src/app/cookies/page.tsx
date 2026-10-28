import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import styles from "../legal.module.css";

// TODO(rajesh): Add cookie banner provider if analytics cookies are enabled in the future.

export const metadata: Metadata = {
  title: "Cookie Policy — OneReign",
  description: "OneReign Cookie Policy — Information regarding session tokens and functional cookies.",
  alternates: {
    canonical: "/cookies",
  },
};

export default function CookiesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHero}>
        <div className={styles.heroBg} />
        <Container>
          <p className="eyebrow">Technical Policies</p>
          <h1 className={styles.heroH1}>Cookie Policy</h1>
          <p className={styles.heroSub}>
            Transparent information regarding functional session storage and performance cookies.
          </p>
        </Container>
      </div>

      <Container>
        <div className={styles.legalBody}>
          <section className={styles.legalSection}>
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small technical data files stored on your browser or device to enable basic security, session integrity, and user preference persistence.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>2. How OneReign Uses Cookies</h2>
            <p>
              OneReign uses strictly essential cookies required to ensure fast rendering, theme state, and secure communications. We do not use intrusive cross-site tracking cookies.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>3. Managing Cookies</h2>
            <p>
              You can configure your browser settings to decline or remove cookies at any time. Essential features of the public website will continue to function.
            </p>
            <div className="pt-4">
              <Link href="/" className="text-xs text-muted hover:text-text">
                ← Return to Home
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}

