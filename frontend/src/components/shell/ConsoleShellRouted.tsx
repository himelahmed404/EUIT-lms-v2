"use client";

import { usePathname } from "next/navigation";
import { ConsoleShell } from "./ConsoleShell";

const titles: Record<string, { title: string; subtitle?: string }> = {
  "/mentor/dashboard": { title: "Dashboard", subtitle: "Today for Kamrul Hasan" },
  "/mentor/review": { title: "Reviews", subtitle: "5 projects waiting" },
  "/mentor/questions": { title: "Student questions", subtitle: "Answer waiting questions" },
  "/mentor/batch": { title: "My batches", subtitle: "WordPress Batch 14" },
  "/mentor/schedule": { title: "Schedule & recordings", subtitle: "Classes and uploads" },
  "/mentor/course-builder": { title: "Courses", subtitle: "WooCommerce Store Building" },
  "/mentor/quiz-builder": { title: "Quiz builder", subtitle: "Class 3 quiz" },
  "/mentor/profile": { title: "My profile" },
  "/mentor/notifications": { title: "Notifications" },
  "/mentor/handbook": { title: "Mentor handbook", subtitle: "Teaching standards" },
  "/admin/overview": { title: "Overview", subtitle: "October 2026" },
  "/admin/courses": { title: "Courses & batches" },
  "/admin/course-review": { title: "Review & publish" },
  "/admin/batch-detail": { title: "Batch detail", subtitle: "WordPress Batch 14" },
  "/admin/batch-edit": { title: "Create a batch" },
  "/admin/students": { title: "Students & payments" },
  "/admin/student-record": { title: "Student record", subtitle: "Mehedi Hasan" },
  "/admin/mentors": { title: "Mentors" },
  "/admin/coupons": { title: "Coupons & referrals" },
  "/admin/announcements": { title: "Announcements" },
  "/admin/activity": { title: "Activity log" },
  "/admin/roles": { title: "Roles & access" },
  "/admin/leads": { title: "Seminar leads" },
  "/admin/settings": { title: "Settings" },
  "/admin/profile": { title: "My profile" },
  "/admin/notifications": { title: "Notifications" },
};

export function ConsoleShellRouted({
  role,
  children,
}: {
  role: "mentor" | "admin";
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const meta = titles[pathname] || { title: role === "admin" ? "Admin" : "Mentor" };
  return (
    <ConsoleShell role={role} title={meta.title} subtitle={meta.subtitle}>
      {children}
    </ConsoleShell>
  );
}
