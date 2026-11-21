import { getPrisma } from "../../lib/prisma.js";
import { readConfig } from "../../config/index.js";
import { ApiError } from "../../utils/ApiError.js";
import type {
  EnrollmentQuoteInput,
  DemoCheckoutInput,
  EnrollmentQuoteResponse,
  DemoCheckoutResponse,
} from "./enrollment.interface.js";

const db = () => getPrisma(readConfig().databaseUrl);

export async function getEnrollmentQuote(
  input: EnrollmentQuoteInput
): Promise<EnrollmentQuoteResponse> {
  const course = await db().course.findUnique({
    where: { id: input.courseId },
  });
  if (!course || course.status !== "PUBLISHED") {
    throw new ApiError(404, "COURSE_NOT_FOUND", "Course not found or not published.");
  }

  const batch = await db().batch.findUnique({
    where: { id: input.batchId },
  });
  if (!batch || batch.courseId !== course.id) {
    throw new ApiError(404, "BATCH_NOT_FOUND", "Batch not found for this course.");
  }

  if (batch.status !== "OPEN" || !batch.admissionOpen) {
    throw new ApiError(409, "ADMISSION_CLOSED", "Admissions are currently closed for this batch.");
  }

  const seatsRemaining = Math.max(0, batch.seats - batch.seatsTaken);
  if (seatsRemaining <= 0) {
    throw new ApiError(409, "BATCH_FULL", "This batch is currently full.");
  }

  return {
    courseId: course.id,
    courseTitle: course.title,
    batchId: batch.id,
    batchName: batch.name,
    format: batch.format,
    fee: batch.fee,
    seatsRemaining,
    schedule: {
      startDate: batch.startDate,
      repeatDays: batch.repeatDays,
      startTime: batch.startTime,
      endTime: batch.endTime,
      timeZone: batch.timeZone,
      classCount: batch.classCount,
    },
  };
}

export async function executeDemoCheckout(
  studentProfileId: string,
  input: DemoCheckoutInput
): Promise<DemoCheckoutResponse> {
  const prisma = db();

  // 1. Validate student profile exists and is active
  const student = await prisma.profile.findUnique({
    where: { id: studentProfileId },
  });
  if (!student || !student.active) {
    throw new ApiError(403, "STUDENT_INACTIVE", "Student profile is invalid or inactive.");
  }

  // 2. Validate course and batch
  const course = await prisma.course.findUnique({
    where: { id: input.courseId },
  });
  if (!course || course.status !== "PUBLISHED") {
    throw new ApiError(404, "COURSE_NOT_FOUND", "Course not found or not published.");
  }

  const batch = await prisma.batch.findUnique({
    where: { id: input.batchId },
  });
  if (!batch || batch.courseId !== course.id) {
    throw new ApiError(404, "BATCH_NOT_FOUND", "Batch not found for this course.");
  }

  if (batch.status !== "OPEN" || !batch.admissionOpen) {
    throw new ApiError(409, "ADMISSION_CLOSED", "Admissions are closed for this batch.");
  }

  // 3. Idempotent check: is the student already enrolled in this batch?
  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_batchId: {
        studentId: studentProfileId,
        batchId: batch.id,
      },
    },
    include: {
      course: { select: { id: true, title: true } },
      batch: { select: { id: true, name: true, format: true, startDate: true, startTime: true, endTime: true } },
    },
  });

  if (existingEnrollment) {
    return {
      enrollmentId: existingEnrollment.id,
      status: existingEnrollment.status,
      course: existingEnrollment.course,
      batch: existingEnrollment.batch,
      enrolledAt: existingEnrollment.enrolledAt,
      message: "Already enrolled in this batch.",
    };
  }

  // 4. Atomically reserve seat and create enrollment
  const result = await prisma.$transaction(async (tx) => {
    // Lock/re-verify seat availability
    const freshBatch = await tx.batch.findUnique({
      where: { id: batch.id },
    });
    if (!freshBatch || freshBatch.seatsTaken >= freshBatch.seats) {
      throw new ApiError(409, "BATCH_FULL", "This batch has reached maximum capacity.");
    }

    const enrollment = await tx.enrollment.create({
      data: {
        studentId: studentProfileId,
        courseId: course.id,
        batchId: batch.id,
        status: "ACTIVE",
        progress: 0,
      },
    });

    await tx.batch.update({
      where: { id: batch.id },
      data: {
        seatsTaken: { increment: 1 },
      },
    });

    // If student has ASSIGNED batch scope, add this batchId to their allowed list
    if (student.role === "STUDENT" && !student.batchIds.includes(batch.id)) {
      await tx.profile.update({
        where: { id: studentProfileId },
        data: {
          batchIds: { push: batch.id },
        },
      });
    }

    return enrollment;
  });

  return {
    enrollmentId: result.id,
    status: result.status,
    course: {
      id: course.id,
      title: course.title,
    },
    batch: {
      id: batch.id,
      name: batch.name,
      format: batch.format,
      startDate: batch.startDate,
      startTime: batch.startTime,
      endTime: batch.endTime,
    },
    enrolledAt: result.enrolledAt,
    message: "Demo checkout successful! You have been granted immediate course access.",
  };
}
