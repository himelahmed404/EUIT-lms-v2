"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initUiInteractions } from "@/lib/ui/interactions";
import { runGsapMotion } from "@/lib/gsap/motion";

const PAGE_INIT: Record<string, () => Promise<{ initPage: (signal: AbortSignal) => void }>> = {
  "/mentor/notifications": () => import("@/lib/ui/pages/notifications"),
  "/admin/notifications": () => import("@/lib/ui/pages/notifications"),
  "/mentor/questions": () => import("@/lib/ui/pages/questions"),
  "/mentor/review": () => import("@/lib/ui/pages/review"),
  "/admin/announcements": () => import("@/lib/ui/pages/announcements"),
  "/admin/coupons": () => import("@/lib/ui/pages/coupons"),
};

export function UiProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const controller = new AbortController();
    initUiInteractions(controller.signal);
    const stop = runGsapMotion(document);
    const loader = PAGE_INIT[pathname];
    let cancelled = false;
    if (loader) {
      loader()
        .then((m) => {
          if (!cancelled && m.initPage) m.initPage(controller.signal);
        })
        .catch(() => undefined);
    }
    return () => {
      controller.abort();
      cancelled = true;
      stop();
    };
  }, [pathname]);

  return <>{children}</>;
}
