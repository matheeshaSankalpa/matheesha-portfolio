import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { checkVisibleReveals, checkReplay } from "./reveal-helpers.mjs";

const base = process.env.QA_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const checks = [];
try {
  const context = await browser.newContext({
    colorScheme: "light",
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of [
    "/",
    "/skills",
    "/work",
    "/blogs",
    "/timeline",
    "/videos",
    "/contact",
  ]) {
    await page.goto(base + route);
    await page.locator(".reveal").first().waitFor({ state: "attached" });
    await page.waitForTimeout(150);
    await page.evaluate(async () => {
      for (
        let top = 0;
        top < document.body.scrollHeight;
        top += innerHeight * 0.7
      ) {
        scrollTo({ top, behavior: "instant" });
        await new Promise((resolve) => setTimeout(resolve, 120));
      }
    });
    await page.waitForTimeout(900);
    await checkVisibleReveals(page, route);
    console.log("Checking replay " + route);
    const replayed = await checkReplay(
      page,
      page.locator("main .reveal").last(),
    );
    checks.push(
      `Normal-motion reveal${replayed ? " and replay" : " (form never fully leaves viewport)"}: ${route}`,
    );
  }
  await page.goto(base);
  const card = page.locator(".bento-card").first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const initial = await card.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await card.hover();
  await page.waitForTimeout(500);
  const hovered = await card.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  assert.notEqual(hovered, initial);
  checks.push("Bento hover remains independent of entrance motion");
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await page.waitForTimeout(100);
  const opacity = await page
    .locator(".profile-dark")
    .evaluate((element) => Number(getComputedStyle(element).opacity));
  assert(opacity > 0 && opacity < 1);
  await page.waitForTimeout(400);
  assert.equal(
    await page
      .locator(".profile-dark")
      .evaluate((element) => getComputedStyle(element).opacity),
    "1",
  );
  checks.push("Smooth portrait crossfade");
  const otherPage = await context.newPage();
  await otherPage.goto(base);
  assert.equal(
    await otherPage.locator("html").getAttribute("data-theme"),
    "dark",
  );
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await otherPage.waitForFunction(
    () => document.documentElement.dataset.theme === "light",
  );
  checks.push("Theme synchronizes across tabs");
  await otherPage.close();
  await page.goto(base + "/contact");
  await page.getByLabel("Your name").focus();
  assert.equal(
    await page
      .getByLabel("Your name")
      .evaluate((element) => getComputedStyle(element).outlineStyle),
    "solid",
  );
  checks.push("Keyboard focus is visible");
  assert.deepEqual(errors, []);
  await context.close();

  const blockedContext = await browser.newContext({ colorScheme: "dark" });
  await blockedContext.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage unavailable in QA");
      },
    });
  });
  const blockedPage = await blockedContext.newPage();
  await blockedPage.goto(base);
  assert.equal(
    await blockedPage.locator("html").getAttribute("data-theme"),
    "dark",
  );
  await blockedPage
    .getByRole("button", { name: "Switch to light mode" })
    .click();
  assert.equal(
    await blockedPage.locator("html").getAttribute("data-theme"),
    "light",
  );
  checks.push("Theme works when storage is unavailable");
  await blockedContext.close();
  await writeFile(
    "qa/interactions-results.json",
    JSON.stringify({ base, status: "passed", checks }, null, 2),
  );
  console.log("All motion, focus and storage checks passed.");
} finally {
  await browser.close();
}
