import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/ui/CtaBand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pricing — Transparent Engineering Engagements",
  description:
    "Simple, predictable engineering engagements for AI platforms, automation workflows, and custom software. Starter from ₹50K, Growth from ₹2L, and custom Partnership.",
  alternates: {
    canonical: "/pricing",
  },
};

const plans = [
  {
    name: "Starter",
    price: "₹50K+",
    note: "Ideal for MVPs, automation scripts, and single-purpose tools",
    popular: false,
    features: [
      "Single-purpose application or automation",
      "Clean, maintainable architecture",
      "Direct API integration",
      "Production deployment to cloud/Vercel",
      "2 weeks post-launch support",
    ],
    cta: "Start a project",
    href: "/contact",
  },
  {
    name: "Growth",
    price: "₹2L+",
    note: "Full-scale custom software and multi-agent AI systems",
    popular: true,
    features: [
      "Multi-feature web/mobile applications",
      "Custom AI agent & task execution pipelines",
      "Database schema & PostGIS/FalkorDB setup",
      "Cloud architecture, CI/CD & automated monitoring",
      "1 month post-launch SLA support",
    ],
    cta: "Build with us",
    href: "/contact",
  },
  {
    name: "Partnership",
    price: "Custom",
    note: "Dedicated technical squad for ongoing scale and maintenance",
    popular: false,
    features: [
      "Dedicated development & architecture hours",
      "Direct Slack/Discord access to senior engineers",
      "Continuous system improvements & new features",
      "Bi-weekly architectural review sessions",
      "Priority emergency bug response",
    ],
    cta: "Discuss partnership",
    href: "/contact",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <span className="eyebrow">Engagement Models</span>
          <h1 className={styles.heroH1}>Clear scope. Predictable investment.</h1>
          <p className={styles.heroSub}>
            We don&apos;t bill endless ambiguous hours. Every engagement has typed milestones, clear deliverables, and zero hidden lock-in. Typical billing structure: 50% upfront, 50% upon verified delivery.
          </p>
        </div>
      </section>

      <section className={styles.plansSection}>
        <div className="container">
          <div className={styles.plansGrid}>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`${styles.planCard} ${plan.popular ? styles.planPopular : ""}`}
              >
                {plan.popular && <div className={styles.popularBadge}>Recommended for Companies</div>}

                <div className={styles.planHeader}>
                  <h2 className={styles.planName}>{plan.name}</h2>
                  <div className={styles.planPrice}>{plan.price}</div>
                  <p className={styles.planNote}>{plan.note}</p>
                </div>

                <div className={styles.featuresWrapper}>
                  <span className={styles.featuresHeading}>What&apos;s included:</span>
                  <ul className={styles.planFeatures}>
                    {plan.features.map((f) => (
                      <li key={f} className={styles.featureItem}>
                        <span className={styles.checkMark} aria-hidden="true">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.ctaWrapper}>
                  <Button
                    variant={plan.popular ? "primary" : "secondary"}
                    href={plan.href}
                    className={styles.planBtn}
                  >
                    {plan.cta} →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Have unique architectural requirements?"
        subheading="We build custom integrations, high-volume data engines, and specialized internal tools. Let's scope it out."
        primaryCtaText="Book a technical scope call"
        primaryCtaHref="/contact"
      />
    </>
  );
}
