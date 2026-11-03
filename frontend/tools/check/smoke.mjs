import { spawn } from "child_process";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { pages, report, done } from "./lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const port = 3460;

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function ready(base) {
  for (let i = 0; i < 40; i++) {
    try {
      await new Promise((resolve, reject) => {
        http.get(base, (res) => {
          res.resume();
          resolve();
        }).on("error", reject);
      });
      return;
    } catch {
      await wait(500);
    }
  }
  throw new Error("server not ready");
}

const child = spawn("npx", ["next", "start", "-p", String(port)], {
  cwd: ROOT,
  stdio: "ignore",
  env: { ...process.env },
});

try {
  const base = `http://127.0.0.1:${port}`;
  await ready(base);
  const list = pages().filter((p) => !p.includes("["));
  for (const p of list) {
    const url = base + (p === "/" ? "/" : p);
    const status = await new Promise((resolve) => {
      http.get(url, (res) => {
        res.resume();
        resolve(res.statusCode);
      }).on("error", () => resolve(0));
    });
    report(p, status >= 200 && status < 400, status < 400 ? "" : `status ${status}`);
  }
} finally {
  child.kill("SIGTERM");
}
done();
