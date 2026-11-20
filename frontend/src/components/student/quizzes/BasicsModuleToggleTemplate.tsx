import { StudentIcon } from "@/components/student/shared/StudentIcon";
import { StudentTemplate } from "@/components/student/shared/StudentTemplate";

export function BasicsModuleToggleTemplate() {
  return (
    <StudentTemplate
      id="rvlook5"
      data-style="width: 100%; display: flex; align-items: center; gap: 14px; padding: 18px 20px; border: 0px; background: transparent; font: inherit; color: var(--ink); cursor: pointer; text-align: left;"
    >
      <span className="p-mono" style={{ color: "var(--cyan-ink)" }}>
        01
      </span>
      <span
        className="p-grow"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <strong style={{ fontSize: "16px" }}>Getting started</strong>
        <span className="p-small">
          Classes 1–4 · 4 of 4 quizzes done · 4 full marks
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
        +40 pts
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
