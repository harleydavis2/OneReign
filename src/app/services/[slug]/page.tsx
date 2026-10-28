import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { services } from "@/content/site";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((svc) => ({
    slug: svc.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return { title: "Service Not Found — OneReign" };
  }

  return {
    title: `${service.title} — OneReign Engineering`,
    description: service.outcome,
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20">
      <Container>
        <div className="mb-8">
          <Link
            href="/services"
            className="text-xs text-muted hover:text-text transition-colors flex items-center gap-1.5"
          >
            ← Back to all services
          </Link>
        </div>

        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono text-accent mb-3 block">
            SERVICE {service.num}
          </span>
          <h1 className="font-display-sans text-4xl sm:text-6xl font-bold tracking-tight text-text mb-6">
            {service.title}
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            {service.outcome}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2 p-8 rounded-2xl bg-surface border border-white/10 space-y-6">
            <h2 className="font-display-sans text-2xl font-semibold text-text">
              Key Capabilities & Scope
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-bg border border-white/5 flex flex-col justify-between"
                >
                  <span className="text-[11px] font-mono text-muted mb-2">
                    0{idx + 1}
                  </span>
                  <p className="text-sm text-text font-medium">{bullet}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted leading-relaxed pt-4 border-t border-white/5">
              Every system we engineer includes end-to-end telemetry, structured error handling, and complete documentation handed over to your team.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-surface border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="font-display-sans text-xl font-semibold text-text mb-3">
                Start this engagement
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-6">
                Direct access to senior systems architects. Fast kickoff and production-grade delivery cycles.
              </p>
            </div>
            <div className="space-y-3">
              <Button variant="primary" href="/contact" className="w-full">
                Book a 30-min call →
              </Button>
              <Button variant="secondary" href="/products" className="w-full">
                View live products
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

