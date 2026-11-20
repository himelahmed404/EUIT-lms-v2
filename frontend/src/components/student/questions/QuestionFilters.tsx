export function QuestionFilters() {
  return (
    <div className="eit-chips" role="group" aria-label="Show questions">
      <button
        type="button"
        className="eit-chip is-on"
        aria-pressed="true"
        data-filter="all"
      >
        <span className="eit-chip__check" aria-hidden="true">
          <svg
            className="eit-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        <span className="eit-chip__label">All</span>
        <span className="ex-n">3</span>
      </button>
      <button
        type="button"
        className="eit-chip"
        aria-pressed="false"
        data-filter="waiting"
      >
        <span className="eit-chip__check" aria-hidden="true">
          <svg
            className="eit-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        <span className="eit-chip__label">Waiting</span>
        <span className="ex-n">1</span>
      </button>
      <button
        type="button"
        className="eit-chip"
        aria-pressed="false"
        data-filter="answered"
      >
        <span className="eit-chip__check" aria-hidden="true">
          <svg
            className="eit-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        <span className="eit-chip__label">Answered</span>
        <span className="ex-n">2</span>
      </button>
    </div>
  );
}
