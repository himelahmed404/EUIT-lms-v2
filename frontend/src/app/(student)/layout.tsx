"use client";

import { usePathname } from "next/navigation";
import { StudentShell } from "@/components/shell/StudentShell";
import { StudentHtmlClass } from "./StudentHtmlClass";

const BARE = new Set(["/student/quiz", "/student/certificate"]);

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE.has(pathname);
  return (
    <>
      <StudentHtmlClass />
      {bare ? children : <StudentShell>{children}</StudentShell>}
    </>
  );
}
