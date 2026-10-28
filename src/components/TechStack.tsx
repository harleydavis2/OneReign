"use client";

import React from "react";
import { motion, type Variants } from "motion/react";
import {
  SiNextdotjs,
  SiSupabase,
  SiPostgresql,
  SiPython,
  SiN8n,
  SiClaude,
  SiVercel,
} from "@icons-pack/react-simple-icons";
import { techStack } from "@/content/site";
import Container from "@/components/ui/Container";

// Monochrome OpenAI SVG matching simple-icons 24px standard
function OpenAIIcon({
  size = 22,
  className = "",
  "aria-hidden": ariaHidden = true,
}: {
  size?: number;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden={ariaHidden}
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.66-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1401-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6669zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}

const iconComponentMap: Record<
  string,
  React.ComponentType<{
    size?: number;
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>
> = {
  nextdotjs: SiNextdotjs,
  "next.js": SiNextdotjs,
  next: SiNextdotjs,
  supabase: SiSupabase,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  python: SiPython,
  n8n: SiN8n,
  openai: OpenAIIcon,
  claude: SiClaude,
  anthropic: SiClaude,
  vercel: SiVercel,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06, // 60ms stagger entrance
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function TechStack() {
  return (
    <section className="bg-transparent py-[96px]">
      <Container>
        {/* Small muted eyebrow centered */}
        <p className="mb-10 text-center font-display-sans text-xs font-semibold uppercase tracking-widest text-muted">
          Tools we build with
        </p>

        {/* Centered grid: 4 cols desktop, 2 cols mobile, 60ms stagger entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mx-auto grid max-w-[1000px] grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 md:grid-cols-4 md:gap-y-10"
        >
          {techStack.map((item) => {
            const Icon =
              iconComponentMap[item.icon.toLowerCase()] ||
              iconComponentMap[item.name.toLowerCase()] ||
              SiNextdotjs;

            return (
              <motion.div
                key={item.name}
                variants={itemVariants}
                className="group flex items-center justify-center gap-3 cursor-default transition-all duration-200 hover:-translate-y-[2px]"
              >
                {/* Monochrome logo icon (#A1A1AA -> #F5F5F5 on hover), decorative */}
                <span
                  className="flex items-center text-muted transition-colors duration-200 group-hover:text-text"
                  aria-hidden="true"
                >
                  <Icon size={22} aria-hidden="true" />
                </span>

                {/* 18px medium text beside it (#A1A1AA -> #F5F5F5 on hover) */}
                <span className="font-display-sans text-[18px] font-medium leading-none text-muted transition-colors duration-200 group-hover:text-text">
                  {item.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
