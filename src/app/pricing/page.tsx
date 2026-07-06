import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pricing — Starter, Growth & Partnership Plans",
  description:
    "Transparent pricing for OneReign's services. Starter from ₹50K, Growth from ₹2L, and custom Partnership plans.",
};

const plans = [
  {
    name: "Starter",
    price: "₹50K+",
    note: "Ideal for MVPs and single-purpose tools",
    popular: false,
    features: [
      "Single-purpose application",
      "Clean, functional design",
      "Core features only",
      "Basic deployment",
      "2 weeks bug fixes",
    ],
    cta: "Get Started",
    href: "/contact",
  },
  {
    name: "Growth",
    price: "₹2L+",
    note: "Production-ready multi-feature applications",
    popular: true,
    features: [
      "Multi-feature applications",
      "Custom UI/UX design",
      "Third-party integrations",
      "AI automation",
      "Analytics dashboard",
      "1 month support",
    ],
    cta: "Get Started",
    href: "/contact",
  },
  {
    name: "Partnership",
    price: "Custom",
    note: "Ongoing collaboration and dedicated hours",
    popular: false,
    features: [
      "Dedicated development hours",
      "Priority support",
      "Architecture consulting",
      "Continuous improvements",
      "Technical strategy sessions",
    ],
    cta: "Let's Talk",
    href: "/contact",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.heroBg} />
        <div className="container" style={{ textAlign: "center" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Pricing</p>
          <h1 className={styles.heroH1}>Simple, Transparent<br />Pricing</h1>
          <p className={styles.heroSub}>
            Choose the perfect plan for your needs.<br />
            Typical payment: 50% upfront, 50% on delivery.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.plansGrid}>
            {plans.map((plan) => (
              <div key={plan.name} className={`${styles.planCard} ${plan.popular ? styles.planPopular : ""}`}>
                {plan.popular && <div className={styles.popularBadge}>Most Popular</div>}
                <div className={styles.planHeader}>
                  <h2 className={styles.planName}>{plan.name}</h2>
                  <div className={styles.planPrice}>{plan.price}</div>
                  <p className={styles.planNote}>{plan.note}</p>
                </div>
                <ul className={styles.planFeatures}>
                  {plan.features.map((f) => (
                    <li key={f}>
                      <span className={styles.checkMark}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className={`btn ${plan.popular ? "btn-primary" : "btn-outline"} ${styles.planCta}`}>
                  {plan.cta} →
                </Link>
              </div>
            ))}
          </div>

          <p className={styles.note}>
            All projects are scoped individually. Reach out to discuss your specific requirements.
          </p>
        </div>
      </section>
    </>
  );
}
