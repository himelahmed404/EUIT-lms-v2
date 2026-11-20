"use client";
import { NoteEditor } from "./NoteEditor";
import { SavedLessonCard } from "./SavedLessonCard";
import { SavedNoteCard } from "./SavedNoteCard";

import {
createNote,
lessons,
updateLibrary,
useLibrary,
type LessonId,
type StudyNote,
} from "@/lib/student/saved-library";
import {
ArrowUpRight,
Bookmark,
NotebookPen,
Plus,
Search,
X,
} from "lucide-react";
import Link from "next/link";
import { useRef,useState } from "react";
import s from "./saved.module.css";

const icon = { size: 17, strokeWidth: 1.7, "aria-hidden": true } as const;
const views = ["All items", "Lessons", "Notes"] as const;
type View = (typeof views)[number];
type Notice = { message: string; undo?: () => boolean };
const storageError =
  "Couldn’t save this change. Allow browser storage and try again.";

export function SavedLibrary() {
  const library = useLibrary();
  const [view, setView] = useState<View>("All items");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const search = useRef<HTMLInputElement>(null);
  const newNoteButton = useRef<HTMLButtonElement>(null);
  const needle = query.trim().toLocaleLowerCase();
  const matches = (parts: string[]) =>
    parts.join(" ").toLocaleLowerCase().includes(needle);
  const bookmarks =
    view === "Notes"
      ? []
      : library.bookmarks.filter((id) => {
          const { title, course, unit } = lessons[id];
          return matches([title, course, unit]);
        });
  const notes =
    view === "Lessons"
      ? []
      : library.notes.filter((note) => {
          const source = note.lesson && lessons[note.lesson];
          return matches([
            note.text,
            source ? source.title : "Personal note",
            source ? source.course : "",
            source ? source.unit : "",
            note.time,
          ]);
        });
  const counts = [
    library.bookmarks.length + library.notes.length,
    library.bookmarks.length,
    library.notes.length,
  ];

  function closeEditor() {
    setEditing(null);
    requestAnimationFrame(() => {
      const trigger = editing && document.getElementById("edit-" + editing);
      (trigger || newNoteButton.current)?.focus();
    });
  }
  function startEditor(id: string) {
    setNotice(null);
    setEditing(id);
  }
  function saveNote(text: string, lesson: LessonId | null) {
    const isNew = editing === "new";
    const ok = updateLibrary((state) => ({
      ...state,
      notes: isNew
        ? [createNote(text, lesson), ...state.notes]
        : state.notes.map((note) =>
            note.id === editing ? { ...note, text } : note,
          ),
    }));
    setNotice({ message: ok ? "Note saved." : storageError });
    if (ok) {
      if (isNew) {
        setQuery("");
        setView("Notes");
      }
      closeEditor();
    }
  }
  function removeBookmark(id: LessonId) {
    const index = library.bookmarks.indexOf(id);
    const ok = updateLibrary((state) => ({
      ...state,
      bookmarks: state.bookmarks.filter((key) => key !== id),
    }));
    setNotice(
      ok
        ? {
            message: "Lesson removed from saved.",
            undo: () =>
              updateLibrary((state) => {
                const bookmarks = [...state.bookmarks];
                if (!bookmarks.includes(id)) bookmarks.splice(index, 0, id);
                return { ...state, bookmarks };
              }),
          }
        : { message: storageError },
    );
  }
  function removeNote(note: StudyNote) {
    const index = library.notes.findIndex((n) => n.id === note.id);
    const ok = updateLibrary((state) => ({
      ...state,
      notes: state.notes.filter((n) => n.id !== note.id),
    }));
    setNotice(
      ok
        ? {
            message: "Note deleted.",
            undo: () =>
              updateLibrary((state) => {
                const notes = [...state.notes];
                if (!notes.some((n) => n.id === note.id))
                  notes.splice(index, 0, note);
                return { ...state, notes };
              }),
          }
        : { message: storageError },
    );
  }
  return (
    <main className={s.library}>
      <header className={s.heading}>
        <div>
          <h1 className="student-page-title">Saved &amp; notes</h1>
          <p>Your bookmarked lessons and personal study notes.</p>
        </div>
        <button
          type="button"
          className={s.primary}
          ref={newNoteButton}
          onClick={() => startEditor("new")}
        >
          <Plus {...icon} /> New note
        </button>
      </header>
      <div className={s.toolbar}>
        <div className={s.switcher} role="group" aria-label="Show saved items">
          {views.map((name, i) => (
            <button
              key={name}
              type="button"
              aria-pressed={view === name}
              onClick={() => setView(name)}
            >
              {name} <span>{counts[i]}</span>
            </button>
          ))}
        </div>
        <div className={s.search}>
          <Search {...icon} />
          <input
            ref={search}
            type="search"
            aria-label="Search saved lessons and notes"
            placeholder="Search your library"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                search.current?.focus();
              }}
            >
              <X {...icon} />
            </button>
          )}
        </div>
      </div>
      {editing === "new" && (
        <NoteEditor onSave={saveNote} onCancel={closeEditor} />
      )}
      {bookmarks.length > 0 && (
        <section
          data-motion-intro=""
          className={s.section}
          aria-labelledby="saved-lessons"
        >
          <h2 id="saved-lessons">
            <Bookmark {...icon} /> Saved lessons
          </h2>
          <div className={s.cards}>
            {bookmarks.map((id) => (
              <SavedLessonCard
                key={id}
                id={id}
                removeBookmark={removeBookmark}
              />
            ))}
          </div>
        </section>
      )}
      {notes.length > 0 && (
        <section
          data-motion-intro=""
          className={s.section}
          aria-labelledby="library-notes"
        >
          <h2 id="library-notes">
            <NotebookPen {...icon} /> My notes
          </h2>
          <div className={s.notes}>
            {notes.map((note) => (
              <SavedNoteCard
                key={note.id}
                note={note}
                editing={editing}
                saveNote={saveNote}
                closeEditor={closeEditor}
                startEditor={startEditor}
                removeNote={removeNote}
              />
            ))}
          </div>
        </section>
      )}
      {!notes.length && !bookmarks.length && editing !== "new" && (
        <div className={s.empty}>
          <Search {...icon} size={25} />
          <h2>
            {needle
              ? "No matching items"
              : view === "Notes"
                ? "No notes yet"
                : view === "Lessons"
                  ? "No saved lessons yet"
                  : "Your library is empty"}
          </h2>
          <p>
            {needle
              ? "Try a different lesson title, course or word from a note."
              : view === "Notes"
                ? "Write a note here or from a lesson."
                : "Bookmark a lesson from your course to keep it here."}
          </p>
          {needle ? (
            <button
              type="button"
              className={s.quietButton}
              onClick={() => {
                setQuery("");
                search.current?.focus();
              }}
            >
              Clear search
            </button>
          ) : view === "Notes" ? (
            <button
              className={s.quietButton}
              onClick={() => startEditor("new")}
            >
              Write a note
            </button>
          ) : (
            <Link href="/student/courses">
              Go to my courses <ArrowUpRight {...icon} />
            </Link>
          )}
        </div>
      )}
      {notice && (
        <div className={s.notice}>
          <span role="status">{notice.message}</span>
          {notice.undo && (
            <button
              onClick={() =>
                setNotice({
                  message: notice.undo?.() ? "Restored." : storageError,
                })
              }
            >
              Undo
            </button>
          )}
          <button aria-label="Dismiss message" onClick={() => setNotice(null)}>
            <X {...icon} />
          </button>
        </div>
      )}
    </main>
  );
}
