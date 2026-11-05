import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// ── Homepage load ──────────────────────────────────────────────
test('homepage loads with correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/OneReign/i);
});

test('skip-to-content link is present', async ({ page }) => {
  await page.goto('/');
  // layout.tsx uses href="#main"
  const skip = page.locator('a[href="#main"]').first();
  await expect(skip).toBeAttached();
});

// ── No horizontal overflow ─────────────────────────────────────
for (const width of [360, 390, 768, 1280]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);
  });
}

// ── Desktop navigation ─────────────────────────────────────────
test('desktop nav links are present', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  const nav = page.locator('nav[aria-label="Main Navigation"]');
  await expect(nav).toBeVisible();
  const links = nav.locator('a');
  expect(await links.count()).toBeGreaterThan(0);
});

// ── Mobile menu open / close / Escape ─────────────────────────
test('mobile menu opens and closes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const menuBtn = page.locator('button[aria-controls="mobile-nav"]');
  await expect(menuBtn).toBeVisible();
  await menuBtn.click();
  await expect(menuBtn).toHaveAttribute('aria-expanded', 'true');

  // Escape key — focus must be inside overlay for the keydown handler to fire
  const overlay = page.locator('#mobile-nav');
  await expect(overlay).toBeVisible();
  await overlay.press('Escape');
  await expect(menuBtn).toHaveAttribute('aria-expanded', 'false', { timeout: 3000 });
});

test('mobile menu close button works', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.locator('button[aria-label="Open navigation menu"]').click();
  const closeBtn = page.locator('button[aria-label="Close navigation menu"]');
  await expect(closeBtn).toBeVisible();
  await closeBtn.click();

  const overlay = page.locator('[role="dialog"][aria-label="Navigation menu"]');
  await expect(overlay).toBeHidden();
});

// ── FAQ accordion ─────────────────────────────────────────────
test('FAQ accordion expands on click', async ({ page }) => {
  await page.goto('/');
  // FAQ section has id="faqs", heading: "Questions, answered."
  const faqSection = page.locator('#faqs');
  await faqSection.scrollIntoViewIfNeeded();
  const firstQuestion = faqSection.locator('button[aria-expanded]').first();
  await expect(firstQuestion).toBeVisible();
  const wasExpanded = await firstQuestion.getAttribute('aria-expanded');
  await firstQuestion.click();
  const isNowExpanded = await firstQuestion.getAttribute('aria-expanded');
  expect(wasExpanded).not.toBe(isNowExpanded);
});

// ── WhatsApp FAB ───────────────────────────────────────────────
test('WhatsApp FAB has correct accessible label', async ({ page }) => {
  await page.goto('/');
  // Use the fixed FAB specifically (not the footer link)
  const fab = page.locator('a[aria-label="Chat on WhatsApp (opens in new tab)"]');
  await expect(fab).toBeAttached();
});

// ── CTA section ───────────────────────────────────────────────
test('CTA buttons are present and linked', async ({ page }) => {
  await page.goto('/');
  // CTA heading contains "Build Smart"
  const ctaSection = page.locator('section').filter({ hasText: /Build Smart/i }).first();
  await ctaSection.scrollIntoViewIfNeeded();
  const ctaLinks = ctaSection.locator('a');
  expect(await ctaLinks.count()).toBeGreaterThan(0);
});

// ── Footer ────────────────────────────────────────────────────
test('footer is present', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer).toBeAttached();
});

// ── axe-core accessibility scan ───────────────────────────────
test('homepage has no critical axe violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .exclude('[aria-hidden="true"]')
    .analyze();

  const critical = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious'
  );

  if (critical.length > 0) {
    console.log('Critical axe violations:');
    critical.forEach((v) => {
      console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
      v.nodes.forEach((n) => console.log(`    → ${n.html.slice(0, 120)}`));
    });
  }

  expect(critical).toHaveLength(0);
});
