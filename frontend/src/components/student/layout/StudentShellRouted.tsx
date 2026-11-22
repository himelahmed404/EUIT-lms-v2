"use client";

import { usePathname, useRouter } from "next/navigation";
import { StudentBrand } from "./StudentBrand";
import { StudentHeader } from "./StudentHeader";
import { useCallback } from "react";

export function StudentShellRouted({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Resolve slug from pathname: e.g. /student/courses -> "courses", /student/dashboard -> "dashboard"
  const slug =
    pathname.replace(/^\/student\/?/, "").split("/")[0] || "dashboard";
  const account =
    slug === "login" || slug === "forgot-password" || slug === "verify-email";

  // Intercept clicks on internal standard <a> tags (e.g. from prototype html/breadcrumbs)
  // to avoid native browser full-page hard refreshes.
  const handleInternalLinkClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      // Skip external links, new tabs, downloads, hash-only anchors, or modified clicks
      if (
        target.target === "_blank" ||
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        target.hasAttribute("download") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      // Smooth client navigation for internal app routes
      if (href.startsWith("/") && !href.startsWith("//")) {
        e.preventDefault();
        router.push(href);
      }
    },
    [router],
  );

  return (
    <div
      data-student-page={slug}
      className={`app-shell ${slug === "dashboard" ? "home-shell" : "inner-shell"}`}
      onClick={handleInternalLinkClick}
    >
      {account ? (
        <header className="masthead">
          <StudentBrand href="/student/login" />
        </header>
      ) : (
        <StudentHeader slug={slug} />
      )}
      {children}
    </div>
  );
}
