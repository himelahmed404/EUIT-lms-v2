"use client";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  catalogApi,
  choiceUrl,
  days,
  tk,
  type PublicCourse,
} from "@/lib/api/catalog";
import {
  CatalogPanel,
  Field,
  Pagination,
  ResourceState,
  useCatalogResource,
} from "./catalog-shared";
import { EnrollTop } from "@/components/enroll/EnrollChrome";
function CourseChoices({ course }: { course: PublicCourse }) {
  const [format, setFormat] = useState(""),
    [batchId, setBatchId] = useState(""),
    [planId, setPlanId] = useState("");
  const formats = [...new Set(course.batches.map((b) => b.format))];
  const currentFormat = formats.includes(format as "ONLINE" | "OFFLINE")
    ? format
    : formats[0];
  const batches = course.batches.filter((b) => b.format === currentFormat);
  const batch =
    batches.find((b) => b.id === batchId) ??
    batches.find((b) => b.seatsAvailable > 0) ??
    batches[0];
  const plan = batch?.plans.find((p) => p.id === planId) ?? batch?.plans[0];
  return (
    <li>
      <p className="catalog-meta">{course.track}</p>
      <h2>{course.title}</h2>
      <p>{course.summary}</p>
      {batch && plan ? (
        <>
          <div className="account-grid">
            <Field label={`Format for ${course.title}`}>
              <select
                value={currentFormat}
                onChange={(e) => {
                  setFormat(e.target.value);
                  setBatchId("");
                  setPlanId("");
                }}
              >
                {formats.map((f) => (
                  <option key={f} value={f}>
                    {f === "ONLINE" ? "Online" : "Offline"}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={`Batch for ${course.title}`}>
              <select
                value={batch.id}
                onChange={(e) => {
                  setBatchId(e.target.value);
                  setPlanId("");
                }}
              >
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} · {b.startDate} · {b.seatsAvailable} seats left
                  </option>
                ))}
              </select>
            </Field>
            <Field label={`Payment plan for ${course.title}`}>
              <select
                value={plan.id}
                onChange={(e) => setPlanId(e.target.value)}
              >
                {batch.plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label} · {tk(p.total)} total
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <p>
            {batch.repeatDays.map((d) => days[d]).join(" & ")} ·{" "}
            {batch.startTime}–{batch.endTime} ({batch.timeZone}) ·{" "}
            {batch.classCount} classes
          </p>
          <p>
            {batch.location}
            {batch.mentor ? ` · ${batch.mentor.name}` : ""}
          </p>
          <p className="catalog-price">
            {tk(plan.total)} <small>BDT</small>
          </p>
          <p>
            {plan.amounts.map(tk).join(" + ")} · Prices exclude any future
            coupon or referral adjustments.
          </p>
          {batch.seatsAvailable > 0 ? (
            <Link
              className="account-link"
              href={choiceUrl({
                course: course.id,
                batch: batch.id,
                format: batch.format,
                plan: plan.id,
              })}
            >
              Continue with {batch.name}
            </Link>
          ) : (
            <p>This batch is full. Choose another batch when available.</p>
          )}
        </>
      ) : (
        <>
          <p>No batches are currently open for admission.</p>
          <p>
            {course.offerings
              .map(
                (o) =>
                  `${o.format === "ONLINE" ? "Online" : "Offline"} from ${tk(o.fee)}`,
              )
              .join(" · ")}
          </p>
        </>
      )}
    </li>
  );
}
export function PublicCatalog() {
  const [page, setPage] = useState(1),
    [search, setSearch] = useState(""),
    [query, setQuery] = useState(""),
    [format, setFormat] = useState("");
  const load = useCallback(
    () =>
      catalogApi.list(
        `?${new URLSearchParams({ page: String(page), q: query, ...(format ? { format } : {}) })}`,
      ),
    [page, query, format],
  );
  const { data, error, retry } = useCatalogResource(load);
  return (
    <>
      <EnrollTop />
      <CatalogPanel>
        <header>
          <div>
            <p className="catalog-meta">European IT Institute</p>
            <h1>Courses & open batches</h1>
            <p>Choose a course, format and payment plan.</p>
          </div>
          <Link href="/">Sign in</Link>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            setQuery(search);
          }}
        >
          <div className="account-grid">
            <Field label="Search courses">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                maxLength={180}
              />
            </Field>
            <Field label="Study format">
              <select
                value={format}
                onChange={(e) => {
                  setFormat(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All formats</option>
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
              </select>
            </Field>
          </div>
          <button>Search</button>
        </form>
        {!data ? (
          <ResourceState error={error} retry={retry} />
        ) : (
          <>
            {data.items.length ? (
              <ul className="catalog-list">
                {data.items.map((c) => (
                  <CourseChoices key={c.id} course={c} />
                ))}
              </ul>
            ) : (
              <p>
                No published courses match your search. Please check again
                later.
              </p>
            )}
            <Pagination page={page} total={data.total} onPage={setPage} />
          </>
        )}
        <p className="catalog-meta">
          Availability is informational. Account setup does not reserve a seat.
          Online enrollment and payment will be available in a later release.
        </p>
      </CatalogPanel>
    </>
  );
}
