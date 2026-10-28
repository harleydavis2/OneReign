import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import styles from "../legal.module.css";

// TODO(rajesh): Confirm company registration details and grievance officer contact for DPDP Act 2023 compliance.

export const metadata: Metadata = {
  title: "Privacy Policy — OneReign",
  description: "OneReign Privacy Policy — Transparency regarding data processing and communications.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHero}>
        <div className={styles.heroBg} />
        <Container>
          <p className="eyebrow">Privacy & Transparency</p>
          <h1 className={styles.heroH1}>Privacy Policy</h1>
          <p className={styles.heroSub}>
            Effective Date: Est. 2025 · OneReign Systems
          </p>
        </Container>
      </div>

      <Container>
        <div className={styles.legalBody}>
          <section className={styles.legalSection}>
            <h2>1. Overview</h2>
            <p>
              OneReign (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy. We build software systems, automation pipelines, and AI platforms. We do not sell your personal data or operational records to third-party data brokers.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>2. Information We Collect</h2>
            <p>When you contact us or engage our engineering services, we collect:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name, work email address, telephone/WhatsApp number, and company name.</li>
              <li><strong>Project Architecture Data:</strong> High-level system requirements and workflow descriptions shared during discovery calls.</li>
              <li><strong>Technical Logs:</strong> Anonymous aggregate telemetry required for site uptime, security, and performance.</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>3. How We Use Information</h2>
            <p>We use collected data solely to:</p>
            <ul>
              <li>Respond to your technical inquiries and schedule discovery sessions.</li>
              <li>Engineer, deploy, and maintain bespoke software platforms.</li>
              <li>Maintain operational stability, uptime, and system security.</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>4. Contact &amp; Inquiries</h2>
            <p>
              For privacy inquiries, please contact our engineering team directly at{" "}
              <a href="mailto:onereign.official@gmail.com" className="text-accent underline">
                onereign.official@gmail.com
              </a>.
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

