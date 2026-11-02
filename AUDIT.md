# OneReign — Complete Technical & Visual Audit (`AUDIT.md`)

*Generated during Phase 0 of the Presentation & Responsive Polish Pass.*  
*Branch: `ui-polish` | Stack: Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, Motion (Framer Motion 14), Three.js / React Three Fiber, Lenis.*

---

## 1. Executive Summary & Core Diagnostic Findings

### 1.1 Fonts Loaded
- **Primary Display & Sans-Serif:** **Inter Tight** (Google Font loaded via `next/font/local` using `.woff2` files in `/public/fonts/` for weights `400`, `500`, `600`, `700`; CSS variable: `--font-inter-tight`; font-display: `swap`).
- **Editorial Headline Serif:** **Instrument Serif** (loaded via `next/font/local` for `400 italic` and `400 normal`; CSS variable: `--font-instrument-serif`; font-display: `swap`).
- **Mono / Labels:** `var(--font-mono)` falling back to system monospace / Courier / SFMono.
- **Rule Check:** Exactly 2 font families are loaded via `next/font/local` with local zero-CLS assets and `display: swap`.

### 1.2 Animation Libraries in Use
- **Motion (`motion/react` v14.7.1):** Used across UI components (`useScroll`, `useTransform`, `motion.div`, `AnimatePresence`).
- **Three.js (`three` v0.185.1) + React Three Fiber (`@react-three/fiber` v9.6.1) + Drei (`@react-three/drei` v10.7.7):** Used in the current Works section spinning 3D cylinder.
- **Lenis (`lenis` v1.3.27):** Mounted in `src/components/providers/SmoothScroll.tsx`.

### 1.3 Exact Diagnostic: Why the "Our Works" Animation Breaks on Small Screens
1. **Arbitrary Viewport Hard Cutoff:** In `src/components/Works.tsx`, line 149 enforces `windowWidth < 480` to completely discard the 3D scene and display `WorksFallback`. Devices between 480px and 767px receive `isMobileWebGL = true`, but under 480px get an abrupt static fallback with no transition.
2. **Pinned Height on Mobile Viewports:** On tablet/mobile ($\ge 480$px), the outer section forces `style={{ height: "400vh" }}` and a sticky `h-screen` container. On mobile browsers with dynamic URL bars (Chrome/Safari on iOS and Android), `100vh` constantly resizes as the user scrolls, creating violent layout jumps and desynchronized scroll values.
3. **Perspective Distortion in Dynamic Camera Fitting:** In `src/components/works/WorksScene.tsx`, the camera Z formula uses:
   $$\text{frontDist} = \frac{\text{TILE\_W} / \text{frac}}{2 \cdot \tan(\text{FOV} / 2) \cdot \text{aspect}}$$
   On narrow portrait screens ($aspect = \text{width} / \text{height} < 0.6$), the aspect ratio in the denominator causes `frontDist` to blow up toward infinity, pushing the camera tens of units away and causing the 3D ring cards to flatten, clip outside frustum bounds, or disappear behind depth fog.
4. **Touch Hijacking & Scroll Stagnation:** The WebGL container binds `onPointerDown`, `onPointerMove`, and `touchAction: "pan-y"`. Touch swipes on mobile get trapped between the browser vertical scroll and WebGL inertia calculations (`dragOffsetRef`), frustrating users trying to scroll past the section.
5. **Layout Shift / Flash on Hydration:** On initial load, `mounted` is `false`, rendering `<WorksFallback />` server-side, and then on client mount suddenly mounts the WebGL canvas, creating a major Cumulative Layout Shift (CLS) on mobile.

---

## 2. Homepage Section-by-Section Audit

The homepage contains all 14 requested sections in the confirmed sequence:

