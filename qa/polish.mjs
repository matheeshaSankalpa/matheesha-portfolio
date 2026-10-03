import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { socialLinks } from "../src/data/socials.js";
import { personal } from "../src/data/content.js";
import { academicItems } from "../src/data/portfolio.js";
import { checkReplay, checkVisibleReveals } from "./reveal-helpers.mjs";

const base = process.env.QA_URL || "http://127.0.0.1:4176";
const browser = await chromium.launch({ channel: "msedge" });
const checks = [];
const errors = [];
const widths = [1440, 1280, 1024, 768, 430, 390, 375, 360, 320];
const mobileOnly = process.argv.includes("--mobile-only");
try {
  for (const theme of mobileOnly ? [] : ["light", "dark"]) {
    const context = await browser.newContext({
      colorScheme: theme,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(base);
      await page.locator(".profile-light").evaluate((image) => image.decode());
      assert.equal(await page.locator(".social-card").count(), 8);
      assert.deepEqual(
        await page
          .locator(".social-card > span:not(.social-icon)")
          .allTextContents(),
        socialLinks.map((profile) => profile.name),
      );
      assert.equal(
        await page
          .locator("footer a[href*='hackerrank'], footer a[href*='github']")
          .count(),
        0,
      );
      for (const profile of socialLinks) {
        const card = page.locator(
          `.social-card[data-platform='${profile.id}']`,
        );
        assert.equal(await card.getAttribute("href"), profile.url);
        assert((await card.getAttribute("aria-label")).includes(profile.name));
        const response = await page.request.get(base + profile.icon);
        assert.equal(response.status(), 200);
        assert((await response.text()).includes("<path"));
        assert(
          (
            await card
              .locator(".social-icon")
              .evaluate((element) => getComputedStyle(element).maskImage)
          ).includes(profile.icon),
        );
        const box = await card.boundingBox();
        assert(box.width > 110 && box.height >= 130);
      }
      const columns = await page
        .locator(".social-grid")
        .evaluate(
          (element) =>
            getComputedStyle(element).gridTemplateColumns.split(" ").length,
        );
      assert.equal(columns, width <= 700 ? 2 : 4);
      assert.equal(
        await page.locator(".connect-whatsapp").getAttribute("href"),
        personal.whatsapp,
      );
      const portrait = await page.locator(".portrait-panel").boundingBox();
      if (width <= 700) {
        const bento = page.locator(".design-bento .illustration");
        assert.equal(
          await bento.evaluate(
            (element) => getComputedStyle(element).objectFit,
          ),
          "cover",
        );
        assert(Math.abs((await bento.boundingBox()).height - 280) < 2);
        assert(portrait.width <= 351 && portrait.height <= 449);
        const fit = await page
          .locator(".profile-images")
          .evaluate((element) => {
            const panel = element
              .closest(".portrait-panel")
              .getBoundingClientRect();
            const image = element.getBoundingClientRect();
            return {
              ratio: image.height / panel.height,
              bottom: image.bottom - panel.bottom,
            };
          });
        assert(Math.abs(fit.ratio - 0.82) < 0.01);
        assert(Math.abs(fit.bottom - 8) < 1);
        assert(
          (await page.locator(".hero-copy").boundingBox()).y +
            (await page.locator(".hero-copy").boundingBox()).height <
            portrait.y,
        );
      }
      const cta = page.locator(".cta-inner");
      await cta.scrollIntoViewIfNeeded();
      await cta.locator(".illustration").evaluate((image) => image.decode());
      const card = await cta.boundingBox();
      const character = await page.locator(".cta-character").boundingBox();
      if (width > 1000) {
        assert(
          character.width >= 375 && character.y < card.y,
          "Desktop character should break above its card",
        );
        assert.equal(
          await cta.evaluate((element) => getComputedStyle(element).overflow),
          "visible",
        );
        const heading = await cta.locator("h2").boundingBox();
        assert(
          heading.x + heading.width < character.x,
          "Desktop copy needs its own clear lane",
        );
      } else if (width <= 700) {
        assert(character.width >= 270);
        const arrow = await cta.locator(".cta-arrow").boundingBox();
        assert(
          arrow.x + arrow.width < character.x,
          "Mobile CTA button must remain clear of character",
        );
        const body = await cta.locator(".cta-bottom").boundingBox();
        assert(
          body.y > character.y + character.height - 10,
          "Mobile supporting copy must remain below art",
        );
      }
      await page.goto(base + "/skills");
      for (const category of ["design", "development", "marketing", "data"]) {
        const art = page.locator(`.skill-${category} .skill-art`);
        await art.scrollIntoViewIfNeeded();
        await art.locator("img").evaluate((image) => image.decode());
        if (width <= 1000) {
          const fit = await art.evaluate((element) => {
            const image = element.querySelector("img");
            const frame = element.getBoundingClientRect();
            const box = image.getBoundingClientRect();
            return {
              fit: getComputedStyle(image).objectFit,
              height: box.height - frame.height,
              width: box.width - frame.width,
            };
          });
          assert.equal(fit.fit, "cover");
          assert(
            Math.abs(fit.width) < 2 && Math.abs(fit.height) < 2,
            `Unfilled ${category} frame ${width}px`,
          );
        }
      }
      console.log(`Polish layout: ${width}px ${theme}`);
    }
    await page.goto(base + "/timeline");
    for (const item of academicItems) {
      const entry = page.locator(".education-item").filter({
        has: page.getByRole("heading", { name: item.subtitle, exact: true }),
      });
      await entry.getByText(item.period, { exact: true }).waitFor();
      if (item.status)
        assert.equal(
          await entry.locator(".education-status").innerText(),
          "Completed",
        );
    }
    await page.goto(base + "/contact");
    assert.equal(
      await page.locator(".contact-whatsapp").getAttribute("href"),
      personal.whatsapp,
    );
    assert.equal(
      await page
        .locator(".contact-whatsapp .social-icon[data-platform='whatsapp']")
        .count(),
      1,
    );
    const firstSocial = page.locator(".social-card").first();
    await firstSocial.focus();
    assert.equal(
      await firstSocial.evaluate(
        (element) => getComputedStyle(element).outlineStyle,
      ),
      "solid",
    );
    await firstSocial.hover();
    await page.waitForTimeout(250);
    assert.notEqual(
      await firstSocial.evaluate(
        (element) => getComputedStyle(element).transform,
      ),
      "none",
    );
    await context.close();
  }
  checks.push(
    "All nine requested widths, both themes: hero, filled illustration frames, contact character, eight real social links, official marks, WhatsApp and corrected education",
  );

  for (const width of mobileOnly ? [375] : [1440, 375]) {
    for (const theme of ["light", "dark"]) {
      const context = await browser.newContext({
        viewport: { width, height: 844 },
        colorScheme: theme,
      });
      const page = await context.newPage();
      page.on("pageerror", (error) => errors.push(error.message));
      const routes = [
        [
          "/",
          ".bento-card, .about-portrait, .about-copy, .experience-detail, .sketchbook-art, .cta-inner",
        ],
        ["/work", ".work-collection-header, .gallery-tile"],
        ["/skills", ".skill-art, .skill-copy"],
        ["/timeline", ".education-item, .credential-card"],
        ["/blogs", ".blog-card"],
        ["/videos", ".video-card"],
      ];
      for (const [route, selector] of routes) {
        await page.goto(base + route);
        const cards = page.locator(`main :is(${selector})`);
        await cards.first().waitFor({ state: "attached" });
        for (let i = 0; i < (await cards.count()); i++)
          assert(
            await checkReplay(page, cards.nth(i)),
            `Card ${i} must replay on ${route}`,
          );
        await checkVisibleReveals(page, `${route} ${width} ${theme}`);
        await page.reload();
        await checkReplay(page, page.locator(`main :is(${selector})`).first());
        console.log(
          `Replay all cards and refresh: ${route} ${width}px ${theme}`,
        );
      }
      await page.goto(base);
      // Exercise client-side navigation, not full reloads.
      if (width <= 700)
        await page.getByRole("button", { name: "Open navigation" }).click();
      await page
        .locator(width <= 700 ? ".mobile-nav" : ".desktop-nav")
        .getByRole("link", { name: /Work$/ })
        .click();
      await page.waitForURL(base + "/work");
      await checkReplay(page, page.locator(".gallery-tile").first());
      if (width <= 700)
        await page.getByRole("button", { name: "Open navigation" }).click();
      await page
        .locator(width <= 700 ? ".mobile-nav" : ".desktop-nav")
        .getByRole("link", { name: /Home$/ })
        .click();
      await page.waitForURL(base + "/");
      const sample = page.locator(".bento-card").first();
      await checkReplay(page, sample);
      const sampleTop = await sample.evaluate(
        (element) => element.getBoundingClientRect().top + scrollY,
      );
      for (const gap of [30, 45, 35, 50]) {
        await page.evaluate(
          ({ top, gap }) =>
            scrollTo({ top: top - innerHeight - gap, behavior: "instant" }),
          { top: sampleTop, gap },
        );
        await page.waitForTimeout(70);
        assert(
          await sample.evaluate((element) =>
            element.classList.contains("is-visible"),
          ),
          "Small viewport-edge movements must not flicker",
        );
      }
      await sample.scrollIntoViewIfNeeded();
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForFunction(
        () =>
          !document
            .querySelector(".bento-card")
            .classList.contains("is-visible"),
      );
      await sample.scrollIntoViewIfNeeded();
      await page.waitForTimeout(130);
      const opacity = await sample.evaluate((element) =>
        Number(getComputedStyle(element).opacity),
      );
      assert(
        opacity > 0 && opacity < 1,
        "Replay must actually animate, not only toggle classes",
      );
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.waitForFunction(
        () => !document.querySelector(".reveal:not(.is-visible)"),
      );
      assert.equal(
        await sample.evaluate((element) => getComputedStyle(element).translate),
        "none",
      );
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await checkReplay(page, sample);
      await page.goto(base + "/blogs");
      await page.getByRole("button", { name: "Coding", exact: true }).click();
      await checkReplay(page, page.locator(".blog-card").last());
      await page.getByRole("button", { name: "All", exact: true }).click();
      await checkReplay(page, page.locator(".blog-card").last());
      await page.goto(base + "/work");
      await page
        .getByRole("button", { name: "University Clubs", exact: true })
        .click();
      await checkReplay(page, page.locator(".gallery-tile").last());
      await page.getByRole("button", { name: "All", exact: true }).click();
      await checkReplay(page, page.locator(".gallery-tile").last());
      await context.close();
    }
  }
  checks.push(
    "Every Home, Work, Skills, Education, Blog and Video card replays after leaving/re-entering; refresh, Home > Work > Home, edge hysteresis, filter updates, live reduced motion and visible intermediate replay tested on desktop/mobile in both themes",
  );
  assert.deepEqual(errors, []);
  await writeFile(
    "qa/polish-results.json",
    JSON.stringify({ base, status: "passed", checks }, null, 2),
  );
  console.log("All final polish checks passed.");
} finally {
  await browser.close();
}
