import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Pricing & Engagements — OneReign",
  description:
    "Predictable scoping and transparent engineering engagements for AI automation, custom software, and full product partnerships.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <div className="pt-16 pb-12">
      <Pricing />

      <div className="mt-16">
        <CtaBand
          heading="Have unique architectural requirements?"
          subheading="We build custom integrations, high-volume data engines, and specialized internal tools. Let's scope it out."
          primaryCtaText="Book a technical scope call"
          primaryCtaHref="/contact"
        />
      </div>
    </div>
  );
}
