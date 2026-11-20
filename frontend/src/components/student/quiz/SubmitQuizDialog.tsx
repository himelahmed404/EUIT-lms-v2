import Link from "next/link";

export function SubmitQuizDialog() {
  return (
    <div className="p-modal-wrap" id="submit-quiz" hidden data-dialog="">
      <div
        className="p-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-quiz-title"
        style={{ width: "min(460px, 100%)" }}
      >
        <div className="p-modal-head">
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span className="p-eyebrow">Class 12 quiz</span>
            <h2 id="submit-quiz-title" className="p-h2">
              Submit your answers?
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
          You have answered 3 of 10 questions. Any question left blank counts as
          wrong, and only your first try earns points.
        </p>
        <div className="p-modal-foot">
          <button type="button" className="p-ghostbtn" data-close-dialog="">
            Go back
          </button>
          <Link
            className="eit-btn eit-btn--primary eit-btn--md"
            href="/student/quiz-result"
          >
            <span className="eit-btn__label">Submit quiz</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
