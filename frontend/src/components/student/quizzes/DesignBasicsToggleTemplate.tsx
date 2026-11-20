import { StudentIcon } from "@/components/student/shared/StudentIcon";
import { StudentTemplate } from "@/components/student/shared/StudentTemplate";

export function DesignBasicsToggleTemplate() {
  return (
    <StudentTemplate
      id="c1rvlook3"
      data-style="width: 100%; display: flex; align-items: center; gap: 14px; padding: 18px 20px; border: 0px; background: transparent; font: inherit; color: var(--ink); cursor: pointer; text-align: left;"
    >
      <span className="p-mono" style={{ color: "var(--cyan-ink)" }}>
        01
      </span>
      <span
        className="p-grow"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <strong style={{ fontSize: "16px" }}>Design basics</strong>
        <span className="p-small">
          Live classes 1–4 · 3 of 3 quizzes done · 2 full marks
        </span>
      </span>
      <span
        className="p-pill"
        style={{
          height: "26px",
          fontSize: "12px",
          background: "var(--success-soft)",
          color: "var(--success)",
          fontWeight: "700",
        }}
      >
        +20 pts
      </span>
      <span
        style={{
          display: "inline-flex",
          transition: "transform 200ms",
          transform: "rotate(180deg)",
        }}
      >
        <StudentIcon width="18" height="18">
          <path d="M6 9l6 6 6-6" />
        </StudentIcon>
      </span>
    </StudentTemplate>
  );
}
