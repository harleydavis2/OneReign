import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — AI-First. System-Focused.",
  description:
    "Meet the team behind Conesta and RUBL — building operational intelligence for modern businesses.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
