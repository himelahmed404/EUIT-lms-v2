"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initUiInteractions } from "@/lib/ui/interactions";
import { runGsapMotion } from "@/lib/gsap/motion";

const PAGE_INIT: Record<string, () => Promise<{ initPage: () => void }>> = {
  "/student/help": () => import("@/lib/ui/pages/help"),
  "/student/notifications": () => import("@/lib/ui/pages/notifications"),
  "/mentor/notifications": () => import("@/lib/ui/pages/notifications"),
  "/admin/notifications": () => import("@/lib/ui/pages/notifications"),
  "/student/course-player": () => import("@/lib/ui/pages/player"),
  "/student/routine": () => import("@/lib/ui/pages/routine"),
  "/student/saved": () => import("@/lib/ui/pages/saved"),
  "/student/profile": () => import("@/lib/ui/pages/profile"),
  "/mentor/profile": () => import("@/lib/ui/pages/profile"),
  "/admin/profile": () => import("@/lib/ui/pages/profile"),
  "/mentor/questions": () => import("@/lib/ui/pages/questions"),
  "/mentor/review": () => import("@/lib/ui/pages/review"),
  "/admin/announcements": () => import("@/lib/ui/pages/announcements"),
  "/admin/coupons": () => import("@/lib/ui/pages/coupons"),
};

export function UiProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initUiInteractions();
    const stop = runGsapMotion(document);
    const loader = PAGE_INIT[pathname];
    let cancelled = false;
    if (loader) {
      loader()
        .then((m) => {
          if (!cancelled && m.initPage) m.initPage();
        })
        .catch(() => undefined);
    }
    return () => {
      cancelled = true;
      stop();
    };
  }, [pathname]);

  return <>{children}</>;
}
