export type ScheduleEvent = {
  date: string;
  course: string;
  kind: "campus" | "online" | "deadline";
  label: string;
  title: string;
  time?: string;
  place: string;
  status?: string;
  href: string;
  action: string;
};
export const today = "2026-10-15";
export const courses: Record<string, string> = {
  wordpress: "WordPress",
  design: "Graphic Design",
};
export const schedule: ScheduleEvent[] = [
  {
    date: "2026-10-01",
    course: "wordpress",
    kind: "campus",
    label: "Class 8",
    title: "WordPress · Class 8",
    time: "7:00–9:00 PM",
    place: "Lab 2, Mirpur-10",
    status: "Present",
    href: "/student/course-offline",
    action: "Open classes",
  },
  {
    date: "2026-10-05",
    course: "wordpress",
    kind: "campus",
    label: "Class 9",
    title: "Theme folder structure",
    time: "7:00–9:00 PM",
    place: "Lab 2, Mirpur-10",
    status: "Present",
    href: "/student/course-offline#cl-9",
    action: "Open classes",
  },
  {
    date: "2026-10-07",
    course: "design",
    kind: "online",
    label: "Live 6",
    title: "Grids and layout",
    time: "8:00–9:30 PM",
    place: "Zoom",
    status: "Present",
    href: "/student/course-player",
    action: "Open live course",
  },
  {
    date: "2026-10-08",
    course: "wordpress",
    kind: "campus",
    label: "Class 10",
    title: "Template hierarchy",
    time: "7:00–9:00 PM",
    place: "Lab 2, Mirpur-10",
    status: "Late",
    href: "/student/course-offline#cl-10",
    action: "Open classes",
  },
  {
    date: "2026-10-12",
    course: "wordpress",
    kind: "campus",
    label: "Class 11",
    title: "Enqueueing scripts",
    time: "7:00–9:00 PM",
    place: "Lab 2, Mirpur-10",
    status: "Present",
    href: "/student/course-offline#cl-11",
    action: "Open classes",
  },
  {
    date: "2026-10-14",
    course: "design",
    kind: "online",
    label: "Live 7",
    title: "Colour and contrast",
    time: "8:00–9:30 PM",
    place: "Zoom",
    status: "Present",
    href: "/student/course-player",
    action: "Open live course",
  },
  {
    date: "2026-10-15",
    course: "wordpress",
    kind: "campus",
    label: "Class 12",
    title: "Custom header walkthrough",
    time: "7:00–9:00 PM",
    place: "Lab 2, Mirpur-10",
    status: "Present",
    href: "/student/course-offline#cl-12",
    action: "Open classes",
  },
  {
    date: "2026-10-19",
    course: "wordpress",
    kind: "campus",
    label: "Class 13",
    title: "Navigation menus",
    time: "7:00–9:00 PM",
    place: "Lab 2, Mirpur-10",
    status: "Upcoming",
    href: "/student/course-offline#cl-13",
    action: "Open classes",
  },
  {
    date: "2026-10-21",
    course: "design",
    kind: "online",
    label: "Live 8",
    title: "Typography for social posts",
    time: "8:00–9:30 PM",
    place: "Zoom",
    status: "Upcoming",
    href: "/student/course-player",
    action: "Open live course",
  },
  {
    date: "2026-10-22",
    course: "wordpress",
    kind: "campus",
    label: "Class 14",
    title: "Custom post types",
    time: "7:00–9:00 PM",
    place: "Lab 2, Mirpur-10",
    status: "Upcoming",
    href: "/student/course-offline",
    action: "Open classes",
  },
  {
    date: "2026-10-26",
    course: "wordpress",
    kind: "campus",
    label: "Class 15",
    title: "WordPress · Class 15",
    time: "7:00–9:00 PM",
    place: "Lab 2, Mirpur-10",
    status: "Upcoming",
    href: "/student/course-offline",
    action: "Open classes",
  },
  {
    date: "2026-10-27",
    course: "design",
    kind: "deadline",
    label: "Project due",
    title: "Social media post set",
    time: "11:59 PM",
    place: "Milestone 2 project",
    href: "/student/project-detail",
    action: "Open project brief",
  },
  {
    date: "2026-10-28",
    course: "design",
    kind: "online",
    label: "Live 9",
    title: "Graphic Design · Live 9",
    time: "8:00–9:30 PM",
    place: "Zoom",
    status: "Upcoming",
    href: "/student/course-player",
    action: "Open live course",
  },
  {
    date: "2026-10-29",
    course: "wordpress",
    kind: "campus",
    label: "Class 16",
    title: "WordPress · Class 16",
    time: "7:00–9:00 PM",
    place: "Lab 2, Mirpur-10",
    status: "Upcoming",
    href: "/student/course-offline",
    action: "Open classes",
  },
  {
    date: "2026-11-15",
    course: "wordpress",
    kind: "deadline",
    label: "Payment due",
    title: "Installment 2 of 3",
    place: "৳5,000",
    href: "/student/payments",
    action: "View payments",
  },
];
export const selectedDate =
  schedule.find((event) => event.kind !== "deadline" && event.date > today)
    ?.date ?? today;
export const months = [
  ...new Set([
    today.slice(0, 7),
    ...schedule.map((event) => event.date.slice(0, 7)),
  ]),
].sort();
export function displayDate(iso: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-GB", {
    ...options,
    timeZone: "UTC",
  }).format(new Date(iso + "T12:00:00Z"));
}
