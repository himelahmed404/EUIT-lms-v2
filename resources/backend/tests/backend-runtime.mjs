import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

export const backendRoot = fileURLToPath(new URL('../../../backend/', import.meta.url));
export const backendRequire = createRequire(new URL('../../../backend/package.json', import.meta.url));
