// One-time trusted operator action. UID is an existing verified Firebase account.
import 'dotenv/config';
import { getPrisma } from '../dist/src/lib/prisma.js';
import { readConfig } from '../dist/src/config/index.js';
import { getFirebaseAuth } from '../dist/src/lib/firebase.js';
const uid = process.argv[2];
if (!uid) throw new Error('Usage: npm run bootstrap:owner -- <firebase-uid>');
const auth = getFirebaseAuth();
const user = await auth.getUser(uid);
if (!user.emailVerified || user.disabled) throw new Error('Owner must have a verified, enabled Firebase account.');
const db = getPrisma(readConfig().databaseUrl);
try {
  await db.$transaction(async tx => {
    // Single first-owner bootstrap even if two operators run simultaneously.
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(18372841)`;
    if (await tx.profile.count({ where: { role: 'OWNER' } })) throw new Error('An owner already exists. Bootstrap refused.');
    if (!await tx.roleDefinition.findUnique({ where: { key: 'OWNER' } })) throw new Error('Run npm run db:seed first.');
    const profile = await tx.profile.findUniqueOrThrow({ where: { firebaseUid: uid } });
    if (!profile.active) throw new Error('Enable the LMS profile before bootstrap.');
    await tx.profile.update({ where: { id: profile.id }, data: { role: 'OWNER', customRoleId: null, batchScope: 'ALL', batchIds: [] } });
    await tx.auditEvent.create({ data: { actorId: profile.id, targetId: profile.id, action: 'OWNER_BOOTSTRAPPED',
      before: { role: profile.role }, after: { role: 'OWNER' } } });
  });
  console.log('Initial owner assigned and audit event recorded.');
} finally { await db.$disconnect(); }
