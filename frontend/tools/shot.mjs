import { chromium } from "playwright";

const url = process.argv[2];
const out = process.argv[3];
const h = Number(process.argv[4] || 0);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
await p.goto(url, { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
if (h) {
  await p.setViewportSize({ width: 1600, height: h });
  await p.waitForTimeout(600);
  await p.screenshot({ path: out });
} else {
  await p.screenshot({ path: out, fullPage: true });
}
await b.close();
