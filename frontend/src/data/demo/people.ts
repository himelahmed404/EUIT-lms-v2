import type { Admin, Mentor, Student } from "@/types";

/** Demo "today" is Thursday 15 October 2026 — keep pages consistent. */
export const DEMO_TODAY = "2026-10-15";

export const nusrat: Student = {
  id: "nusrat",
  name: "Nusrat Jahan",
  role: "student",
  studentId: "EIT-24-0148",
  points: 164,
  rank: 3,
  cohortSize: 20,
  phone: "+880 17XXXXXX48",
};

export const mehedi: Student = {
  id: "mehedi",
  name: "Mehedi Hasan",
  role: "student",
  studentId: "EIT-24-0155",
  points: 72,
  rank: 9,
  cohortSize: 20,
  accessPaused: true,
};

export const kamrul: Mentor = {
  id: "kamrul",
  name: "Kamrul Hasan",
  role: "mentor",
};

export const sharmin: Admin = {
  id: "sharmin",
  name: "Sharmin Sultana",
  role: "admin",
  title: "Owner",
};

export const batch14Roster = [
  "Nusrat Jahan",
  "Tanvir Hasan",
  "Mehedi Hasan",
  "Rafiq Islam",
  "Afsana Mim",
  "Arif Hossain",
  "Jannatul Ferdous",
  "Sabbir Ahmed",
] as const;

/** Leaderboard aligned with Batch 14 roster (fixes known demo mismatch). */
export const leaderboard = [
  { name: "Tanvir Hasan", points: 188, rank: 1 },
  { name: "Afsana Mim", points: 171, rank: 2 },
  { name: "Nusrat Jahan", points: 164, rank: 3 },
  { name: "Jannatul Ferdous", points: 152, rank: 4 },
  { name: "Arif Hossain", points: 141, rank: 5 },
  { name: "Sabbir Ahmed", points: 128, rank: 6 },
  { name: "Rafiq Islam", points: 98, rank: 7 },
  { name: "Mehedi Hasan", points: 72, rank: 9 },
] as const;
