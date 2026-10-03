import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { resolve, join } from "node:path";
import publicAssetsPlugin from "../src/data/publicAssetsPlugin.js";
import { videos, workItems } from "../src/data/portfolio.js";
import { checkVisibleReveals } from "./reveal-helpers.mjs";

const base = process.env.QA_URL || "http://127.0.0.1:4174";
const checks = [];
const fixture = resolve("qa/.asset-discovery-fixture");
assert(fixture.startsWith(resolve("qa") + "\\"));
try {
  await mkdir(join(fixture, "work/demo"), { recursive: true });
  await mkdir(join(fixture, "illustrations"), { recursive: true });
  for (const filename of [
    "flyer16.jpg",
    "flyer2.jpg",
    "flyer10.webp",
    "flyer1.png",
  ]) {
    await writeFile(join(fixture, "work/demo", filename), "fixture");
  }
  const plugin = publicAssetsPlugin();
  plugin.configResolved({ publicDir: fixture });
  const id = plugin.resolveId("virtual:portfolio-assets");
  let manifest = plugin.load(id);
  let imagePaths = JSON.parse(manifest.match(/workImages = (.*);\n/)[1]);
  assert.deepEqual(imagePaths, [
    "/work/demo/flyer1.png",
    "/work/demo/flyer2.jpg",
    "/work/demo/flyer10.webp",
    "/work/demo/flyer16.jpg",
  ]);
  await writeFile(join(fixture, "work/demo/flyer17.jpg"), "new fixture");
  manifest = plugin.load(id);
  imagePaths = JSON.parse(manifest.match(/workImages = (.*);\n/)[1]);
  assert.equal(imagePaths.at(-1), "/work/demo/flyer17.jpg");
  checks.push(
    "Build-time gallery discovery, numeric ordering and new-file inclusion",
  );
} finally {
  await rm(fixture, { recursive: true, force: true });
}

