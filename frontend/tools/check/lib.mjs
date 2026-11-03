import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import http from "http";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export function pages() {
  const routes = [];
  const app = path.join(ROOT, "src/app");
  function walk(dir, urlParts = []) {
    for (const f of fs.readdirSync(dir)) {
      if (f.startsWith("(") && f.endsWith(")")) {
        walk(path.join(dir, f), urlParts);
        continue;
      }
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) walk(p, [...urlParts, f]);
      else if (f === "page.tsx") {
        const url = "/" + urlParts.join("/");
        routes.push(url === "/" ? "/" : url.replace(/\/$/, "") || "/");
      }
    }
  }
  walk(app);
  return [...new Set(routes)].sort();
}

export async function startServer() {
  const port = 3456;
  const child = spawn("npx", ["next", "start", "-p", String(port)], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PORT: String(port) },
  });
  const base = `http://127.0.0.1:${port}`;
  await new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("next start timeout")), 60000);
    const onData = (buf) => {
      if (/Ready|started server/i.test(String(buf))) {
        clearTimeout(t);
        resolve();
      }
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    // also poll
    const iv = setInterval(() => {
      http.get(base, (res) => {
        clearInterval(iv);
        clearTimeout(t);
        resolve();
      }).on("error", () => {});
    }, 500);
  });
  return {
    base: base + "/",
    close: () => {
      child.kill("SIGTERM");
    },
  };
}

let failed = 0;
export function report(name, ok, detail = "") {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? " — " + detail : ""}`);
}
export function done() {
  console.log(failed ? `\n${failed} check(s) failed` : "\nall checks passed");
  process.exitCode = failed ? 1 : 0;
}
