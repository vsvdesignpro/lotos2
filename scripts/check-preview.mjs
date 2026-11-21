import { chromium } from "@playwright/test";
import fs from "node:fs";

const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" });
fs.mkdirSync(".preview", { recursive: true });
for (const [name, width, height] of [["mobile", 390, 844], ["desktop", 1440, 900]]) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
  const failed = [];
  const errors = [];
  page.on("requestfailed", (request) => failed.push(request.url()));
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://localhost:3000/lotos2", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  await page.evaluate(async () => {
    for (let top = 0; top < document.documentElement.scrollHeight; top += Math.round(innerHeight * 0.8)) {
      scrollTo(0, top);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(1000);
  const result = await page.evaluate(() => ({
    title: document.title,
    forms: document.querySelectorAll("form").length,
    apiLinks: [...document.querySelectorAll("a[href], img[src]")].map((node) => node.getAttribute("href") ?? node.getAttribute("src")).filter((url) => url?.startsWith("/api") || url?.includes("#request")),
    brokenVisibleImages: [...document.images].filter((image) => image.getClientRects().length && (!image.complete || image.naturalWidth === 0)).map((image) => image.src),
    overflow: document.documentElement.scrollWidth > innerWidth + 2,
  }));
  await page.screenshot({ path: `.preview/${name}.png`, fullPage: true });
  await page.getByRole("button", { name: /Подробнее/ }).first().click();
  await page.locator("dialog[open]").waitFor({ state: "visible", timeout: 3000 }).catch(() => {});
  const dialogOpened = await page.locator("dialog[open]").count() === 1;
  await page.keyboard.press("Escape");
  const dialogClosed = await page.locator("dialog[open]").count() === 0;
  console.log(name, JSON.stringify({ ...result, dialogOpened, dialogClosed, failed, errors }));
  if (result.forms || result.apiLinks.length || result.brokenVisibleImages.length || result.overflow || !dialogOpened || !dialogClosed || failed.length || errors.length) process.exitCode = 1;
  await page.close();
}
await browser.close();
