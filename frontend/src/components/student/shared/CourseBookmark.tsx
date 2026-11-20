"use client";
import {
updateLibrary,
useLibrary,
type LessonId,
} from "@/lib/student/saved-library";
import { Bookmark } from "lucide-react";
import { useState } from "react";
const storageError =
  "Couldn’t save this change. Allow browser storage and try again.";
export function CourseBookmark({ lesson }: { lesson: LessonId }) {
  const saved = useLibrary().bookmarks.includes(lesson);
  const [error, setError] = useState("");
  return (
    <div>
      <button
        type="button"
        className="p-ghostbtn cp-save"
        aria-label="Save this lesson"
        aria-pressed={saved}
        onClick={(event) => {
          event.stopPropagation();
          const ok = updateLibrary((state) => ({
            ...state,
            bookmarks: state.bookmarks.includes(lesson)
              ? state.bookmarks.filter((id) => id !== lesson)
              : [lesson, ...state.bookmarks],
          }));
          setError(ok ? "" : storageError);
        }}
      >
        <Bookmark size={16} strokeWidth={1.7} aria-hidden="true" />
        <span>{saved ? "Saved" : "Save"}</span>
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
