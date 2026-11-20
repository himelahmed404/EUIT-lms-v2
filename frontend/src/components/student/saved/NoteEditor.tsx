"use client";
import {
lessons,
type LessonId,
type StudyNote,
} from "@/lib/student/saved-library";
import { Check } from "lucide-react";
import { useState,type FormEvent } from "react";
import s from "./saved.module.css";
const icon = { size: 17, strokeWidth: 1.7, "aria-hidden": true } as const;
export function NoteEditor({
  note,
  onSave,
  onCancel,
}: {
  note?: StudyNote;
  onSave: (text: string, lesson: LessonId | null) => void;
  onCancel: () => void;
}) {
  const [body, setBody] = useState(note?.text ?? "");
  const [source, setSource] = useState<LessonId | "">(note?.lesson ?? "");
  function submit(event: FormEvent) {
    event.preventDefault();
    if (body.trim()) onSave(body.trim(), source || null);
  }
  return (
    <form data-motion-reveal="" className={s.editor} onSubmit={submit}>
      <label htmlFor="library-note">{note ? "Edit note" : "New note"}</label>
      <textarea
        autoFocus
        id="library-note"
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What do you want to remember?"
        required
      />
      <div className={s.editorFoot}>
        {!note && (
          <label className={s.source}>
            Attach to
            <select
              value={source}
              onChange={(e) => setSource(e.target.value as LessonId | "")}
            >
              <option value="">Personal notes</option>
              {Object.entries(lessons).map(([id, lesson]) => (
                <option key={id} value={id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </label>
        )}
        <div className={s.actions}>
          <button className={s.quietButton} type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className={s.primary} disabled={!body.trim()}>
            <Check {...icon} /> Save note
          </button>
        </div>
      </div>
    </form>
  );
}
