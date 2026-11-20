"use client";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useAccount } from "@/components/account/auth-provider";
import { catalogApi, tk } from "@/lib/api/catalog";
import {
  CatalogPanel,
  CatalogPermission,
  Field,
  Pagination,
  ResourceState,
  useCatalogResource,
} from "./catalog-shared";
function Courses() {
  const { profile } = useAccount();
  const [page, setPage] = useState(1),
    [search, setSearch] = useState(""),
    [query, setQuery] = useState("");
  const load = useCallback(
    () => catalogApi.courses(`?page=${page}&q=${encodeURIComponent(query)}`),
    [page, query],
  );
  const { data, error, retry } = useCatalogResource(load);
  const canCreate =
    profile?.batchScope.mode === "ALL" &&
    profile.permissions.includes("courses.write") &&
    profile.permissions.includes("pricing.write");
  return (
    <section>
      <header>
        <h2>Course catalog</h2>
        {canCreate && (
          <Link className="account-link" href="/admin/course-edit">
            Create course
          </Link>
        )}
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(search);
          setPage(1);
        }}
      >
        <Field label="Search courses">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            maxLength={180}
          />
        </Field>
        <button>Search courses</button>
      </form>
      {!data ? (
        <ResourceState error={error} retry={retry} />
      ) : (
        <>
          {data.items.length ? (
            <ul className="catalog-list">
              {data.items.map((c) => (
                <li key={c.id}>
                  <h3>
                    <Link href={`/admin/course-edit?id=${c.id}`}>
                      {c.title}
                    </Link>
                  </h3>
                  <p className="catalog-meta">
                    {c.track} · {c.status}
                  </p>
                  <p>
                    {c.offerings
                      .map((o) => `${o.format}: ${tk(o.fee)}`)
                      .join(" · ")}
                  </p>
                  <Link href={`/admin/courses?courseId=${c.id}`}>
                    View batches
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No courses found. Create a draft to get started.</p>
          )}
          <Pagination page={page} total={data.total} onPage={setPage} />
        </>
      )}
    </section>
  );
}
export function BatchList({ courseId = "" }: { courseId?: string }) {
  const { profile } = useAccount();
  const [page, setPage] = useState(1);
  const load = useCallback(
    () =>
      catalogApi.batches(
        `?page=${page}${courseId ? `&courseId=${encodeURIComponent(courseId)}` : ""}`,
      ),
    [page, courseId],
  );
  const { data, error, retry } = useCatalogResource(load);
  const canCreate =
    profile?.batchScope.mode === "ALL" &&
    profile.permissions.includes("batches.write") &&
    profile.permissions.includes("pricing.write");
  return (
    <section>
      <header>
        <h2>Batches</h2>
        {canCreate && (
          <Link className="account-link" href="/admin/batch-edit">
            Create batch
          </Link>
        )}
      </header>
      {courseId && (
        <p>
          <Link href="/admin/courses">Clear course filter</Link>
        </p>
      )}
      {!data ? (
        <ResourceState error={error} retry={retry} />
      ) : (
        <>
          {data.items.length ? (
            <ul className="catalog-list">
              {data.items.map((b) => (
                <li key={b.id}>
                  <h3>
                    <Link href={`/admin/batch-detail?id=${b.id}`}>
                      {b.name}
                    </Link>
                  </h3>
                  <p>
                    {b.course.title} · {b.format} · {b.status}
                  </p>
                  <p>
                    {b.startDate} · {b.leadMentor.fullName} ·{" "}
                    {b.seats - b.seatsTaken}/{b.seats} seats available ·{" "}
                    {tk(b.fee)}
                  </p>
                  <p className="catalog-meta">
                    {b.admissionOpen ? "Admission open" : "Admission closed"} ·{" "}
                    {b.websiteVisible
                      ? "Website visible when course is published"
                      : "Hidden from website"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No batches found.</p>
          )}
          <Pagination page={page} total={data.total} onPage={setPage} />
        </>
      )}
    </section>
  );
}
export function AdminCatalog({ courseId = "" }: { courseId?: string }) {
  const { profile } = useAccount();
  return (
    <CatalogPanel>
      <h1>Courses & batches</h1>
      <p>Manage course drafts, public pricing and scheduled batches.</p>
      {profile?.permissions.includes("courses.read") && <Courses />}
      {profile?.permissions.includes("batches.read") && (
        <BatchList key={courseId} courseId={courseId} />
      )}
      {!profile?.permissions.some((p) =>
        ["courses.read", "batches.read"].includes(p),
      ) && <p>Your account cannot view courses or batches.</p>}
    </CatalogPanel>
  );
}
function Mentors() {
  const [page, setPage] = useState(1);
  const load = useCallback(() => catalogApi.mentors(`?page=${page}`), [page]);
  const { data, error, retry } = useCatalogResource(load);
  return (
    <CatalogPanel>
      <h1>Mentors</h1>
      <p>
        Active mentor accounts available for teaching. Workload and review
        statistics will appear when the learning APIs are available.
      </p>
      {!data ? (
        <ResourceState error={error} retry={retry} />
      ) : (
        <>
          {data.items.length ? (
            <ul className="catalog-list">
              {data.items.map((m) => (
                <li key={m.id}>
                  <h2>{m.fullName}</h2>
                  <p>{m.jobTitle || "Mentor"}</p>
                  <p>{m.skills.join(" · ")}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No active mentors in your scope.</p>
          )}
          <Pagination page={page} total={data.total} onPage={setPage} />
        </>
      )}
    </CatalogPanel>
  );
}
export function MentorDirectory() {
  return (
    <CatalogPermission permission="mentors.read">
      <Mentors />
    </CatalogPermission>
  );
}
