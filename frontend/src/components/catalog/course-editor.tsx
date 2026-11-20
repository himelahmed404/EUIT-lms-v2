"use client";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useAccount } from "@/components/account/auth-provider";
import { errorMessage } from "@/lib/api/account";
import {
  catalogApi,
  type Course,
  type Format,
  type Offering,
} from "@/lib/api/catalog";
import {
  CatalogPanel,
  CatalogPermission,
  Field,
  ResourceState,
  useCatalogResource,
} from "./catalog-shared";
function Editor({ initial }: { initial: Course | null }) {
  const { profile } = useAccount();
  const [course, setCourse] = useState(initial),
    [title, setTitle] = useState(initial?.title ?? ""),
    [summary, setSummary] = useState(initial?.summary ?? ""),
    [track, setTrack] = useState(initial?.track ?? "");
  const [offerings, setOfferings] = useState<Offering[]>(
    initial?.offerings ?? [
      { format: "ONLINE", fee: 0, installmentCounts: [1] },
    ],
  );
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState("");
  const canEdit =
    profile?.permissions.includes("courses.write") &&
    profile.batchScope.mode === "ALL" &&
    (!course || course.status === "DRAFT");
  const canPrice = profile?.permissions.includes("pricing.write");
  function update(format: Format, data: Partial<Offering>) {
    setOfferings((rows) =>
      rows.map((o) => (o.format === format ? { ...o, ...data } : o)),
    );
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const saved = await catalogApi.saveCourse(
        {
          title,
          summary,
          track,
          ...(canPrice ? { offerings } : {}),
          ...(course ? { version: course.version } : {}),
        },
        course?.id,
      );
      setCourse(saved);
      setMessage("Course draft saved.");
      window.history.replaceState(
        null,
        "",
        `/admin/course-edit?id=${saved.id}`,
      );
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <CatalogPanel>
      <header>
        <h1>{course ? course.title : "Create course"}</h1>
        <Link href="/admin/courses">Courses & batches</Link>
      </header>
      <p>
        New courses are drafts. Publication and edits to published courses
        require the curriculum review workflow, which is not available yet.
      </p>
      {course && (
        <p>
          Status: {course.status} · Version {course.version}
        </p>
      )}
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
      <form onSubmit={save}>
        <fieldset disabled={!canEdit || busy}>
          <legend>Course details</legend>
          <div className="account-grid">
            <Field label="Course title">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={180}
              />
            </Field>
            <Field label="Track">
              <input
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                required
                maxLength={100}
              />
            </Field>
          </div>
          <Field label="Summary">
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
              maxLength={4000}
            />
          </Field>
        </fieldset>
        <fieldset disabled={!canEdit || !canPrice || busy}>
          <legend>Formats & public pricing (BDT)</legend>
          {(["ONLINE", "OFFLINE"] as Format[]).map((format) => {
            const row = offerings.find((o) => o.format === format);
            return (
              <section key={format}>
                <label className="account-toggle">
                  <input
                    type="checkbox"
                    checked={!!row}
                    onChange={(e) =>
                      setOfferings((rows) =>
                        e.target.checked
                          ? [
                              ...rows,
                              { format, fee: 0, installmentCounts: [1] },
                            ]
                          : rows.filter((o) => o.format !== format),
                      )
                    }
                  />
                  {format === "ONLINE" ? "Online format" : "Offline format"}
                </label>
                {row && (
                  <>
                    <Field
                      label={`${format === "ONLINE" ? "Online" : "Offline"} fee`}
                    >
                      <input
                        type="number"
                        value={row.fee}
                        min={0}
                        max={10000000}
                        step={1}
                        required
                        onChange={(e) =>
                          update(format, { fee: Number(e.target.value) })
                        }
                      />
                    </Field>
                    <div className="catalog-days">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <label key={n}>
                          <input
                            type="checkbox"
                            checked={row.installmentCounts.includes(n)}
                            disabled={n === 1}
                            onChange={(e) =>
                              update(format, {
                                installmentCounts: e.target.checked
                                  ? [...row.installmentCounts, n].sort(
                                      (a, b) => a - b,
                                    )
                                  : row.installmentCounts.filter(
                                      (v) => v !== n,
                                    ),
                              })
                            }
                          />
                          {n === 1 ? "Full payment" : `${n} parts`}
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </section>
            );
          })}
        </fieldset>
        {canEdit ? (
          <button
            disabled={busy || offerings.length === 0 || (!course && !canPrice)}
          >
            {busy ? "Saving…" : "Save course draft"}
          </button>
        ) : (
          <p>
            This course is read-only for your account or its publication status.
          </p>
        )}
      </form>
    </CatalogPanel>
  );
}
function Existing({ id }: { id: string }) {
  const load = useCallback(() => catalogApi.adminCourse(id), [id]);
  const { data, error, retry } = useCatalogResource(load);
  return data ? (
    <Editor initial={data} />
  ) : (
    <CatalogPanel>
      <ResourceState error={error} retry={retry} />
    </CatalogPanel>
  );
}
export function CourseEditor({ id }: { id: string }) {
  return (
    <CatalogPermission permission={id ? "courses.read" : "courses.write"}>
      {id ? <Existing id={id} /> : <Editor initial={null} />}
    </CatalogPermission>
  );
}
