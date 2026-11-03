import { chromium } from "playwright";
import { startServer, pages, report, done } from "./lib.mjs";

const WIDTHS = [360, 768, 1280, 1440];
const { base, close } = await startServer();
const browser = await chromium.launch();
const page = await browser.newPage();
for (const p of pages()) {
  const issues = [];
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 900 });
    const errors = [];
    page.once("pageerror", (e) => errors.push(e.message));
    await page.goto(base.replace(/\/$/, "") + p, { waitUntil: "domcontentloaded", timeout: 60000 });
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (over > 2) issues.push(`${w}px overflow ${over}`);
    if (errors.length) issues.push(`${w}px ${errors.join("|")}`);
  }
  report(p, issues.length === 0, issues.join("; "));
}
await browser.close();
close();
done();
