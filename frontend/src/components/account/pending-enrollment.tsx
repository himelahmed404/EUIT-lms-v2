"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export function PendingEnrollment() {
  const [href, setHref] = useState("");
  useEffect(() => {
    try {
      const choice = JSON.parse(
        sessionStorage.getItem("euit.pending-enrollment") || "null",
      );
      if (
        choice &&
        ["ONLINE", "OFFLINE"].includes(choice.format) &&
        [choice.course, choice.batch].every(
          (id) =>
            typeof id === "string" &&
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
              id,
            ),
        ) &&
        /^(?:[1-9]|1[0-2])$/.test(choice.plan)
      ) {
        setHref(
          `/enroll/checkout?${new URLSearchParams({ course: choice.course, format: choice.format, batch: choice.batch, plan: choice.plan })}`,
        );
      }
    } catch {
      /* A saved course selection is optional. */
    }
  }, []);
  return href ? (
    <p>
      <Link href={href}>Return to your saved course selection</Link>
    </p>
  ) : null;
}
