import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
const base = process.env.QA_URL || "http://127.0.0.1:5174";
const browser = await chromium.launch({ channel: "msedge" });
try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const theme of ["light", "dark"]) {
    await page.emulateMedia({ colorScheme: theme });
    for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      await page.goto(base);
      await page.locator(".profile-light").evaluate((i) => i.decode());
      await page.screenshot({
        path: `qa/screenshots/polish-hero-${width}-${theme}.png`,
      });
      await page.locator(".cta-inner").scrollIntoViewIfNeeded();
      await page.locator(".cta-character img").evaluate((i) => i.decode());
      await page.screenshot({
        path: `qa/screenshots/polish-cta-${width}-${theme}.png`,
      });
      await page.locator(".connect-section").screenshot({
        path: `qa/screenshots/polish-connect-${width}-${theme}.png`,
      });
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + "/skills");
    for (const category of ["design", "development", "marketing", "data"]) {
      const art = page.locator(`.skill-${category} .skill-art`);
      await art.scrollIntoViewIfNeeded();
      await art.locator("img").evaluate((i) => i.decode());
      await art.screenshot({
        path: `qa/screenshots/polish-${category}-390-${theme}.png`,
      });
    }
  }
  // Development smoke test catches React warnings absent in production.
  for (const route of [
    "/",
    "/work",
    "/skills",
    "/timeline",
    "/education",
    "/blogs",
    "/videos",
    "/contact",
  ]) {
    await page.goto(base + route);
    await page.locator("main h1").waitFor();
    await page.waitForTimeout(100);
  }
  assert.deepEqual(errors, []);
  console.log("Visual captures and eight-route development smoke test passed.");
} finally {
  await browser.close();
}
