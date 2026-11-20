import type { Prisma } from "../../../generated/prisma/client.js";
import type { ProfileContext } from "../../middleware/requireProfile.js";
import { assertBatchAccess } from "../../middleware/authorize.js";
import { ApiError } from "../../utils/ApiError.js";
import { getPrisma } from "../../lib/prisma.js";
import { readConfig } from "../../config/index.js";
import { invalid } from "../me/me.validation.js";
import {
  parseCourse,
  parseBatch,
  plans,
  schedule,
  type Offering,
  type BatchInput,
} from "./catalog.validation.js";
import {
  includeBatch,
  type LoadedBatch,
  type PublicBatchData,
  type CatalogPageQuery,
} from "./catalog.interface.js";

const db = () => getPrisma(readConfig().databaseUrl);

export const missing = () => {
  throw new ApiError(404, "NOT_FOUND", "Course or batch not found.");
};

export const conflict = (message: string) => {
  throw new ApiError(409, "CATALOG_CONFLICT", message);
};

export function allScope(context: ProfileContext) {
  if (context.batchScope.mode !== "ALL") {
    throw new ApiError(
      403,
      "BATCH_FORBIDDEN",
      "Global catalog management requires all-batch scope."
    );
  }
}

export function pricing(context: ProfileContext) {
  if (!context.permissions.includes("pricing.write")) {
    throw new ApiError(
      403,
      "FORBIDDEN",
      "Pricing write permission is required."
    );
  }
}

export function choicesPermission(context: ProfileContext, mentor = false) {
  if (
    !context.permissions.includes("batches.write") &&
    !(mentor && context.permissions.includes("mentors.read"))
  ) {
    throw new ApiError(
      403,
      "FORBIDDEN",
      "Scheduling or directory permission is required."
    );
  }
  return context;
}

export const scope = (context: ProfileContext): Prisma.BatchWhereInput =>
  context.batchScope.mode === "ALL"
    ? {}
    : { id: { in: context.batchScope.batchIds } };

export const courseScope = (context: ProfileContext): Prisma.CourseWhereInput =>
  context.batchScope.mode === "ALL"
    ? {}
    : { batches: { some: scope(context) } };

export const publicBatch = {
  status: "OPEN",
  admissionOpen: true,
  websiteVisible: true,
} as const;

export function publicBatchData(b: LoadedBatch): PublicBatchData {
  return {
    id: b.id,
    name: b.name,
    courseId: b.courseId,
    format: b.format,
    startDate: b.startDate,
    repeatDays: b.repeatDays,
    startTime: b.startTime,
    endTime: b.endTime,
    timeZone: b.timeZone,
    classCount: b.classCount,
    seats: b.seats,
    seatsAvailable: Math.max(0, b.seats - b.seatsTaken),
    fee: b.fee,
    currency: "BDT",
    plans: plans(b.fee, b.installmentCounts),
    location: b.room ? `${b.room.name} · ${b.room.location}` : "Live online",
    mentor: b.leadMentor.showOnWebsite
      ? { id: b.leadMentor.id, name: b.leadMentor.fullName }
      : null,
    classes: b.classes.map((c) => ({
      id: c.id,
      sequence: c.sequence,
      startsAt: c.startsAt,
      endsAt: c.endsAt,
    })),
  };
}

async function audit(
  tx: Prisma.TransactionClient,
  actorId: string,
  targetId: string,
  action: string,
  before: unknown,
  after: unknown
) {
  await tx.auditEvent.create({
    data: {
      actorId,
      targetId,
      action,
      before: JSON.parse(JSON.stringify(before)),
      after: JSON.parse(JSON.stringify(after)),
    },
  });
}

async function validateBatchReferences(
  tx: Prisma.TransactionClient,
  input: BatchInput,
  id?: string
) {
  const course = await tx.course.findUnique({ where: { id: input.courseId } });
  if (!course) return invalid("Select an existing course.");
  if (course.status === "ARCHIVED") {
    return invalid("Archived courses cannot accept batches.");
  }
  const offering = (course.offerings as Offering[]).find(
    (o) => o.format === input.format
  );
  if (
    !offering ||
    input.installmentCounts.some((n) => !offering.installmentCounts.includes(n))
  ) {
    return invalid("Select a course format and allowed installment plan.");
  }
  const mentors = [input.leadMentorId, input.assistantMentorId].filter(
    (s): s is string => !!s
  );
  if (
    (await tx.profile.count({
      where: { id: { in: mentors }, active: true, role: "MENTOR" },
    })) !== mentors.length
  ) {
    return invalid("Choose active mentor accounts.");
  }
  if (input.roomId) {
    const room = await tx.room.findFirst({
      where: { id: input.roomId, active: true },
    });
    if (!room || input.seats > room.capacity) {
      return invalid("Seats exceed room capacity, or the room is unavailable.");
    }
  }
  const classes = schedule(input);
  if (input.status === "OPEN") {
    const competing: Prisma.BatchWhereInput = {
      ...(id ? { id: { not: id } } : {}),
      status: "OPEN",
      OR: [
        { leadMentorId: { in: mentors } },
        { assistantMentorId: { in: mentors } },
        ...(input.roomId ? [{ roomId: input.roomId }] : []),
      ],
    };
    const clash = await tx.batchClass.findFirst({
      where: {
        batch: competing,
        OR: classes.map((c) => ({
          startsAt: { lt: c.endsAt },
          endsAt: { gt: c.startsAt },
        })),
      },
    });
    if (clash) {
      return conflict(
        "An open batch already uses this room or mentor during a class."
      );
    }
  }
  return classes;
}

