// Opt-in integration check: local Firebase HTTP stand-in + designated development DB.
// Creates temporary profiles and removes them in finally. Run after npm run build.
import { backendRequire, backendRoot } from './backend-runtime.mjs';
backendRequire('dotenv').config({ path: new URL('../../../backend/.env', import.meta.url) });
process.chdir(backendRoot);
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
const accounts = new Map();
const created = [];
let mode = 'success';
let calls = 0;
let mailFailure = false;
let mailCalls = 0;
process.env.FIREBASE_WEB_API_KEY = 'local-test-key';
const mock = createServer(async (req, res) => {
  calls++;
  let raw = ''; for await (const chunk of req) raw += chunk;
  const body = JSON.parse(raw || '{}');
  res.setHeader('content-type', 'application/json');
  const path = req.url.split('?')[0];
  if (path.endsWith('/accounts:signInWithPassword')) {
    const account = [...accounts.values()].find(u => u.email === body.email && u.password === body.password);
    if (!account) { res.statusCode = 400; return res.end(JSON.stringify({error:{message:'INVALID_LOGIN_CREDENTIALS'}})); }
    return res.end(JSON.stringify({localId:account.localId,idToken:'test-token'}));
  }
  if (path.endsWith('/accounts:sendOobCode')) {
    mailCalls++;
    assert.equal(body.requestType, 'VERIFY_EMAIL');
    assert.equal(body.idToken, 'test-token');
    if(mailFailure) { res.statusCode=503; return res.end('{}'); }
    return res.end('{}');
  }
  if (path.endsWith('/accounts')) {
    if (mode !== 'success') {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: { message: mode } }));
    }
    accounts.set(body.localId, body);
    created.push(body.localId);
    return res.end(JSON.stringify({ localId: body.localId }));
  }
  if (req.url.endsWith('/accounts:lookup')) {
    return res.end(JSON.stringify({ users: body.localId.map(id => accounts.get(id)).filter(Boolean) }));
  }
  if (req.url.endsWith('/accounts:delete')) {
    accounts.delete(body.localId); return res.end('{}');
  }
  res.statusCode = 501; res.end('{}');
});
await new Promise(resolve => mock.listen(0, '127.0.0.1', resolve));
process.env.FIREBASE_AUTH_EMULATOR_HOST = `127.0.0.1:${mock.address().port}`;
const { app } = await import('../../../backend/dist/src/app.js');
const { getPrisma } = await import('../../../backend/dist/src/lib/prisma.js');
const db = getPrisma(process.env.DATABASE_URL);
const server = app.listen(0, '127.0.0.1');
await new Promise(resolve => server.once('listening', resolve));
const url = `http://127.0.0.1:${server.address().port}/api/auth/student/signup`;
const input = { fullName: ' Integration Student ', email: 'integration@example.com', password: 'temporary-test-password' };
const signup = async (body = input) => {
  const response = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  return { status: response.status, body: await response.json() };
};
const originalCreate = db.profile.create;
try {
  assert.equal((await signup({ ...input, role: 'ADMIN' })).status, 400);
  assert.equal(calls, 0);
  const accepted = await signup(); assert.equal(accepted.status, 202);
  const profile = await db.profile.findUniqueOrThrow({ where: { firebaseUid: created[0] } });
  assert.equal(profile.fullName, 'Integration Student'); assert.equal(profile.role, 'STUDENT');
  assert.equal(accounts.get(created[0]).emailVerified, false);
  assert.equal(mailCalls, 1);
  mode = 'EMAIL_EXISTS'; assert.deepEqual(await signup(), accepted);
  assert.equal(mailCalls, 2);
  assert.deepEqual(await signup({...input,password:'wrong-password'}), accepted);
  assert.equal(mailCalls, 2);
  mailFailure = true; assert.equal((await signup()).status,503);
  assert.ok(await db.profile.findUnique({where:{firebaseUid:created[0]}}));
  mailFailure = false; assert.deepEqual(await signup(), accepted);
  mode = 'QUOTA_EXCEEDED'; assert.equal((await signup()).status, 429);
  mode = 'CONFIGURATION_NOT_FOUND'; assert.equal((await signup()).status, 503);
  mode = 'success';
  db.profile.create = async () => { throw new Error('Injected database failure'); };
  assert.equal((await signup()).status, 503);
  assert.equal(accounts.has(created.at(-1)), false);
  console.log('PASS: HTTP validation, profile persistence, single role, duplicates, provider errors, database-failure compensation');
} finally {
  db.profile.create = originalCreate;
  await db.profile.deleteMany({ where: { firebaseUid: { in: created } } });
  await db.$disconnect();
  await Promise.all([new Promise(r => server.close(r)), new Promise(r => mock.close(r))]);
}
