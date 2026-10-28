import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Systems Over Noise",
  description:
    "Meet the engineering team at OneReign — building AI systems, automation workflows, and custom software for modern businesses.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
