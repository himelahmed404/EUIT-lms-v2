"use client";
import Link from "next/link";
import { useCallback } from "react";
import { useAccount } from "@/components/account/auth-provider";
import { catalogApi, days, tk } from "@/lib/api/catalog";
import {
  CatalogPanel,
  CatalogPermission,
  ResourceState,
  useCatalogResource,
} from "./catalog-shared";
import { BatchList } from "./admin-catalog";
function Detail({ id }: { id: string }) {
  const { profile } = useAccount();
  const load = useCallback(() => catalogApi.batch(id), [id]);
  const { data: b, error, retry } = useCatalogResource(load);
  if (!b)
    return (
      <CatalogPanel>
        <ResourceState error={error} retry={retry} />
      </CatalogPanel>
    );
  return (
    <CatalogPanel>
      <header>
        <h1>{b.name}</h1>
        <Link href="/admin/courses">Courses & batches</Link>
      </header>
      <h2>{b.course.title}</h2>
      <p>
        {b.format} · {b.status} · {b.leadMentor.fullName}
        {b.assistantMentor ? ` / ${b.assistantMentor.fullName}` : ""}
      </p>
      <p>
        {b.repeatDays.map((d) => days[d]).join(" & ")} · {b.startTime}–
        {b.endTime} · {b.timeZone}
      </p>
      <p>{b.room ? `${b.room.name} · ${b.room.location}` : "Live online"}</p>
      <p>
        {b.seats - b.seatsTaken} of {b.seats} seats available · {tk(b.fee)} BDT
        · Plans: {b.installmentCounts.join(", ")} parts
      </p>
      <p>
        {b.admissionOpen ? "Admission open" : "Admission closed"} ·{" "}
        {b.websiteVisible
          ? "Website visible when course is published"
          : "Hidden from website"}
      </p>
      {profile?.permissions.includes("batches.write") && (
        <Link className="account-link" href={`/admin/batch-edit?id=${b.id}`}>
          Edit batch
        </Link>
      )}
      <section>
        <h2>Class schedule</h2>
        <ol className="catalog-list">
          {b.classes.map((c) => (
            <li key={c.id}>
              <strong>Class {c.sequence}</strong> ·{" "}
              {new Date(c.startsAt).toLocaleString("en-GB", {
                timeZone: b.timeZone,
                dateStyle: "medium",
                timeStyle: "short",
              })}{" "}
              –{" "}
              {new Date(c.endsAt).toLocaleTimeString("en-GB", {
                timeZone: b.timeZone,
                timeStyle: "short",
              })}
            </li>
          ))}
        </ol>
      </section>
      <p className="catalog-meta">
        Attendance, rosters and recordings will be connected in the learning
        milestone.
      </p>
    </CatalogPanel>
  );
}
export function BatchDetail({ id }: { id: string }) {
  return (
    <CatalogPermission permission="batches.read">
      {id ? (
        <Detail id={id} />
      ) : (
        <CatalogPanel>
          <h1>Select a batch</h1>
          <BatchList />
        </CatalogPanel>
      )}
    </CatalogPermission>
  );
}
