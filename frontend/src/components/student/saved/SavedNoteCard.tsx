"use client";
import {
lessons,
noteDate,
type LessonId,
type StudyNote,
} from "@/lib/student/saved-library";
import { ArrowUpRight,Clock3,Pencil,Trash2 } from "lucide-react";
import Link from "next/link";
import { NoteEditor } from "./NoteEditor";
import s from "./saved.module.css";
const icon = { size: 17, strokeWidth: 1.7, "aria-hidden": true } as const;
export function SavedNoteCard({
  note,
  editing,
  saveNote,
  closeEditor,
  startEditor,
  removeNote,
}: {
  note: StudyNote;
  editing: string | null;
  saveNote: (text: string, lesson: LessonId | null) => void;
  closeEditor: () => void;
  startEditor: (id: string) => void;
  removeNote: (note: StudyNote) => void;
}) {
  const l = note.lesson && lessons[note.lesson];
  const title = l ? l.title : "Personal note";
  return (
    <article id={note.id} className={s.note}>
      {editing === note.id ? (
        <NoteEditor note={note} onSave={saveNote} onCancel={closeEditor} />
      ) : (
        <>
          <div className={s.context}>
            <p className={s.meta}>
              {l ? l.course : "Notebook"}
              {l && (
                <>
                  <span>·</span>
                  {l.unit}
                </>
              )}
            </p>
            <h3>
              {l ? (
                <Link href={l.href}>
                  {title}
                  <ArrowUpRight {...icon} size={14} />
                </Link>
              ) : (
                title
              )}
            </h3>
            <div className={s.noteMeta}>
              <time dateTime={note.date}>{noteDate(note.date)}</time>
              {note.time && (
                <span>
                  <Clock3 {...icon} size={13} />
                  {note.time}
                </span>
              )}
            </div>
          </div>
          <p className={s.noteText}>{note.text}</p>
          <div className={s.noteActions}>
            <button
              type="button"
              aria-label={`Edit note on ${title}`}
              title="Edit note"
              id={"edit-" + note.id}
              onClick={() => startEditor(note.id)}
            >
              <Pencil {...icon} />
            </button>
            <button
              type="button"
              aria-label={`Delete note on ${title}`}
              title="Delete note"
              onClick={() => removeNote(note)}
            >
              <Trash2 {...icon} />
            </button>
          </div>
        </>
      )}
    </article>
  );
}
