import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact OneReign — Let's Build Something Together",
  description: "Get in touch with the OneReign team. We'll respond within 24 hours.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
