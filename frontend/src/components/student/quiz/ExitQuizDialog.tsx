import Link from "next/link";

export function ExitQuizDialog() {
  return (
    <div className="p-modal-wrap" id="exit-quiz" hidden data-dialog="">
      <div
        className="p-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-quiz-title"
        style={{ width: "min(460px, 100%)" }}
      >
        <div className="p-modal-head">
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span className="p-eyebrow">Class 12 quiz</span>
            <h2 id="exit-quiz-title" className="p-h2">
              Leave the quiz?
            </h2>
          </div>
          <button
            type="button"
            className="p-iconbtn"
            aria-label="Close"
            data-close-dialog=""
          >
            <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="p-body" style={{ margin: "0" }}>
          Your answers so far are saved. The timer keeps running while you are
          away, so come back before it reaches 0:00.
        </p>
        <div className="p-modal-foot">
          <button
            type="button"
            className="eit-btn eit-btn--primary eit-btn--md"
            data-close-dialog=""
          >
            <span className="eit-btn__label">Keep going</span>
          </button>
          <Link className="p-ghostbtn" href="/student/quizzes">
            Leave quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
