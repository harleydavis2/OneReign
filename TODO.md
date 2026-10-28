# OneReign — Actionable Next Steps (TODO.md)

This document tracks items that require external input, real-device captures, or verification from Rajesh. No metrics, users, or launch dates have been invented.

---

## 1. Quiet App Screenshots (Android Studio Emulator)
- **Status:** Placeholders with exact dimensions and phone frames have been created in the Quiet case study (`/products/quiet`).
- **TODO(rajesh):** Launch an Android Studio emulator (Pixel 7, API 35) loaded with the Quiet App seed data (five Bengaluru locations) and capture 6 clean 390px-wide screenshots:
  1. `quiet-explore.webp` (Explore view: nearest or quietest first)
  2. `quiet-map.webp` (OpenStreetMap view with markers)
  3. `quiet-detail.webp` (Place detail: live Quiet Score, report count, hours)
  4. `quiet-report.webp` (Report in seconds: 4-slider rating view)
  5. `quiet-saved.webp` (Saved quiet places view)
  6. `quiet-paywall.webp` (RevenueCat paywall: calm aesthetics, unlocked basic features)
  Place the saved captures in `/public/images/products/`.

## 2. Quiet App GitHub Repository Visibility
- **Status:** `https://github.com/rajeshr20/Quiet-App` was referenced in the prompt.
- **TODO(rajesh):** Verify whether `rajeshr20/Quiet-App` should be made public or remain private for the RevenueCat Shipaton 2026. The website links to `https://github.com/rajeshr20/Quiet-App`.

## 3. Social Media Accounts
- **Status:** Audited existing corporate links. `https://github.com/onereign` and `https://twitter.com/onereign` return HTTP 404 and have been removed from the site to avoid broken user trust.
- **TODO(rajesh):**
  - If a company GitHub organization is created, re-link `https://github.com/<org>` in `src/components/Footer.tsx`.
  - If an official X/Twitter handle exists (e.g., `@onereign_co`), add the verified handle.
  - Currently, `https://linkedin.com/company/onereign` is verified and active.

## 4. Custom Domain & DNS Verification
- **Status:** Canonical URLs and OpenGraph tags are standardized on `https://one-reign.vercel.app` to prevent canonical duplication.
- **TODO(rajesh):** When switching the primary custom domain to `https://onereign.co` or similar, update `metadataBase` in `src/app/layout.tsx` and adjust Vercel production domain settings.

## 5. Contact Form Destination
- **Status:** Contact form on `/contact` captures inquiries with validation and confirms submission.
- **TODO(rajesh):** Connect the form submission handler to your preferred backend, webhook, or email relay (e.g. Resend, Formspree, or Supabase function) targeting `hello@onereign.co`.