### Section 1: Skip Link + Header / Nav
- **File:** `src/app/layout.tsx` (Skip link), `src/components/Navbar.tsx`, `src/components/Navbar.module.css`.
- **HTML Tags:** `<a>` (skip link), `<header>`, `<nav>`, `<ul>`, `<li>`, `<a>`, `<button>`, `<svg>`, `<div>`.
- **Layout Method:** Fixed/sticky CSS flex layout (`display: flex; justify-content: space-between`), max-width constrained inside `div.inner`.
- **Current Animation:** CSS transitions for nav hover; `Button.tsx` rolling character transition on hover; CSS keyframe translation for mobile drawer.
- **Font Sizes & Paddings:** Header wrapper `padding: 16px 20px` (desktop), nav links `0.875rem` (`14px`), CTA button `14px`.
- **Breakpoints Audit:**
  - **360px:** The hamburger trigger button lacks an explicit 44×44px touch target boundary. Active drawer links need vertical spacing normalization.
  - **768px:** Tablet transition boundary between desktop horizontal links and mobile menu can crowd the central nav links against the "Book a call" button.
  - **1280px:** Header is sticky but lacks dynamic blur (`backdrop-filter: blur(12px)`) + 1px border reveal triggered cleanly after 24px of scroll. Duplicate rolling text spans in the CTA button need strict `aria-hidden` and `user-select: none`.

---

### Section 2: Hero & Studio Mockup
- **File:** `src/app/page.tsx` (lines 53–91), `src/app/page.module.css`, `src/components/StudioMockup.tsx`.
- **HTML Tags:** `<section>`, `<div>`, `<span>`, `<h1>`, `<p>`, `<a>` / `<button>`, `<svg>`.
- **Layout Method:** Flex column centered on desktop; StudioMockup is flex/grid mockup container.
- **Current Animation:** Static text (no line-by-line reveal); pulsing emerald dot (`animate-pulse`); CSS hover transitions on mockup buttons.
- **Font Sizes & Paddings:** Section padding `56px 0 96px`, H1 `clamp(2.75rem, 6.5vw + 0.5rem, 5.75rem)`, subtitle `clamp(1rem, 1.4vw, 1.1875rem)`.
- **Breakpoints Audit:**
  - **360px:** Hero CTAs (`.heroCtas`) wrap without 100% width, causing unequal button widths; StudioMockup controls and right inspector panel cause horizontal pressure or cramped text; 1440px/390px buttons shrink; right inspector panel needs to be hidden on mobile.
  - **768px:** Hero text is centered rather than left-aligned with `max-width: 14ch` on desktop; subtitle exceeds 62ch.
  - **1280px:** Studio mockup window lacks soft entrance (`scale: 0.96 to 1`, fade) and desktop 3D pointer tilt.

---

### Section 3: "Tools We Build With" Tech Stack Strip
- **File:** `src/components/TechStack.tsx`.
- **HTML Tags:** `<section>`, `<p>`, `<motion.div>`, `<div>`, `<svg>`, `<span>`.
- **Layout Method:** Static CSS Grid (`grid-cols-2 sm:gap-x-8 md:grid-cols-4`).
- **Current Animation:** Motion `whileInView` staggered fade/rise.
- **Font Sizes & Paddings:** Section `py-[96px]`, label `text-xs font-semibold uppercase tracking-widest`.
- **Breakpoints Audit:**
  - **360px:** Renders as 4 tall stacked rows of 2 icons, occupying unnecessary vertical height rather than a seamless infinite linear loop.
  - **768px:** 4-column static grid with large vertical gaps.
  - **1280px:** Not a continuous marquee. Needs 40s linear infinite loop, edge fade masks, greyscale-to-color desktop hover, and duplicate track with `aria-hidden="true"`.

---