export async function getPublicCourses(q: CatalogPageQuery) {
  const where: Prisma.CourseWhereInput = {
    status: "PUBLISHED",
    ...(q.q ? { title: { contains: q.q, mode: "insensitive" } } : {}),
    ...(q.track ? { track: q.track } : {}),
    ...(q.format
      ? { batches: { some: { ...publicBatch, format: q.format } } }
      : {}),
  };
  const [total, courses] = await db().$transaction([
    db().course.count({ where }),
    db().course.findMany({
      where,
      orderBy: [{ title: "asc" }, { id: "asc" }],
      skip: q.skip,
      take: q.limit,
      include: {
        batches: {
          where: {
            ...publicBatch,
            ...(q.format ? { format: q.format } : {}),
          },
          include: includeBatch,
          orderBy: [{ startDate: "asc" }, { id: "asc" }],
        },
      },
    }),
  ]);
  return {
    items: courses.map((c) => ({
      id: c.id,
      title: c.title,
      summary: c.summary,
      track: c.track,
      currency: "BDT",
      offerings: c.offerings as Offering[],
      batches: c.batches.map(publicBatchData),
    })),
    page: q.page,
    limit: q.limit,
    total,
  };
}

export async function getPublicCourseById(id: string) {
  const c = await db().course.findFirst({
    where: { id, status: "PUBLISHED" },
    include: {
      batches: {
        where: publicBatch,
        include: includeBatch,
        orderBy: [{ startDate: "asc" }, { id: "asc" }],
      },
    },
  });
  if (!c) return null;
  return {
    id: c.id,
    title: c.title,
    summary: c.summary,
    track: c.track,
    currency: "BDT",
    offerings: c.offerings as Offering[],
    batches: c.batches.map(publicBatchData),
  };
}

export async function getAdminCourses(
  context: ProfileContext,
  q: CatalogPageQuery
) {
  const where: Prisma.CourseWhereInput = {
    ...courseScope(context),
    ...(q.q ? { title: { contains: q.q, mode: "insensitive" } } : {}),
    ...(q.track ? { track: q.track } : {}),
  };
  const [total, items] = await db().$transaction([
    db().course.count({ where }),
    db().course.findMany({
      where,
      orderBy: [{ title: "asc" }, { id: "asc" }],
      skip: q.skip,
      take: q.limit,
    }),
  ]);
  return { items, total, page: q.page, limit: q.limit };
}

export async function getAdminCourseById(
  context: ProfileContext,
  id: string
) {
  return db().course.findFirst({
    where: {
      id,
      ...courseScope(context),
    },
  });
}

export async function createAdminCourse(
  context: ProfileContext,
  input: Prisma.CourseCreateInput
) {
  allScope(context);
  pricing(context);
  return db().$transaction(async (tx) => {
    const c = await tx.course.create({ data: input });
    await audit(tx, context.profile.id, c.id, "COURSE_CREATED", {}, c);
    return c;
  });
}

export async function updateAdminCourse(
  context: ProfileContext,
  id: string,
  input: Record<string, unknown>
) {
  allScope(context);
  if (input.offerings !== undefined) pricing(context);
  return db().$transaction(
    async (tx) => {
      const old = await tx.course.findUnique({ where: { id } });
      if (!old) return missing();
      if (old.version !== input.version) {
        return conflict("Course changed. Reload before saving.");
      }
      if (old.status !== "DRAFT") {
        return conflict(
          "Published and archived courses require the review workflow before editing."
        );
      }
      const data = parseCourse({ ...old, ...input });
      for (const batch of await tx.batch.findMany({
        where: { courseId: id, status: { not: "CLOSED" } },
      })) {
        const offering = data.offerings.find((o) => o.format === batch.format);
        if (
          !offering ||
          batch.installmentCounts.some(
            (n) => !offering.installmentCounts.includes(n)
          )
        ) {
          return conflict(
            "An active batch uses a format or plan you are removing. Update that batch first."
          );
        }
      }
      const c = await tx.course.update({
        where: { id, version: old.version },
        data: { ...data, version: { increment: 1 } },
      });
      await audit(tx, context.profile.id, id, "COURSE_UPDATED", old, c);
      return c;
    },
    { isolationLevel: "Serializable" }
  );
}

