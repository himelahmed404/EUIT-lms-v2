"use client";

import { useEffect } from "react";
import { AppErrorView } from "@/components/common/AppErrorView";

export default function StudentPortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Student portal error caught:", error);
  }, [error]);

  return <AppErrorView error={error} reset={reset} portal="student" />;
}
