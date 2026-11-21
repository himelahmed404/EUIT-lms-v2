"use client";

import { useEffect } from "react";
import { AppErrorView } from "@/components/common/AppErrorView";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors for client monitoring
    console.error("Root application error boundary caught:", error);
  }, [error]);

  return <AppErrorView error={error} reset={reset} portal="general" />;
}
