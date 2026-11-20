// Trusted operational import for existing campus rooms; no invented demo rooms.
import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { getPrisma } from '../dist/src/lib/prisma.js';
import { readConfig } from '../dist/src/config/index.js';
const file = process.argv[2];
if (!file) throw new Error('Usage: npm run catalog:import-rooms -- /path/to/rooms.json');
const rows = JSON.parse(await readFile(file, 'utf8'));
if (!Array.isArray(rows) || !rows.length || rows.length > 500) throw new Error('Provide 1–500 rooms.');
const names = new Set();
for (const room of rows) {
  if (!room || Array.isArray(room) || Object.keys(room).some(k => !['name', 'location', 'capacity', 'active'].includes(k)) ||
      typeof room.name !== 'string' || !room.name.trim() || room.name.trim().length > 120 || room.name.includes('\0') ||
      typeof room.location !== 'string' || !room.location.trim() || room.location.trim().length > 240 || room.location.includes('\0') ||
      !Number.isSafeInteger(room.capacity) || room.capacity < 1 || room.capacity > 10000 ||
      (room.active !== undefined && typeof room.active !== 'boolean')) throw new Error('Invalid room: name, location, capacity and optional active are supported.');
  room.name = room.name.trim(); room.location = room.location.trim();
  if (names.has(room.name)) throw new Error('Duplicate room names.'); names.add(room.name);
}
const db = getPrisma(readConfig().databaseUrl);
try {
  await db.$transaction(async tx => {
    for (const room of rows) {
      const old = await tx.room.findUnique({ where: { name: room.name } });
      if (old && await tx.batch.count({ where: { roomId: old.id, status: { not: 'CLOSED' }, ...(room.active === false ? {} : { seats: { gt: room.capacity } }) } })) throw new Error('A room change conflicts with a non-closed batch. Update that batch first.');
      await tx.room.upsert({ where: { name: room.name }, create: room, update: room });
    }
  }, { isolationLevel: 'Serializable' });
  console.log(`Imported ${rows.length} rooms. Existing IDs retained; no rooms deleted.`);
} finally { await db.$disconnect(); }
