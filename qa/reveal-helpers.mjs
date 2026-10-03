import assert from "node:assert/strict";

export async function checkVisibleReveals(page, message = "") {
  await page.waitForFunction(() =>
    [...document.querySelectorAll(".reveal")].every((element) => {
      const box = element.getBoundingClientRect();
      const intersection = Math.max(
        0,
        Math.min(box.bottom, innerHeight - 24) - Math.max(box.top, 0),
      );
      return (
        intersection < Math.min(box.height * 0.1, 80) ||
        element.classList.contains("is-visible")
      );
    }),
  );
  const hidden = await page.locator(".reveal").evaluateAll((elements) =>
    elements
      .filter((element) => {
        const box = element.getBoundingClientRect();
        return (
          box.top > 0 &&
          box.bottom < innerHeight - 24 &&
          !element.classList.contains("is-visible")
        );
      })
      .map((element) => element.className),
  );
  assert.deepEqual(hidden, [], message);
}

export async function checkReplay(page, locator) {
  await locator.scrollIntoViewIfNeeded();
  await locator.evaluate((element) => element.blur());
  try {
    await page.waitForFunction(
      (element) => element.classList.contains("is-visible"),
      await locator.elementHandle(),
      { timeout: 5000 },
    );
  } catch (error) {
    console.error(
      "Initial reveal failure",
      page.url(),
      await locator.evaluate((element) => ({
        className: element.className,
        box: element.getBoundingClientRect().toJSON(),
        viewport: innerHeight,
        scrollY,
        active: document.activeElement.className,
      })),
    );
    throw error;
  }
  const canExit = await page.evaluate(
    (element) => {
      const box = element.getBoundingClientRect();
      const targetTop = box.top + scrollY;
      const targetBottom = box.bottom + scrollY;
      const maxScroll = document.documentElement.scrollHeight - innerHeight;
      if (targetTop <= innerHeight + 96 && targetBottom - maxScroll >= -96)
        return false;
      scrollTo({
        top: targetTop > innerHeight + 96 ? 0 : maxScroll,
        behavior: "instant",
      });
      document.activeElement?.blur();
      return true;
    },
    await locator.elementHandle(),
  );
  // A tall element on a short page may never fully leave the viewport.
  if (!canExit) return false;
  await page.waitForFunction(
    (element) => !element.classList.contains("is-visible"),
    await locator.elementHandle(),
  );
  await locator.scrollIntoViewIfNeeded();
  try {
    await page.waitForFunction(
      (element) => element.classList.contains("is-visible"),
      await locator.elementHandle(),
      { timeout: 5000 },
    );
  } catch (error) {
    console.error(
      "Replay failure",
      page.url(),
      await locator.evaluate((element) => ({
        className: element.className,
        box: element.getBoundingClientRect().toJSON(),
        viewport: innerHeight,
        scrollY,
        active: document.activeElement.className,
      })),
    );
    throw error;
  }
  return true;
}
