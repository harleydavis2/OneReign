"use client";

import React, { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useInView, useReducedMotion, motion, AnimatePresence } from "motion/react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { proof, testimonials, type TestimonialItem } from "@/content/site";
import styles from "./Proof.module.css";

// 1,600 points distributed evenly on a unit sphere using the Fibonacci sphere algorithm
const DOT_COUNT = 1600;
const SPHERE_POINTS: Array<{ x: number; y: number; z: number }> = [];
const PHI = Math.PI * (3 - Math.sqrt(5)); // Golden angle

for (let i = 0; i < DOT_COUNT; i++) {
  const y = 1 - (i / (DOT_COUNT - 1)) * 2; // -1 to 1
  const radius = Math.sqrt(1 - y * y);
  const theta = PHI * i;
  const x = Math.cos(theta) * radius;
  const z = Math.sin(theta) * radius;
  SPHERE_POINTS.push({ x, y, z });
}

const LAT_RINGS = [-0.65, -0.35, 0, 0.35, 0.65];
const RING_SEGMENTS = 72;

/**
 * Interactive 3D Rotating & Draggable World Globe
 * Supports click & drag momentum, auto-rotation, axial tilt, and depth-shaded dots.
 */
function InteractiveWorldGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let angle = 0;
    let dragStartX: number | null = null;
    let isDragging = false;
    let velocity = 0.002;
    const tilt = 0.32; // ~18 degrees axial tilt

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Interactive pointer drag controls
    const onPointerDown = (e: PointerEvent) => {
      dragStartX = e.clientX;
      isDragging = true;
      canvas.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || dragStartX === null) return;
      const deltaX = e.clientX - dragStartX;
      dragStartX = e.clientX;
      angle += deltaX * 0.006;
      velocity = deltaX * 0.003;
    };

    const onPointerUp = () => {
      isDragging = false;
      dragStartX = null;
      if (canvas) canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const renderFrame = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.44;
      const globeRadius = Math.min(width, height) * 0.43;

      const cosY = Math.cos(angle);
      const sinY = Math.sin(angle);
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);

      // 1. Latitude guide rings
      ctx.lineWidth = 0.75;
      for (const latY of LAT_RINGS) {
        const ringRad = Math.sqrt(Math.max(0, 1 - latY * latY));
        ctx.beginPath();
        let first = true;

        for (let s = 0; s <= RING_SEGMENTS; s++) {
          const theta = (s / RING_SEGMENTS) * Math.PI * 2 + angle;
          const px = Math.cos(theta) * ringRad;
          const pz = Math.sin(theta) * ringRad;

          const finalY = latY * cosX - pz * sinX;
          const finalZ = latY * sinX + pz * cosX;

          const p = 1000 / (1000 - finalZ * 260);
          const screenX = cx + px * globeRadius * p;
          const screenY = cy + finalY * globeRadius * p;

          if (first) {
            ctx.moveTo(screenX, screenY);
            first = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }

        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.stroke();
      }

      // 2. Fibonacci surface dots with depth lighting
      for (let i = 0; i < DOT_COUNT; i++) {
        const pt = SPHERE_POINTS[i];

        const rx = pt.x * cosY - pt.z * sinY;
        const rz = pt.x * sinY + pt.z * cosY;

        const finalY = pt.y * cosX - rz * sinX;
        const finalZ = pt.y * sinX + rz * cosX;

        const p = 1000 / (1000 - finalZ * 260);
        const screenX = cx + rx * globeRadius * p;
        const screenY = cy + finalY * globeRadius * p;

        const isFront = finalZ > 0;
        const normZ = (finalZ + 1) * 0.5;
        const alpha = isFront
          ? 0.18 + Math.pow(normZ, 1.8) * 0.65
          : 0.04 + normZ * 0.1;

        const dotRadius = isFront
          ? 0.8 + normZ * 0.85
          : 0.65;

        ctx.fillStyle = `rgba(240, 244, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (prefersReducedMotion) {
      renderFrame();
      return () => {
        window.removeEventListener("resize", resizeCanvas);
        canvas.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };
    }

    const loop = () => {
      if (isVisible) {
        if (!isDragging) {
          angle += velocity;
          velocity += (0.0016 - velocity) * 0.05; // Return to baseline speed smoothly
        }
        renderFrame();
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className={styles.globeWrapper} aria-hidden="true">
      <div className={styles.globeRadialFade} />
      <canvas ref={canvasRef} className={styles.globeCanvas} />
    </div>
  );
}

/**
 * Animated counter that counts up smoothly from 0 when scrolled into view
 */
function AnimatedCounter({
  target,
  suffix = "+",
  label,
  inView,
}: {
  target: number;
  suffix?: string;
  label: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const duration = 1400;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [inView, target]);

  return (
    <div className={styles.statItem}>
      <div className={styles.statNumberRow}>
        <span className={styles.statNumber}>{count}</span>
        <span className={styles.statSuffix}>{suffix}</span>
      </div>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

/**
 * Stylized double quotes SVG matching Visuvate
 */
function QuoteSvg() {
  return (
    <svg
      viewBox="0 0 44 32"
      className={styles.quoteSvg}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 4v10c0 7.7-4.6 12.9-11.4 14.9L5 25.6c3.6-1.3 5.8-3.7 6.4-6.6H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h12Z" />
      <path
        d="M18 4v10c0 7.7-4.6 12.9-11.4 14.9L5 25.6c3.6-1.3 5.8-3.7 6.4-6.6H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h12Z"
        transform="translate(24 0)"
      />
    </svg>
  );
}

/**
 * Testimonial Carousel with True Visuvate Frosted Glass Cards
 */
function TestimonialOrFallback({ items }: { items: TestimonialItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) {
    return (
      <div className={styles.rightCard}>
        <span className="vv-card-highlight" aria-hidden="true" />
        <span className="vv-card-radial" aria-hidden="true" />

        <div className={styles.fallbackContent}>
          <div className={styles.fallbackEyebrow}>
            <Sparkles size={14} aria-hidden="true" />
            <span>Case Study Program</span>
          </div>
          <h3 className={styles.fallbackTitle}>Be our next case study</h3>
          <p className={styles.fallbackText}>
            We are taking on a small number of projects and will share the results.
          </p>
        </div>

        <div className={styles.fallbackAction}>
          <Button variant="primary" href="/contact">
            Start a project
          </Button>
        </div>
      </div>
    );
  }

  const current = items[currentIndex];
  const total = items.length;
  const formattedIndex = String(currentIndex + 1).padStart(2, "0");
  const formattedTotal = String(total).padStart(2, "0");

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.rightCard} aria-live="polite">
      {/* Top light highlight & soft radial bevel */}
      <span className="vv-card-highlight" aria-hidden="true" />
      <span className="vv-card-radial" aria-hidden="true" />

      {/* Header: 01 / 03 with underline rule and stylized quote icon */}
      <div className={styles.carouselHeader}>
        <div>
          <p className={styles.indexText}>
            <span className={styles.indexCurrent}>{formattedIndex}</span>{" "}
            <span className={styles.indexDivider}>/ {formattedTotal}</span>
          </p>
          <span className={styles.indexRule} aria-hidden="true" />
        </div>
        <QuoteSvg />
      </div>

      {/* 5 Amber Stars */}
      <div
        className={styles.starsRow}
        aria-label={`${current.rating || 5} out of 5 stars`}
      >
        {Array.from({ length: current.rating || 5 }).map((_, i) => (
          <Star key={i} size={17} fill="currentColor" strokeWidth={0} />
        ))}
      </div>

      {/* Quote Body with Framer Motion slide/fade */}
      <div className={styles.quoteWrapper}>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className={styles.quoteText}
          >
            &ldquo;{current.quote}&rdquo;
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* Author Row & Circular Chevron Navigation */}
      <div className={styles.authorRow}>
        <div className={styles.authorInfo}>
          <div className={styles.avatarInitial} aria-hidden="true">
            {current.initials || current.author.charAt(0)}
          </div>
          <div className={styles.authorDetails}>
            <span className={styles.authorName}>{current.author}</span>
            <span className={styles.authorRole}>{current.role}</span>
          </div>
        </div>

        <div className={styles.carouselNav}>
          <button
            type="button"
            onClick={handlePrev}
            className={styles.navBtn}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={styles.navBtn}
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Proof() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const stats = proof.stats || [
    { value: 30, suffix: "+", label: "Projects delivered" },
    { value: 98, suffix: "%", label: "Client satisfaction" },
    { value: 12, suffix: "+", label: "Years combined experience" },
  ];

  return (
    <section ref={sectionRef} className={styles.proofSection} id="testimonials">
      {/* Interactive 3D Draggable World Globe */}
      <InteractiveWorldGlobe />

      {/* Giant Section Title "Testimonials" in Visuvate font-display & tracking */}
      <div className={styles.giantTitleWrapper} aria-hidden="true">
        <h2 className={styles.giantTitle}>Testimonials</h2>
      </div>

      <Container>
        {/* ── Cards Grid (12 Columns: 4 left / 8 right) ─────────────── */}
        <div className={styles.cardsGrid}>
          {/* Left Card: 3 Counters */}
          <div className={styles.statsCard}>
            <span className="vv-card-highlight" aria-hidden="true" />
            <span className="vv-card-radial" aria-hidden="true" />

            <div className={styles.statsList}>
              {stats.slice(0, 3).map((stat, idx) => (
                <AnimatedCounter
                  key={idx}
                  target={stat.value}
                  suffix={stat.suffix || "+"}
                  label={stat.label}
                  inView={isInView}
                />
              ))}
            </div>
          </div>

          {/* Right Card: Active Carousel */}
          <TestimonialOrFallback items={testimonials} />
        </div>
      </Container>
    </section>
  );
}
