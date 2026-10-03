import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import {
  blogs,
  workItems,
  skillGroups,
  academicItems,
  certificateItems,
  videos,
} from "../src/data/portfolio.js";
import { certificates, skills } from "../src/data/content.js";

const base = process.env.QA_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const routes = [
  "/",
  "/skills",
  "/timeline",
  "/work",
  "/videos",
  "/blogs",
  "/contact",
  "/education",
];
const sizes = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
  { name: "small-mobile", width: 320, height: 780 },
];
const interactionsOnly = process.argv.includes("--interactions-only");
const previous = interactionsOnly
  ? JSON.parse(await readFile("qa/results.json", "utf8"))
  : null;
if (previous)
  assert.equal(
    previous.base,
    base,
    "Use the same build URL for interaction reruns.",
  );
const findings = previous ? previous.findings.filter((item) => item.route) : [];
const failures = previous
  ? previous.failures.filter((item) => item.issue !== "assertion")
  : [];
await mkdir("qa/screenshots", { recursive: true });

async function settle(page) {
  await page.waitForFunction(() => document.querySelector("main h1"));
  await page.evaluate(async () => {
    for (
      let top = 0;
      top < document.body.scrollHeight;
      top += window.innerHeight * 0.8
    ) {
      window.scrollTo({ top, behavior: "instant" });
      await new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      );
    }
    await Promise.all(
      [...document.images].map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              image.addEventListener("load", resolve, { once: true });
              image.addEventListener("error", resolve, { once: true });
            }),
      ),
    );
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(500);
}

