"use client";
import { initStudentMotion } from "@/lib/student/motion";
import { initPage as navigation } from "@/lib/student/navigation";
import { useEffect } from "react";

type Controller = { initPage: (signal: AbortSignal) => void };
const pages: Record<string, () => Promise<Controller>> = {
  dashboard: () => import("@/lib/student/dashboard"),
  assignments: () => import("@/lib/student/assignments"),
  courses: () => import("@/lib/student/courses"),
  routine: () => import("@/lib/student/routine"),
  notifications: () => import("@/lib/student/notifications"),
  "course-player": () => import("@/lib/ui/pages/player"),
  help: () => import("@/lib/ui/pages/help"),
};
export function StudentInteractions({
  slug,
  legacy,
  account,
}: {
  slug: string;
  legacy: boolean;
  account: boolean;
}) {
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const revealMenu = initStudentMotion(signal);
    async function mount() {
      const [controls, page] = await Promise.all([
        legacy ? import("@/lib/ui/interactions") : undefined,
        pages[slug]?.(),
      ]);
      if (signal.aborted) return;
      if (!account) navigation(signal, revealMenu);
      controls?.initUiInteractions(signal);
      page?.initPage(signal);
    }
    void mount();
    return () => controller.abort();
  }, [slug, legacy, account]);
  return null;
}
