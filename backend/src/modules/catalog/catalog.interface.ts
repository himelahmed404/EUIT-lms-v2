import type { Prisma } from "../../../generated/prisma/client.js";
import type { Offering } from "./catalog.validation.js";

export interface BatchPlan {
  id: string;
  label: string;
  count: number;
  total: number;
  amounts: number[];
}

export const includeBatch = {
  course: { select: { id: true, title: true, status: true } },
  room: true,
  leadMentor: { select: { id: true, fullName: true, showOnWebsite: true } },
  assistantMentor: {
    select: { id: true, fullName: true, showOnWebsite: true },
  },
  classes: { orderBy: { sequence: "asc" as const } },
};

export type LoadedBatch = Prisma.BatchGetPayload<{ include: typeof includeBatch }>;

export interface PublicClassData {
  id: string;
  sequence: number;
  startsAt: Date;
  endsAt: Date;
}

export interface PublicBatchData {
  id: string;
  name: string;
  courseId: string;
  format: string;
  startDate: string;
  repeatDays: number[];
  startTime: string;
  endTime: string;
  timeZone: string;
  classCount: number;
  seats: number;
  seatsAvailable: number;
  fee: number;
  currency: string;
  plans: BatchPlan[];
  location: string;
  mentor: { id: string; name: string } | null;
  classes: PublicClassData[];
}

export interface PublicCourseData {
  id: string;
  title: string;
  summary: string;
  track: string;
  currency: string;
  offerings: Offering[];
  batches: PublicBatchData[];
}

export interface CatalogPageQuery {
  page: number;
  limit: number;
  skip: number;
  q?: string;
  track?: string;
  format?: "ONLINE" | "OFFLINE";
  courseId?: string;
}
