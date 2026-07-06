import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "OneReign Terms of Service — governed by Laws of India, State of Tamil Nadu.",
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHero}>
        <div className={styles.heroBg} />
        <div className="container">
          <p className="eyebrow">Legal</p>
          <h1 className={styles.heroH1}>Terms of Service</h1>
          <p className={styles.heroSub}>
            Governed by: Laws of India, State of Tamil Nadu · Jurisdiction: Chennai courts
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.legalBody}>
          <section className={styles.legalSection}>
            <h2>Services Covered</h2>
            <p>These terms apply to: OneReign.tech, conesta.in, rubl.in, and all client engagements.</p>
          </section>

          <section className={styles.legalSection}>
            <h2>Acceptable Use</h2>
            <h3>Prohibited Activities</h3>
            <ul>
              <li>Illegal activity (Indian law or applicable jurisdiction)</li>
              <li>Unauthorized system access (IT Act §43, §66)</li>
              <li>Malicious code / viruses</li>
              <li>Scraping without written permission</li>
              <li>Spam / unsolicited communications</li>
              <li>Defamatory or obscene content (IT Rules 2021)</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>Client Services &amp; Payment</h2>
            <table className={styles.legalTable}>
              <thead>
                <tr><th>Term</th><th>Detail</th></tr>
              </thead>
              <tbody>
                <tr><td>Payment Split</td><td>50% upfront, 50% on delivery</td></tr>
                <tr><td>GST</td><td>18% on IT/consulting (SAC 998314/998315, CGST Act 2017)</td></tr>
                <tr><td>TDS</td><td>Form 16A required if client deducts under §194J/194C</td></tr>
                <tr><td>Invoice Disputes</td><td>Must be raised in writing within 7 days</td></tr>
                <tr><td>Refunds</td><td>Proportional refund if OneReign fails to deliver; request within 15 days of deadline</td></tr>
                <tr><td>Delivered Work</td><td>Non-refundable once accepted in writing</td></tr>
              </tbody>
            </table>
          </section>

          <section className={styles.legalSection}>
            <h2>Subscriptions</h2>
            <ul>
              <li>Auto-renew unless cancelled 24h before renewal</li>
              <li>No pro-rata refunds for partial periods</li>
              <li>Price changes: 30 days prior notice</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>Limitation of Liability</h2>
            <ul>
              <li><strong>Cap:</strong> Total amount paid in preceding 12 months</li>
              <li><strong>Excluded:</strong> Indirect/consequential/punitive damages</li>
              <li><strong>Carve-outs:</strong> Wilful misconduct, fraud, confidentiality breach, personal injury</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>Termination</h2>
            <ul>
              <li><strong>By user:</strong> Close account / cease use</li>
              <li><strong>By OneReign:</strong> 15 days notice + cure period (immediate for illegal/security threats)</li>
              <li><strong>Post-termination:</strong> Data export window = 30 days, then deleted per Privacy Policy</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>Governing Law</h2>
            <ul>
              <li><strong>Law:</strong> India (Tamil Nadu)</li>
              <li><strong>Disputes:</strong> 30-day good-faith negotiation first; then Chennai courts have exclusive jurisdiction</li>
              <li><strong>Consumer disputes:</strong> Consumer Disputes Redressal Commission rights unaffected</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>Grievance Officer</h2>
            <div className={styles.contactBox}>
              <p><strong>Name:</strong> Jabez Paul Asir</p>
              <p><strong>Email:</strong> <a href="mailto:hello@onereign.co">hello@onereign.co</a></p>
              <p><strong>Address:</strong> No-38, GV Opulence, CS-2, Janabai Street, VivekNagar, Ambattur, Tiruvallur-600053, Chennai, TN</p>
              <p><strong>Response:</strong> Acknowledged within 24h, resolved within 15 days</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
