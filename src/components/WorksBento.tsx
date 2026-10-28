"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function WorksBento() {
  return (
    <section className="border-t border-white/10 bg-[#0B0B0D] py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Column: Editorial Display & CTAs (Image 3 reference) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Featured Systems
            </span>

            <h2 className="mt-4 font-display-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text leading-[1.12]">
              Systems that speak.
              <br />
              <span className="font-display-serif italic font-normal text-text">
                Delivery that converts.
              </span>
            </h2>

            <p className="mt-6 font-display-sans text-base sm:text-lg text-muted leading-relaxed">
              OneReign designs and ships focused digital architectures that
              eliminate operational friction and drive measurable outcomes.
              Combining autonomous AI workflows with deterministic data models,
              we elevate your operations to run and scale seamlessly.
            </p>

            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <Button variant="primary" href="/products">
                See all products →
              </Button>
              <Button variant="secondary" href="/contact">
                Book a call
              </Button>
            </div>

            <div className="mt-12 rounded-xl border border-white/10 bg-surface/50 p-5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="font-display-sans text-xs font-semibold uppercase tracking-wider text-text">
                  Direct Technical Partnership
                </span>
              </div>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Zero sales reps. Every engagement is scoped and built directly
                with senior systems architects and engineers.
              </p>
            </div>
          </div>

          {/* Right Column: Asymmetrical Bento Grid (Image 3 & 4 reference) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Bento Card 1: Faultline (Large Featured Card) */}
            <Link
              href="/products/faultline"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 sm:p-8 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_20px_50px_-15px_rgba(198,255,77,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-400">
                    Live Demo · Graph Hacks
                  </span>
                </div>
                <span className="font-mono text-xs text-muted group-hover:text-accent transition-colors">
                  Case Study ↗
                </span>
              </div>

              <h3 className="mt-4 font-display-sans text-2xl font-bold tracking-tight text-text group-hover:text-accent transition-colors">
                Faultline
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed max-w-xl">
                Finds where an organisation&apos;s documented knowledge
                contradicts itself, ranks each conflict by what sits downstream
                of it, and repairs it via topological FalkorDB graph traversal.
              </p>

              {/* Visual Preview Frame */}
              <div className="mt-6 relative overflow-hidden rounded-xl border border-white/15 bg-black/60 aspect-[16/10] shadow-inner">
                <Image
                  src="/images/products/faultline-detail-desktop.png"
                  alt="Faultline knowledge contradiction detection interface"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-40" />
              </div>
            </Link>

            {/* Sub-grid of 2 cards: Quiet & Automation Engine */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Bento Card 2: Quiet */}
              <Link
                href="/products/quiet"
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_16px_40px_-15px_rgba(198,255,77,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] font-medium text-muted">
                      In progress · Shipaton 2026
                    </span>
                    <span className="text-xs text-muted group-hover:text-accent transition-colors">
                      ↗
                    </span>
                  </div>

                  <h4 className="mt-4 font-display-sans text-xl font-bold tracking-tight text-text group-hover:text-accent transition-colors">
                    Quiet
                  </h4>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    Cafes, libraries, and parks scored live (0–100) by the people
                    who were just there.
                  </p>
                </div>

                {/* Score Widget Preview */}
                <div className="mt-6 rounded-xl border border-white/10 bg-[#0E0E12] p-4 flex items-center justify-between">
                  <div>
                    <span className="block font-mono text-[10px] text-muted">
                      Live Quiet Score
                    </span>
                    <span className="font-display-sans text-2xl font-bold text-accent">
                      88 / 100
                    </span>
                    <span className="block text-[10px] text-muted">
                      Calmest spot nearby
                    </span>
                  </div>
                  <div className="h-10 w-10 rounded-full border-2 border-accent flex items-center justify-center font-mono text-xs font-bold text-accent">
                    88%
                  </div>
                </div>
              </Link>

              {/* Bento Card 3: Custom Architecture / Pipelines */}
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 transition-all duration-300 hover:border-white/20">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-sky-400">
                      Core Discipline
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </div>

                  <h4 className="mt-4 font-display-sans text-xl font-bold tracking-tight text-text">
                    Autonomous Pipelines
                  </h4>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    Deterministic agent orchestration and backend infrastructure
                    engineered for zero hallucination.
                  </p>
                </div>

                {/* Pipeline Node Diagram */}
                <div className="mt-6 flex flex-col gap-2 rounded-xl border border-white/10 bg-[#0E0E12] p-3 font-mono text-[10px]">
                  <div className="flex items-center justify-between text-muted">
                    <span>01. Ingestion</span>
                    <span className="text-emerald-400">✓ Parsed</span>
                  </div>
                  <div className="flex items-center justify-between text-text font-medium">
                    <span>02. Topology Check</span>
                    <span className="text-accent animate-pulse">Running</span>
                  </div>
                  <div className="flex items-center justify-between text-muted/60">
                    <span>03. Auto-Repair</span>
                    <span>Queued</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

