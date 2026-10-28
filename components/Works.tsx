"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useScroll, useReducedMotion } from "motion/react";
import Button from "@/components/ui/Button";
import { works, type WorkItem } from "@/content/site";

// Dynamic import with SSR disabled
const WorksScene = dynamic(() => import("./works/WorksScene"), {
  ssr: false,
  loading: () => <WorksFallback />,
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
 * Static Fallback Carousel Component
 * Used when prefers-reduced-motion is active, WebGL is unavailable, or viewport < 480px.
 */
function WorksFallback() {
  return (
    <section className="relative w-full bg-[#000000] py-20 text-white" id="works-fallback">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Title */}
        <div className="mb-12 text-center">
          <h2 className="font-display text-[clamp(44px,7vw,96px)] font-medium tracking-[-0.05em] text-white">
            Our <span className="vv-accent">Works</span>
          </h2>
        </div>

        {/* Horizontal scroll-snap carousel */}
        <div
          tabIndex={0}
          role="region"
          aria-label="Works showcase carousel"
          className="flex w-full gap-5 overflow-x-auto scroll-smooth pb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6FF4D]"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        >
          {works.map((item, idx) => (
            <Link
              key={`fallback-${item.title}-${idx}`}
              href={item.href}
              className="group flex flex-col gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6FF4D]"
              style={{
                flex: "0 0 85vw",
                maxWidth: "380px",
                scrollSnapAlign: "center",
              }}
              aria-label={`${item.title} — ${item.status}`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#151519]">
                <Image
                  src={item.image}
                  alt={`${item.title} screenshot`}
                  fill
                  sizes="380px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                  }}
                />
              </div>

              <div className="flex items-center justify-between px-1">
                <span className="font-display-sans text-sm font-medium text-white">
                  {item.title}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    item.status === "Live"
                      ? "bg-[#C6FF4D]/15 text-[#C6FF4D]"
                      : "bg-white/10 text-neutral-400"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      item.status === "Live" ? "bg-[#C6FF4D]" : "bg-neutral-400"
                    }`}
                  />
                  {item.status}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View all work button */}
        <div className="mt-8 flex justify-center">
          <Button variant="secondary" href="/products">
            View all work →
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * Primary Works Component
 * Pinned 400vh desktop section hosting the WebGL 3D spinning ring gallery.
 */
export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setMounted(true);
    setWebglSupported(checkWebGLSupport());

    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Motion scroll progress for pinned 400vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const useStaticFallback =
    !mounted || prefersReducedMotion || !webglSupported || windowWidth < 480;

  const isMobileWebGL = windowWidth >= 480 && windowWidth < 768;

  if (useStaticFallback) {
    return (
      <>
        <WorksFallback />
        <ul className="sr-only">
          {works.map((item) => (
            <li key={`accessible-fallback-${item.title}`}>
              <Link href={item.href}>
                {item.title} — {item.status} ({item.project})
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="works"
        className="relative w-full bg-[#000000]"
        style={{ height: "400vh" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Suspense fallback={<WorksFallback />}>
            <WorksScene
              worksList={works}
              scrollProgress={scrollYProgress}
              isMobileDevice={isMobileWebGL}
            />
          </Suspense>
        </div>
      </section>

      <div className="relative z-20 flex justify-center bg-[#000000] py-14">
        <Button variant="secondary" href="/products">
          View all work →
        </Button>
      </div>

      <ul className="sr-only">
        {works.map((item) => (
          <li key={`accessible-webgl-${item.title}`}>
            <Link href={item.href}>
              {item.title} — {item.status} ({item.project})
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
