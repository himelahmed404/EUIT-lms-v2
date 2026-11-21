import 'dotenv/config';
import { getPrisma } from '../dist/src/lib/prisma.js';
import { readConfig } from '../dist/src/config/index.js';
import { schedule } from '../dist/src/modules/catalog/catalog.validation.js';

const db = getPrisma(readConfig().databaseUrl);

try {
  console.log('Seeding demo course with YouTube lessons...');

  // 1. Ensure a Lead Mentor profile exists (Nadia Rahman)
  let mentor = await db.profile.findFirst({
    where: { fullName: 'Nadia Rahman' },
  });

  if (!mentor) {
    mentor = await db.profile.create({
      data: {
        firebaseUid: 'mentor-nadia-demo-uid',
        fullName: 'Nadia Rahman',
        role: 'MENTOR',
        jobTitle: 'Senior Product Designer',
        bio: 'Passionate design educator with 8+ years leading design systems and digital products.',
        skills: ['UI/UX', 'Figma', 'Visual Design', 'Design Systems'],
        yearsOfExperience: 8,
        active: true,
        showOnWebsite: true,
      },
    });
    console.log(`Created mentor profile: ${mentor.fullName} (${mentor.id})`);
  } else {
    console.log(`Found existing mentor: ${mentor.fullName} (${mentor.id})`);
  }

  // 2. Upsert Course: "Graphic Design & UI/UX Fundamentals"
  const courseTitle = 'Graphic Design & UI/UX Fundamentals';
  const offerings = [
    { format: 'ONLINE', fee: 12000, installmentCounts: [1, 3] },
    { format: 'OFFLINE', fee: 18000, installmentCounts: [1, 2, 3] },
  ];

  let course = await db.course.findFirst({
    where: { title: courseTitle },
  });

  if (!course) {
    course = await db.course.create({
      data: {
        title: courseTitle,
        summary:
          'Master core design principles, layout hierarchy, and modern UI/UX workflows with hands-on video sessions and mentor guidance.',
        track: 'Design',
        status: 'PUBLISHED',
        offerings,
      },
    });
    console.log(`Created course: ${course.title} (${course.id})`);
  } else {
    course = await db.course.update({
      where: { id: course.id },
      data: { status: 'PUBLISHED', offerings },
    });
    console.log(`Updated course: ${course.title} (${course.id})`);
  }

  // 3. Upsert Batch: "GD-UIUX-Online-01"
  const batchName = 'GD-UIUX-Online-01';
  let batch = await db.batch.findFirst({
    where: { courseId: course.id, name: batchName },
  });

  const batchConfig = {
    courseId: course.id,
    name: batchName,
    format: 'ONLINE',
    status: 'OPEN',
    leadMentorId: mentor.id,
    onlineLocation: 'https://meet.google.com/eit-demo-session',
    startDate: '2027-02-01',
    repeatDays: [1, 3], // Mon, Wed
    startTime: '19:00',
    endTime: '21:00',
    timeZone: 'Asia/Dhaka',
    classCount: 12,
    seats: 25,
    fee: 12000,
    installmentCounts: [1, 3],
    admissionOpen: true,
    websiteVisible: true,
  };

  if (!batch) {
    const classSchedules = schedule(batchConfig);
    batch = await db.batch.create({
      data: {
        ...batchConfig,
        classes: {
          create: classSchedules,
        },
      },
    });
    console.log(`Created batch: ${batch.name} (${batch.id}) with ${classSchedules.length} scheduled classes`);
  } else {
    console.log(`Found existing batch: ${batch.name} (${batch.id})`);
  }

  // 4. Upsert Module 1: "Module 1 · Foundations & Visual Design"
  let module1 = await db.module.findFirst({
    where: { courseId: course.id, orderIndex: 1 },
  });

  if (!module1) {
    module1 = await db.module.create({
      data: {
        courseId: course.id,
        title: 'Module 1 · Foundations & Visual Design',
        orderIndex: 1,
      },
    });
    console.log(`Created module: ${module1.title} (${module1.id})`);
  } else {
    console.log(`Found existing module: ${module1.title} (${module1.id})`);
  }

  // 5. Upsert the 3 YouTube Lessons
  const demoLessons = [
    {
      title: 'Lesson 1 · Course Introduction & Setup',
      type: 'VIDEO',
      videoProvider: 'YOUTUBE',
      videoUrl: 'b-EP7QimkFo',
      durationSeconds: 960,
      content:
        'Welcome to the course! In this introductory lesson, we outline the roadmap, walk through software setup, establish project standards, and get everything prepared for hands-on sessions.',
      orderIndex: 1,
    },
    {
      title: 'Lesson 2 · Core Principles & Visual Hierarchy',
      type: 'VIDEO',
      videoProvider: 'YOUTUBE',
      videoUrl: 'U1v2xy_xUlY',
      durationSeconds: 840,
      content:
        'Master the fundamental rules of visual hierarchy. Learn how contrast, scale, white space, and alignment guide the user\'s attention and communicate information clearly.',
      orderIndex: 2,
    },
    {
      title: 'Lesson 3 · Hands-on Implementation & Practice',
      type: 'VIDEO',
      videoProvider: 'YOUTUBE',
      videoUrl: 'h_cSyDoAVHE',
      durationSeconds: 1080,
      content:
        'Putting everything together. In this session, we execute a realistic design and development brief from initial concept through to polished production deliverables.',
      orderIndex: 3,
    },
  ];

  for (const lessonData of demoLessons) {
    const existing = await db.lesson.findFirst({
      where: { moduleId: module1.id, orderIndex: lessonData.orderIndex },
    });

    if (!existing) {
      const created = await db.lesson.create({
        data: {
          moduleId: module1.id,
          ...lessonData,
        },
      });
      console.log(`Created lesson: ${created.title} (YouTube: ${created.videoUrl})`);
    } else {
      const updated = await db.lesson.update({
        where: { id: existing.id },
        data: lessonData,
      });
      console.log(`Updated lesson: ${updated.title} (YouTube: ${updated.videoUrl})`);
    }
  }

  console.log('Demo course seeding complete! Course ID:', course.id, 'Batch ID:', batch.id);
} catch (err) {
  console.error('Seeding error:', err);
  process.exitCode = 1;
} finally {
  await db.$disconnect();
}
