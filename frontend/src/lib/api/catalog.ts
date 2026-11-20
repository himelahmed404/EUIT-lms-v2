import { apiRequest } from "./client";
export type Format = "ONLINE" | "OFFLINE";
export type Offering = {
  format: Format;
  fee: number;
  installmentCounts: number[];
};
export type Course = {
  id: string;
  title: string;
  summary: string;
  track: string;
  offerings: Offering[];
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  version: number;
};
export type ClassSession = {
  id: string;
  sequence: number;
  startsAt: string;
  endsAt: string;
};
export type Room = {
  id: string;
  name: string;
  location: string;
  capacity: number;
};
export type Mentor = {
  id: string;
  fullName: string;
  jobTitle: string | null;
  skills: string[];
};
export type Batch = {
  id: string;
  courseId: string;
  name: string;
  format: Format;
  status: "DRAFT" | "OPEN" | "CLOSED";
  leadMentorId: string;
  assistantMentorId: string | null;
  roomId: string | null;
  onlineLocation: string | null;
  startDate: string;
  repeatDays: number[];
  startTime: string;
  endTime: string;
  timeZone: string;
  classCount: number;
  seats: number;
  seatsTaken: number;
  fee: number;
  installmentCounts: number[];
  admissionOpen: boolean;
  websiteVisible: boolean;
  version: number;
  classes: ClassSession[];
  course: Pick<Course, "id" | "title" | "status">;
  leadMentor: Pick<Mentor, "id" | "fullName">;
  assistantMentor: Pick<Mentor, "id" | "fullName"> | null;
  room: Room | null;
};
export type Plan = {
  id: string;
  label: string;
  count: number;
  total: number;
  amounts: number[];
};
export type PublicBatch = Pick<
  Batch,
  | "id"
  | "courseId"
  | "name"
  | "format"
  | "startDate"
  | "repeatDays"
  | "startTime"
  | "endTime"
  | "timeZone"
  | "classCount"
  | "seats"
  | "fee"
  | "classes"
> & {
  seatsAvailable: number;
  location: string;
  currency: "BDT";
  plans: Plan[];
  mentor: { id: string; name: string } | null;
};
export type PublicCourse = Pick<
  Course,
  "id" | "title" | "summary" | "track" | "offerings"
> & { currency: "BDT"; batches: PublicBatch[] };
export type PageResult<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
};
export type CatalogChoice = {
  course: string;
  batch: string;
  format: Format;
  plan: string;
};
export const tk = (n: number) => `৳${n.toLocaleString("en-BD")}`;
export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const catalogApi = {
  list: (query = "") =>
    apiRequest<PageResult<PublicCourse>>(
      `/catalog/courses${query}`,
      "GET",
      undefined,
      false,
    ),
  course: (id: string) =>
    apiRequest<PublicCourse>(
      `/catalog/courses/${encodeURIComponent(id)}`,
      "GET",
      undefined,
      false,
    ),
  courses: (query = "") =>
    apiRequest<PageResult<Course>>(`/admin/courses${query}`),
  batches: (query = "") =>
    apiRequest<PageResult<Batch>>(`/admin/batches${query}`),
  adminCourse: (id: string) =>
    apiRequest<Course>(`/admin/courses/${encodeURIComponent(id)}`),
  batch: (id: string) =>
    apiRequest<Batch>(`/admin/batches/${encodeURIComponent(id)}`),
  saveCourse: (body: unknown, id?: string) =>
    apiRequest<Course>(
      `/admin/courses${id ? `/${id}` : ""}`,
      id ? "PATCH" : "POST",
      body,
    ),
  saveBatch: (body: unknown, id?: string) =>
    apiRequest<Batch>(
      `/admin/batches${id ? `/${id}` : ""}`,
      id ? "PATCH" : "POST",
      body,
    ),
  mentors: (query = "") =>
    apiRequest<PageResult<Mentor>>(`/admin/mentors${query}`),
  rooms: (query = "") => apiRequest<PageResult<Room>>(`/admin/rooms${query}`),
};
export async function allChoices<T>(
  load: (query: string) => Promise<PageResult<T>>,
) {
  const items: T[] = [];
  for (let page = 1; ; page++) {
    const result = await load(`?limit=100&page=${page}`);
    items.push(...result.items);
    if (items.length >= result.total || result.items.length === 0) return items;
  }
}
export function resolveChoice(
  course: PublicCourse,
  query: Pick<URLSearchParams, "get">,
) {
  const batch = course.batches.find(
    (b) =>
      b.id === query.get("batch") &&
      b.format === query.get("format") &&
      b.seatsAvailable > 0,
  );
  const plan = batch?.plans.find((p) => p.id === query.get("plan"));
  return batch && plan ? { batch, plan } : null;
}
export function choiceUrl(choice: CatalogChoice) {
  return `/enroll/checkout?${new URLSearchParams(choice)}`;
}
