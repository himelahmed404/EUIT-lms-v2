"use client";

import { useEffect } from "react";
import { AppErrorView } from "@/components/common/AppErrorView";

export default function PlatformError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Platform error boundary caught:", error);
  }, [error]);

  return <AppErrorView error={error} reset={reset} portal="general" />;
}
