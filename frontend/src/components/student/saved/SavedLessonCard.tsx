"use client";
import { lessons,type LessonId } from "@/lib/student/saved-library";
import { ArrowUpRight,Bookmark,Clock3 } from "lucide-react";
import Link from "next/link";
import { LessonCover } from "./LessonCover";
import s from "./saved.module.css";
const icon = { size: 17, strokeWidth: 1.7, "aria-hidden": true } as const;
export function SavedLessonCard({
  id,
  removeBookmark,
}: {
  id: LessonId;
  removeBookmark: (id: LessonId) => void;
}) {
  const l = lessons[id];
  return (
    <article data-motion-card="" className={s.card}>
      <LessonCover lesson={id} />
      <button
        type="button"
        className={s.bookmark}
        aria-label={`Remove ${l.title} from saved lessons`}
        title="Remove bookmark"
        onClick={() => removeBookmark(id)}
      >
        <Bookmark {...icon} fill="currentColor" />
      </button>
      <div className={s.lessonBody}>
        <p className={s.meta}>
          {l.course}
          <span>·</span>
          {l.unit}
        </p>
        <h3>
          <Link href={l.href}>{l.title}</Link>
        </h3>
        <div className={s.cardFoot}>
          <span>
            <Clock3 {...icon} size={14} /> {l.playback}
          </span>
          <Link href={l.href} aria-label={`${l.action}: ${l.title}`}>
            {l.action}
            <ArrowUpRight {...icon} size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
