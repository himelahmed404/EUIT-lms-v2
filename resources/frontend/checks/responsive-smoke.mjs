// Compatibility entry point: run the authenticated, isolated suite.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const backend = fileURLToPath(new URL('../../../backend/', import.meta.url));
const result = spawnSync('npm', ['run', 'test:browser'], { cwd: backend, stdio: 'inherit' });
process.exitCode = result.status ?? 1;
