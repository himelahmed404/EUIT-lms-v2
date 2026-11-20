import test from 'node:test';
import assert from 'node:assert/strict';
import { assertBatchAccess, assertOwner, requirePermission, requireRole } from '../../../backend/dist/src/middleware/authorize.js';
import { initialRoles, permissionCatalog } from '../../../backend/dist/src/modules/access/permissions.js';
const context = { profile: { id: 'owner', role: 'MENTOR' }, permissions: ['teaching.write'], batchScope: { mode: 'ASSIGNED', batchIds: ['batch-a'] } };
test('resource scope defaults to denial outside explicitly assigned batches', () => {
  assert.doesNotThrow(() => assertBatchAccess(context, 'batch-a'));
  assert.throws(() => assertBatchAccess(context, 'batch-b'), { code: 'BATCH_FORBIDDEN' });
  assert.throws(() => assertBatchAccess({ ...context, batchScope: { mode: 'ASSIGNED', batchIds: [] } }, 'batch-a'), { code: 'BATCH_FORBIDDEN' });
  assert.doesNotThrow(() => assertBatchAccess({ ...context, batchScope: { mode: 'ALL', batchIds: [] } }, 'batch-b'));
});
test('ownership does not grant access to somebody else’s record', () => {
  assert.doesNotThrow(() => assertOwner(context, 'owner'));
  assert.throws(() => assertOwner(context, 'other'), { code: 'RESOURCE_FORBIDDEN' });
});
test('permission and role middleware fail closed without a profile', () => {
  for (const middleware of [requirePermission('teaching.write'), requireRole('MENTOR')]) {
    middleware({}, { locals: {} }, error => assert.equal(error.code, 'FORBIDDEN'));
    middleware({}, { locals: { profileContext: context } }, error => assert.equal(error, undefined));
  }
  requirePermission('payments.write')({}, { locals: { profileContext: context } }, error => assert.equal(error.code, 'FORBIDDEN'));
  requireRole('OWNER')({}, { locals: { profileContext: context } }, error => assert.equal(error.code, 'FORBIDDEN'));
});
test('only Owner starts with access administration; Student only has self permissions', () => {
  for (const role of initialRoles) {
    assert.equal(role.permissions.includes('access.write'), role.key === 'OWNER');
    for (const permission of role.permissions) assert.ok(permissionCatalog.includes(permission));
  }
  assert.ok(initialRoles.find(r => r.key === 'STUDENT').permissions.every(p => p.startsWith('profile.') || p.startsWith('preferences.')));
});

test('production cannot initialize Firebase with emulator verification', async () => {
  const { getFirebaseAuth } = await import('../../../backend/dist/src/lib/firebase.js');
  const previousNodeEnv = process.env.NODE_ENV;
  const previousHost = process.env.FIREBASE_AUTH_EMULATOR_HOST;
  try {
    process.env.NODE_ENV = 'production';
    process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
    assert.throws(() => getFirebaseAuth(), /must not be enabled in production/);
  } finally {
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = previousNodeEnv;
    if (previousHost === undefined) delete process.env.FIREBASE_AUTH_EMULATOR_HOST; else process.env.FIREBASE_AUTH_EMULATOR_HOST = previousHost;
  }
});