### Section 4: Introduction
- **File:** `src/components/Introduction.tsx`, `src/components/Introduction.module.css`.
- **HTML Tags:** `<section>`, `<div>`, `<h2>`, `<p>`, `<a>`, `<figure>`/`<div>`.
- **Layout Method:** Split columns (Left text 45%, Right mosaic 55% bleeding right).
- **Current Animation:** Two CSS keyframe infinite marquee rows (`scrollLeft 34s`, `scrollRight 42s`).
- **Font Sizes & Paddings:** H2 `clamp(32px, 4vw, 56px)`, body `18px`, padding `clamp(64px, 8vw, 112px) 0`.
- **Breakpoints Audit:**
  - **360px:** Two rows of image tiles create visual noise and vertical crowding on mobile (prompt requires 1 row on mobile); text lacks line-by-line reveal.
  - **768px:** Mosaic column can crowd the left text column before stacking.
  - **1280px:** Heading lacks line-by-line mask reveal, paragraph fade, and button stagger entrance.

---

### Section 5: Our Works
- **File:** `src/components/Works.tsx`, `src/components/works/WorksScene.tsx`, `src/components/works/shaders.ts`.
- **HTML Tags:** `<section>`, `<div>`, `<Canvas>` / `<WorksFallback>` with `<h2>`, `<ul>`, `<li>`, `<a>`, `<button>`.
- **Layout Method:** 400vh pinned outer container with 100vh sticky WebGL canvas; static horizontal scroll fallback on mobile.
- **Current Animation:** WebGL 3D cylinder rotation on scroll with R3F and drag momentum.
- **Font Sizes & Paddings:** Outer height `400vh`, sticky container `h-screen`, title scaled dynamically.
- **Breakpoints Audit:**
  - **360px:** Forced static fallback or severe aspect-ratio perspective clipping; sticky `h-screen` causes vertical jumps.
  - **768px:** Awkward boundary between mobile fallback and desktop 400vh scroll.
  - **1280px:** Pinned WebGL cylinder traps mouse wheel scroll without an explicit progress bar, counter (`01 / 08`), or clean snap integration. Needs rebuild with pinned horizontal scroll on desktop, native snap scroll on tablet, and swipe carousel on mobile.

---

### Section 6: Our Approach
- **File:** `src/components/Approach.tsx`, `src/components/Approach.module.css`.
- **HTML Tags:** `<section>`, `<div>`, `<span>`, `<h2>`, `<h3>`, `<p>`, `<svg>`.
- **Layout Method:** 3 Bento rows, each with 2 cards (Wide + Narrow, Narrow + Wide, Wide + Narrow).
- **Current Animation:** Motion `whileInView` fade and `y: 24` rise.
- **Font Sizes & Paddings:** Card padding `32px` to `48px`, title `clamp(1.5rem, 2.5vw, 2rem)`, body `0.9375rem`.
- **Breakpoints Audit:**
  - **360px:** Offset cards track in "Discovery First" cramps horizontally; 32px padding is too large for 360px width.
  - **768px:** Two cards per row compress text and diagrams.
  - **1280px:** Lacks specific interactive micro-animations (SVG path drawing for "One Connected System", tick marks drawing for "Smooth Handover", floating logo mark for "Future-Ready", cursor spotlight).

---

### Section 7: Testimonials & Proof
- **File:** `src/components/Proof.tsx`, `src/components/Proof.module.css`.
- **HTML Tags:** `<section>`, `<canvas>`, `<div>`, `<h2>`, `<h3>`, `<p>`, `<button>`, `<span>`.
- **Layout Method:** 2-column card grid placed over an interactive 2D canvas globe.
- **Current Animation:** Canvas globe rotation with Fibonacci sphere points; counter interpolation from 0; quote carousel fade.
- **Font Sizes & Paddings:** Counters `clamp(2.75rem, 4.5vw, 4rem)`, quote text `clamp(1.25rem, 2.6vw, 2rem)`.
- **Breakpoints Audit:**
  - **360px:** Globe canvas touch events can interfere with vertical page scroll; counter digits without `tabular-nums` cause number jitter; button tap targets are below 44px.
  - **768px:** Stacking causes high vertical height.
  - **1280px:** Carousel lacks 6s auto-advance with hover/focus pause; quote text needs balanced line wrapping (`max-width: 28ch-34ch`).

---

