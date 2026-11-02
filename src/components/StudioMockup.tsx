"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export default function StudioMockup() {
  const [activeDevice, setActiveDevice] = useState<"desktop" | "mobile">("desktop");
  const [activeLayer, setActiveLayer] = useState<string>("Faultline Engine");
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 5,
      rotateY: x * 5,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const layers = [
    { id: "hero", name: "Hero Platform", status: "Active" },
    { id: "techstack", name: "Tech Stack", status: "Verified" },
    { id: "faultline", name: "Faultline Engine", status: "Live", highlighted: true },
    { id: "quiet", name: "Quiet DB Service", status: "In progress" },
    { id: "orchestration", name: "Automation Pipelines", status: "Ready" },
  ];

  return (
    <div className="relative mx-auto mt-12 w-full max-w-[1140px] px-2 sm:px-4">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -inset-2 sm:-inset-6 rounded-[32px] opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(56, 189, 248, 0.22) 0%, rgba(198, 255, 77, 0.12) 40%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Studio Window Frame with entrance motion and subtle pointer tilt */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E12] shadow-[0_24px_80px_-16px_rgba(0,0,0,0.85)] w-full"
      >
        {/* Top Control Bar */}
        <div className="flex h-12 items-center justify-between border-b border-white/10 bg-[#141419] px-4 text-xs">
          {/* Left: Window dots & Brand Studio label */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]/80" />
            </div>
            <div className="hidden items-center gap-2 font-display-sans text-muted sm:flex">
              <span className="text-text/70">OneReign</span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-[11px] text-accent">studio.faultline.v2</span>
            </div>
          </div>

          {/* Center: Device Switcher & Scale */}
          <div className="flex items-center rounded-lg border border-white/10 bg-black/40 p-1">
            <button
              type="button"
              onClick={() => setActiveDevice("desktop")}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 font-display-sans text-[11px] transition-colors min-h-[28px] ${
                activeDevice === "desktop"
                  ? "bg-white/15 text-text font-medium"
                  : "text-muted hover:text-text"
              }`}
              aria-label="Desktop viewport"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>1440px</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDevice("mobile")}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 font-display-sans text-[11px] transition-colors min-h-[28px] ${
                activeDevice === "mobile"
                  ? "bg-white/15 text-text font-medium"
                  : "text-muted hover:text-text"
              }`}
              aria-label="Mobile viewport"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12" y2="18.01" />
              </svg>
              <span>390px</span>
            </button>

            <span className="ml-2 hidden font-mono text-[10px] text-muted/60 md:inline">100%</span>
          </div>

          {/* Right: Telemetry Status & Avatars (Blinking Live dot) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-mono text-[10px] font-medium text-emerald-400">Live · 12ms</span>
            </div>

            {/* Team Avatars */}
            <div className="hidden -space-x-1.5 sm:flex">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-surface bg-zinc-800 text-[9px] font-bold text-text">
                RR
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-surface bg-zinc-700 text-[9px] font-bold text-accent">
                AI
              </div>
            </div>
          </div>
        </div>

        {/* Studio Workspace Body */}
        <div className="flex min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
          {/* Left Panel: Layers / System Tree (hidden on mobile under 768px) */}
          <div className="hidden w-52 flex-col border-r border-white/10 bg-[#121216] p-3 md:flex">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Systems Tree</span>
              <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-muted">5</span>
            </div>

            <div className="mt-3 flex flex-col gap-1">
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayer(layer.name)}
                  className={`group flex items-center justify-between rounded-md px-2.5 py-1.5 text-left font-display-sans text-xs transition-colors min-h-[32px] ${
                    activeLayer === layer.name
                      ? "bg-accent/15 text-accent font-medium"
                      : "text-muted hover:bg-white/5 hover:text-text"
                  }`}
                >
                  <span className="truncate">{layer.name}</span>
                  {layer.highlighted && (
                    <span className="rounded bg-accent/20 px-1 py-0.2 font-mono text-[9px] text-accent">
                      {layer.status}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Micro Terminal Readout */}
            <div className="mt-auto rounded border border-white/5 bg-black/40 p-2.5 font-mono text-[10px] text-muted">
              <div className="flex items-center gap-1.5 text-text/80">
                <span className="text-accent">&gt;</span>
                <span>falkordb.sync()</span>
              </div>
              <p className="mt-1 text-[9px] text-muted/60">57,291 claims parsed</p>
            </div>
          </div>

          {/* Center Stage: Interactive Product Preview */}
          <div className="relative flex flex-1 items-center justify-center bg-radial from-[#15151B] to-[#0A0A0D] p-3 sm:p-6 overflow-hidden w-full">
            {/* Viewport Frame with reserved aspect ratio */}
            <div
              className={`relative overflow-hidden rounded-xl border border-white/15 bg-black/80 shadow-2xl transition-all duration-300 w-full ${
                activeDevice === "mobile"
                  ? "max-w-[280px] sm:max-w-[320px] aspect-[9/18]"
                  : "aspect-[16/10]"
              }`}
            >
              {/* Product Live Screenshot with priority maintained */}
              <Image
                src={
                  activeDevice === "mobile"
                    ? "/images/products/faultline-detail-mobile.png"
                    : "/images/products/faultline-detail-desktop.png"
                }
                alt="Faultline knowledge contradiction graph interface"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-top"
                priority
              />

              {/* Floating Contradiction Card: stays visible at all sizes without overflowing */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex max-w-[calc(100%-24px)] items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/85 px-2.5 py-1 text-[11px] sm:text-xs font-medium text-sky-200 backdrop-blur-md shadow-lg">
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full bg-sky-400 animate-ping" />
                <span className="truncate">Contradiction Detected: Claim #0b1f</span>
              </div>

              {/* Bottom Right Graph Resolution Pill */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 hidden sm:flex items-center gap-2 rounded-full border border-accent/30 bg-[#0B0B0D]/90 px-3 py-1 text-xs font-medium text-accent backdrop-blur-md shadow-lg">
                <span>⚡ Graph Synced</span>
                <span className="text-[10px] text-muted">0.012s</span>
              </div>
            </div>

            {/* Bottom Floating Control Dock */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-white/15 bg-[#16161C]/90 p-1.5 shadow-2xl backdrop-blur-xl">
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-bg font-bold transition-transform hover:scale-105"
                title="Run Pipeline"
                aria-label="Run Pipeline"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-white/10 hover:text-text transition-colors"
                title="Inspect Graph"
                aria-label="Inspect Graph"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              <div className="h-4 w-px bg-white/15" />

              <span className="px-2 font-mono text-[11px] text-muted">1x</span>

              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-white/10 hover:text-text transition-colors"
                title="Dark Mode"
                aria-label="Dark Mode"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Panel: Architecture Inspector (hidden under 768px, visible on lg) */}
          <div className="hidden w-56 flex-col border-l border-white/10 bg-[#121216] p-4 lg:flex">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Inspector</span>

            <div className="mt-4 flex flex-col gap-3.5 text-xs">
              <div>
                <span className="block font-mono text-[10px] uppercase text-muted/70">Database</span>
                <span className="font-display-sans font-medium text-text">FalkorDB (Cypher)</span>
              </div>

              <div>
                <span className="block font-mono text-[10px] uppercase text-muted/70">Nodes Indexed</span>
                <span className="font-display-sans font-medium text-text">57,291 Claim Pairs</span>
              </div>

              <div>
                <span className="block font-mono text-[10px] uppercase text-muted/70">Latency</span>
                <span className="font-mono text-accent">14.2 ms</span>
              </div>

              <div>
                <span className="block font-mono text-[10px] uppercase text-muted/70">Resolution</span>
                <span className="inline-block mt-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                  Deterministic
                </span>
              </div>
            </div>

            <div className="mt-auto border-t border-white/10 pt-3">
              <span className="font-mono text-[10px] uppercase text-muted/60">OneReign V2</span>
              <p className="mt-1 text-[11px] text-muted leading-tight">Engineered for zero hallucination.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
