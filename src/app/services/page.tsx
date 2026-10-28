import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Engineering Services — OneReign",
  description:
    "Explore OneReign's engineering disciplines: AI & Automation, Custom Software, AI Products, Marketing Systems, Cloud & DevOps, and Integrations & APIs.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20">
      <Container>
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
            Core Disciplines
          </p>
          <h1 className="font-display-sans text-4xl sm:text-6xl font-bold tracking-tight text-text mb-6">
            Engineered systems.
            <br />
            Measurable impact.
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            We architect and ship deterministic AI workflows, autonomous agents, and custom platforms tailored to your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((svc) => (
            <div
              key={svc.slug}
              className="p-8 rounded-2xl bg-surface border border-white/10 flex flex-col justify-between transition-colors hover:border-white/25"
            >
              <div>
                <span className="text-xs font-mono text-muted mb-4 block">
                  SERVICE {svc.num}
                </span>
                <h2 className="font-display-sans text-2xl font-bold text-text mb-3">
                  {svc.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  {svc.outcome}
                </p>
                <ul className="space-y-2 mb-8">
                  {svc.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-xs text-muted/80 flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <Button variant="secondary" href={`/services/${svc.slug}`}>
                  Service details →
                </Button>
                <Link
                  href="/contact"
                  className="text-xs text-muted hover:text-text transition-colors"
                >
                  Start project
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="p-10 rounded-2xl bg-surface/50 border border-white/10 text-center max-w-2xl mx-auto">
          <h3 className="font-display-sans text-2xl font-bold text-text mb-3">
            Need a tailored engineering plan?
          </h3>
          <p className="text-sm text-muted mb-6">
            Book a 30-minute discovery call directly with our engineering team. We will review your architecture and provide immediate recommendations.
          </p>
          <Button variant="primary" href="/contact">
            Book a discovery call →
          </Button>
        </div>
      </Container>
    </div>
  );
}

