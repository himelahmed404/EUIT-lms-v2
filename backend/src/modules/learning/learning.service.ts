import { getPrisma } from "../../lib/prisma.js";
import { readConfig } from "../../config/index.js";
import { ApiError } from "../../utils/ApiError.js";
import type {
  EnrolledCourseSummary,
  CourseOutlineResponse,
  LessonDetailResponse,
  UpdateProgressInput,
  RoutineItemResponse,
  ModuleOutlineItem,
  LessonOutlineItem,
} from "./learning.interface.js";

const db = () => getPrisma(readConfig().databaseUrl);

export async function getStudentCourses(
  studentProfileId: string
): Promise<EnrolledCourseSummary[]> {
  const prisma = db();

  const enrollments = await prisma.enrollment.findMany({
    where: {
      studentId: studentProfileId,
      status: "ACTIVE",
    },
    include: {
      course: {
        include: {
          modules: {
            orderBy: { orderIndex: "asc" },
            include: {
              lessons: {
                orderBy: { orderIndex: "asc" },
              },
            },
          },
        },
      },
      batch: {
        include: {
          classes: {
            where: { endsAt: { gte: new Date() } },
            orderBy: { startsAt: "asc" },
            take: 1,
          },
        },
      },
      lessonProgress: true,
    },
    orderBy: { enrolledAt: "desc" },
  });

  return enrollments.map((enr) => {
    const allLessons = enr.course.modules.flatMap((m) => m.lessons);
    const totalLessons = allLessons.length;

    const completedLessonIds = new Set(
      enr.lessonProgress.filter((p) => p.completed).map((p) => p.lessonId)
    );
    const completedLessons = completedLessonIds.size;

    // Find the first lesson that is not yet completed
    const resumeLesson =
      allLessons.find((l) => !completedLessonIds.has(l.id)) || allLessons[0];

    const nextClass = enr.batch.classes[0]
      ? {
          sequence: enr.batch.classes[0].sequence,
          startsAt: enr.batch.classes[0].startsAt,
          endsAt: enr.batch.classes[0].endsAt,
        }
      : null;

    const progress =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : enr.progress;

    return {
      enrollmentId: enr.id,
      courseId: enr.course.id,
      courseTitle: enr.course.title,
      track: enr.course.track,
      batchId: enr.batch.id,
      batchName: enr.batch.name,
      format: enr.batch.format,
      status: enr.status,
      progress,
      completedLessons,
      totalLessons,
      enrolledAt: enr.enrolledAt,
      resumeLessonId: resumeLesson?.id ?? null,
      nextClass,
    };
  });
}

export async function getCourseOutline(
  studentProfileId: string,
  enrollmentId: string
): Promise<CourseOutlineResponse> {
  const prisma = db();

  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      course: {
        include: {
          modules: {
            orderBy: { orderIndex: "asc" },
            include: {
              lessons: {
                orderBy: { orderIndex: "asc" },
              },
            },
          },
        },
      },
      batch: {
        include: {
          leadMentor: {
            select: { fullName: true, jobTitle: true },
          },
        },
      },
      lessonProgress: true,
    },
  });

  if (!enrollment) {
    throw new ApiError(404, "ENROLLMENT_NOT_FOUND", "Enrollment record not found.");
  }

  if (enrollment.studentId !== studentProfileId) {
    throw new ApiError(403, "FORBIDDEN", "You do not have access to this enrollment.");
  }

  const progressMap = new Map<string, { completed: boolean; watchedSeconds: number }>();
  for (const prog of enrollment.lessonProgress) {
    progressMap.set(prog.lessonId, {
      completed: prog.completed,
      watchedSeconds: prog.watchedSeconds,
    });
  }

  // Calculate sequential unlock
  let canAccessNext = true;
  let resumeLessonId: string | null = null;

  const modules: ModuleOutlineItem[] = enrollment.course.modules.map((mod) => {
    const lessons: LessonOutlineItem[] = mod.lessons.map((les) => {
      const prog = progressMap.get(les.id) || { completed: false, watchedSeconds: 0 };
      const isLocked = !canAccessNext;

      if (!prog.completed && !resumeLessonId && canAccessNext) {
        resumeLessonId = les.id;
      }

      // If this lesson is not completed, lock following lessons
      if (!prog.completed) {
        canAccessNext = false;
      }

      return {
        id: les.id,
        title: les.title,
        type: les.type,
        durationSeconds: les.durationSeconds,
        orderIndex: les.orderIndex,
        completed: prog.completed,
        watchedSeconds: prog.watchedSeconds,
        isLocked,
      };
    });

    return {
      id: mod.id,
      title: mod.title,
      orderIndex: mod.orderIndex,
      lessons,
    };
  });

  // Default resume lesson to first lesson if all completed or none assigned
  if (!resumeLessonId && enrollment.course.modules[0]?.lessons[0]) {
    resumeLessonId = enrollment.course.modules[0].lessons[0].id;
  }

  return {
    enrollmentId: enrollment.id,
    status: enrollment.status,
    progress: enrollment.progress,
    course: {
      id: enrollment.course.id,
      title: enrollment.course.title,
      summary: enrollment.course.summary,
      track: enrollment.course.track,
    },
    batch: {
      id: enrollment.batch.id,
      name: enrollment.batch.name,
      format: enrollment.batch.format,
      leadMentor: enrollment.batch.leadMentor,
    },
    modules,
    resumeLessonId,
  };
}

