// All fixture data is confined to a disposable local database and a demo Auth
// emulator. Never uses DATABASE_URL or Firebase credentials from backend/.env.
import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:net';
import { randomUUID } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { backendRequire, backendRoot } from './backend-runtime.mjs';
const express = backendRequire('express');

process.chdir(backendRoot);
const work = await mkdtemp(join(tmpdir(), 'euit-api-'));
const pgBin = process.env.PG_BIN ?? ['/usr/lib/postgresql/18/bin', '/usr/lib/postgresql/16/bin'].find(p => existsSync(join(p, 'initdb')));
if (!pgBin) throw new Error('Install local PostgreSQL or set PG_BIN to its bin directory.');
async function freePort() {
  const s = createServer(); await new Promise((resolve, reject) => { s.once('error', reject); s.listen(0, '127.0.0.1', resolve); });
  const port = s.address().port; await new Promise(r => s.close(r)); return port;
}
function run(command, args, options = {}) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', ...options });
    child.once('error', reject);
    child.once('exit', code => code === 0 ? resolveRun() : reject(new Error(`${command} exited ${code}`)));
  });
}
let emulator, db, server, postgresStarted = false;
try {
  const pgPort = await freePort(), authPort = await freePort();
  const databaseUrl = `postgresql://euit_test@127.0.0.1:${pgPort}/postgres`;
  Object.assign(process.env, {
    DATABASE_URL: databaseUrl, DIRECT_URL: databaseUrl, NODE_ENV: 'test',
    FIREBASE_AUTH_EMULATOR_HOST: `127.0.0.1:${authPort}`,
    GOOGLE_CLOUD_PROJECT: 'demo-euit-profiles', GCLOUD_PROJECT: 'demo-euit-profiles',
    GOOGLE_APPLICATION_CREDENTIALS: '', FIREBASE_WEB_API_KEY: 'emulator-key',
    CI: 'true', FIREBASE_CLI_DISABLE_MOTD: '1', XDG_CONFIG_HOME: join(work, 'config'),
  });
  execFileSync(join(pgBin, 'initdb'), ['-D', join(work, 'pg'), '-U', 'euit_test', '-A', 'trust', '--no-locale'], { stdio: 'ignore' });
  execFileSync(join(pgBin, 'pg_ctl'), ['-D', join(work, 'pg'), '-l', join(work, 'postgres.log'), '-o', `-h 127.0.0.1 -p ${pgPort} -k ${work}`, '-w', 'start'], { stdio: 'inherit' });
  postgresStarted = true;
  await run('npx', ['--no-install', 'prisma', 'migrate', 'deploy']);
  await run('node', ['scripts/seed.mjs']);
  // Idempotency matters: redeploying must not duplicate or reset role definitions.
  await run('node', ['scripts/seed.mjs']);
  const config = join(work, 'firebase.json');
  await writeFile(config, JSON.stringify({ emulators: { auth: { host: '127.0.0.1', port: authPort }, ui: { enabled: false }, hub: { port: await freePort() }, logging: { port: await freePort() }, singleProjectMode: true } }));
  let emulatorLog = '';
  emulator = spawn('firebase', ['emulators:start', '--only', 'auth', '--project', 'demo-euit-profiles', '--config', config], { cwd: work, stdio: ['ignore', 'pipe', 'pipe'] });
  emulator.stdout.on('data', chunk => { emulatorLog += chunk; });
  emulator.stderr.on('data', chunk => { emulatorLog += chunk; });
  emulator.on('error', error => { emulatorLog += error.message; });
  let ready = false;
  for (let i = 0; i < 120; i++) {
    if (emulator.exitCode !== null) break;
    try { const response = await fetch(`http://127.0.0.1:${authPort}/`, { signal: AbortSignal.timeout(500) }); if (response.ok) { ready = true; break; } } catch {}
    await delay(250);
  }
  if (!ready) throw new Error(`Firebase emulator failed to start:\n${emulatorLog.slice(-4000)}`);
  const { app } = await import('../../../backend/dist/src/app.js');
  const { getPrisma } = await import('../../../backend/dist/src/lib/prisma.js');
  const { getFirebaseAuth } = await import('../../../backend/dist/src/lib/firebase.js');
  const { requireVerifiedEmail } = await import('../../../backend/dist/src/middleware/requireVerifiedEmail.js');
  const { requireProfile } = await import('../../../backend/dist/src/middleware/requireProfile.js');
  const { requirePermission, assertBatchAccess } = await import('../../../backend/dist/src/middleware/authorize.js');
  const { errorHandler } = await import('../../../backend/dist/src/middleware/errorHandler.js');
  db = getPrisma(databaseUrl);
  const auth = getFirebaseAuth();
  const batchA = randomUUID(), batchB = randomUUID();
  const env = { batchA, batchB };
  const profiles = {};
  async function fixture(name, role = 'STUDENT', options = {}) {
    const uid = `test-${name}`;
    const email = `${name}@example.test`;
    const password = 'Emulator-test-only-123!';
    await auth.createUser({ uid, email, password, emailVerified: options.verified !== false });
    const signIn = await fetch(`http://127.0.0.1:${authPort}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=emulator-key`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    assert.equal(signIn.status, 200);
    env[`${name}Token`] = (await signIn.json()).idToken;
    if (options.profile !== false) {
      profiles[name] = await db.profile.create({ data: { firebaseUid: uid, fullName: `${name} fixture`, role, active: options.active !== false,
        batchIds: role === 'MENTOR' ? [batchA] : [], customRoleId: options.customRoleId } });
      env[`${name}Id`] = profiles[name].id;
    }
    return uid;
  }
  for (const [name, role] of [['student','STUDENT'],['other','STUDENT'],['owner','STUDENT'],['mentor','MENTOR'],['admin','ADMIN'],['accounts','ACCOUNTS'],['admissions','ADMISSIONS']]) await fixture(name, role);
  await run('node', ['scripts/bootstrap-owner.mjs', 'test-owner']);
  assert.equal((await db.profile.findUniqueOrThrow({ where: { id: profiles.owner.id } })).role, 'OWNER');
  assert.equal(await db.auditEvent.count({ where: { action: 'OWNER_BOOTSTRAPPED' } }), 1);
  assert.throws(() => execFileSync('node', ['scripts/bootstrap-owner.mjs', 'test-other'], { stdio: 'pipe' }),
    error => error.status === 1 && error.stderr.toString().includes('An owner already exists'));
  await fixture('unverified', 'STUDENT', { verified: false });
  await fixture('missing', 'STUDENT', { profile: false });
  await fixture('inactive', 'STUDENT', { active: false });
  const disabledUid = await fixture('disabled');
  await auth.updateUser(disabledUid, { disabled: true });
  const revokedUid = await fixture('revoked');
  await delay(1100);
  await auth.revokeRefreshTokens(revokedUid);
  // Emulator tokens are unsigned; altering exp exercises the SDK's expiry check.
  const tokenParts = env.studentToken.split('.');
  const claims = JSON.parse(Buffer.from(tokenParts[1], 'base64url'));
  claims.exp = Math.floor(Date.now() / 1000) - 3600;
  env.expiredToken = `${tokenParts[0]}.${Buffer.from(JSON.stringify(claims)).toString('base64url')}.`;
  const custom = await db.roleDefinition.create({ data: { key: 'CUSTOM_REVIEWER', name: 'Reviewer', permissions: ['profile.read', 'profile.write', 'courses.read', 'access.write', 'unknown.write'], defaultBatchScope: 'ASSIGNED' } });
  env.customRoleId = custom.id;
  await fixture('custom', 'CUSTOM', { customRoleId: custom.id });
  const schedulerRole = await db.roleDefinition.create({ data: { key: 'SCOPED_SCHEDULER', name: 'Scoped scheduler', permissions: ['profile.read', 'courses.read', 'batches.read', 'batches.write'], defaultBatchScope: 'ASSIGNED' } });
  await fixture('scheduler', 'CUSTOM', { customRoleId: schedulerRole.id });
  await db.profile.update({ where: { id: profiles.scheduler.id }, data: { batchIds: [batchB] } });
  for (const [name, owner, ready, mimeType] of [['photo', 'student', true, 'image/png'], ['otherPhoto', 'other', true, 'image/png'], ['pendingPhoto', 'student', false, 'image/png'], ['document', 'student', true, 'application/pdf']]) {
    const asset = await db.uploadedAsset.create({ data: { ownerId: profiles[owner].id, storageKey: `test/${name}`, url: `https://assets.example.test/${name}`, ready, mimeType } });
    env[`${name}Id`] = asset.id;
  }
  const { catalogFixtures } = await import('./catalog-fixtures.mjs');
  await catalogFixtures(db, profiles, env);
  const roomImport = join(work, 'room-import.json');
  await writeFile(roomImport, JSON.stringify([{ name: 'Test Lab', location: 'Test Campus', capacity: 30 }]));
  await run('node', ['scripts/import-rooms.mjs', roomImport]);
  await run('node', ['scripts/import-rooms.mjs', roomImport]);
  assert.equal((await db.room.findUniqueOrThrow({ where: { name: 'Test Lab' } })).id, env.roomId);
  await writeFile(roomImport, JSON.stringify([{ name: 'Test Lab', location: 'Test Campus', capacity: 10 }]));
  assert.throws(() => execFileSync('node', ['scripts/import-rooms.mjs', roomImport], { stdio: 'pipe' }), error => error.status === 1);
  assert.equal((await db.room.findUniqueOrThrow({ where: { name: 'Test Lab' } })).capacity, 30);
  console.log('PASS: room import preserves IDs, is idempotent and rejects unsafe capacity reduction.');
  // Test-only resource router demonstrates real authentication + database role
  // resolution + permissions + scope. No fixture routes are shipped in src/.
  const testApp = express();
  const resources = new Map([['lesson-a', batchA], ['lesson-b', batchB]]);
  testApp.get('/__tests/lessons/:id', requireVerifiedEmail, requireProfile, requirePermission('teaching.write'), (req, res, next) => {
    try { assertBatchAccess(res.locals.profileContext, resources.get(req.params.id)); res.json({ success: true }); } catch (error) { next(error); }
  });
  testApp.use(app);
  testApp.use(errorHandler);
  server = testApp.listen(0, '127.0.0.1');
  await new Promise((resolve, reject) => { server.once('listening', resolve); server.once('error', reject); });
  env.baseUrl = `http://127.0.0.1:${server.address().port}`;
  const environmentPath = join(work, 'postman.environment.json');
  await writeFile(environmentPath, JSON.stringify({ name: 'Disposable emulator fixtures', values: Object.entries(env).map(([key, value]) => ({ key, value, enabled: true, type: key.endsWith('Token') ? 'secret' : 'default' })) }), { mode: 0o600 });
  await run('postman', ['collection', 'run', '../resources/backend/postman/collections/profiles-permissions.regression.postman_collection.json', '-e', environmentPath, '--no-report-events', '--timeout-request', '10000', '--timeout', '120000']);
  assert.equal(await db.roleDefinition.count({ where: { system: true } }), 6);
  assert.equal((await db.profile.findUniqueOrThrow({ where: { id: profiles.other.id } })).fullName, 'other fixture');
  const events = await db.auditEvent.findMany({ where: { targetId: profiles.other.id }, orderBy: { createdAt: 'asc' } });
  assert.equal(events.length, 5, 'Every successful access mutation has one audit event; rejected changes have none');
  assert.ok(events.every(e => e.actorId === profiles.owner.id && e.action === 'PROFILE_ACCESS_UPDATED'));
  assert.equal(events[0].before.role, 'STUDENT');
  assert.equal(events[0].after.role, 'MENTOR');
  assert.equal(events.at(-1).after.role, 'STUDENT');
  console.log('PASS: Postman HTTP suite, role seed idempotency, cross-user isolation, and transactional audit persistence.');
  await run('postman', ['collection', 'run', '../resources/backend/postman/collections/course-catalog.regression.postman_collection.json', '-e', environmentPath, '--no-report-events', '--timeout-request', '10000', '--timeout', '120000']);
  const { checkCatalogConcurrency } = await import('./catalog-concurrency.mjs');
  await checkCatalogConcurrency(db, env);
  const catalogEvents = await db.auditEvent.findMany({ where: { action: { in: ['COURSE_CREATED', 'COURSE_UPDATED', 'BATCH_CREATED', 'BATCH_UPDATED'] } } });
  assert.ok(catalogEvents.length >= 5, 'Successful catalog mutations persist audit records');
  if (process.env.CLOUDINARY_TEST_BASE_URL) {
    const { checkProfilePhotos } = await import('./profile-photo.integration.mjs');
    await checkProfilePhotos(db,env);
  }
  if (process.env.EUIT_BROWSER_TEST === '1') {
    await run('node', ['../resources/frontend/checks/account-integration.mjs'], { env: {
      ...process.env, EUIT_API_BASE_URL: env.baseUrl, EUIT_OTHER_PROFILE_ID: profiles.other.id,
      EUIT_CATALOG_COURSE_ID: env.publishedCourseId, EUIT_CATALOG_BATCH_ID: env.publicBatchId, EUIT_FULL_BATCH_ID: env.fullBatchId,
      NEXT_PUBLIC_FIREBASE_API_KEY: 'emulator-key', NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'demo-euit-profiles',
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'demo-euit-profiles.firebaseapp.com',
      NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_URL: `http://127.0.0.1:${authPort}`,
    } });
  }
  // Keep the existing signup compensation regression check isolated too.
  await run('node', ['../resources/backend/tests/student-signup.integration.mjs']);
} finally {
  if (server) await new Promise(r => server.close(r));
  if (db) await db.$disconnect();
  if (emulator && emulator.exitCode === null) {
    emulator.kill('SIGINT');
    await Promise.race([new Promise(r => emulator.once('exit', r)), delay(5000)]);
    if (emulator.exitCode === null) emulator.kill('SIGKILL');
  }
  if (postgresStarted) execFileSync(join(pgBin, 'pg_ctl'), ['-D', join(work, 'pg'), '-m', 'immediate', '-w', 'stop'], { stdio: 'inherit' });
  await rm(work, { recursive: true, force: true });
}
