import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const baseUrl = (globalThis.process?.argv?.[2]) || "http://localhost:5173/";
const screenshotsDir = path.join("IONIC", "screenshots");

async function collectCommandNames(page) {
  const seen = new Set();
  let previousSize = -1;

  for (let step = 0; step < 40; step += 1) {
    const names = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll("[data-command-name]"),
      )
        .map((node) => node.getAttribute("data-command-name") || "")
        .filter(Boolean);
    });

    names.forEach((name) => seen.add(name));

    const canScrollMore = await page.evaluate(() => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;

      if (scrollY + innerHeight >= scrollHeight - 4) {
        return false;
      }

      window.scrollBy(0, innerHeight * 0.8);
      return true;
    });

    if (!canScrollMore || seen.size === previousSize) {
      break;
    }

    previousSize = seen.size;
    await page.waitForTimeout(300);
  }

  return Array.from(seen);
}

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const consoleMessages = [];

  page.on("console", (msg) => {
    const text = msg.text();
    const type = msg.type();
    consoleMessages.push({ type, text });
    if (type === "error" || text.includes("[tldrx]")) {
      // Surface relevant messages in the terminal
      // eslint-disable-next-line no-console
      console.log(`[browser-console][${type}] ${text}`);
    }
  });

  try {
    // Initial load
    await page.goto(baseUrl, { waitUntil: "networkidle" });

    const header = page.getByRole("heading", { name: "TL;DRx" });
    await header.waitFor();

    await page.waitForTimeout(500);

    fs.mkdirSync(screenshotsDir, { recursive: true });
    await page.screenshot({
      path: path.join(screenshotsDir, "tldrx-home.png"),
      fullPage: true,
    });

    const headerText = await page
      .getByTestId("header-command-count")
      .innerText();
    const headerCount = parseInt(headerText.replace(/\D/g, ""), 10) || 0;

    const resultsText = await page
      .getByTestId("results-count-text")
      .innerText();
    const resultsCount = parseInt(resultsText.replace(/\D/g, ""), 10) || 0;

    // eslint-disable-next-line no-console
    console.log(
      `[tldrx-e2e] Initial counts: header=${headerCount}, results=${resultsCount}`,
    );

    const allNames = await collectCommandNames(page);
    const visibleCount = allNames.length;

    // eslint-disable-next-line no-console
    console.log(
      `[tldrx-e2e] Unique command cards seen while scrolling: ${visibleCount}`,
    );

    if (headerCount !== resultsCount || headerCount !== visibleCount) {
      throw new Error(
        `Count mismatch: header=${headerCount}, results=${resultsCount}, visible=${visibleCount}`,
      );
    }

    // Search for a known command
    const targetName = allNames[0] || "ls";
    const searchInput = page.locator("#search-input");

    await searchInput.fill(targetName);
    await searchInput.press("Enter");
    await page.waitForTimeout(500);

    const afterSearchResultsText = await page
      .getByTestId("results-count-text")
      .innerText();
    const afterSearchCount = parseInt(
      afterSearchResultsText.replace(/\D/g, ""),
      10,
    );

    const namesAfterSearch = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll("[data-command-name]"),
      ).map((node) => node.getAttribute("data-command-name") || "");
    });

    await page.screenshot({
      path: path.join(screenshotsDir, "tldrx-search.png"),
      fullPage: true,
    });

    if (afterSearchCount < 1 || namesAfterSearch.length < 1) {
      throw new Error(
        `Expected at least one result for search '${targetName}', got ${afterSearchCount}`,
      );
    }

    // Negative search case
    await searchInput.fill("non-existent-command-xyz-123");
    await searchInput.press("Enter");
    await page.waitForTimeout(500);

    const zeroResultsText = await page
      .getByTestId("results-count-text")
      .innerText();
    const zeroCount = parseInt(zeroResultsText.replace(/\D/g, ""), 10) || 0;

    const namesAfterNegativeSearch = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll("[data-command-name]"),
      ).map((node) => node.getAttribute("data-command-name") || "");
    });

    await page.screenshot({
      path: path.join(screenshotsDir, "tldrx-search-negative.png"),
      fullPage: true,
    });

    if (zeroCount !== 0 || namesAfterNegativeSearch.length !== 0) {
      throw new Error(
        `Expected zero results for negative search, got count=${zeroCount}, cards=${namesAfterNegativeSearch.length}`,
      );
    }

    // eslint-disable-next-line no-console
    console.log("[tldrx-e2e] All checks passed");
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("[tldrx-e2e] Error:", err);
  if (globalThis.process) {
    globalThis.process.exitCode = 1;
  }
});
