import { DemoLesson } from "@/content/student/demo-course-data";

type Props = {
  currentLesson: DemoLesson;
  onPreviousLesson?: () => void;
  onNextLesson?: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
};

export function LessonQuizPrompt({
  currentLesson,
  onPreviousLesson,
  onNextLesson,
  hasPrevious,
  hasNext,
}: Props) {
  return (
    <section
      className="p-card"
      data-player-gate=""
      aria-label="Lesson navigation"
      style={{
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <span className="p-tile p-tile--muted" data-player-gate-icon="">
        <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </span>
      <div
        style={{
          flex: "1 1 260px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <strong
          style={{ fontSize: "15px" }}
          data-player-gate-title=""
          aria-live="polite"
        >
          {hasNext
            ? `Next: Lesson ${currentLesson.number + 1} unlocks after this video`
            : "Final demo lesson · You have explored all 3 showcase videos"}
        </strong>
        <div
          className="p-bar p-bar--thin"
          role="img"
          aria-label={`Lesson ${currentLesson.number} of 3`}
        >
          <span
            style={{ width: `${(currentLesson.number / 3) * 100}%` }}
            data-player-gate-bar=""
          />
        </div>
        <span className="p-small" data-player-left="">
          Demo progress: {currentLesson.number} of 3 lessons active
        </span>
      </div>
      <div className="p-row" style={{ flexWrap: "wrap", gap: "8px" }}>
        <button
          className="p-ghostbtn"
          type="button"
          disabled={!hasPrevious}
          onClick={onPreviousLesson}
          style={{
            cursor: hasPrevious ? "pointer" : "not-allowed",
            opacity: hasPrevious ? 1 : 0.5,
          }}
        >
          Previous lesson
        </button>
        <button
          className="p-ghostbtn"
          type="button"
          disabled={!hasNext}
          onClick={onNextLesson}
          style={{
            cursor: hasNext ? "pointer" : "not-allowed",
            opacity: hasNext ? 1 : 0.5,
          }}
          data-player-next=""
        >
          Next lesson
          <svg
            className="p-icon p-icon--sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ marginLeft: "4px" }}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