export async function getAdminBatches(
  context: ProfileContext,
  q: CatalogPageQuery
) {
  const where: Prisma.BatchWhereInput = {
    ...scope(context),
    ...(q.courseId ? { courseId: q.courseId } : {}),
    ...(q.format ? { format: q.format } : {}),
    ...(q.q ? { name: { contains: q.q, mode: "insensitive" } } : {}),
  };
  const [total, items] = await db().$transaction([
    db().batch.count({ where }),
    db().batch.findMany({
      where,
      include: includeBatch,
      orderBy: [{ startDate: "desc" }, { id: "asc" }],
      skip: q.skip,
      take: q.limit,
    }),
  ]);
  return { items, total, page: q.page, limit: q.limit };
}

export async function getAdminBatchById(
  context: ProfileContext,
  id: string
) {
  assertBatchAccess(context, id);
  return db().batch.findUnique({
    where: { id },
    include: includeBatch,
  });
}

export async function createAdminBatch(
  context: ProfileContext,
  input: BatchInput
) {
  allScope(context);
  pricing(context);
  return db().$transaction(
    async (tx) => {
      const classes = await validateBatchReferences(tx, input);
      const batch = await tx.batch.create({
        data: { ...input, classes: { create: classes } },
        include: includeBatch,
      });
      await audit(tx, context.profile.id, batch.id, "BATCH_CREATED", {}, batch);
      return batch;
    },
    { isolationLevel: "Serializable" }
  );
}

export async function updateAdminBatch(
  context: ProfileContext,
  id: string,
  input: Record<string, unknown>
) {
  assertBatchAccess(context, id);
  if (input.fee !== undefined || input.installmentCounts !== undefined) {
    pricing(context);
  }
  return db().$transaction(
    async (tx) => {
      const old = await tx.batch.findUnique({
        where: { id },
        include: includeBatch,
      });
      if (!old) return missing();
      if (old.version !== input.version) {
        return conflict("Batch changed. Reload before saving.");
      }
      if (input.courseId !== undefined && input.courseId !== old.courseId) {
        return invalid("A batch cannot be moved to another course.");
      }
      const data = parseBatch({ ...old, ...input });
      if (data.seats < old.seatsTaken) {
        return conflict("Capacity cannot be lower than occupied seats.");
      }
      const protectedFields = [
        "format",
        "fee",
        "installmentCounts",
        "startDate",
        "repeatDays",
        "startTime",
        "endTime",
        "classCount",
      ] as const;
      if (
        old.seatsTaken > 0 &&
        protectedFields.some(
          (k) => JSON.stringify(old[k]) !== JSON.stringify(data[k])
        )
      ) {
        return conflict(
          "Occupied batches require a managed pricing/rescheduling workflow."
        );
      }
      const classes = await validateBatchReferences(tx, data, id);
      await tx.batch.update({
        where: { id, version: old.version },
        data: { ...data, version: { increment: 1 } },
      });
      await tx.batchClass.deleteMany({
        where: { batchId: id, sequence: { gt: data.classCount } },
      });
      for (const c of classes) {
        await tx.batchClass.upsert({
          where: { batchId_sequence: { batchId: id, sequence: c.sequence } },
          create: { ...c, batchId: id },
          update: { startsAt: c.startsAt, endsAt: c.endsAt },
        });
      }
      const batch = await tx.batch.findUniqueOrThrow({
        where: { id },
        include: includeBatch,
      });
      await audit(tx, context.profile.id, id, "BATCH_UPDATED", old, batch);
      return batch;
    },
    { isolationLevel: "Serializable", timeout: 15000 }
  );
}

export async function getAdminMentors(
  context: ProfileContext,
  q: CatalogPageQuery
) {
  choicesPermission(context, true);
  const where: Prisma.ProfileWhereInput = {
    role: "MENTOR",
    active: true,
    ...(q.q ? { fullName: { contains: q.q, mode: "insensitive" } } : {}),
    ...(context.batchScope.mode === "ALL"
      ? {}
      : {
          OR: [
            { leadBatches: { some: scope(context) } },
            { assistantBatches: { some: scope(context) } },
          ],
        }),
  };
  const [total, items] = await db().$transaction([
    db().profile.count({ where }),
    db().profile.findMany({
      where,
      select: { id: true, fullName: true, jobTitle: true, skills: true },
      orderBy: [{ fullName: "asc" }, { id: "asc" }],
      skip: q.skip,
      take: q.limit,
    }),
  ]);
  return { items, total, page: q.page, limit: q.limit };
}

export async function getAdminRooms(
  context: ProfileContext,
  q: CatalogPageQuery
) {
  choicesPermission(context, false);
  const where: Prisma.RoomWhereInput = {
    active: true,
    ...(q.q ? { name: { contains: q.q, mode: "insensitive" } } : {}),
    ...(context.batchScope.mode === "ALL"
      ? {}
      : { batches: { some: scope(context) } }),
  };
  const [total, items] = await db().$transaction([
    db().room.count({ where }),
    db().room.findMany({
      where,
      orderBy: [{ name: "asc" }, { id: "asc" }],
      skip: q.skip,
      take: q.limit,
    }),
  ]);
  return { items, total, page: q.page, limit: q.limit };
}
