"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useReducedMotion, type MotionValue } from "motion/react";
import Button from "@/components/ui/Button";
import { works, type WorkItem } from "@/content/site";

// Dynamic import with SSR disabled for 3D Canvas
const WorksScene = dynamic(() => import("./works/WorksScene"), {
  ssr: false,
});

/**
 * Detect WebGL capability safely in browser
 */
function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * 2D Native Horizontal Swipe Carousel Component
 * Server-rendered by default, used on mobile, tablet, touch screens, and reduced-motion.
 */
function WorksCarousel2D({ worksList }: { worksList: WorkItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Scroll listener to update activeIndex for dots & counter
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const card = el.querySelector<HTMLElement>("[data-card-index]");
      if (!card) return;
      const cardWidth = card.offsetWidth + 20; // card width + 20px gap
      const idx = Math.round(scrollLeft / cardWidth);
      const clamped = Math.max(0, Math.min(worksList.length - 1, idx));
      setActiveIndex(clamped);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [worksList.length]);

  const scrollTo = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card-index]");
    const target = cards[idx];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <section className="relative w-full bg-[#0B0B0D] py-20 text-white" id="works-2d">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-10 text-center">
          <h2 className="font-display-sans text-[clamp(40px,6vw,84px)] font-bold tracking-tight text-[#F5F5F5]">
            Our <span className="vv-accent">Works</span>
          </h2>
        </div>

        {/* Masked Horizontal Scroller */}
        <div
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label="Works showcase carousel"
          className="flex w-full gap-5 overflow-x-auto pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6FF4D]"
          style={{
            scrollSnapType: "x mandatory",
            touchAction: "pan-x pan-y",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            maskImage:
              "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
          }}
        >
          {worksList.map((item, idx) => {
            const motionProps = prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: {
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1] as const,
                  },
                };

            return (
              <motion.div
                key={`work-card-${item.title}-${idx}`}
                data-card-index={idx}
                {...motionProps}
                className="shrink-0 w-[82vw] md:w-[56vw] max-w-[460px] snap-center"
              >
                <Link
                  href={item.href}
                  className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#151519] p-4 transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6FF4D]"
                  aria-label={`${item.title} — ${item.status}`}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#0B0B0D]">
                    <Image
                      src={item.image}
                      alt={`${item.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 82vw, (max-width: 1024px) 56vw, 460px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 px-1">
                    <span className="font-display-sans text-sm font-medium text-[#F5F5F5] truncate">
                      {item.title}
                    </span>
                    <span
                      className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        item.status === "Live"
                          ? "bg-[#C6FF4D]/15 text-[#C6FF4D]"
                          : "bg-white/10 text-[#A1A1AA]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.status === "Live" ? "bg-[#C6FF4D]" : "bg-[#A1A1AA]"
                        }`}
                      />
                      {item.status}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Dots & Counter */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {worksList.map((_, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Jump to work ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-[#C6FF4D]"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-xs text-[#A1A1AA]">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(worksList.length).padStart(2, "0")}
          </span>
        </div>

        {/* View all work button */}
        <div className="mt-10 flex justify-center">
          <Button variant="secondary" href="/products">
            View all work →
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * 3D Floating Progress & Interactive Control Overlay
 */
function Works3DOverlay({
  scrollProgress,
  totalCount,
}: {
  scrollProgress: MotionValue<number>;
  totalCount: number;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollProgress.on("change", (v) => {
      setProgress(Math.max(0, Math.min(1, v)));
    });
  }, [scrollProgress]);

  const activeNumber = Math.min(
    totalCount,
    Math.max(1, Math.floor(progress * totalCount) + 1)
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-3 px-6">
      {/* Floating Glass Pill: Counter & Drag Hint */}
      <div className="flex items-center gap-4 rounded-full border border-white/10 bg-black/60 px-5 py-2 backdrop-blur-md">
        <span className="font-mono text-xs tracking-wider text-[#C6FF4D]">
          {String(activeNumber).padStart(2, "0")}
          <span className="text-white/40"> / {String(totalCount).padStart(2, "0")}</span>
        </span>
        <span className="h-3 w-px bg-white/15" />
        <span className="font-display-sans text-xs text-neutral-400">
          Drag to spin • Scroll to explore
        </span>
      </div>

      {/* Thin scroll progress bar */}
      <div className="h-0.5 w-48 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-[#C6FF4D] transition-all duration-75"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Primary Works Component
 * Switches cleanly between the 3D spinning ring gallery (desktop fine pointer)
 * and the 2D native swipe carousel (mobile, tablet, touch, reduced-motion).
 */
export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const [is3DMode, setIs3DMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkSupport = () => {
      const hasWebGL = checkWebGLSupport();
      const mqlWidth = window.matchMedia("(min-width: 1024px)").matches;
      const mqlPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const mqlMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const shouldEnable3D = hasWebGL && mqlWidth && mqlPointer && !mqlMotion;
      setIs3DMode(shouldEnable3D);
    };

    checkSupport();

    const mqlWidth = window.matchMedia("(min-width: 1024px)");
    const mqlPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mqlMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const listener = () => checkSupport();
    mqlWidth.addEventListener("change", listener);
    mqlPointer.addEventListener("change", listener);
    mqlMotion.addEventListener("change", listener);
    window.addEventListener("resize", listener);

    return () => {
      mqlWidth.removeEventListener("change", listener);
      mqlPointer.removeEventListener("change", listener);
      mqlMotion.removeEventListener("change", listener);
      window.removeEventListener("resize", listener);
    };
  }, []);

  // Motion scroll progress for pinned 400svh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Server-render or render 2D mode when not in 3D
  if (!mounted || !is3DMode) {
    return (
      <>
        <WorksCarousel2D worksList={works} />
        {/* Visually hidden accessible work links for screen readers and SEO */}
        <ul className="sr-only">
          {works.map((item) => (
            <li key={`accessible-2d-${item.title}`}>
              <Link href={item.href}>
                {item.title} — {item.status} ({item.project})
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }

  // 3D Mode: pinned 400svh runway with sticky 100svh Canvas
  return (
    <>
      {/* Accessible skip link */}
      <a
        href="#after-works"
        className="sr-only focus:not-sr-only focus:fixed focus:top-24 focus:left-6 focus:z-50 focus:rounded-full focus:bg-[#C6FF4D] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-black"
      >
        Skip works showcase
      </a>

      <section
        ref={sectionRef}
        id="works"
        className="relative w-full bg-[#0B0B0D]"
        style={{ height: "400svh" }}
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <WorksScene worksList={works} scrollProgress={scrollYProgress} />
          <Works3DOverlay scrollProgress={scrollYProgress} totalCount={works.length} />
        </div>
      </section>

      {/* Normal-flow View all work button placed directly after pinned section */}
      <div id="after-works" className="relative z-20 flex justify-center bg-[#0B0B0D] py-14">
        <Button variant="secondary" href="/products">
          View all work →
        </Button>
      </div>

      {/* Visually hidden accessible links for keyboard & screen-reader users */}
      <ul className="sr-only">
        {works.map((item) => (
          <li key={`accessible-3d-${item.title}`}>
            <Link href={item.href}>
              {item.title} — {item.status} ({item.project})
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
