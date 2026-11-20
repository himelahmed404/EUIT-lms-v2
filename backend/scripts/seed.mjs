import 'dotenv/config';
import { getPrisma } from '../dist/src/lib/prisma.js';
import { readConfig } from '../dist/src/config/index.js';
import { initialRoles } from '../dist/src/modules/access/permissions.js';
const db = getPrisma(readConfig().databaseUrl);
try {
  for (const role of initialRoles) {
    await db.roleDefinition.upsert({ where: { key: role.key }, update: {},
      create: { ...role, permissions: [...role.permissions], system: true } });
  }
  console.log('Six built-in roles seeded; existing permission definitions preserved.');
} finally { await db.$disconnect(); }
