import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const here = path.dirname(fileURLToPath(import.meta.url));
// Prefer build then start
console.log("\n=== build ===");
const build = spawnSync("npx", ["next", "build"], { cwd: path.join(here, "../.."), stdio: "inherit" });
if (build.status !== 0) process.exit(1);

let failed = false;
for (const name of ["pages"]) {
  console.log(`\n=== ${name} ===`);
  const r = spawnSync(process.execPath, [path.join(here, name + ".mjs")], { stdio: "inherit" });
  if (r.status !== 0) failed = true;
}
console.log(failed ? "\nSome checks failed." : "\nEverything passed.");
process.exit(failed ? 1 : 0);
