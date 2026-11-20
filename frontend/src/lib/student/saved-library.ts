"use client";

import { useMemo, useSyncExternalStore } from "react";

export const lessons = {
  header: {
    title: "Building a custom header",
    course: "WordPress",
    unit: "Class 12",
    playback: "11:36 / 18:00",
    href: "/student/course-offline#cl-12",
    action: "Open class",
  },
  templates: {
    title: "The template hierarchy",
    course: "WordPress",
    unit: "Class 10",
    playback: "Watched · 16:45",
    href: "/student/course-offline#cl-10",
    action: "Open class",
  },
  grids: {
    title: "Grids and layout",
    course: "Graphic Design",
    unit: "Live 6",
    playback: "Watched · 1:30:41",
    href: "/student/routine?date=2026-10-07",
    action: "View class",
  },
  scripts: {
    title: "Enqueueing styles and scripts",
    course: "WordPress",
    unit: "Class 11",
    playback: "1:52:10",
    href: "/student/course-offline#cl-11",
    action: "Open class",
  },
  liveColour: {
    title: "Colour and contrast",
    course: "Graphic Design",
    unit: "Live 7",
    playback: "1:30:41",
    href: "/student/routine?date=2026-10-14",
    action: "View class",
  },
  colour: {
    title: "Colour and contrast for social posts",
    course: "Graphic Design",
    unit: "Lesson 7",
    playback: "18:00",
    href: "/student/course-player",
    action: "Open lesson",
  },
} as const;

export type LessonId = keyof typeof lessons;
export type StudyNote = {
  id: string;
  lesson: LessonId | null;
  text: string;
  date: string;
  time: string;
};
type Library = { bookmarks: LessonId[]; notes: StudyNote[] };

const initial: Library = {
  bookmarks: ["header", "templates", "grids"],
  notes: [
    {
      id: "sv-n1",
      lesson: "header",
      date: "2026-10-15",
      time: "6:10",
      text: "Register the menu in functions.php first, then call wp_nav_menu() in header.php with the same theme location.",
    },
    {
      id: "sv-n2",
      lesson: "scripts",
      date: "2026-10-12",
      time: "8:15",
      text: "Load the theme’s own stylesheet with get_stylesheet_uri(), and remove the old link tag from header.php so it doesn’t load twice.",
    },
    {
      id: "sv-n3",
      lesson: "liveColour",
      date: "2026-10-14",
      time: "40:12",
      text: "Small text on a post needs 4.5:1 contrast. Check the caption colour on the light coffee background before exporting.",
    },
  ],
};

const key = "eit.library.EIT-24-0148.v1";
const changed = "eit-library-change";
function snapshot() {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function isLesson(value: unknown): value is LessonId {
  return typeof value === "string" && Object.hasOwn(lessons, value);
}
function decode(raw: string | null): Library {
  if (!raw) return initial;
  try {
    const value = JSON.parse(raw);
    if (Array.isArray(value.bookmarks) && Array.isArray(value.notes)) {
      return {
        bookmarks: value.bookmarks.filter(isLesson),
        notes: value.notes.filter(
          (n: StudyNote) =>
            n &&
            typeof n.id === "string" &&
            typeof n.text === "string" &&
            /^\d{4}-\d{2}-\d{2}$/.test(n.date) &&
            typeof n.time === "string" &&
            (n.lesson === null || isLesson(n.lesson)),
        ),
      };
    }
  } catch {
    /* Start from the sample library if storage is unreadable. */
  }
  return initial;
}
function subscribe(listener: () => void) {
  window.addEventListener(changed, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(changed, listener);
    window.removeEventListener("storage", listener);
  };
}
export function useLibrary() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  return useMemo(() => decode(raw), [raw]);
}
export function updateLibrary(change: (state: Library) => Library) {
  try {
    localStorage.setItem(key, JSON.stringify(change(decode(snapshot()))));
  } catch {
    return false;
  }
  window.dispatchEvent(new Event(changed));
  return true;
}
export function createNote(
  text: string,
  lesson: LessonId | null,
  time = "",
): StudyNote {
  const date = new Date();
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    lesson,
    time,
    date: localDate.toISOString().slice(0, 10),
  };
}
export function noteDate(date: string) {
  return new Date(date + "T12:00:00").toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
  });
}
