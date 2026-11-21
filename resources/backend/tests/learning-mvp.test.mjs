import test from 'node:test';
import assert from 'node:assert/strict';
import { validateQuoteInput, validateCheckoutInput } from '../../../backend/dist/src/modules/enrollment/enrollment.validation.js';
import { validateUuid, validateProgressInput } from '../../../backend/dist/src/modules/learning/learning.validation.js';

test('validateQuoteInput accepts valid UUIDs and format', () => {
  const valid = {
    courseId: 'ce679390-563d-4c15-9448-4f10738ebf43',
    batchId: '1dd2c16c-5cea-4271-9b5d-67a39dbe6670',
    format: 'ONLINE',
  };
  const result = validateQuoteInput(valid);
  assert.equal(result.courseId, valid.courseId);
  assert.equal(result.batchId, valid.batchId);
  assert.equal(result.format, 'ONLINE');
});

test('validateQuoteInput rejects invalid bodies and malformed UUIDs', () => {
  assert.throws(() => validateQuoteInput(null), { code: 'INVALID_REQUEST' });
  assert.throws(() => validateQuoteInput({ courseId: 'not-a-uuid', batchId: '1dd2c16c-5cea-4271-9b5d-67a39dbe6670' }), { code: 'INVALID_COURSE_ID' });
  assert.throws(() => validateQuoteInput({ courseId: 'ce679390-563d-4c15-9448-4f10738ebf43', batchId: 'bad-batch' }), { code: 'INVALID_BATCH_ID' });
  assert.throws(() => validateQuoteInput({ courseId: 'ce679390-563d-4c15-9448-4f10738ebf43', batchId: '1dd2c16c-5cea-4271-9b5d-67a39dbe6670', format: 'HYBRID' }), { code: 'INVALID_FORMAT' });
});

test('validateProgressInput accepts valid watched seconds and completion flags', () => {
  const input = { watchedSeconds: 320.6, completed: true };
  const validated = validateProgressInput(input);
  assert.equal(validated.watchedSeconds, 320);
  assert.equal(validated.completed, true);
});

test('validateProgressInput rejects negative watched seconds or invalid types', () => {
  assert.throws(() => validateProgressInput({ watchedSeconds: -5 }), { code: 'INVALID_WATCHED_SECONDS' });
  assert.throws(() => validateProgressInput({ watchedSeconds: '300' }), { code: 'INVALID_WATCHED_SECONDS' });
  assert.throws(() => validateProgressInput({ completed: 'yes' }), { code: 'INVALID_COMPLETED' });
});

test('validateUuid enforces valid RFC4122 UUIDs', () => {
  assert.equal(
    validateUuid('3b453d00-b6a5-4f7e-b365-cc1eec9f9da4', 'moduleId'),
    '3b453d00-b6a5-4f7e-b365-cc1eec9f9da4'
  );
  assert.throws(() => validateUuid('12345', 'lessonId'), { code: 'INVALID_ID' });
});
