# OneReign — Actionable Verification Items (TODO.md)

This document tracks every `TODO` item across the OneReign codebase that requires input, real-device captures, or commercial verification from Rajesh. No metrics, users, prices, or testimonials have been fabricated on the live site.

---

## 1. Pricing Tiers (`src/content/site.ts` & `content/site.ts`)
- **Location:** `src/content/site.ts` (lines 311, 324)
- **Current Placeholder:** `"TODO(rajesh): price"`
- **Live Fallback:** The site renders **"Let's scope it"** instead of any placeholder or invented number.
- **What is needed from Rajesh:**
  1. Confirm starting price or minimum engagement floor for **AI Automation** (e.g. `$2,500+` or `₹2L+`, or maintain the `"Let's scope it"` label).
  2. Confirm starting price or minimum engagement floor for **Custom Software** (e.g. `$5,000+` or `₹4L+`, or maintain the `"Let's scope it"` label).
  3. Confirm if **Product Partnership** should remain `"Custom quote"`.

---

## 2. Frequently Asked Questions (`src/content/site.ts` & `content/site.ts`)
- **Location:** `src/content/site.ts` (lines 414, 419, 424)
- **Live Behavior:** Questions containing `TODO` are automatically **omitted from both the visual UI and the FAQPage JSON-LD schema** until confirmed.
- **What is needed from Rajesh:**
  1. **Typical Timelines (FAQ #3):** Provide expected delivery windows (e.g., *"Sprint MVPs ship in 2–3 weeks; complex multi-agent platforms typically require 4–8 weeks"*).
  2. **Post-Launch Support Terms (FAQ #4):** Provide included warranty period and ongoing support model (e.g., *"30 days of warranty support included on all builds, followed by optional monthly SLA retainers"*).
  3. **International Clients & Contracts (FAQ #5):** Confirm contract jurisdiction and billing currencies for overseas clients (e.g., *"Yes, we work with clients across North America, Europe, and APAC, with billing in USD via Stripe or international wire"*).

---

## 3. Social Media & External Channels (`src/content/site.ts` & `content/site.ts`)
- **Location:** `src/content/site.ts` (lines 487–491)
- **Live Behavior:** Footer tiles for profiles with `TODO` URLs are automatically **hidden** so no dead links exist. Active verified channels (LinkedIn, WhatsApp) are displayed.
- **What is needed from Rajesh:**
  1. **Instagram:** Provide the official OneReign Instagram profile URL (e.g., `https://instagram.com/onereign.co`) or leave empty to keep hidden.
  2. **X / Twitter:** Provide the verified OneReign handle (e.g., `https://x.com/onereign`).
  3. **GitHub Organization:** Confirm official OneReign GitHub URL (e.g., `https://github.com/onereign`).
  4. **Discord Community:** Provide community Discord invite link if active.

---

## 4. Location & Entity Confirmation (`src/components/Footer.tsx` & `src/content/site.ts`)
- **Location:** `src/components/Footer.tsx` (line 120), `src/content/site.ts`
- **Current Copy:** `"Based in Bangalore, India"` · `"Serving clients worldwide"`
- **What is needed from Rajesh:**
  - Confirm registered legal city and operating jurisdiction (Bangalore / Chennai / Remote).

---

## 5. Privacy Policy & Legal Terms (`src/app/privacy-policy/page.tsx` & `src/app/terms/page.tsx`)
- **Location:** `src/app/privacy-policy/page.tsx` (line 6), `src/app/terms/page.tsx`
- **Live Behavior:** Full, compliant privacy policy and terms are live and accessible without 404s.
- **What is needed from Rajesh:**
  - Provide legal registered entity name (e.g., *OneReign Private Limited* or sole proprietorship designation) and Grievance Officer email for DPDP Act 2023 compliance.

---

## 6. Cookie Policy & Analytics (`src/app/cookies/page.tsx`)
- **Location:** `src/app/cookies/page.tsx` (line 6)
- **Live Behavior:** Minimal functional cookie policy is published with zero 404s.
- **What is needed from Rajesh:**
  - If third-party tracking (e.g. Google Analytics / PostHog) is installed in the future, connect a cookie consent banner provider (e.g., CookieYes).

---

## 7. Quiet App Real Device Screenshots (`src/components/ui/ScreenshotFrame.tsx`)
- **Location:** `src/components/ui/ScreenshotFrame.tsx` (line 51), `/public/images/products/`
- **Live Behavior:** Honest, labeled surface-colored placeholder cards are rendered; never fake UI.
- **What is needed from Rajesh:**
  - Launch Android Studio emulator (Pixel 7, API 35) loaded with the Quiet App seed data (five Bengaluru locations) and capture clean 390px-wide screenshots (`quiet-explore.webp`, `quiet-map.webp`, `quiet-detail.webp`, `quiet-report.webp`, `quiet-saved.webp`, `quiet-paywall.webp`) into `/public/images/products/`.

---

## 8. Introduction Marquee Screenshots (`src/components/Introduction.tsx`)
- **Location:** `/public/images/intro/`
- **Live Behavior:** 8 custom abstract system tiles rendered with CSS gradients in the brand palette.
- **What is needed from Rajesh:**
  - Save real product screenshots into `/public/images/intro/` (e.g., Faultline graphs, database schemas, code snippets).
