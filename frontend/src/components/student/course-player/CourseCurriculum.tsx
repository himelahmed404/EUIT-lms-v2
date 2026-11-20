import { StudentIcon } from "@/components/student/shared/StudentIcon";
import { ColourAndTypeLessons } from "./ColourAndTypeLessons";
import { FoundationsLessons } from "./FoundationsLessons";
import { LiveSessionList } from "./LiveSessionList";

export function CourseCurriculum() {
  return (
    <aside
      className="p-card p-card--flush"
      aria-labelledby="curr-title"
      style={{
        flex: "1 1 340px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "20px 20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <h2 id="curr-title" className="p-h3">
          Course content
        </h2>
        <div className="p-row" style={{ justifyContent: "space-between" }}>
          <span className="p-small">7 of 40 lessons</span>
          <strong style={{ fontSize: "14px" }}>18%</strong>
        </div>
        <div className="p-bar p-bar--thin" role="img" aria-label="18% complete">
          <span style={{ width: "18%" }} />
        </div>
      </div>
      <div style={{ padding: "16px 20px 0px" }}>
        <div className="p-notice" style={{ fontSize: "13px" }}>
          <StudentIcon width="18" height="18">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-5" />
            <path d="M12 8h.01" />
          </StudentIcon>
          <span>
            Lessons open in order: finish each video to unlock the next. Every
            lesson ends with a quiz, and a module opens only when all quizzes
            before it are taken.
          </span>
        </div>
      </div>
      <div
        style={{
          padding: "12px 8px 16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          type="button"
          aria-expanded="true"
          data-panel="pl-live"
          className="pl-mod"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minHeight: "52px",
            padding: "0px 12px",
            border: "0px",
            background: "transparent",
            textAlign: "left",
            font: "inherit",
            cursor: "pointer",
            borderRadius: "var(--radius-md)",
            color: "var(--ink)",
          }}
        >
          <span style={{ color: "var(--cyan-deep)" }}>
            <StudentIcon width="20" height="20">
              <circle cx="12" cy="12" r="10" />
              <path d="M10 8l6 4-6 4z" />
            </StudentIcon>
          </span>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "14px" }}>Live sessions</strong>
            <span className="p-small">
              Live 8 coming up · Live 7 recording ready
            </span>
          </span>
          <StudentIcon width="18" height="18">
            <path d="M6 9l6 6 6-6" />
          </StudentIcon>
        </button>
        <LiveSessionList />
        <button
          type="button"
          aria-expanded="false"
          data-panel="pl-mod-1"
          className="pl-mod"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minHeight: "52px",
            padding: "0px 12px",
            border: "0px",
            background: "transparent",
            textAlign: "left",
            font: "inherit",
            cursor: "pointer",
            borderRadius: "var(--radius-md)",
            color: "var(--ink)",
          }}
        >
          <span style={{ color: "var(--success)" }}>
            <StudentIcon width="20" height="20">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12.5l2.7 2.7L16.5 9.5" />
            </StudentIcon>
          </span>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "14px" }}>1 · Foundations</strong>
            <span className="p-small">All lessons and quizzes done</span>
          </span>
          <StudentIcon width="18" height="18">
            <path d="M6 9l6 6 6-6" />
          </StudentIcon>
        </button>
        <FoundationsLessons />
        <button
          type="button"
          aria-expanded="true"
          data-panel="pl-mod-2"
          className="pl-mod"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minHeight: "52px",
            padding: "0px 12px",
            border: "0px",
            background: "transparent",
            textAlign: "left",
            font: "inherit",
            cursor: "pointer",
            borderRadius: "var(--radius-md)",
            color: "var(--ink)",
          }}
        >
          <span style={{ color: "var(--cyan-deep)" }}>
            <StudentIcon width="20" height="20">
              <circle cx="12" cy="12" r="10" />
              <path d="M10 8l6 4-6 4z" />
            </StudentIcon>
          </span>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "14px" }}>2 · Colour &amp; type</strong>
            <span className="p-small">
              In progress · 2 quizzes left after this lesson
            </span>
          </span>
          <StudentIcon width="18" height="18">
            <path d="M6 9l6 6 6-6" />
          </StudentIcon>
        </button>
        <ColourAndTypeLessons />
        <button
          type="button"
          aria-disabled="true"
          title="Locked"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minHeight: "52px",
            padding: "0px 12px",
            border: "0px",
            background: "transparent",
            textAlign: "left",
            font: "inherit",
            cursor: "not-allowed",
            borderRadius: "var(--radius-md)",
            color: "var(--ink-3)",
          }}
        >
          <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "14px", color: "var(--ink-2)" }}>
              3 · Social media design
            </strong>
            <span className="p-small">
              Opens when all Module 2 quizzes are taken
            </span>
          </span>
        </button>
        <button
          type="button"
          aria-disabled="true"
          title="Locked"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minHeight: "52px",
            padding: "0px 12px",
            border: "0px",
            background: "transparent",
            textAlign: "left",
            font: "inherit",
            cursor: "not-allowed",
            borderRadius: "var(--radius-md)",
            color: "var(--ink-3)",
          }}
        >
          <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "14px", color: "var(--ink-2)" }}>
              4 · Brand identity
            </strong>
            <span className="p-small">Opens after Module 3</span>
          </span>
        </button>
        <button
          type="button"
          aria-disabled="true"
          title="Locked"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minHeight: "52px",
            padding: "0px 12px",
            border: "0px",
            background: "transparent",
            textAlign: "left",
            font: "inherit",
            cursor: "not-allowed",
            borderRadius: "var(--radius-md)",
            color: "var(--ink-3)",
          }}
        >
          <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "14px", color: "var(--ink-2)" }}>
              5 · Portfolio &amp; client briefs
            </strong>
            <span className="p-small">Opens after Module 4</span>
          </span>
        </button>
      </div>
    </aside>
  );
}
