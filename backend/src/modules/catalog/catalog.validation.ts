import { invalid, objectBody, uuid } from "../me/me.validation.js";
export type Offering = {
  format: "ONLINE" | "OFFLINE";
  fee: number;
  installmentCounts: number[];
};
export type CourseInput = {
  title: string;
  summary: string;
  track: string;
  offerings: Offering[];
};
export type BatchInput = {
  courseId: string;
  name: string;
  format: "ONLINE" | "OFFLINE";
  status: "DRAFT" | "OPEN" | "CLOSED";
  leadMentorId: string;
  assistantMentorId: string | null;
  roomId: string | null;
  onlineLocation: string | null;
  startDate: string;
  repeatDays: number[];
  startTime: string;
  endTime: string;
  classCount: number;
  seats: number;
  fee: number;
  installmentCounts: number[];
  admissionOpen: boolean;
  websiteVisible: boolean;
};
export const courseKeys = ["title", "summary", "track", "offerings"];
export const batchKeys = [
  "courseId",
  "name",
  "format",
  "status",
  "leadMentorId",
  "assistantMentorId",
  "roomId",
  "onlineLocation",
  "startDate",
  "repeatDays",
  "startTime",
  "endTime",
  "classCount",
  "seats",
  "fee",
  "installmentCounts",
  "admissionOpen",
  "websiteVisible",
];
export function fields(body: unknown, keys: string[], patch = false) {
  const input = objectBody(body);
  if (
    !Object.keys(input).length ||
    Object.keys(input).some(
      (k) => !keys.includes(k) && !(patch && k === "version"),
    )
  )
    invalid("Unknown or missing fields.");
  if (patch) {
    integer(input.version, "version", 1, 2147483646);
    if (!Object.keys(input).some((k) => k !== "version"))
      invalid("Provide at least one field to update.");
  }
  return input;
}
function text(v: unknown, label: string, max: number) {
  if (
    typeof v !== "string" ||
    !v.trim() ||
    v.trim().length > max ||
    v.includes("\0")
  )
    return invalid(`Invalid ${label}.`);
  return v.trim();
}
export function integer(
  v: unknown,
  label: string,
  min: number,
  max: number,
): number {
  if (typeof v !== "number" || !Number.isSafeInteger(v) || v < min || v > max)
    return invalid(`Invalid ${label}.`);
  return v;
}
function choice<T extends string>(v: unknown, values: T[], label: string): T {
  if (!values.includes(v as T)) return invalid(`Invalid ${label}.`);
  return v as T;
}
function ids(v: unknown, label: string) {
  if (!uuid(v)) return invalid(`Invalid ${label}.`);
  return v;
}
function bool(v: unknown, label: string) {
  if (typeof v !== "boolean") return invalid(`Invalid ${label}.`);
  return v;
}
function numbers(v: unknown, label: string, min: number, max: number) {
  if (!Array.isArray(v) || !v.length || v.length > max - min + 1)
    return invalid(`Invalid ${label}.`);
  const result = v.map((n) => integer(n, label, min, max));
  if (new Set(result).size !== result.length)
    return invalid(`Duplicate ${label}.`);
  return result.sort((a, b) => a - b);
}
export function parseCourse(input: Record<string, unknown>): CourseInput {
  if (
    !Array.isArray(input.offerings) ||
    !input.offerings.length ||
    input.offerings.length > 2
  )
    return invalid("Provide online and/or offline pricing.");
  const offerings = input.offerings.map((raw) => {
    const row = fields(raw, ["format", "fee", "installmentCounts"]);
    const format = choice(row.format, ["ONLINE", "OFFLINE"], "format");
    const fee = integer(row.fee, "fee in whole BDT", 0, 10000000);
    const installmentCounts = numbers(
      row.installmentCounts,
      "installment counts",
      1,
      12,
    );
    if (
      !installmentCounts.includes(1) ||
      (fee === 0 && installmentCounts.length > 1) ||
      (fee > 0 && Math.max(...installmentCounts) > fee)
    )
      return invalid(
        "Full payment is required; each installment must be at least BDT 1.",
      );
    return { format, fee, installmentCounts };
  });
  if (new Set(offerings.map((o) => o.format)).size !== offerings.length)
    return invalid("Duplicate course format.");
  return {
    title: text(input.title, "title", 180),
    summary: text(input.summary, "summary", 4000),
    track: text(input.track, "track", 100),
    offerings,
  };
}
export function parseBatch(input: Record<string, unknown>): BatchInput {
  const startDate = text(input.startDate, "start date", 10);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(startDate) ||
    !Number.isFinite(Date.parse(startDate)) ||
    new Date(startDate).toISOString().slice(0, 10) !== startDate ||
    startDate < "2020-01-01" ||
    startDate > "2100-12-31"
  )
    return invalid("Invalid start date.");
  const startTime = text(input.startTime, "start time", 5),
    endTime = text(input.endTime, "end time", 5);
  if (
    ![startTime, endTime].every((t) => /^([01]\d|2[0-3]):[0-5]\d$/.test(t)) ||
    endTime <= startTime
  )
    return invalid("Class end time must be after start time on the same day.");
  const format = choice(input.format, ["ONLINE", "OFFLINE"], "format");
  const roomId = input.roomId == null ? null : ids(input.roomId, "room");
  const onlineLocation =
    input.onlineLocation == null
      ? null
      : text(input.onlineLocation, "online location", 2048);
  if (format === "OFFLINE" && (!roomId || onlineLocation))
    return invalid("Offline batches require a room and no online link.");
  if (format === "ONLINE") {
    if (roomId || !onlineLocation)
      return invalid("Online batches require a meeting URL and no room.");
    try {
      const url = new URL(onlineLocation);
      if (url.protocol !== "https:" || url.username || url.password)
        return invalid("Use an HTTPS meeting URL.");
    } catch {
      return invalid("Use an HTTPS meeting URL.");
    }
  }
  const leadMentorId = ids(input.leadMentorId, "lead mentor");
  const assistantMentorId =
    input.assistantMentorId == null
      ? null
      : ids(input.assistantMentorId, "assistant mentor");
  if (assistantMentorId === leadMentorId)
    return invalid("Lead and assistant mentors must differ.");
  const repeatDays = numbers(input.repeatDays, "repeat days", 0, 6);
  if (!repeatDays.includes(new Date(`${startDate}T00:00:00Z`).getUTCDay()))
    return invalid("First class date must fall on a selected repeat day.");
  const fee = integer(input.fee, "fee in whole BDT", 0, 10000000);
  const installmentCounts = numbers(
    input.installmentCounts,
    "installment counts",
    1,
    12,
  );
  if (
    !installmentCounts.includes(1) ||
    (fee === 0 && installmentCounts.length > 1) ||
    (fee > 0 && Math.max(...installmentCounts) > fee)
  )
    return invalid("Invalid installment plan for this fee.");
  const status = choice(
    input.status ?? "DRAFT",
    ["DRAFT", "OPEN", "CLOSED"],
    "status",
  );
  const admissionOpen = bool(input.admissionOpen ?? false, "admission open");
  if (admissionOpen && status !== "OPEN")
    return invalid("Only open batches may accept admission.");
  return {
    courseId: ids(input.courseId, "course"),
    name: text(input.name, "name", 120),
    format,
    status,
    leadMentorId,
    assistantMentorId,
    roomId,
    onlineLocation,
    startDate,
    repeatDays,
    startTime,
    endTime,
    classCount: integer(input.classCount, "class count", 1, 200),
    seats: integer(input.seats, "seats", 1, 10000),
    fee,
    installmentCounts,
    admissionOpen,
    websiteVisible: bool(input.websiteVisible ?? false, "website visibility"),
  };
}
export function schedule(
  input: Pick<
    BatchInput,
    "startDate" | "repeatDays" | "startTime" | "endTime" | "classCount"
  >,
) {
  const day = new Date(`${input.startDate}T00:00:00Z`);
  const classes = [];
  while (classes.length < input.classCount) {
    if (input.repeatDays.includes(day.getUTCDay())) {
      const date = day.toISOString().slice(0, 10);
      classes.push({
        sequence: classes.length + 1,
        startsAt: new Date(`${date}T${input.startTime}:00+06:00`),
        endsAt: new Date(`${date}T${input.endTime}:00+06:00`),
      });
    }
    day.setUTCDate(day.getUTCDate() + 1);
  }
  return classes;
}
export function plans(fee: number, counts: number[]) {
  return counts.map((count) => ({
    id: String(count),
    label: count === 1 ? "Full payment" : `${count} installments`,
    count,
    total: fee,
    amounts: Array.from(
      { length: count },
      (_, i) => Math.floor(fee / count) + (i < fee % count ? 1 : 0),
    ),
  }));
}
