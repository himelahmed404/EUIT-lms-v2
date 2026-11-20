import assert from 'node:assert/strict';
// Concurrent requests exercise PostgreSQL serializable transactions, not mocks.
export async function checkCatalogConcurrency(db, env) {
  const request = async (path, method, body) => {
    const response = await fetch(env.baseUrl + '/api' + path, { method, headers: { authorization: `Bearer ${env.ownerToken}`, 'content-type': 'application/json' }, body: JSON.stringify(body) });
    return { status: response.status, body: await response.json() };
  };
  const course = await request('/admin/courses', 'POST', { title: 'Concurrency fixture', summary: 'Disposable concurrent write checks.', track: 'Tests', offerings: [{ format: 'ONLINE', fee: 9000, installmentCounts: [1,3] }] });
  assert.equal(course.status, 201); const courseId = course.body.data.id;
  const edits = await Promise.all(['First edit', 'Second edit'].map(title => request(`/admin/courses/${courseId}`, 'PATCH', { version: 1, title })));
  assert.deepEqual(edits.map(r=>r.status).sort(), [200,409], 'Exactly one stale-version competitor succeeds');
  assert.equal(await db.auditEvent.count({ where: { targetId: courseId, action: 'COURSE_UPDATED' } }), 1);
  const batch = { courseId, format: 'ONLINE', status: 'OPEN', leadMentorId: env.mentorId, onlineLocation: 'https://meeting.example.test/concurrency', startDate: '2027-06-07', repeatDays: [1,4], startTime: '18:00', endTime: '20:00', classCount: 4, seats: 20, fee: 9000, installmentCounts: [1,3], admissionOpen: true, websiteVisible: false };
  const reservations = await Promise.all(['Parallel A', 'Parallel B'].map(name => request('/admin/batches', 'POST', { ...batch, name })));
  assert.deepEqual(reservations.map(r=>r.status).sort(), [201,409], 'Concurrent schedules cannot double-book a mentor');
  assert.equal(await db.batch.count({ where: { courseId } }), 1);
  console.log('PASS: concurrent stale edits and mentor double-booking rejected, with exactly one successful mutation.');
}
