import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "OneReign's privacy policy — governed by DPDP Act 2023, GDPR, and CCPA.",
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHero}>
        <div className={styles.heroBg} />
        <div className="container">
          <p className="eyebrow">Legal</p>
          <h1 className={styles.heroH1}>Privacy Policy</h1>
          <p className={styles.heroSub}>
            Governed by: Digital Personal Data Protection Act, 2023 (DPDP Act) · IT Act 2000 · GDPR (EEA) · CCPA/CPRA (California)
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.legalBody}>
          <section className={styles.legalSection}>
            <h2>Information We Collect</h2>
            <h3>Directly Provided</h3>
            <ul>
              <li>Account info (name, email, password) for Conesta/RUBL</li>
              <li>Contact form data (name, email, company, budget, project description)</li>
              <li>Payment info (handled by third-party gateways; card/bank details NOT stored)</li>
              <li>Communications sent to OneReign</li>
            </ul>
            <p><strong>Sensitive Personal Data (SPDI):</strong> Collected only with explicit prior consent.</p>
            <h3>Automatically Collected</h3>
            <ul>
              <li>Usage data (pages, clicks, navigation)</li>
              <li>Device info (browser, OS, screen)</li>
              <li>IP address</li>
              <li>Cookies (analytics cookies placed only after consent)</li>
            </ul>
            <h3>From Third Parties</h3>
            <ul>
              <li>Analytics providers</li>
              <li>Auth providers (Google, GitHub) — basic profile only</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>Provide and maintain services (Conesta, RUBL, OneReign.tech)</li>
              <li>Process transactions &amp; generate GST invoices</li>
              <li>Communicate — respond to enquiries, support</li>
              <li>Improve products via usage analytics</li>
              <li>Ensure security — detect fraud/abuse</li>
              <li>Comply with Indian law (IT Act, DPDP Act, Income Tax Act, CGST Act)</li>
            </ul>
            <div className={styles.highlight}>
              <strong>OneReign does not sell personal data to third parties.</strong>
            </div>
          </section>

          <section className={styles.legalSection}>
            <h2>Data Retention</h2>
            <table className={styles.legalTable}>
              <thead>
                <tr><th>Data Type</th><th>Retention Period</th></tr>
              </thead>
              <tbody>
                <tr><td>Account data</td><td>While active; deleted within 30 days of request</td></tr>
                <tr><td>Contact form submissions</td><td>2 years</td></tr>
                <tr><td>Identifiable analytics</td><td>26 months</td></tr>
                <tr><td>Financial/payment records</td><td>8 years (Income Tax Act) / 6 years (CGST Act)</td></tr>
              </tbody>
            </table>
          </section>

          <section className={styles.legalSection}>
            <h2>Your Rights</h2>
            <h3>Under DPDP Act 2023 (Indian users)</h3>
            <ul>
              <li>Access (§11)</li>
              <li>Correction &amp; Erasure (§12)</li>
              <li>Grievance Redressal (§13)</li>
              <li>Nomination (§14)</li>
              <li>Withdraw Consent (§6(5))</li>
            </ul>
            <h3>Under GDPR (EEA)</h3>
            <p>Data portability, restriction, objection, and the right to lodge complaints with your local DPA.</p>
            <h3>Under CCPA/CPRA (California)</h3>
            <p>Right to know, delete, and opt out of sale of personal information.</p>
          </section>

          <section className={styles.legalSection}>
            <h2>Data Security</h2>
            <ul>
              <li>TLS/SSL encryption in transit</li>
              <li>Encryption of sensitive data at rest</li>
              <li>Regular security assessments</li>
              <li>Role-based access + MFA</li>
              <li>AWS/GCP secure cloud infrastructure (ISO 27001 aligned)</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>Grievance Officer</h2>
            <div className={styles.contactBox}>
              <p><strong>Name:</strong> Jabez Paul Asir</p>
              <p><strong>Designation:</strong> Grievance Officer, OneReign Private Limited</p>
              <p><strong>Email:</strong> <a href="mailto:hello@onereign.co">hello@onereign.co</a></p>
              <p><strong>Address:</strong> No-38, GV Opulence, CS-2, Janabai Street, VivekNagar, Ambattur, Tiruvallur-600053, Chennai, Tamil Nadu, India</p>
              <p><strong>Resolution time:</strong> Within 30 days</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