### Section 8: FAQ Accordion
- **File:** `src/components/Faq.tsx`, `src/components/Faq.module.css`.
- **HTML Tags:** `<section>`, `<div>`, `<span>`, `<h2>`, `<button>`, `<p>`, `<svg>`, `<script>`.
- **Layout Method:** Vertical accordion stack inside Container.
- **Current Animation:** Framer Motion animating `height: 0` to `height: "auto"` (violates Rule 3!).
- **Font Sizes & Paddings:** Question trigger `1.0625rem` (`17px`), padding `20px 24px`.
- **Breakpoints Audit:**
  - **360px:** Question rows are under 64px min-height; plus icon can misalign with multi-line question text.
  - **768px / 1280px:** Direct `height` animation causes layout reflows. Must be replaced with CSS `grid-template-rows: 0fr -> 1fr` and `transform`/`opacity` transitions.

---

### Section 9: Core Capabilities (Services)
- **File:** `src/components/Services.tsx` (lines 94–150), `src/components/Services.module.css`.
- **HTML Tags:** `<section>`, `<div>`, `<span>`, `<h2>`, `<a>`, `<button>`, `<svg>`, `<h3>`.
- **Layout Method:** 3×2 grid of service cards.
- **Current Animation:** CSS hover transitions.
- **Font Sizes & Paddings:** Section padding `120px 0`, card title `1.25rem`.
- **Breakpoints Audit:**
  - **360px:** Top action buttons wrap awkwardly; cards stack into bulky boxes rather than clean numbered list rows with visible arrows.
  - **768px:** 2-column card grid causes mismatched heights.
  - **1280px:** Prompt specifies 6 large numbered list items with underline draw, arrow slide, and 8px title shift on hover.

---

### Section 10: "Works With Your Stack" Integrations
- **File:** `src/components/Services.tsx` (lines 151–186), `src/components/Services.module.css`.
- **HTML Tags:** `<div>`, `<h3>`, `<p>`, `<a>`, `<button>`, `<div>`, `<svg>`, `<span>`.
- **Layout Method:** Split layout (Left card + Right 4×2 grid of integration cells).
- **Current Animation:** Static CSS hover.
- **Font Sizes & Paddings:** Cells `padding: 16px`, icons `34px`.
- **Breakpoints Audit:**
  - **360px:** 4×2 grid squeezes icons down to narrow cells; text labels wrap.
  - **768px:** Unequal cell widths.
  - **1280px:** Needs an evenly spaced grid (6 cols desktop, 4 tablet, 3 mobile) with equal cell size, centered logos, and staggered fade-in.

---

### Section 11: Pricing
- **File:** `src/components/Pricing.tsx`, `src/components/Pricing.module.css`.
- **HTML Tags:** `<section>`, `<div>`, `<span>`, `<h2>`, `<h3>`, `<p>`, `<ul>`, `<li>`, `<a>`, `<button>`.
- **Layout Method:** 3-column CSS Grid (`grid-template-columns: repeat(3, 1fr)`).
- **Current Animation:** Minimal hover border transition.
- **Font Sizes & Paddings:** Card padding `36px`, price text `2rem`.
- **Breakpoints Audit:**
  - **360px:** Cards stack, but buttons don't pin to the bottom edge consistently because cards lack `align-items: stretch` + bottom CTA pinning.
  - **768px:** 3 columns compress horizontally, causing text wrapping and awkward height mismatches.
  - **1280px:** Cards lack -6px hover lift, feature list items lack staggered reveal, and "Most popular" card lacks subtle visual accentuation without breaking grid alignment.

---

