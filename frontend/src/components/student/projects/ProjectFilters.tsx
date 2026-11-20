export function ProjectFilters() {
  return (
    <div className="eit-chips" role="group" aria-label="Filter">
      <button
        type="button"
        className="eit-chip is-on"
        aria-pressed="true"
        data-part-of="filtered"
        data-part="0"
        data-value="0"
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
      </button>
      <button
        type="button"
        className="eit-chip"
        aria-pressed="false"
        data-part-of="filtered"
        data-part="0"
        data-value="1"
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
        <span className="eit-chip__label">To submit</span>
      </button>
      <button
        type="button"
        className="eit-chip"
        aria-pressed="false"
        data-part-of="filtered"
        data-part="0"
        data-value="2"
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
        <span className="eit-chip__label">In review</span>
      </button>
      <button
        type="button"
        className="eit-chip"
        aria-pressed="false"
        data-part-of="filtered"
        data-part="0"
        data-value="3"
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
        <span className="eit-chip__label">Marked</span>
      </button>
    </div>
  );
}
