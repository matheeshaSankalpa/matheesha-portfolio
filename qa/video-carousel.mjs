import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { join, resolve, sep } from "node:path";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import publicAssetsPlugin from "../src/data/publicAssetsPlugin.js";

const base = process.env.QA_URL || "http://127.0.0.1:5173";
const fixture = await mkdtemp(resolve("qa/.carousel-fixture-"));
assert(fixture.startsWith(resolve("qa") + sep));
try {
  const folder = join(fixture, "work/lagops");
  await mkdir(folder, { recursive: true });
  for (const number of [25, 3, 1, 2])
    await writeFile(join(folder, `video(${number}).mp4`), "fixture");
  const plugin = publicAssetsPlugin();
  plugin.configResolved({ publicDir: fixture });
  const id = plugin.resolveId("virtual:portfolio-assets");
  const manifest = async () =>
    import(
      "data:text/javascript;base64," +
        Buffer.from(plugin.load(id)).toString("base64")
    );
  assert.deepEqual(
    (await manifest()).workVideos,
    [1, 2, 3, 25].map((n) => `/work/lagops/video(${n}).mp4`),
  );
  await writeFile(join(folder, "video(26).mp4"), "future video");
  assert.deepEqual(
    (await manifest()).workVideos,
    [1, 2, 3, 25, 26].map((n) => `/work/lagops/video(${n}).mp4`),
  );
  await writeFile(join(folder, "video(2).web.mp4"), "compatible copy");
  assert.equal(
    (await manifest()).workVideos[1],
    "/work/lagops/video(2).web.mp4",
  );
  assert.equal((await manifest()).workVideos.length, 5);
} finally {
  await rm(fixture, { recursive: true, force: true });
}

const browser = await chromium.launch({ channel: "msedge", headless: true });
const errors = [];
const codecNotes = new Set();
const activeNumber = (page) =>
  page
    .locator('.work-video-slide[data-active="true"]')
    .getAttribute("aria-label");
