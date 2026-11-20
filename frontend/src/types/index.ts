export type Role = "student" | "mentor" | "admin";

export type ThemeMode = "light" | "dark";

export interface Person {
  id: string;
  name: string;
  role: Role;
  email?: string;
  phone?: string;
  title?: string;
}

export interface Student extends Person {
  role: "student";
  studentId: string;
  points: number;
  rank?: number;
  cohortSize?: number;
  accessPaused?: boolean;
}

export interface Mentor extends Person {
  role: "mentor";
}

export interface Admin extends Person {
  role: "admin";
  title: string;
}

export interface Batch {
  id: string;
  name: string;
  course: string;
  format: "online" | "offline";
  mentorName: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  when: string;
  href: string;
  unread: boolean;
  type: string;
}
