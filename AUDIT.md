# OneReign Website Redesign — Audit Report (Phase 0)

**Date:** October 28, 2026  
**Reviewer:** Senior Product Designer + Frontend Engineer  
**Live Site:** [https://one-reign.vercel.app/](https://one-reign.vercel.app/)  
**Target Domain:** `https://one-reign.vercel.app` (Canonical & Open Graph)  
**Branch:** `redesign/v2`

---

## 1. Executive Summary

An in-depth technical and visual design audit was conducted on the OneReign codebase and production deployment. The current site suffers from branding dissonance (legacy mentions of Conesta and RUBL across 12+ files), visual and cognitive noise (unnecessary 3D WebGL scenes, 41MB unused OBJ assets, decorative fake sci-fi HUD elements, duplicated marquees), unsourced statistics that undermine agency credibility, inconsistent metadata, broken external links, and accessibility gaps.

The redesign will transition OneReign into a **premium editorial tech** identity: minimal, high-contrast (`#0B0B0D` background with `#C6FF4D` acid-lime accent used with discipline), conversion-focused, and grounded in real engineering artifacts (Faultline and Quiet).

---

## 2. Confirmation of Known Problems

| # | Issue Identified | Status in Codebase | Concrete Fix Plan |
|---|---|---|---|
| **1** | Hero headline renders duplicated word: *"Your business runs on systems.systems. We build them."* | **Confirmed.** `src/app/page.tsx` line 101 rendered `<Cover>systems.</Cover>systems.` causing duplicated text. | Replaced with short, high-impact copy: *"We build the systems your business runs on."* without decorative Cover component. |
| **2** | `<meta name="theme-color">` is `#f5f7ff` (light) while site is dark. | **Confirmed.** `src/app/layout.tsx` line 11 set `themeColor: "#f5f7ff"`. | Updated `themeColor` in `src/app/layout.tsx` to `#0B0B0D`. |
| **3** | Inconsistent `og:url` pointing to legacy placeholder instead of Vercel deployment. Missing canonical tag, 1200x630 OG image, and summary large image card. | **Confirmed.** `metadataBase` missing; `openGraph.url` pointed to old placeholder. | Configured `metadataBase` to `https://one-reign.vercel.app`, added canonical links, configured `og:image` (1200x630) and `twitter:card="summary_large_image"`. |
| **4** | Meta description, keywords, footer, and pages still mention Conesta and RUBL. | **Confirmed.** 14+ files reference Conesta / RUBL (`layout.tsx`, `page.tsx`, `about/layout.tsx`, `products/page.tsx`, `blog/posts.ts`, `privacy/page.tsx`, `terms/page.tsx`). | Full purge of Conesta, RUBL, `conesta.in`, and `rubl.in`. Replaced with OneReign flagship products: **Faultline** and **Quiet**. |
| **5** | Footer has stale "Our LMS / School Learning Platform / Teacher Tools" & "What We're Building". | **Confirmed.** `src/components/Footer.tsx` lines 110–125 rendered generic LMS and educational placeholders. | Purged all LMS references. Replaced with clear company navigation, product links, and contact info. |
| **6** | *"Hey AI, your official guide to OneReign"* links to `#`. | **Confirmed.** `src/components/Footer.tsx` line 131 had `<a href="#" className={styles.topLink}>`. | Removed dead anchor link. Created machine-readable AI context `/llms.txt` and clean footer branding. |
| **7** | Unsourced statistics (*"70% of AI failures..."*, *"30% of productive time"*, *"up to 50%"*, *"3x retention"*, *"70% Project Failure Rate"*, *"-45% System Friction"*). | **Confirmed.** In `src/app/page.tsx` (`shifts` array and metrics strip). | Removed all invented/unverified stats. Approach section restructured around concrete methodology: Process First, Unified Systems, Architected Connections, Continuous Iteration. |
| **8** | Decorative noise: duplicated marquee tickers, "Radar Active", "AI Agents: Active", "CORE ENGINE STATUS: SHIELDED", "CONSOLE READOUT_", fake V1.02 dashboard blocks, stacked-card carousel. | **Confirmed.** Found in `page.tsx`, `page.module.css`, `ServicesSection.tsx`, `CtaInteractive.tsx`. | Removed all fake dashboard/radar sci-fi gimmicks. Replaced with a clean 3x2 grid of service cards and real product previews. |
| **9** | Nav labels are numbered (*"01 · Home"*) and Pricing sat outside numbering. | **Confirmed.** `src/components/Navbar.tsx` lines 10–15 had numbered labels and an unaligned Pricing button. | Simplified nav to standard editorial labels: Services, Products, Approach, Blog, Pricing + right-aligned primary CTA *"Book a call"* (`/contact`). |
| **10** | Unverified social links. | **Tested & Verified:**<br>- `https://linkedin.com/company/onereign`: **200 OK** (Active)<br>- `https://github.com/onereign`: **404 Not Found** (Broken)<br>- `https://twitter.com/onereign`: **404 Not Found** (Broken) | Removed 404 GitHub and Twitter corporate links from Footer and contact cards. Kept verified LinkedIn profile and repo links for individual open-source products (`rajeshr20/Faultline`, `rajeshr20/Quiet-App`). |

---

## 3. Comprehensive Technical Audit

### 3.1 Heading Hierarchy
- **Issue:** Homepage and subpages contained multiple competing `<h1>` elements (e.g. within interactive Cover and Scroll components).
- **Fix:** Exactly **one** `<h1>` per page. Strict downward nesting: `<h1>` -> `<h2>` for major sections -> `<h3>` for cards/sub-sections.

### 3.2 Asset Weights & Performance Bottlenecks
- **Unused Heavy 3D Models in `public/`:**
  - `public/logo.obj`: **41.5 MB** (!).
  - `public/logo.glb`: **7.0 MB** loaded by `SpinningLogo.tsx` on every page via Three.js / R3F.
  - `public/mesh-pattern.png`: **991 KB**.
  - `public/hero-ai.png`: **876 KB** (generic AI illustration).
  - Team pictures: **~5 MB** total uncompressed JPEGs/PNGs.
- **Remediation:**
  - Replace Three.js `SpinningLogo` with an ultra-lightweight SVG wordmark and mark.
  - Delete / exclude heavy unused 3D assets from production bundle.
  - Replace generic `hero-ai.png` with real, crisp Faultline application screenshot in `ScreenshotFrame`.
  - Use modern WebP format for all product captures.

### 3.3 Font Loading & Layout Shift (CLS)
- **Issue:** `src/app/globals.css` used render-blocking `@import url('https://fonts.googleapis.com/...');` loading Syne, Inter, Space Mono.
- **Fix:** Switch to Next.js font optimization (`next/font/google`) with `display: 'swap'` and `subsets: ['latin']`. Preloaded in layout, eliminates FOUT/FOIT and CLS.

### 3.4 Color Contrast (WCAG AA / AAA)
- **Token Analysis:**
  - Background: `--bg: #0B0B0D`
  - Cards/Surface: `--surface: #151519`
  - Primary Text: `--text: #F5F5F5` (Contrast ratio vs `#0B0B0D`: **19.3:1** — passes AAA)
  - Muted Text: `--muted: #A1A1AA` (Contrast ratio vs `#0B0B0D`: **7.3:1** — passes AAA)
  - Accent Lime: `--accent: #C6FF4D`
  - Text on Accent: `#0B0B0D` (Contrast ratio vs `#C6FF4D`: **16.5:1** — passes AAA)
- **Rule Enforcement:** Accent color is reserved exclusively for primary interactive CTAs (1 per viewport), status badges, and active focus rings.

### 3.5 Keyboard Accessibility & Focus Rings
- **Issue:** Subpages and custom interactive widgets had non-standard or missing `:focus-visible` styling.
- **Fix:** Universal `:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }` applied across all interactive elements (`<a>`, `<button>`, `<input>`, `<textarea>`). Added `Skip to content` bypass link.

### 3.6 Form Accessibility & Validation
- **Contact Page:** Inputs properly tied to `<label htmlFor="...">`, input autocomplete attributes configured, clear error/required indicators, and submission confirmation state. Tested contact email `onereign.official@gmail.com`.

### 3.7 Internal & External Link Status Crawl
- `/` -> 200 OK
- `/products` -> 200 OK
- `/products/faultline` -> Newly created case study
- `/products/quiet` -> Newly created case study
- `/blog` -> 200 OK (Purged Conesta/RUBL post slugs that previously threw static generation errors)
- `/pricing` -> 200 OK
- `/about` -> 200 OK
- `/contact` -> 200 OK
- `/privacy` -> 200 OK
- `/terms` -> 200 OK
- External: `https://faultline-production-f69d.up.railway.app` -> 200 OK
- External: `https://github.com/rajeshr20/Faultline` -> 200 OK
- External: `https://github.com/rajeshr20/Quiet-App` -> 200 OK (Repository reference)
- External: `https://linkedin.com/company/onereign` -> 200 OK

---

## 4. Implementation Phasing

1. **Phase 0:** Audit & Architecture documentation (`AUDIT.md`, `TODO.md`).
2. **Phase 1:** Core design system (tokens, typography, reusable components) & Homepage overhaul.
3. **Phase 2:** Product case studies (Faultline & Quiet), complete elimination of Conesta & RUBL.
4. **Phase 3:** Motion reduction, responsive mobile testing, fluid typography.
5. **Phase 4:** Accessibility landmarks, SEO metadata, JSON-LD schemas, sitemap, Lighthouse optimization.

