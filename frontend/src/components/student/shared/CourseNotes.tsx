"use client";

import {
createNote,
lessons,
noteDate,
updateLibrary,
useLibrary,
type LessonId,
} from "@/lib/student/saved-library";
import Link from "next/link";
import { useState,type FormEvent } from "react";

const storageError =
  "Couldn’t save this change. Allow browser storage and try again.";

type Source = "scripts" | "colour";
function relevant(lesson: LessonId | null, source: Source) {
  return lesson === source || (source === "colour" && lesson === "liveColour");
}
export function CourseNoteCount({ source }: { source: Source }) {
  return useLibrary().notes.filter((note) => relevant(note.lesson, source))
    .length;
}

function playbackTime(source: Source) {
  if (source === "colour")
    return (
      document
        .querySelector("[data-player-time]")
        ?.textContent?.split("/")[0]
        .trim() || "11:36"
    );
  const seconds =
    document.querySelector<HTMLInputElement>('#cl-11 input[type="range"]')
      ?.valueAsNumber ?? 1458;
  return Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
}
export function CourseNotes({ source }: { source: Source }) {
  const notes = useLibrary().notes.filter((note) =>
    relevant(note.lesson, source),
  );
  const [text, setText] = useState("");
  const [time, setTime] = useState(source === "scripts" ? "24:18" : "11:36");
  const [status, setStatus] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!text.trim()) return;
    const note = createNote(text, source, time);
    const ok = updateLibrary((state) => ({
      ...state,
      notes: [note, ...state.notes],
    }));
    setStatus(ok ? "Note saved to Saved & notes." : storageError);
    if (ok) setText("");
  }
  return (
    <>
      <form style={{ display: "grid", gap: 10 }} onSubmit={submit}>
        <label className="p-label" htmlFor="note-text">
          Note at {time}
        </label>
        <textarea
          id="note-text"
          className="p-textarea"
          rows={3}
          placeholder="Write a note about this part of the lesson."
          value={text}
          onFocus={() => {
            if (!text) setTime(playbackTime(source));
          }}
          onChange={(event) => {
            setText(event.target.value);
            setStatus("");
          }}
          required
        />
        <div className="p-row" style={{ justifyContent: "flex-end" }}>
          <span role="status" className="p-small">
            {status}
          </span>
          <button
            type="submit"
            className="eit-btn eit-btn--primary eit-btn--md"
            disabled={!text.trim()}
          >
            Save note
          </button>
        </div>
      </form>
      <div
        className="p-row"
        style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}
      >
        <span className="p-mono">
          Your notes on this {source === "scripts" ? "class" : "course"}
        </span>
        <Link className="p-link" href="/student/saved">
          All your notes
        </Link>
      </div>
      {notes.map((note) => (
        <article
          key={note.id}
          className="p-card"
          style={{
            padding: 16,
            boxShadow: "none",
            background: "var(--surface)",
          }}
        >
          <span className="p-small">
            {note.lesson && lessons[note.lesson].unit}
            {note.time && " · " + note.time} · {noteDate(note.date)}
          </span>
          <p
            className="p-body"
            style={{
              margin: "4px 0 0",
              fontSize: 14,
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
            }}
          >
            {note.text}
          </p>
        </article>
      ))}
    </>
  );
}