const browser = await chromium.launch({ channel: "msedge", headless: true });
const errors = [];
try {
  for (const width of [1440, 1100, 1024, 834, 768, 701, 700, 640, 390, 320]) {
    for (const theme of ["light", "dark"]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        colorScheme: theme,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(base);
      await page.locator(".about-portrait img").waitFor();
      assert.equal(
        await page.locator(".featured-work, .project-card").count(),
        0,
      );
      assert(
        !(await page
          .locator("main")
          .innerText()
          .then((text) => text.includes("SELECTED WORK"))),
      );
      for (const text of [
        "Learning by doing",
        "One more idea.",
        "I work in marketing.",
      ]) {
        assert(
          (await page.locator("main").innerText())
            .toLowerCase()
            .includes(text.toLowerCase()),
        );
      }
      const clipped = await page
        .locator(".marketing-bento .tool-object, .data-bento .tool-object")
        .evaluateAll((elements) =>
          elements
            .filter((element) => {
              const box = element.getBoundingClientRect();
              const card = element
                .closest(".bento-card")
                .getBoundingClientRect();
              return (
                box.left < card.left ||
                box.right > card.right ||
                box.top < card.top ||
                box.bottom > card.bottom
              );
            })
            .map((element) => element.className),
        );
      assert.deepEqual(
        clipped,
        [],
        `Clipped tool logos at ${width}px ${theme}`,
      );
      assert.equal(await page.locator(".reveal:not(.is-visible)").count(), 0);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        true,
        `Home overflow ${width}`,
      );
      const collision = await page.locator(".cta-inner").evaluate((element) => {
        const text = element.querySelector("h2").getBoundingClientRect();
        const art = element
          .querySelector(".cta-character")
          .getBoundingClientRect();
        // The character's transparent canvas intentionally overlaps on mobile;
        // the visible portrait is beside the text. Desktop reserves a full lane.
        return (
          innerWidth > 700 &&
          text.right > art.left &&
          text.left < art.right &&
          text.bottom > art.top &&
          text.top < art.bottom
        );
      });
      assert.equal(
        collision,
        false,
        `CTA text/art collision ${width}px ${theme}`,
      );

      await page.goto(base + "/work");
      assert.equal(await page.locator(".gallery-tile").count(), 24);
      const largest = await page
        .locator(".gallery-tile")
        .evaluateAll((elements) =>
          Math.max(
            ...elements.map(
              (element) => element.getBoundingClientRect().height,
            ),
          ),
        );
      assert(largest <= 191, `Oversized work thumbnails ${width}`);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        true,
      );
      if (width <= 700) {
        assert.equal(
          await page
            .locator(".work-gallery")
            .first()
            .evaluate(
              (element) =>
                getComputedStyle(element).gridTemplateColumns.split(" ").length,
            ),
          2,
        );
      }
      await page.goto(base + "/videos");
      assert.equal(await page.locator(".video-poster img").count(), 4);
      assert(
        !/short\s*(video)?\s*0?[1-4]/i.test(
          await page.locator("main").innerText(),
        ),
      );
      const previews = await page
        .locator(".video-frame")
        .evaluateAll((elements) =>
          elements.map((element) => {
            const box = element.getBoundingClientRect();
            return box.width / box.height;
          }),
        );
      previews.forEach((ratio) =>
        assert(Math.abs(ratio - 9 / 16) < 0.002, `9:16 preview ratio ${width}`),
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        true,
      );
      await context.close();
    }
  }
  checks.push(
    "Home content, logos, CTA, compact Work and 9:16 video previews at 10 widths in both themes",
  );

  const context = await browser.newContext({
    colorScheme: "light",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(base + "/work");
  for (const project of workItems) {
    const opener = page.locator(`#${project.folder} .gallery-tile`).first();
    await opener.click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor();
    const image = dialog.locator("img");
    await image.evaluate((image) => image.decode());
    assert(
      (await image.getAttribute("src")).startsWith(`/work/${project.folder}/`),
    );
    assert(await image.evaluate((image) => image.naturalWidth > 500));
    await page.getByRole("button", { name: "Close image preview" }).click();
    await page.waitForFunction(() =>
      document.activeElement.classList.contains("gallery-tile"),
    );
  }
  checks.push(
    "Every Work collection opens its original full-size image and restores focus",
  );
  await page.goto(base + "/videos");
  await page.route("https://www.youtube.com/**", (route) =>
    route.fulfill({
      body: "<html><body>Local player check</body></html>",
      contentType: "text/html",
    }),
  );
  for (const video of videos) {
    await page
      .getByRole("button", { name: `Play ${video.title}`, exact: true })
      .click();
    await page.locator(`iframe[title="${video.title}"]`).waitFor();
    assert.equal(
      await page.locator(`iframe[title="${video.title}"]`).getAttribute("src"),
      video.url + "?autoplay=1",
    );
  }
  assert.equal(await page.locator("iframe").count(), 4);
  checks.push(
    "All four genuine video posters start their corresponding YouTube embeds",
  );
  await context.close();

  const motion = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: "dark",
  });
  const moving = await motion.newPage();
  await moving.goto(base);
  await moving
    .locator(".bento-card.reveal")
    .first()
    .waitFor({ state: "attached" });
  assert.equal(await moving.locator(".bento-card.is-visible").count(), 0);
  const directions = await moving
    .locator(".bento-card")
    .evaluateAll((elements) =>
      elements.map((element) => element.dataset.reveal),
    );
  assert.equal(new Set(directions).size, 4);
  assert.equal(
    await moving
      .locator(".bento-card")
      .nth(1)
      .evaluate((element) => element.style.getPropertyValue("--reveal-delay")),
    "85ms",
  );
  const first = moving.locator(".bento-card").first();
  await first.scrollIntoViewIfNeeded();
  await moving.waitForTimeout(130);
  const opacity = await first.evaluate((element) =>
    Number(getComputedStyle(element).opacity),
  );
  assert(
    opacity > 0 && opacity < 1,
    "Entrance should transition, not pop into place",
  );
  await moving.waitForTimeout(800);
  assert.equal(
    await first.evaluate((element) => getComputedStyle(element).translate),
    "0px",
  );
  await moving.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await moving.waitForFunction(
    () =>
      !document.querySelector(".bento-card").classList.contains("is-visible"),
  );
  await first.scrollIntoViewIfNeeded();
  await moving.waitForFunction(() =>
    document.querySelector(".bento-card").classList.contains("is-visible"),
  );
  await moving.emulateMedia({ reducedMotion: "reduce" });
  await moving.waitForFunction(
    () => document.querySelectorAll(".reveal:not(.is-visible)").length === 0,
  );
  assert.equal(
    await first.evaluate((element) => getComputedStyle(element).translate),
    "none",
  );
  checks.push(
    "Varied replayable entrances, stagger, visible transition and live reduced-motion preference",
  );
  await motion.close();
  for (const width of [834, 390, 320]) {
    for (const theme of ["light", "dark"]) {
      const context = await browser.newContext({
        viewport: { width, height: 844 },
        colorScheme: theme,
        reducedMotion: "no-preference",
      });
      const page = await context.newPage();
      for (const route of ["/", "/skills", "/work", "/videos"]) {
        await page.goto(base + route);
        await page.locator(".reveal").first().waitFor({ state: "attached" });
        await page.waitForTimeout(850);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          true,
          `Normal-motion overflow at ${width}px ${route}`,
        );
        await page.evaluate(async () => {
          for (
            let top = 0;
            top < document.body.scrollHeight;
            top += innerHeight * 0.7
          ) {
            scrollTo({ top, behavior: "instant" });
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        });
        await page.waitForTimeout(850);
        await checkVisibleReveals(
          page,
          `Hidden content at ${width}px ${route}`,
        );
      }
      await context.close();
    }
  }
  checks.push(
    "Tablet and mobile normal-motion reveals, both themes, with no horizontal scrolling",
  );
  assert.deepEqual(errors, []);
  checks.push("No uncaught application errors during refinement checks");
  await writeFile(
    "qa/refinement-results.json",
    JSON.stringify({ base, status: "passed", checks }, null, 2),
  );
  console.log("All targeted refinement checks passed.");
} finally {
  await browser.close();
}
