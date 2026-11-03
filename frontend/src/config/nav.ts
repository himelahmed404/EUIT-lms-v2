export type NavItem = {
  href: string;
  label: string;
  short?: string;
  count?: number;
  match?: string[]; // extra path prefixes that highlight this item
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const studentNav: NavGroup[] = [
  {
    label: "Learn",
    items: [
      { href: "/student/dashboard", label: "Dashboard", short: "Home" },
      { href: "/student/courses", label: "My courses", short: "Courses", match: ["/student/course-player", "/student/course-offline"] },
      { href: "/student/quizzes", label: "Quizzes", short: "Quizzes", count: 1, match: ["/student/quiz", "/student/quiz-result"] },
      { href: "/student/projects", label: "Projects", short: "Projects", count: 1, match: ["/student/project-detail", "/student/project-feedback"] },
      { href: "/student/routine", label: "Routine", short: "Routine" },
    ],
  },
  {
    label: "Progress",
    items: [
      { href: "/student/leaderboard", label: "Leaderboard", short: "Ranks" },
      { href: "/student/certificates", label: "Certificates", short: "Certs", match: ["/student/certificate"] },
      { href: "/student/saved", label: "Saved & notes", short: "Saved" },
    ],
  },
  {
    label: "Support",
    items: [
      { href: "/student/questions", label: "My questions", short: "Q&A" },
      { href: "/student/payments", label: "Payments", short: "Pay" },
      { href: "/student/help", label: "Help", short: "Help" },
    ],
  },
];

export const mentorNav: NavGroup[] = [
  {
    label: "",
    items: [{ href: "/mentor/dashboard", label: "Dashboard" }],
  },
  {
    label: "Queues",
    items: [
      { href: "/mentor/review", label: "Reviews", count: 5 },
      { href: "/mentor/questions", label: "Student questions", count: 3 },
    ],
  },
  {
    label: "Teaching",
    items: [
      { href: "/mentor/batch", label: "My batches" },
      { href: "/mentor/schedule", label: "Schedule & recordings", count: 1 },
    ],
  },
  {
    label: "Content",
    items: [
      {
        href: "/mentor/course-builder",
        label: "Courses",
        match: ["/mentor/quiz-builder"],
      },
    ],
  },
  {
    label: "Help",
    items: [{ href: "/mentor/handbook", label: "Mentor handbook" }],
  },
];

export const adminNav: NavGroup[] = [
  {
    label: "",
    items: [{ href: "/admin/overview", label: "Overview" }],
  },
  {
    label: "Queues",
    items: [
      {
        href: "/admin/courses#cbp-queue",
        label: "Course review",
        count: 3,
        match: ["/admin/course-review", "/admin/courses"],
      },
      { href: "/admin/leads", label: "Seminar leads", count: 6 },
    ],
  },
  {
    label: "People",
    items: [
      {
        href: "/admin/students",
        label: "Students & payments",
        match: ["/admin/student-record"],
      },
      { href: "/admin/mentors", label: "Mentors" },
    ],
  },
  {
    label: "Catalog",
    items: [
      {
        href: "/admin/courses",
        label: "Courses & batches",
        match: ["/admin/batch-detail", "/admin/batch-edit"],
      },
      { href: "/admin/coupons", label: "Coupons & referrals" },
    ],
  },
  {
    label: "Communication",
    items: [{ href: "/admin/announcements", label: "Announcements" }],
  },
  {
    label: "System",
    items: [
      { href: "/admin/settings", label: "Settings" },
      { href: "/admin/roles", label: "Roles & access" },
      { href: "/admin/activity", label: "Activity log" },
    ],
  },
];

export const PLACEHOLDER_LINKS = {
  supportPhone: "[SUPPORT PHONE]",
  directorName: "[DIRECTOR NAME]",
  smsProvider: "[SMS PROVIDER]",
  whatsapp: "https://wa.me/",
} as const;

export function isNavCurrent(pathname: string, item: NavItem): boolean {
  const path = pathname.split("#")[0];
  const hrefPath = item.href.split("#")[0];
  if (path === hrefPath) return true;
  return (item.match || []).some((m) => path === m || path.startsWith(m + "/"));
}