### Section 12: Flagship Products
- **File:** `src/app/page.tsx` (lines 118–160), `src/components/ui/ProductCard.tsx`, `src/components/ui/ProductCard.module.css`.
- **HTML Tags:** `<section>`, `<article>`, `<div>`, `<span>`, `<h2>`, `<h3>`, `<p>`, `<a>`, `<button>`, `<Image>`.
- **Layout Method:** 2-column grid (`1.15fr 1fr`).
- **Current Animation:** CSS hover lift `translateY(-4px)` and box-shadow.
- **Font Sizes & Paddings:** Card padding `44px`, title `clamp(2rem, 3.2vw, 2.625rem)`.
- **Breakpoints Audit:**
  - **360px:** Card padding is too bulky; frame elements shrink inconsistently; text and image stack without dedicated mobile ordering.
  - **768px:** On screens $\ge 768$px, cards lack the specified `position: sticky; top: 96px; min-height: 640px` card-over-card slide and scale down ($1 \to 0.94$, opacity $1 \to 0.55$).
  - **1280px:** Lacks alternating layout (Faultline visual left / text right, Quiet text left / visual right); lacks 3D tilt on Faultline browser frame and 3-phone fan-out interaction on Quiet.

---

### Section 13: Final CTA ("Build Smart. Run Better.")
- **File:** `src/components/Cta.tsx`, `src/components/Cta.module.css`.
- **HTML Tags:** `<section>`, `<div>`, `<h2>`, `<span>`, `<a>`, `<button>`, `<motion.div>`, `<Image>`.
- **Layout Method:** Centered column with large cropped logo-mark below.
- **Current Animation:** Motion fade and rise for logo mark.
- **Font Sizes & Paddings:** Heading `clamp(3rem, 7vw, 6.5rem)`.
- **Breakpoints Audit:**
  - **360px:** Buttons do not fill full width; logo mark can cause overflow if not strictly masked.
  - **768px:** Spacing between heading lines and bottom logo needs fluid clamp.
  - **1280px:** Lacks magnetic button pull effect on desktop (max 8px pull) and line-by-line reveal on the two heading lines.

---

### Section 14: Footer
- **File:** `src/components/Footer.tsx`, `src/components/Footer.module.css`.
- **HTML Tags:** `<footer>`, `<div>`, `<a>`, `<h4>`, `<ul>`, `<li>`, `<p>`, `<span>`, `<svg>`.
- **Layout Method:** Top tile row + 4-column link grid + bottom bar.
- **Current Animation:** CSS link hover.
- **Font Sizes & Paddings:** Padding `80px 0 40px`, links `0.875rem` (`14px`).
- **Breakpoints Audit:**
  - **360px:** Link columns stack into single column with excessive length; tap targets on links are ~28px tall instead of 44px; floating WhatsApp button can obscure footer elements.
  - **768px:** 4 columns cramp horizontally; should be 2 columns on tablet.
  - **1280px:** Lacks column staggered entrance and hover underline draw.

---

## 3. Dedicated Route Audit

### 3.1 Blog Listing (`/blog`)
- **File:** `src/app/blog/page.tsx`, `src/app/blog/page.module.css`.
- **Layout:** Grid with main posts list (1fr) + sidebar (320px).
- **Problems:**
  - **360px:** Sidebar stacks below 14 post cards, pushing categories and contributors far down the page; card heights are uneven.
  - **768px:** Sidebar competes with post cards for horizontal space.
  - **1280px:** Missing featured 2-column card layout for the newest post (Issue 014), and remaining posts are in a 1-column list rather than a clean 3-column editorial grid.

### 3.2 Blog Post Detail (`/blog/[slug]`)
- **File:** `src/app/blog/[slug]/page.tsx`, `src/app/blog/[slug]/page.module.css`.
- **Layout:** Article layout with hero and body paragraphs.
- **Problems:**
  - Lacks fixed reading progress bar (2px accent color) pinned under the header.
  - Code blocks do not guarantee strictly isolated horizontal scrolling.
  - Blockquotes lack 2px accent left border.
  - Missing line-by-line title reveal.

### 3.3 Products Page (`/products`)
- **File:** `src/app/products/page.tsx`, `src/app/products/page.module.css`.
- **Layout:** Hero + ProductCard stack + CtaBand.
- **Problems:**
  - Re-implements `ProductCard` instead of reusing the unified Flagship Products component.
  - Missing fluid line reveal on hero.

