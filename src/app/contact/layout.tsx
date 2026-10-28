import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Let's Build Systems Together",
  description: "Get in touch with the OneReign engineering team. We respond within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
