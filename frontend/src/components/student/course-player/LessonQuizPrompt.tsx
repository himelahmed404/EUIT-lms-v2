export function LessonQuizPrompt() {
  return (
    <section
      className="p-card"
      data-player-gate=""
      aria-label="Next lesson"
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
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
          Lesson 8 opens when you finish this video
        </strong>
        <div className="p-bar p-bar--thin" role="img" aria-label="64% watched">
          <span style={{ width: "64%" }} data-player-gate-bar="" />
        </div>
        <span className="p-small" data-player-left="">
          6:24 left to watch
        </span>
      </div>
      <div className="p-row" style={{ flexWrap: "wrap" }}>
        <a className="p-ghostbtn" href="#">
          Previous lesson
        </a>
        <button
          className="p-ghostbtn"
          type="button"
          disabled
          aria-describedby="lock-why"
          data-player-next=""
        >
          <svg
            className="p-icon p-icon--sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Next lesson
        </button>
        <span id="lock-why" className="eit-sr" data-player-why="">
          Locked until this video is watched to the end
        </span>
      </div>
    </section>
  );
}