export async function getLessonDetail(
  studentProfileId: string,
  enrollmentId: string,
  lessonId: string
): Promise<LessonDetailResponse> {
  const prisma = db();

  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      course: {
        include: {
          modules: {
            orderBy: { orderIndex: "asc" },
            include: {
              lessons: {
                orderBy: { orderIndex: "asc" },
              },
            },
          },
        },
      },
    },
  });

  if (!enrollment) {
    throw new ApiError(404, "ENROLLMENT_NOT_FOUND", "Enrollment record not found.");
  }
  if (enrollment.studentId !== studentProfileId) {
    throw new ApiError(403, "FORBIDDEN", "You do not have access to this enrollment.");
  }

  // Flatten lessons in order
  const allLessons = enrollment.course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleTitle: m.title, moduleOrder: m.orderIndex }))
  );

  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  if (currentIndex === -1) {
    throw new ApiError(404, "LESSON_NOT_FOUND", "Lesson not found in this enrolled course.");
  }

  const current = allLessons[currentIndex];

  const progress = await prisma.lessonProgress.findUnique({
    where: {
      enrollmentId_lessonId: {
        enrollmentId,
        lessonId,
      },
    },
  });

  const previousLessonId = currentIndex > 0 ? allLessons[currentIndex - 1].id : null;
  const nextLessonId =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1].id : null;

  return {
    id: current.id,
    title: current.title,
    type: current.type,
    videoProvider: current.videoProvider,
    videoUrl: current.videoUrl,
    durationSeconds: current.durationSeconds,
    content: current.content,
    orderIndex: current.orderIndex,
    watchedSeconds: progress?.watchedSeconds ?? 0,
    completed: progress?.completed ?? false,
    completedAt: progress?.completedAt ?? null,
    module: {
      id: current.moduleId,
      title: current.moduleTitle,
      orderIndex: current.moduleOrder,
    },
    previousLessonId,
    nextLessonId,
  };
}

export async function updateLessonProgress(
  studentProfileId: string,
  enrollmentId: string,
  lessonId: string,
  input: UpdateProgressInput
): Promise<{ watchedSeconds: number; completed: boolean; enrollmentProgress: number }> {
  const prisma = db();

  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      course: {
        include: {
          modules: {
            include: {
              lessons: true,
            },
          },
        },
      },
    },
  });

  if (!enrollment) {
    throw new ApiError(404, "ENROLLMENT_NOT_FOUND", "Enrollment record not found.");
  }
  if (enrollment.studentId !== studentProfileId) {
    throw new ApiError(403, "FORBIDDEN", "You do not have access to this enrollment.");
  }

  const allLessons = enrollment.course.modules.flatMap((m) => m.lessons);
  const targetLesson = allLessons.find((l) => l.id === lessonId);
  if (!targetLesson) {
    throw new ApiError(404, "LESSON_NOT_FOUND", "Lesson not found in this course.");
  }

  const existingProgress = await prisma.lessonProgress.findUnique({
    where: {
      enrollmentId_lessonId: {
        enrollmentId,
        lessonId,
      },
    },
  });

  const watchedSeconds = Math.max(
    existingProgress?.watchedSeconds ?? 0,
    input.watchedSeconds ?? 0
  );
  const completed =
    input.completed === true || existingProgress?.completed === true;

  await prisma.lessonProgress.upsert({
    where: {
      enrollmentId_lessonId: {
        enrollmentId,
        lessonId,
      },
    },
    update: {
      watchedSeconds,
      completed,
      completedAt: completed
        ? existingProgress?.completedAt ?? new Date()
        : null,
    },
    create: {
      enrollmentId,
      lessonId,
      watchedSeconds,
      completed,
      completedAt: completed ? new Date() : null,
    },
  });

  // Recalculate total course progress
  const allProgress = await prisma.lessonProgress.findMany({
    where: { enrollmentId },
  });

  const completedCount = allProgress.filter((p) => p.completed).length;
  const totalLessons = allLessons.length;
  const enrollmentProgress =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: { progress: enrollmentProgress },
  });

  return {
    watchedSeconds,
    completed,
    enrollmentProgress,
  };
}

export async function getStudentRoutine(
  studentProfileId: string
): Promise<RoutineItemResponse[]> {
  const prisma = db();

  const enrollments = await prisma.enrollment.findMany({
    where: {
      studentId: studentProfileId,
      status: "ACTIVE",
    },
    select: { batchId: true },
  });

  const batchIds = enrollments.map((e) => e.batchId);
  if (batchIds.length === 0) {
    return [];
  }

  const classes = await prisma.batchClass.findMany({
    where: {
      batchId: { in: batchIds },
    },
    include: {
      batch: {
        include: {
          course: { select: { title: true } },
          room: { select: { name: true, location: true } },
          leadMentor: { select: { fullName: true } },
        },
      },
    },
    orderBy: { startsAt: "asc" },
  });

  return classes.map((cls) => {
    const location =
      cls.batch.format === "ONLINE"
        ? cls.batch.onlineLocation
        : cls.batch.room
        ? `${cls.batch.room.name} (${cls.batch.room.location})`
        : "Campus Lab";

    return {
      id: cls.id,
      sequence: cls.sequence,
      courseTitle: cls.batch.course.title,
      batchName: cls.batch.name,
      format: cls.batch.format,
      startsAt: cls.startsAt,
      endsAt: cls.endsAt,
      location,
      mentorName: cls.batch.leadMentor?.fullName ?? null,
    };
  });
}