### 3.4 Product Detail: Faultline (`/products/faultline`)
- **File:** `src/app/products/faultline/page.tsx`, `src/app/products/faultline/page.module.css`.
- **Layout:** Case study hero, screenshot frame, funnel stages table, how-it-works, tech stack, CTA band.
- **Problems:**
  - **360px:** Funnel stages table horizontally compresses text; mechanism descriptions wrap tightly.
  - **1280px:** Desktop lacks sticky mini table-of-contents; screenshot lacks scroll-linked parallax.

### 3.5 Product Detail: Quiet (`/products/quiet`)
- **File:** `src/app/products/quiet/page.tsx`, `src/app/products/quiet/page.module.css`.
- **Layout:** Case study hero, screenshot frame, 9-feature grid, roadmap, tech stack, CTA band.
- **Problems:**
  - **360px:** Roadmap table wraps tags tightly; feature grid cards have uneven heights.
  - **1280px:** Desktop lacks sticky mini table-of-contents; screenshots lack framed reveal and parallax.

### 3.6 Works Page (`/works`)
- **File:** `src/app/works/page.tsx`.
- **Current Behavior:** Executes `redirect("/products")`.
- **Problems:** Dedicated works showcase route should render the works showcase layout consistently with zero broken transitions.

### 3.7 Pricing Page (`/pricing`)
- **File:** `src/app/pricing/page.tsx`.
- **Layout:** Hero padding + `<Pricing />` component + `<CtaBand />`.
- **Problems:** Reuses homepage Pricing component; needs consistent section rhythm (`padding-block: clamp(72px, 10vw, 160px)`).

### 3.8 Services Pages (`/services` & `/services/[slug]`)
- **Files:** `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`.
- **Layout:** 2-column service card grid; detail page has 2-column capability scope.
- **Problems:**
  - `/services`: Card bullet points have inconsistent heights; buttons lack uniform alignment across rows.
  - `/services/[slug]`: Needs fluid heading scale and standard section padding tokens.

### 3.9 About Page (`/about`)
- **File:** `src/app/about/page.tsx`, `src/app/about/page.module.css`.
- **Layout:** Hero, founders grid (4 founders), why OneReign grid (6 items), modal for bios, CTA band.
- **Problems:**
  - **360px:** Founder portrait cards and modal avatar have padding inconsistencies; bio modal content can exceed viewport without smooth inner scrolling.
  - **1280px:** Founder cards lack subtle hover depth and staggered reveal.

### 3.10 Contact Page (`/contact`)
- **File:** `src/app/contact/page.tsx`, `src/app/contact/page.module.css`.
- **Layout:** Hero, 2 contact cards (Email + WhatsApp), form (5 fields), FAQ band.
- **Problems:**
  - **360px:** Form inputs lack 48–56px touch height standardization; submit button is not full-width on mobile.
  - **1280px:** Lacks active input focus ring tokenization and animated error/success states.

---

## 4. Global Action Items for Phase 1 & Beyond

1. **Tokens Definition:** Centralize container (`max-w-[1280px]`, `px: clamp(20px, 5vw, 64px)`), section vertical padding (`clamp(72px, 10vw, 160px)`), 8-pt spacing scale, fluid type scales with `clamp()`, and motion easings.
2. **Reusable Motion Helpers:** Create `<Reveal>`, `<SplitLines>`, `<Counter>`, and `<Marquee>` adhering strictly to Rule 3 (`transform` and `opacity` only).
3. **Works Rebuild:** Eliminate fragile 400vh Three.js camera calculation on mobile; implement responsive GSAP / Motion pinned horizontal scroll on desktop, native snap scroll on tablet, and swipe carousel on mobile.
4. **Fix Direct Height Animations:** Replace `height` animations (e.g. `Faq.tsx`) with zero-reflow `grid-template-rows: 0fr -> 1fr`.
5. **No Code Edits Performed in Phase 0:** The repository remains completely clean, untouched, and ready for Phase 1 execution on branch `ui-polish`.
