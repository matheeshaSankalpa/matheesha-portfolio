import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { join, resolve, sep } from "node:path";
import { chromium } from "@playwright/test";
import publicAssetsPlugin from "../src/data/publicAssetsPlugin.js";

const base = process.env.QA_URL || "http://127.0.0.1:5173";
const fixture = await mkdtemp(resolve("qa/.work-media-fixture-"));
assert(fixture.startsWith(resolve("qa") + sep));
try {
  await mkdir(join(fixture, "work/lagops"), { recursive: true });
  await mkdir(join(fixture, "work/leo"), { recursive: true });
  for (const filename of [
    "video10.mp4",
    "video2.mp4",
    "video1.mp4",
    "flyer1.png",
  ])
    await writeFile(join(fixture, "work/lagops", filename), "fixture");
  await writeFile(join(fixture, "work/leo/video1.mp4"), "club video");
  const plugin = publicAssetsPlugin();
  plugin.configResolved({ publicDir: fixture });
  const id = plugin.resolveId("virtual:portfolio-assets");
  const readManifest = () =>
    import(
      "data:text/javascript;base64," +
        Buffer.from(plugin.load(id)).toString("base64")
    );
  const initial = await readManifest();
  assert.deepEqual(initial.workImages, ["/work/lagops/flyer1.png"]);
  assert.deepEqual(initial.workVideos, [
    "/work/lagops/video1.mp4",
    "/work/lagops/video2.mp4",
    "/work/lagops/video10.mp4",
  ]);
  await writeFile(join(fixture, "work/lagops/video3.mp4"), "added later");
  assert.deepEqual((await readManifest()).workVideos, [
    "/work/lagops/video1.mp4",
    "/work/lagops/video2.mp4",
    "/work/lagops/video3.mp4",
    "/work/lagops/video10.mp4",
  ]);
  await writeFile(
    join(fixture, "work/lagops/video2.web.mp4"),
    "compatible copy",
  );
  assert.deepEqual((await readManifest()).workVideos, [
    "/work/lagops/video1.mp4",
    "/work/lagops/video2.web.mp4",
    "/work/lagops/video3.mp4",
    "/work/lagops/video10.mp4",
  ]);
} finally {
  await rm(fixture, { recursive: true, force: true });
}

const browser = await chromium.launch({ channel: "msedge", headless: true });
const errors = [];
await mkdir("qa/screenshots", { recursive: true });
try {
  for (const width of [1440, 834, 700, 390, 320]) {
    for (const colorScheme of ["light", "dark"]) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        colorScheme,
        reducedMotion: "reduce",
      });
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(`${base}/work`);
      const lagops = page.locator("#lagops");
      const flyers = await lagops.locator(".gallery-tile").count();
      assert(flyers > 0);
      assert.equal(await page.locator(".work-media-toggle").count(), 1);
      assert.equal(await page.locator("video").count(), 0);
      const flyerHeight = (
        await lagops.locator(".gallery-tile").first().boundingBox()
      ).height;
      await lagops
        .getByRole("button", { name: "Show Lagops Digital videos" })
        .click();
      assert.equal(await lagops.locator(".gallery-tile").count(), 0);
      assert.equal(await page.locator("video").count(), 1);
      const player = lagops.locator("video");
      await page.waitForFunction(
        () => document.querySelector("#lagops video")?.readyState >= 1,
      );
      assert(
        await player.evaluate(
          (video) =>
            video.controls &&
            !video.muted &&
            video.volume > 0 &&
            video.videoWidth > 0,
        ),
      );
      assert((await player.boundingBox()).height > flyerHeight);
      const dimensions = await player.evaluate((video) => {
        const player = video.getBoundingClientRect();
        const frame = video.parentElement.getBoundingClientRect();
        return {
          renderedAspect: player.width / player.height,
          naturalAspect: video.videoWidth / video.videoHeight,
          framePadding: frame.width - player.width,
        };
      });
      assert(
        Math.abs(dimensions.renderedAspect - dimensions.naturalAspect) < 0.005,
        "The player must match the video's aspect ratio without black side bars",
      );
      assert(
        Math.abs(dimensions.framePadding - 22) < 1,
        "The card must wrap the player without unused horizontal space",
      );
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      assert.equal(
        await page
          .locator(
            ".work-collection:not(#lagops) video, .work-collection:not(#lagops) .work-media-toggle",
          )
          .count(),
        0,
      );
      if (width === 1440 && colorScheme === "light") {
        await player.evaluate(async (video) => {
          window.qaVideo = video;
          await video.play();
        });
        await page.waitForFunction(
          () => window.qaVideo.currentTime > 0 && !window.qaVideo.paused,
        );
      }
      if (width === 1440 || width === 390) {
        await lagops.screenshot({
          path: `qa/screenshots/work-media-${width}-${colorScheme}.png`,
        });
      }
      await lagops
        .getByRole("button", { name: "Show Lagops Digital flyers" })
        .click();
      assert.equal(await page.locator("video").count(), 0);
      assert.equal(await lagops.locator(".gallery-tile").count(), flyers);
      if (width === 1440 && colorScheme === "light") {
        await page.waitForFunction(() => window.qaVideo.paused);
      }
      await page
        .getByRole("button", { name: "University Clubs", exact: true })
        .click();
      assert.equal(await page.locator(".work-media-toggle, video").count(), 0);
      await page.close();
    }
  }

  // Supply a future three-video manifest without changing the user's media.
  for (const width of [1440, 390]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      reducedMotion: "reduce",
    });
    page.on("pageerror", (error) => errors.push(error.message));
    let intercepted = false;
    await page.route("**/*portfolio-assets*", async (route) => {
      const response = await route.fetch();
      const body = (await response.text()).replace(
        /export const workVideos = \[[^\]]*\]/,
        `export const workVideos = ${JSON.stringify([1, 2, 3].map((number) => `/work/lagops/video1.web.mp4?qa=${number}`))}`,
      );
      intercepted = true;
      await route.fulfill({ response, body });
    });
    await page.goto(`${base}/work`);
    await page
      .getByRole("button", { name: "Show Lagops Digital videos" })
      .click();
    assert(intercepted);
    assert.equal(await page.locator("#lagops video").count(), 3);
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    const players = page.locator("#lagops video");
    const first = await players.nth(0).boundingBox();
    const second = await players.nth(1).boundingBox();
    assert(width === 1440 ? first.y === second.y : second.y > first.y);
    await players.nth(0).evaluate((video) => video.play());
    await players.nth(1).evaluate((video) => video.play());
    assert(await players.nth(0).evaluate((video) => video.paused));
    assert(await players.nth(1).evaluate((video) => !video.paused));
    await page.close();
  }
  assert.deepEqual(errors, []);
  console.log(
    "PASS: MP4 discovery and numeric ordering; Lagops-only toggle; exclusive galleries; real unmuted playback and stop on switch; responsive layouts in both themes; future three-video layout and single-video playback.",
  );
} finally {
  await browser.close();
}
