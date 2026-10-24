import assert from "node:assert/strict";
import { readFile, writeFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";
import publicAssetsPlugin from "../src/data/publicAssetsPlugin.js";

const base = process.env.QA_URL || "http://127.0.0.1:4173";
const local = ["127.0.0.1", "localhost"].includes(new URL(base).hostname);
const script = local
  ? await readFile(
      process.env.QA_ANALYTICS_SCRIPT || ".tools/vercel-insights.js",
      "utf8",
    )
  : null;
const failures = [];
const findings = [];
const config = JSON.parse(await readFile("vercel.json", "utf8"));
const spaRewrite = config.rewrites.find(
  (rule) => rule.destination === "/index.html",
);
const spaRoute = new RegExp(`^${spaRewrite.source}$`);
assert.equal(config.rewrites[0].source, "/work");
assert.equal(config.rewrites[0].destination, "/work.html");
for (const route of ["/", "/work", "/videos", "/education", "/missing-page"])
  assert(spaRoute.test(route), `${route} must reach React Router`);
for (const asset of [
  "/_vercel/insights/script.js",
  "/_vercel/insights/view",
  "/_vercel/insights/event",
  "/_vercel/insights/session",
  "/profile2.webp",
  "/assets/index.js",
  "/work/lagops/video1.web.mp4",
  "/build-info.json",
])
  assert(!spaRoute.test(asset), `${asset} must bypass the SPA rewrite`);

// Check exact case segment by segment, including on Windows filesystems.
async function assertAsset(path) {
  let directory = resolve(local ? "dist" : "public");
  for (const part of path.slice(1).split("/")) {
    assert(
      (await readdir(directory)).includes(part),
      `Missing/case mismatch: ${path}`,
    );
    directory = resolve(directory, part);
  }
}
const plugin = publicAssetsPlugin();
plugin.configResolved({ publicDir: resolve("public") });
const manifest = await import(
  "data:text/javascript;base64," +
    Buffer.from(
      plugin.load(plugin.resolveId("virtual:portfolio-assets")),
    ).toString("base64")
);
assert.equal(manifest.workVideos.length, 6);
assert.equal(manifest.workVideos[0], "/work/lagops/video1.web.mp4");
assert.equal(Object.keys(manifest.workVideoPosters).length, 6);
for (const asset of [
  ...manifest.workImages,
  ...manifest.workVideos,
  ...Object.values(manifest.workVideoPosters),
  "/profile.png",
  "/profile2.png",
  "/profile.webp",
  "/profile2.webp",
])
  await assertAsset(asset);
findings.push(
  "Correctly cased portraits, original media, compatible copy and six posters; analytics excluded from rewrites",
);

const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  for (const width of [1440, 390]) {
    for (const theme of ["light", "dark"]) {
      const context = await browser.newContext({
        viewport: { width, height: width < 700 ? 844 : 1000 },
        colorScheme: theme,
        reducedMotion: "reduce",
      });
      if (local)
        await context.route("**/_vercel/insights/script.js", (route) =>
          route.fulfill({ contentType: "application/javascript", body: "" }),
        );
      const page = await context.newPage();
      page.on("pageerror", (error) => failures.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") failures.push(message.text());
      });
      await page.goto(base);
      await page
        .locator(`.profile-${theme}`)
        .evaluate((image) => image.decode());
      const portrait = await page
        .locator(`.profile-${theme}`)
        .evaluate((image) => ({
          width: image.naturalWidth,
          opacity: getComputedStyle(image).opacity,
          visibility: getComputedStyle(image).visibility,
          src: image.currentSrc,
        }));
      assert.equal(portrait.width, 1080);
      assert.equal(portrait.opacity, "1");
      assert.equal(portrait.visibility, "visible");
      assert(portrait.src.endsWith(".webp"));
      await page.locator(".hero-art").screenshot({
        path: `qa/screenshots/portrait-${width}-${theme}.png`,
      });
      await page.goto(`${base}/work`);
      await page
        .getByRole("button", { name: "Show Lagops Digital videos" })
        .click();
      const players = page.locator("#lagops video");
      assert.equal(await players.count(), 6);
      for (let index = 0; index < 6; index++) {
        const video = players.nth(index);
        await video.evaluate(async (player) => {
          await player.play();
        });
        await page.waitForFunction((index) => {
          const player = document.querySelectorAll("#lagops video")[index];
          return player.videoWidth > 0 && player.currentTime > 0.05;
        }, index);
        const state = await video.evaluate((player) => ({
          error: player.error?.message,
          duration: player.duration,
          width: player.videoWidth,
          controls: player.controls,
          inline: player.playsInline,
          muted: player.muted,
          poster: player.poster,
        }));
        assert.equal(state.error, undefined);
        assert(state.duration > 0 && state.width > 0);
        assert(state.controls && state.inline && !state.muted);
        const poster = await page.request.get(state.poster);
        assert(
          poster.ok() && poster.headers()["content-type"].startsWith("image/"),
        );
        await video.evaluate((player) => player.pause());
        if (index < 5)
          await page
            .getByRole("button", { name: "Next video", exact: true })
            .click();
      }
      await page.locator("#lagops").screenshot({
        path: `qa/screenshots/media-${width}-${theme}.png`,
      });
      assert(
        await page
          .getByRole("button", { name: "Next video", exact: true })
          .isDisabled(),
      );
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      findings.push(
        `${width}px ${theme}: portrait decoded; all six MP4s played with audio, metadata, controls and valid posters`,
      );
      await context.close();
    }
  }

  // Exercise the real Vercel script locally with a fake collector, so no local
  // visits enter production. Live verification uses the real script/endpoints.
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
    reducedMotion: "reduce",
  });
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
  });
  if (local) {
    await context.route("**/_vercel/insights/script.js", (route) =>
      route.fulfill({ contentType: "application/javascript", body: script }),
    );
    await context.route("**/_vercel/insights/view", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: "{}",
      }),
    );
  }
  const page = await context.newPage();
  const views = [];
  const trackingResponses = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("request", (request) => {
    if (
      request.method() === "POST" &&
      request.url().includes("/_vercel/insights/view")
    )
      views.push(new URL(request.postDataJSON().o).pathname);
  });
  page.on("response", (response) => {
    if (response.url().includes("/_vercel/insights/"))
      trackingResponses.push({
        url: response.url(),
        status: response.status(),
        type: response.headers()["content-type"],
      });
  });
  await page.goto(base);
  await page.waitForFunction(() => window.vai === true);
  await page.getByRole("link", { name: "View my work" }).click();
  await page.waitForURL("**/work");
  await page.goBack();
  await page.waitForURL(`${base}/`);
  await page.getByRole("link", { name: "A little about me" }).click();
  await page.waitForTimeout(500);
  assert.deepEqual(
    views,
    ["/", "/work", "/"],
    "One view per page/navigation, none for an anchor",
  );
  assert.equal(
    await page.locator('script[src*="/_vercel/insights/script.js"]').count(),
    1,
  );
  assert(trackingResponses.length >= 4);
  assert(
    trackingResponses.every(
      (response) => response.status >= 200 && response.status < 300,
    ),
  );
  assert(
    trackingResponses[0].type.includes("javascript"),
    "Vercel must serve JavaScript, not the SPA HTML",
  );
  findings.push({
    analytics:
      "One script; one initial view; client navigation and back tracked once; hash excluded",
    trackingResponses,
    mockedCollector: local,
  });
  await context.close();
  assert.deepEqual(failures, []);
} catch (error) {
  failures.push(error.stack);
  throw error;
} finally {
  await browser.close();
  await writeFile(
    "qa/production-verification.json",
    JSON.stringify({ base, findings, failures }, null, 2),
  );
}
console.log(JSON.stringify({ base, findings, failures }, null, 2));
