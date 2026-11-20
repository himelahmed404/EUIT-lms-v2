import { StudentIcon } from "@/components/student/shared/StudentIcon";

export function QuizToolbar() {
  return (
    <header className="p-top quiz-top">
      <button
        type="button"
        className="p-ghostbtn"
        aria-label="Exit quiz"
        data-open-dialog="exit-quiz"
        aria-haspopup="dialog"
      >
        <StudentIcon width="18" height="18">
          <path d="M18 6L6 18M6 6l12 12" />
        </StudentIcon>
        Exit
      </button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <strong style={{ fontSize: "16px" }}>
          Class 12 quiz · Building a custom header
        </strong>
        <span className="p-small">
          WordPress · Module 3 · all 10 right to pass
        </span>
      </div>
      <div className="p-top-right">
        <span
          className="p-pill"
          role="timer"
          aria-live="off"
          aria-label="12 minutes left"
          style={{
            height: "40px",
            padding: "0px 14px",
            fontSize: "15px",
            fontWeight: "700",
            fontVariantNumeric: "tabular-nums",
            background: "var(--cyan-soft)",
            color: "var(--cyan-deep)",
          }}
          data-countdown=""
        >
          <StudentIcon width="18" height="18">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </StudentIcon>
          12:47
        </span>
        <button
          type="button"
          className="p-ghostbtn"
          data-open-dialog="submit-quiz"
          aria-haspopup="dialog"
        >
          Submit quiz
        </button>
      </div>
    </header>
  );
}
