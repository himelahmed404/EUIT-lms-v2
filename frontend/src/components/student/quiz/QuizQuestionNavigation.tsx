import { StudentIcon } from "@/components/student/shared/StudentIcon";
import { questions } from "./questions";
const navStyle = {
  height: "44px",
  borderRadius: "12px",
  fontStyle: "inherit",
  fontVariant: "inherit",
  fontStretch: "inherit",
  lineHeight: "inherit",
  fontFamily: "inherit",
  fontOpticalSizing: "inherit",
  fontSizeAdjust: "inherit",
  fontKerning: "inherit",
  fontFeatureSettings: "inherit",
  fontVariationSettings: "inherit",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
  boxSizing: "border-box",
  transition: "transform 150ms",
} as const;
const navStates = {
  answered: {
    background: "#0a1b2c",
    color: "#ffffff",
    border: "2px solid var(--ink)",
  },
  flagged: {
    background: "var(--warning-soft)",
    color: "var(--warning)",
    border: "2px solid var(--warning)",
  },
  current: {
    background: "var(--surface-card)",
    color: "var(--ink-2)",
    border: "2px solid var(--line-control)",
    boxShadow: "0 0 0 3px var(--cyan)",
    transform: "scale(1.06)",
  },
  empty: {
    background: "var(--surface-card)",
    color: "var(--ink-2)",
    border: "2px solid var(--line-control)",
  },
} as const;
export function QuizQuestionNavigation({ number }: { number: number }) {
  return (
    <aside
      className="p-card"
      aria-labelledby="nav-title"
      style={{
        flex: "1 1 280px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h2 id="nav-title" className="p-h3" style={{ fontSize: "16px" }}>
        Questions
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0px, 1fr))",
          gap: "8px",
        }}
      >
        {questions.map((q, i) => {
          const step = i + 1;
          const appearance =
            step === number
              ? "current"
              : step === 3
                ? "flagged"
                : q.selected >= 0
                  ? "answered"
                  : "empty";
          return (
            <button
              key={step}
              type="button"
              aria-label={`Question ${step}, ${q.selected >= 0 ? "answered" : "not answered"}${step === 3 ? ", flagged" : ""}`}
              aria-current={step === number ? "step" : false}
              style={{ ...navStyle, ...navStates[appearance] }}
              data-show-state={"q" + step}
            >
              {step}
            </button>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontSize: "13px",
          color: "var(--ink-2)",
        }}
      >
        <span className="p-row" style={{ gap: "8px" }}>
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "4px",
              background: "var(--ink)",
            }}
          />
          Answered · 3
        </span>
        <span className="p-row" style={{ gap: "8px" }}>
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "4px",
              background: "var(--warning-soft)",
              border: "2px solid var(--warning)",
              boxSizing: "border-box",
            }}
          />
          Flagged to check again
        </span>
        <span className="p-row" style={{ gap: "8px" }}>
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "4px",
              border: "2px solid var(--line-control)",
              boxSizing: "border-box",
            }}
          />
          Not answered
        </span>
      </div>
      <div className="p-notice" style={{ fontSize: "13px" }}>
        <StudentIcon width="18" height="18">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-5" />
          <path d="M12 8h.01" />
        </StudentIcon>
        <span>
          Every class quiz in Module 3 must be taken before Module 4 opens. Get
          all 10 right to pass. Leaderboard points come from project marks.
        </span>
      </div>
    </aside>
  );
}
