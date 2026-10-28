"use client";

import React from "react";
import Link from "next/link";
import {
  Bot,
  Code2,
  Sparkles,
  TrendingUp,
  Cloud,
  Network,
  type LucideIcon,
} from "lucide-react";
import {
  SiWhatsapp,
  SiGooglesheets,
  SiNotion,
  SiSupabase,
  SiPostgresql,
  SiZapier,
} from "@icons-pack/react-simple-icons";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { services, platformIntegrations } from "@/content/site";
import styles from "./Services.module.css";

// Lucide icon mapping for the 6 services
const serviceIconMap: Record<string, LucideIcon> = {
  bot: Bot,
  code: Code2,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
  cloud: Cloud,
  network: Network,
};

// Official monochrome OpenAI SVG
function OpenAIIcon({ size = 34, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.66-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1401-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6669zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}

// Official monochrome Slack SVG
function SlackIcon({ size = 34, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    </svg>
  );
}

// Map platform integrations to their monochrome icon components
function renderIntegrationIcon(iconName: string) {
  const size = 34;
  switch (iconName) {
    case "whatsapp":
      return <SiWhatsapp size={size} />;
    case "googlesheets":
      return <SiGooglesheets size={size} />;
    case "notion":
      return <SiNotion size={size} />;
    case "slack":
      return <SlackIcon size={size} />;
    case "supabase":
      return <SiSupabase size={size} />;
    case "postgresql":
      return <SiPostgresql size={size} />;
    case "openai":
      return <OpenAIIcon size={size} />;
    case "zapier":
      return <SiZapier size={size} />;
    default:
      return null;
  }
}

export default function Services() {
  return (
    <section className={styles.servicesSection} id="services">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <Container>
        {/* ── PART A: Header Row ─────────────────────────────────── */}
        <div className={styles.headerRow}>
          <div className={styles.headingWrapper}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              <span>Core Capabilities</span>
            </div>
            <h2 className={styles.sectionHeading}>
              Elevate your business systems.
            </h2>
          </div>

          <div className={styles.headerActions}>
            <Button variant="primary" href="/services">
              View all services
            </Button>
            <Button variant="secondary" href="/contact">
              Start a project
            </Button>
          </div>
        </div>

        {/* ── PART A: Services Grid (6 Cards) ────────────────────── */}
        <div className={styles.servicesGrid}>
          {services.map((svc) => {
            const IconComponent = serviceIconMap[svc.icon] || Bot;
            return (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className={styles.serviceCard}
                aria-label={`${svc.title} — ${svc.outcome}`}
              >
                {/* Faint animated dot-grid background on hover */}
                <div className={styles.cardDotGrid} aria-hidden="true" />

                <div className={styles.cardContent}>
                  <div className={styles.cardIcon}>
                    <IconComponent size={32} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h3 className={styles.cardTitle}>
                    {svc.line1}
                    <br />
                    {svc.line2}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── PART B: Platform Flexibility ───────────────────────── */}
        <div className={styles.platformBlock}>
          {/* Left Card: Works with your stack */}
          <div className={styles.stackCard}>
            <div className={styles.starfieldBg} aria-hidden="true" />
            <div className={styles.stackContent}>
              <h3 className={styles.stackHeading}>Works with your stack.</h3>
              <p className={styles.stackText}>
                Whatever tools you already use, we connect them into one reliable system.
              </p>
            </div>
            <div className={styles.stackAction}>
              <Button variant="secondary" href="/products">
                See our work
              </Button>
            </div>
          </div>

          {/* Right: 4x2 Grid of Bordered Integration Cells */}
          <div className={styles.integrationsGrid}>
            {platformIntegrations.map((item) => (
              <div
                key={item.name}
                className={styles.cell}
                title={item.name}
                aria-label={item.name}
              >
                <div className={styles.cellIcon}>
                  {renderIntegrationIcon(item.icon)}
                </div>
                <span className={styles.cellLabel}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
