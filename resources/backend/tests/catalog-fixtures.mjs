// Only used by the disposable database harness, never the configured database.
import { schedule } from '../../../backend/dist/src/modules/catalog/catalog.validation.js';
export async function catalogFixtures(db, profiles, env) {
  const offerings = [{ format: 'ONLINE', fee: 12001, installmentCounts: [1, 3] }, { format: 'OFFLINE', fee: 18000, installmentCounts: [1, 2, 3] }];
  const course = await db.course.create({ data: { title: 'Published Web Design', summary: 'A published catalog fixture for automated validation.', track: 'Development', status: 'PUBLISHED', offerings } });
  const draft = await db.course.create({ data: { title: 'Unpublished Secret Draft', summary: 'This is never public.', track: 'Design', offerings } });
  const room = await db.room.create({ data: { name: 'Test Lab', location: 'Test Campus', capacity: 30 } });
  const inactiveRoom = await db.room.create({ data: { name: 'Inactive Lab', location: 'Test Campus', capacity: 40, active: false } });
  const base = { courseId: course.id, name: 'Public online batch', format: 'ONLINE', status: 'OPEN', leadMentorId: profiles.mentor.id,
    onlineLocation: 'https://meeting.example.test/private-token', startDate: '2027-01-04', repeatDays: [1,4], startTime: '18:00', endTime: '20:00', classCount: 6,
    seats: 20, seatsTaken: 3, fee: 12001, installmentCounts: [1,3], admissionOpen: true, websiteVisible: true };
  const make = (data) => db.batch.create({ data: { ...data, classes: { create: schedule(data) } } });
  const batch = await make({ ...base, id: env.batchA });
  await make({ ...base, id: env.batchB, name: 'Hidden batch', websiteVisible: false, startTime: '09:00', endTime: '11:00' });
  const full = await make({ ...base, name: 'Full offline batch', format: 'OFFLINE', onlineLocation: null, roomId: room.id, startTime: '11:00', endTime: '13:00', seatsTaken: 20, fee: 18000, installmentCounts: [1,2,3] });
  await make({ ...base, name: 'Draft batch', status: 'DRAFT', admissionOpen: false, startTime: '13:00', endTime: '14:00' });
  await make({ ...base, courseId: draft.id, name: 'Open batch on draft', startTime: '14:00', endTime: '15:00' });
  await make({ ...base, name: 'Closed batch', status: 'CLOSED', admissionOpen: false, startTime: '15:00', endTime: '16:00' });
  await make({ ...base, name: 'Admission disabled', admissionOpen: false, startTime: '16:00', endTime: '17:00' });
  Object.assign(env, { publishedCourseId: course.id, draftCourseId: draft.id, publicBatchId: batch.id, fullBatchId: full.id, roomId: room.id, inactiveRoomId: inactiveRoom.id });
}
