import type { LessonId } from "@/lib/student/saved-library";
import { CodeXml,FolderClosed,MousePointer2 } from "lucide-react";
import s from "./saved.module.css";

export function LessonCover({ lesson }: { lesson: LessonId }) {
  if (lesson === "header" || lesson === "scripts") {
    return (
      <div className={`${s.cover} ${s.headerArt}`} aria-hidden="true">
        <div className={s.window}>
          <div className={s.windowBar}>
            <i />
            <i />
            <i />
          </div>
          <div className={s.miniNav}>
            <CodeXml size={22} />
            <b />
            <b />
            <b />
          </div>
          <div className={s.wireframe}>
            <i />
            <i />
            <i />
          </div>
          <MousePointer2 className={s.pointer} size={30} fill="var(--lime)" />
        </div>
      </div>
    );
  }
  if (lesson === "templates") {
    return (
      <div className={`${s.cover} ${s.templateArt}`} aria-hidden="true">
        <div className={s.fileTree}>
          <span>
            <FolderClosed size={15} /> theme
          </span>
          <div>
            <code>index.php</code>
            <code>single.php</code>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`${s.cover} ${s.gridArt}`} aria-hidden="true">
      <div className={s.poster}>
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