async function openVideos(page) {
  if (["127.0.0.1", "localhost"].includes(new URL(base).hostname))
    await page.route("**/_vercel/insights/script.js", (route) =>
      route.fulfill({ contentType: "application/javascript", body: "" }),
    );
  if (["127.0.0.1", "localhost"].includes(new URL(base).hostname))
    await page.route("**/v1/script.debug.js", (route) =>
      route.fulfill({ contentType: "application/javascript", body: "" }),
    );
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(`${base}/work`);
  assert.equal(
    await page.locator("video").count(),
    0,
    "Flyer mode stays the default",
  );
  await page
    .getByRole("button", { name: "Show Lagops Digital videos" })
    .click();
}
async function noOverflow(page) {
  assert(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  const geometry = await page
    .locator('.work-video-slide[data-active="true"] video')
    .evaluate((video) => {
      const player = video.getBoundingClientRect();
      const viewport = video
        .closest(".work-video-viewport")
        .getBoundingClientRect();
      return { player: player.toJSON(), viewport: viewport.toJSON() };
    });
  const { player, viewport } = geometry;
  assert(
    player.left >= viewport.left - 1 && player.right <= viewport.right + 1,
    "The whole centered player must fit horizontally",
  );
  assert(
    player.top >= viewport.top && player.bottom <= viewport.bottom,
    "The player and native controls must fit vertically",
  );
}

await mkdir("qa/screenshots", { recursive: true });
try {
  for (const width of [1440, 1024, 768, 700, 430, 390, 320]) {
    for (const theme of ["light", "dark"]) {
      const context = await browser.newContext({
        viewport: { width, height: width < 700 ? 844 : 1000 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      await page.addInitScript(
        (value) => localStorage.setItem("portfolio-theme", value),
        theme,
      );
      await openVideos(page);
      const videos = page.locator("#lagops video");
      const count = await videos.count();
      assert(count > 1);
      assert(
        await videos.evaluateAll((players) =>
          players.every(
            (video) =>
              video.controls &&
              video.playsInline &&
              video.preload === "metadata" &&
              !video.autoplay &&
              !video.muted &&
              video.paused,
          ),
        ),
      );
      assert(
        await page
          .getByRole("button", { name: "Previous video", exact: true })
          .isDisabled(),
      );
      const originalSources = await videos.evaluateAll((players) =>
        players.map((video) => video.getAttribute("src")),
      );
      await page
        .getByRole("button", { name: "Next video", exact: true })
        .click();
      assert.equal(await activeNumber(page), `Video 2 of ${count}`);
      await page
        .getByRole("button", { name: "Focus video 3", exact: true })
        .click();
      assert.equal(await activeNumber(page), `Video 3 of ${count}`);
      assert.deepEqual(
        await videos.evaluateAll((players) =>
          players.map((v) => v.getAttribute("src")),
        ),
        originalSources,
      );
      await noOverflow(page);
      assert(
        await page
          .locator('.work-video-slide[data-active="true"]')
          .evaluate(
            (slide) => getComputedStyle(slide).transitionDuration === "0s",
          ),
      );
      const carousel = page.locator(".work-video-carousel");
      await carousel.focus();
      await page.keyboard.press("End");
      assert.equal(await activeNumber(page), `Video ${count} of ${count}`);
      assert(
        await page
          .getByRole("button", { name: "Next video", exact: true })
          .isDisabled(),
      );
      await page.keyboard.press("ArrowRight");
      assert.equal(await activeNumber(page), `Video ${count} of ${count}`);
      await page.keyboard.press("Home");
      await page.keyboard.press("ArrowLeft");
      assert.equal(await activeNumber(page), `Video 1 of ${count}`);
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowRight");
      if ([1440, 390].includes(width)) {
        await page.locator("#lagops").screenshot({
          path: `qa/screenshots/carousel-${width}-${theme}.png`,
        });
        const axe = await new AxeBuilder({ page })
          .include(".work-video-carousel")
          .analyze();
        assert.deepEqual(
          axe.violations.map(({ id }) => id),
          [],
        );
      }
      await page
        .getByRole("button", { name: "Industry Experience", exact: true })
        .click();
      assert.equal(await page.locator(".work-collection").count(), 1);
      assert.equal(await videos.count(), count);
      await page
        .getByRole("button", { name: "University Clubs", exact: true })
        .click();
      assert.equal(await page.locator(".work-collection").count(), 3);
      assert.equal(
        await page.locator("video, .work-video-carousel").count(),
        0,
      );
      await page.getByRole("button", { name: "All", exact: true }).click();
      assert.equal(await page.locator(".work-collection").count(), 4);
      assert.equal(await videos.count(), count);
      await page
        .getByRole("button", { name: "Show Lagops Digital flyers" })
        .click();
      assert.equal(await page.locator("video").count(), 0);
      assert((await page.locator("#lagops .gallery-tile").count()) > 0);
      await context.close();
    }
  }
  console.log(
    "PASS: seven responsive widths, both themes, native player attributes, side selection, keyboard bounds, reduced motion, filters, and scoped accessibility.",
  );

  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  await openVideos(page);
  await page.getByRole("button", { name: "Next video", exact: true }).click();
  await page.waitForFunction(
    () => document.querySelectorAll("#lagops video")[1].videoWidth > 0,
  );
  const players = page.locator("#lagops video");
  for (const info of await players.evaluateAll((videos) =>
    videos.map((v) => ({
      src: v.getAttribute("src"),
      width: v.videoWidth,
      ready: v.readyState,
    })),
  )) {
    if (!info.width && info.ready >= 1)
      codecNotes.add(`${info.src}: no decoded video track in headless Edge`);
  }
  await players.nth(1).evaluate(async (video) => {
    window.carouselPlayingVideo = video;
    await video.play();
  });
  await page.waitForFunction(
    () => window.carouselPlayingVideo.currentTime > 0.1,
  );
  await page.getByRole("button", { name: "Next video", exact: true }).click();
  assert(
    await players
      .nth(1)
      .evaluate(
        (video) => video === window.carouselPlayingVideo && !video.paused,
      ),
  );
  await players.nth(2).evaluate((video) => video.play());
  assert(await players.nth(1).evaluate((video) => video.paused));
  assert(await players.nth(2).evaluate((video) => !video.paused));
  await players.nth(2).focus();
  await page.keyboard.press("ArrowLeft");
  assert.equal(
    await activeNumber(page),
    "Video 3 of 6",
    "Player arrow keys stay with the player",
  );
  await page.locator(".work-video-carousel").scrollIntoViewIfNeeded();
  const box = await players.nth(2).boundingBox();
  const x = box.x + box.width / 2,
    y = box.y + box.height * 0.3;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x - 90, y, { steps: 8 });
  await page.mouse.up();
  assert.equal(
    await activeNumber(page),
    "Video 4 of 6",
    "Mouse drag advances one card",
  );
  await page
    .getByRole("button", { name: "Show Lagops Digital flyers" })
    .click();
  await page.waitForFunction(() => window.carouselPlayingVideo.paused);
  await page.close();

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await openVideos(mobile);
  await mobile.locator(".work-video-carousel").scrollIntoViewIfNeeded();
  const cdp = await mobile.context().newCDPSession(mobile);
  async function swipe(dx, dy = 0, cancel = false) {
    const box = await mobile
      .locator('.work-video-slide[data-active="true"] video')
      .boundingBox();
    const x = box.x + box.width / 2,
      y = box.y + box.height * 0.3;
    const touch = (x, y) => [{ x, y, id: 1 }];
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: touch(x, y),
    });
    for (let step = 1; step <= 8; step++)
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: touch(x + (dx * step) / 8, y + (dy * step) / 8),
      });
    await cdp.send("Input.dispatchTouchEvent", {
      type: cancel ? "touchCancel" : "touchEnd",
      touchPoints: [],
    });
  }
  await swipe(-90);
  assert.equal(
    await activeNumber(mobile),
    "Video 2 of 6",
    "Real touch swipe advances",
  );
  await mobile.waitForFunction(
    () => !document.querySelector(".work-video-stage.is-dragging"),
  );
  await mobile.locator(".work-video-carousel").focus();
  await mobile.keyboard.press("Home");
  await swipe(90);
  assert.equal(
    await activeNumber(mobile),
    "Video 1 of 6",
    "Swipe cannot pass the first card",
  );
  await swipe(-90, 0, true);
  assert.equal(
    await activeNumber(mobile),
    "Video 1 of 6",
    "Cancelled touch does not navigate",
  );
  assert.equal(await mobile.locator(".is-dragging").count(), 0);
  await swipe(0, -100);
  assert.equal(
    await activeNumber(mobile),
    "Video 1 of 6",
    "Vertical scrolling does not navigate",
  );
  await mobile.setViewportSize({ width: 844, height: 390 });
  await noOverflow(mobile);
  await mobile.close();
  console.log(
    "PASS: real unmuted playback, retained video identity and playback across navigation, single-player enforcement, stop on gallery switch, mouse drag, touch swipe/cancel, vertical gestures and landscape bounds.",
  );

  // Manifest substitution is a development-server check; the production
  // bundle is immutable and is exercised above with the real media.
  for (const count of process.argv.includes("--built") ? [] : [0, 1, 2, 26]) {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      const sources = Array.from(
        { length: count },
        (_, i) => `/work/lagops/video2.mp4?carousel-fixture=${i + 1}`,
      );
      let intercepted = false;
      await page.route("**/*portfolio-assets*", async (route) => {
        const response = await route.fetch();
        const body = (await response.text()).replace(
          /export const workVideos = \[[^\]]*\]/,
          `export const workVideos = ${JSON.stringify(sources)}`,
        );
        intercepted = true;
        await route.fulfill({ response, body });
      });
      await openVideos(page);
      assert(intercepted);
      assert.deepEqual(
        await page
          .locator("#lagops video")
          .evaluateAll((videos) => videos.map((v) => v.getAttribute("src"))),
        sources,
      );
      if (count) {
        await noOverflow(page);
        await page.locator(".work-video-carousel").focus();
        await page.keyboard.press("End");
        assert.equal(await activeNumber(page), `Video ${count} of ${count}`);
        await noOverflow(page);
        assert(
          await page
            .getByRole("button", { name: "Next video", exact: true })
            .isDisabled(),
        );
        if (count === 1)
          assert(
            await page
              .getByRole("button", { name: "Previous video", exact: true })
              .isDisabled(),
          );
      } else {
        assert.equal(await page.locator(".work-video-carousel").count(), 0);
        assert(await page.getByText("Videos coming soon.").isVisible());
      }
      await page.close();
    }
  }
  assert.deepEqual(errors, []);
  console.log(
    process.argv.includes("--built")
      ? "PASS: production carousel, future filename discovery, natural ordering and compatible-copy preference; no browser console errors. Development manifest substitution skipped for the immutable build."
      : "PASS: zero, one, two and 26 videos; future filename discovery, natural ordering and compatible-copy preference; no browser console errors.",
  );
  for (const note of codecNotes) console.log(`EXISTING MEDIA NOTE: ${note}`);
} finally {
  await browser.close();
}
