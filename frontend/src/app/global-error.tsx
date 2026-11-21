"use client";

import { useEffect } from "react";
import { AppErrorView } from "@/components/common/AppErrorView";
import "@/app/globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Error · European IT Institute</title>
        <link rel="icon" href="/student-assets/book.svg" />
      </head>
      <body style={{ margin: 0, backgroundColor: "#f8fafc" }}>
        <AppErrorView error={error} reset={reset} portal="general" />
      </body>
    </html>
  );
}
