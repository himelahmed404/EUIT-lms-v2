import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { createServer } from "node:net";
import { createRequire } from "node:module";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../frontend");

export const frontendRequire = createRequire(path.join(ROOT, "package.json"));

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
  const listener = createServer();
  await new Promise((resolve, reject) => {
    listener.once("error", reject);
    listener.listen(0, "127.0.0.1", resolve);
  });
  const { port } = listener.address();
  await new Promise((resolve) => listener.close(resolve));
  const next = frontendRequire.resolve("next/dist/bin/next");
  const child = spawn(process.execPath, [next, "start", "--hostname", "127.0.0.1", "-p", String(port)], {
    cwd: ROOT, stdio: ["ignore", "pipe", "pipe"],
  });
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("Next.js startup timed out")), 30000);
      child.once("exit", (code) => { clearTimeout(timer); reject(new Error(`Next.js exited with status ${code}`)); });
      child.once("error", (error) => { clearTimeout(timer); reject(error); });
      child.stderr.pipe(process.stderr);
      child.stdout.on("data", (chunk) => {
        if (chunk.toString().includes("Ready in")) { clearTimeout(timer); resolve(); }
      });
    });
  } catch (error) {
    child.kill();
    throw error;
  }
  return { base: `http://127.0.0.1:${port}/`, close: () => child.kill() };
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
