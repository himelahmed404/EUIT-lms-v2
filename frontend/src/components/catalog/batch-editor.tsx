"use client";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useAccount } from "@/components/account/auth-provider";
import { errorMessage } from "@/lib/api/account";
import {
  allChoices,
  catalogApi,
  days,
  type Batch,
  type Course,
  type Mentor,
  type Room,
  type Format,
} from "@/lib/api/catalog";
import {
  CatalogPanel,
  CatalogPermission,
  Field,
  ResourceState,
  useCatalogResource,
} from "./catalog-shared";
type BatchForm = Pick<
  Batch,
  | "courseId"
  | "name"
  | "format"
  | "status"
  | "leadMentorId"
  | "assistantMentorId"
  | "roomId"
  | "onlineLocation"
  | "startDate"
  | "repeatDays"
  | "startTime"
  | "endTime"
  | "classCount"
  | "seats"
  | "fee"
  | "installmentCounts"
  | "admissionOpen"
  | "websiteVisible"
>;
function toForm(b: Batch): BatchForm {
  const {
    courseId,
    name,
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
    classCount,
    seats,
    fee,
    installmentCounts,
    admissionOpen,
    websiteVisible,
  } = b;
  return {
    courseId,
    name,
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
    classCount,
    seats,
    fee,
    installmentCounts,
    admissionOpen,
    websiteVisible,
  };
}
function Editor({
  initial,
  courses,
  mentors,
  rooms,
}: {
  initial: Batch | null;
  courses: Course[];
  mentors: Mentor[];
  rooms: Room[];
}) {
  const { profile } = useAccount();
  const [batch, setBatch] = useState(initial);
  const [form, setForm] = useState<BatchForm>(
    initial
      ? toForm(initial)
      : {
          courseId: "",
          name: "",
          format: "ONLINE",
          status: "DRAFT",
          leadMentorId: "",
          assistantMentorId: null,
          roomId: null,
          onlineLocation: "",
          startDate: "",
          repeatDays: [],
          startTime: "18:00",
          endTime: "20:00",
          classCount: 24,
          seats: 25,
          fee: 0,
          installmentCounts: [1],
          admissionOpen: false,
          websiteVisible: false,
        },
  );
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState("");
  const canPrice = !!profile?.permissions.includes("pricing.write");
  const canCreate = profile?.batchScope.mode === "ALL" && canPrice;
  const course = courses.find((c) => c.id === form.courseId),
    offering = course?.offerings.find((o) => o.format === form.format);
  function update<K extends keyof BatchForm>(key: K, value: BatchForm[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function chooseCourse(id: string, format?: Format) {
    const c = courses.find((c) => c.id === id),
      o = c?.offerings.find((o) => o.format === format) ?? c?.offerings[0];
    if (!o) return;
    setForm((f) => ({
      ...f,
      courseId: id,
      format: o.format,
      fee: o.fee,
      installmentCounts: o.installmentCounts,
      roomId: null,
      onlineLocation: o.format === "ONLINE" ? "" : null,
    }));
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    setError("");
    try {
      const body: Partial<BatchForm> & { version?: number } = {
        ...form,
        ...(batch ? { version: batch.version } : {}),
      };
      if (batch && !canPrice) {
        delete body.fee;
        delete body.installmentCounts;
      }
      const saved = await catalogApi.saveBatch(body, batch?.id);
      setBatch(saved);
      setForm(toForm(saved));
      setMessage("Batch saved. Schedule and availability updated.");
      window.history.replaceState(null, "", `/admin/batch-edit?id=${saved.id}`);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  if (!batch && !canCreate)
    return (
      <CatalogPanel>
        <h1>Create batch</h1>
        <p>
          Creating a batch requires all-batch scope and pricing write
          permission.
        </p>
      </CatalogPanel>
    );
  return (
    <CatalogPanel>
      <header>
        <h1>{batch ? `Edit ${batch.name}` : "Create batch"}</h1>
        <Link href="/admin/courses">Courses & batches</Link>
      </header>
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
      {!courses.length && (
        <p>Create a course draft before scheduling a batch.</p>
      )}
      {!mentors.length && (
        <p>
          No active mentor accounts are available. Assign a mentor role in
          account access first.
        </p>
      )}
      <form onSubmit={save}>
        <fieldset disabled={busy}>
          <legend>Course & delivery</legend>
          <div className="account-grid">
            <Field label="Course">
              <select
                required
                value={form.courseId}
                disabled={!!batch}
                onChange={(e) => chooseCourse(e.target.value)}
              >
                <option value="">Select course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.status})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Batch name">
              <input
                required
                maxLength={120}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </Field>
            <Field label="Format">
              <select
                value={form.format}
                disabled={!course || !canPrice || (batch?.seatsTaken ?? 0) > 0}
                onChange={(e) =>
                  chooseCourse(form.courseId, e.target.value as Format)
                }
              >
                {course?.offerings.map((o) => (
                  <option key={o.format}>{o.format}</option>
                ))}
              </select>
            </Field>
            <Field label="Lead mentor">
              <select
                value={form.leadMentorId}
                required
                onChange={(e) => update("leadMentorId", e.target.value)}
              >
                <option value="">Select mentor</option>
                {mentors.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.fullName}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Assistant mentor">
              <select
                value={form.assistantMentorId ?? ""}
                onChange={(e) =>
                  update("assistantMentorId", e.target.value || null)
                }
              >
                <option value="">None</option>
                {mentors
                  .filter((m) => m.id !== form.leadMentorId)
                  .map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.fullName}
                    </option>
                  ))}
              </select>
            </Field>
            {form.format === "OFFLINE" ? (
              <Field label="Room">
                <select
                  value={form.roomId ?? ""}
                  required
                  onChange={(e) => update("roomId", e.target.value)}
                >
                  <option value="">Select room</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} · {r.capacity} seats · {r.location}
                    </option>
                  ))}
                </select>
              </Field>
            ) : (
              <Field label="Online meeting URL">
                <input
                  value={form.onlineLocation ?? ""}
                  onChange={(e) => update("onlineLocation", e.target.value)}
                  type="url"
                  required
                  placeholder="https://…"
                />
              </Field>
            )}
          </div>
        </fieldset>
        <fieldset disabled={busy || (batch?.seatsTaken ?? 0) > 0}>
          <legend>Class schedule · Asia/Dhaka</legend>
          <div className="catalog-days">
            {days.map((day, i) => (
              <label key={day}>
                <input
                  type="checkbox"
                  checked={form.repeatDays.includes(i)}
                  onChange={(e) =>
                    update(
                      "repeatDays",
                      e.target.checked
                        ? [...form.repeatDays, i].sort()
                        : form.repeatDays.filter((d) => d !== i),
                    )
                  }
                />
                {day}
              </label>
            ))}
          </div>
          <div className="account-grid">
            <Field label="First class">
              <input
                type="date"
                min="2020-01-01"
                max="2100-12-31"
                required
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
              />
            </Field>
            <Field label="Starts at">
              <input
                type="time"
                required
                value={form.startTime}
                onChange={(e) => update("startTime", e.target.value)}
              />
            </Field>
            <Field label="Ends at">
              <input
                type="time"
                required
                value={form.endTime}
                onChange={(e) => update("endTime", e.target.value)}
              />
            </Field>
            <Field label="Number of classes">
              <input
                type="number"
                min={1}
                max={200}
                required
                value={form.classCount}
                onChange={(e) => update("classCount", Number(e.target.value))}
              />
            </Field>
          </div>
          <p>
            First class must fall on a selected repeat day. Open batches cannot
            overlap another booking for the same room or mentor.
          </p>
        </fieldset>
        <fieldset disabled={busy}>
          <legend>Seats, pricing & visibility</legend>
          <div className="account-grid">
            <Field label="Seats">
              <input
                type="number"
                min={Math.max(1, batch?.seatsTaken ?? 0)}
                max={10000}
                required
                value={form.seats}
                onChange={(e) => update("seats", Number(e.target.value))}
              />
            </Field>
            <Field label="Batch fee (BDT)">
              <input
                type="number"
                min={0}
                max={10000000}
                required
                value={form.fee}
                disabled={!canPrice || (batch?.seatsTaken ?? 0) > 0}
                onChange={(e) => update("fee", Number(e.target.value))}
              />
            </Field>
            <Field label="Batch status">
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    status: e.target.value as BatchForm["status"],
                    admissionOpen:
                      e.target.value === "OPEN" ? f.admissionOpen : false,
                  }))
                }
              >
                <option>DRAFT</option>
                <option>OPEN</option>
                <option>CLOSED</option>
              </select>
            </Field>
          </div>
          <p>Allowed payment plans</p>
          <div className="catalog-days">
            {(offering?.installmentCounts ?? [1]).map((n) => (
              <label key={n}>
                <input
                  type="checkbox"
                  checked={form.installmentCounts.includes(n)}
                  disabled={
                    n === 1 || !canPrice || (batch?.seatsTaken ?? 0) > 0
                  }
                  onChange={(e) =>
                    update(
                      "installmentCounts",
                      e.target.checked
                        ? [...form.installmentCounts, n].sort((a, b) => a - b)
                        : form.installmentCounts.filter((v) => v !== n),
                    )
                  }
                />
                {n === 1 ? "Full payment" : `${n} parts`}
              </label>
            ))}
          </div>
          <label className="account-toggle">
            <input
              type="checkbox"
              checked={form.admissionOpen}
              disabled={form.status !== "OPEN"}
              onChange={(e) => update("admissionOpen", e.target.checked)}
            />
            Admission open
          </label>
          <label className="account-toggle">
            <input
              type="checkbox"
              checked={form.websiteVisible}
              onChange={(e) => update("websiteVisible", e.target.checked)}
            />
            Show on website
          </label>
          <p>
            The course must be published and the batch open for admission before
            it appears publicly.
          </p>
        </fieldset>
        <button disabled={busy || !courses.length || !mentors.length}>
          {busy ? "Saving…" : "Save batch"}
        </button>
        {batch && (
          <Link href={`/admin/batch-detail?id=${batch.id}`}>
            View batch and class schedule
          </Link>
        )}
      </form>
    </CatalogPanel>
  );
}
function Loader({ id }: { id: string }) {
  const { profile } = useAccount();
  const canReadCourses = !!profile?.permissions.includes("courses.read");
  const load = useCallback(async () => {
    const [initial, courses, mentors, rooms] = await Promise.all([
      id ? catalogApi.batch(id) : Promise.resolve(null),
      canReadCourses ? allChoices(catalogApi.courses) : Promise.resolve([]),
      allChoices(catalogApi.mentors),
      allChoices(catalogApi.rooms),
    ]);
    // A scoped scheduler can edit an existing batch without global course access.
    if (initial && !courses.some((c) => c.id === initial.courseId))
      courses.push({
        ...initial.course,
        summary: "",
        track: "",
        version: 0,
        offerings: [
          {
            format: initial.format,
            fee: initial.fee,
            installmentCounts: initial.installmentCounts,
          },
        ],
      });
    if (initial && !mentors.some((m) => m.id === initial.leadMentorId))
      mentors.push({ ...initial.leadMentor, jobTitle: null, skills: [] });
    if (
      initial?.assistantMentor &&
      !mentors.some((m) => m.id === initial.assistantMentorId)
    )
      mentors.push({ ...initial.assistantMentor, jobTitle: null, skills: [] });
    if (initial?.room && !rooms.some((r) => r.id === initial.roomId))
      rooms.push(initial.room);
    return {
      initial,
      courses: courses.filter(
        (c) => c.status !== "ARCHIVED" || c.id === initial?.courseId,
      ),
      mentors,
      rooms,
    };
  }, [id, canReadCourses]);
  const { data, error, retry } = useCatalogResource(load);
  return data ? (
    <Editor {...data} />
  ) : (
    <CatalogPanel>
      <ResourceState error={error} retry={retry} />
    </CatalogPanel>
  );
}
export function BatchEditor({ id }: { id: string }) {
  return (
    <CatalogPermission permission="batches.write">
      <Loader id={id} />
    </CatalogPermission>
  );
}
