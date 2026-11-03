import { chromium } from "playwright";
import { startServer, pages, report, done } from "./lib.mjs";

const { base, close } = await startServer();
const browser = await chromium.launch();
const page = await browser.newPage();
const list = pages();
const seen = new Set();
for (const p of list) {
  await page.goto(base.replace(/\/$/, "") + p, { waitUntil: "domcontentloaded", timeout: 60000 });
  const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  for (const h of hrefs) {
    if (!h || h.startsWith("#") || h.startsWith("mailto:") || h.startsWith("http")) continue;
    if (h === "#") continue;
    seen.add(h.split("#")[0]);
  }
}
let bad = 0;
for (const h of [...seen].sort()) {
  if (!h.startsWith("/")) continue;
  const res = await page.goto(base.replace(/\/$/, "") + h, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => null);
  const ok = res && res.status() < 400;
  if (!ok) {
    bad++;
    report(`link ${h}`, false, res ? `status ${res.status()}` : "navigation failed");
  }
}
report(`internal links (${seen.size})`, bad === 0, bad ? `${bad} broken` : "ok");
await browser.close();
close();
done();