try {
  for (const size of interactionsOnly ? [] : sizes) {
    for (const theme of ["light", "dark"]) {
      const context = await browser.newContext({
        viewport: { width: size.width, height: size.height },
        colorScheme: theme,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      for (const route of routes) {
        await page.goto(base + route);
        await settle(page);
        const state = await page.evaluate(() => ({
          title: document.title,
          theme: document.documentElement.dataset.theme,
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          headings: document.querySelectorAll("main h1").length,
          broken: [...document.images]
            .filter((image) => !image.naturalWidth)
            .map((image) => image.src),
          emDashes: document.body.innerText.includes("\u2014"),
          text: document.querySelector("main").innerText,
        }));
        assert.equal(state.theme, theme);
        assert.equal(state.headings, 1);
        assert.equal(state.emDashes, false);
        assert.equal(state.broken.length, 0, state.broken.join(", "));
        if (state.scrollWidth > state.width + 1)
          failures.push({
            route,
            theme,
            size: size.name,
            issue: "horizontal overflow",
            ...state,
          });
        if (route === "/blogs")
          assert.equal(await page.locator(".blog-card").count(), blogs.length);
        if (route === "/work") {
          assert.equal(
            await page.locator(".work-collection").count(),
            workItems.length,
          );
          assert.equal(await page.locator(".gallery-tile").count(), 24);
        }
        if (route === "/skills") {
          assert.equal(
            await page.locator(".skill-row").count(),
            skillGroups.reduce((sum, group) => sum + group.skills.length, 0),
          );
          for (const skill of skills)
            assert(
              state.text.includes(skill.name.replace("React.js", "React")),
            );
        }
        if (route === "/timeline" || route === "/education") {
          assert.equal(
            await page.locator(".education-item").count(),
            academicItems.length,
          );
          assert.equal(
            await page.locator(".credential-card").count(),
            certificateItems.length,
          );
          assert.equal(
            await page.locator(".additional-credentials a").count(),
            certificates.length,
          );
          assert(!state.title.startsWith("Page not found"));
        }
        if (route === "/videos")
          assert.equal(
            await page.locator(".video-card").count(),
            videos.length,
          );
        if (size.name !== "small-mobile") {
          await page.screenshot({
            path:
              "qa/screenshots/" +
              (route.slice(1) || "home") +
              "-" +
              size.name +
              "-" +
              theme +
              ".png",
            fullPage: true,
          });
        }
        if (size.name === "desktop") {
          const result = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          const violations = result.violations.map((item) => ({
            id: item.id,
            impact: item.impact,
            description: item.description,
            nodes: item.nodes.map((node) => ({
              target: node.target,
              summary: node.failureSummary,
            })),
          }));
          if (violations.length)
            failures.push({
              route,
              theme,
              size: size.name,
              issue: "accessibility",
              violations,
            });
        }
        findings.push({
          route,
          theme,
          size: size.name,
          status: state.scrollWidth <= state.width + 1 ? "passed" : "overflow",
        });
        console.log(size.name + " " + theme + " " + route + " checked");
      }
      assert.deepEqual(errors, [], "Browser errors: " + errors.join("; "));
      await context.close();
    }
  }

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: "light",
  });
  const page = await context.newPage();
  await page.goto(base);
  const loadedAt = await page.evaluate(() => performance.timeOrigin);
  assert.equal(
    await page
      .locator(".profile-light")
      .evaluate((element) => getComputedStyle(element).opacity),
    "1",
  );
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await page.waitForTimeout(450);
  assert.equal(
    await page
      .locator(".profile-dark")
      .evaluate((element) => getComputedStyle(element).opacity),
    "1",
  );
  assert.equal(
    await page.evaluate(() => localStorage.getItem("portfolio-theme")),
    "dark",
  );
  assert.equal(await page.evaluate(() => performance.timeOrigin), loadedAt);
  await page.reload();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  await page.emulateMedia({ colorScheme: "light" });
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await page.reload();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");

  await page.getByRole("button", { name: "Open navigation" }).click();
  assert.equal(await page.locator("#mobile-navigation").isVisible(), true);
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("#mobile-navigation").count(), 0);
  assert.equal(
    await page
      .getByRole("button", { name: "Open navigation" })
      .evaluate((element) => element === document.activeElement),
    true,
  );
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /Skills/ })
    .click();
  assert.equal(new URL(page.url()).pathname, "/skills");
  assert.equal(await page.locator("#mobile-navigation").count(), 0);
  await page.waitForFunction(
    () => document.activeElement.id === "main-content",
  );
  assert.equal(
    await page.evaluate(() => document.activeElement.id),
    "main-content",
  );

  await page.goto(base + "/blogs");
  for (const category of ["Books", "Coding", "Marketing", "All"]) {
    await page.getByRole("button", { name: category, exact: true }).click();
    assert.equal(
      await page.locator(".blog-card").count(),
      category === "All"
        ? blogs.length
        : blogs.filter((blog) => blog.category === category).length,
    );
  }
  await page.goto(base + "/work");
  await page
    .getByRole("button", { name: "University Clubs", exact: true })
    .click();
  assert.equal(await page.locator(".work-collection").count(), 3);
  await page
    .getByRole("button", { name: "Industry Experience", exact: true })
    .click();
  assert.equal(await page.locator(".work-collection").count(), 1);
  const opener = page.locator(".gallery-tile").first();
  await opener.click();
  assert.equal(await page.getByRole("dialog").isVisible(), true);
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
  await page.waitForFunction(() =>
    document.activeElement.classList.contains("gallery-tile"),
  );
  assert.equal(
    await opener.evaluate((element) => element === document.activeElement),
    true,
  );
  await page.goto(base + "/work#zeroplastic");
  await page.waitForFunction(() => {
    const element = document.getElementById("zeroplastic");
    return element && Math.abs(element.getBoundingClientRect().top - 200) < 140;
  });
  assert(
    await page
      .locator("#zeroplastic")
      .evaluate(
        (element) => Math.abs(element.getBoundingClientRect().top - 200) < 140,
      ),
  );

  await page.goto(base + "/videos");
  await page.route("https://www.youtube.com/**", (route) =>
    route.fulfill({
      body: "<html><body>Test player</body></html>",
      contentType: "text/html",
    }),
  );
  await page.getByRole("button", { name: "Play " + videos[0].title }).click();
  assert.equal(
    await page.locator("iframe").getAttribute("src"),
    videos[0].url + "?autoplay=1",
  );

  await page.goto(base + "/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  assert.equal(
    await page
      .locator("input[name=name]")
      .evaluate((element) => element.validity.valueMissing),
    true,
  );
  await page.getByLabel("Your name").fill("Portfolio QA");
  await page.getByLabel("Email address").fill("invalid");
  assert.equal(
    await page
      .locator("input[name=email]")
      .evaluate((element) => element.validity.typeMismatch),
    true,
  );
  await page.getByLabel("Email address").fill("qa@example.com");
  await page.getByLabel("What’s it about?").fill("Local validation only");
  await page
    .getByLabel("Your message")
    .fill("This is a local automated check. No message is sent.");
  let submitted;
  await page.route("https://formsubmit.co/**", async (route) => {
    submitted = {
      method: route.request().method(),
      body: route.request().postData(),
    };
    await route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<p>Local form check complete</p>",
    });
  });
  await page.getByRole("button", { name: "Send message" }).click();
  await page.waitForURL("https://formsubmit.co/**");
  assert.equal(submitted.method, "POST");
  assert(submitted.body.includes("Local+validation+only"));
  await context.close();

  const systemContext = await browser.newContext({
    colorScheme: "light",
    reducedMotion: "reduce",
  });
  const systemPage = await systemContext.newPage();
  await systemPage.goto(base);
  await systemPage
    .getByRole("button", { name: "Switch to dark mode" })
    .waitFor();
  await systemPage.waitForTimeout(100);
  await systemPage.emulateMedia({ colorScheme: "dark" });
  await systemPage.waitForFunction(
    () => document.documentElement.dataset.theme === "dark",
  );
  assert.equal(
    await systemPage.locator("html").getAttribute("data-theme"),
    "dark",
  );
  await systemPage.emulateMedia({ colorScheme: "light" });
  await systemPage.waitForFunction(
    () => document.documentElement.dataset.theme === "light",
  );
  assert.equal(
    await systemPage.locator("html").getAttribute("data-theme"),
    "light",
  );
  assert.equal(
    await systemPage
      .locator(".discipline-track")
      .evaluate((element) => getComputedStyle(element).animationName),
    "none",
  );
  await systemPage.keyboard.press("Tab");
  assert.equal(
    await systemPage.evaluate(() => document.activeElement.className),
    "skip-link",
  );
  await systemPage.keyboard.press("Enter");
  assert.equal(
    await systemPage.evaluate(() => document.activeElement.id),
    "main-content",
  );
  await systemPage.goto(base + "/missing-page");
  assert.match(await systemPage.locator("h1").innerText(), /wandered off/);
  await systemContext.close();
  findings.push({
    status: "passed",
    checks: [
      "Portrait crossfade without reload",
      "Theme persistence in both modes",
      "First-visit system preference",
      "Live system preference without saved override",
      "Reduced motion",
      "Mobile menu and Escape focus",
      "Route focus",
      "Blog and work filters",
      "Full-size gallery and Escape focus",
      "Deep links",
      "Video iframe",
      "Contact validation and intercepted POST",
      "Skip link",
      "404",
    ],
  });
} catch (error) {
  failures.push({ issue: "assertion", message: error.stack });
} finally {
  await browser.close();
  await writeFile(
    "qa/results.json",
    JSON.stringify({ base, findings, failures }, null, 2),
  );
}
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
} else console.log("All browser QA checks passed.");
