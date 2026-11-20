export function HelpTopics() {
  return (
    <div
      className="p-stagger"
      role="group"
      aria-label="Help topics"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
        gap: "14px",
      }}
    >
      <button
        type="button"
        data-motion-card=""
        className="p-card p-lift hp-cat"
        aria-pressed="false"
        data-cat="classes"
      >
        <span
          className="p-tile"
          style={{ width: "48px", height: "48px", borderRadius: "14px" }}
        >
          <svg
            className="p-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ width: "22px", height: "22px" }}
          >
            <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM10 8l6 4-6 4V8z" />
          </svg>
        </span>
        <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <strong style={{ fontSize: "16px" }}>Classes &amp; recordings</strong>
          <span className="p-small">3 answers</span>
        </span>
      </button>
      <button
        type="button"
        data-motion-card=""
        className="p-card p-lift hp-cat"
        aria-pressed="false"
        data-cat="quizzes"
      >
        <span
          className="p-tile p-tile--green"
          style={{ width: "48px", height: "48px", borderRadius: "14px" }}
        >
          <svg
            className="p-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ width: "22px", height: "22px" }}
          >
            <path d="M8 2h8v4H8zM16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 14l2 2 4-4" />
          </svg>
        </span>
        <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <strong style={{ fontSize: "16px" }}>Quizzes &amp; points</strong>
          <span className="p-small">6 answers</span>
        </span>
      </button>
      <button
        type="button"
        data-motion-card=""
        className="p-card p-lift hp-cat"
        aria-pressed="false"
        data-cat="projects"
      >
        <span
          className="p-tile p-tile--amber"
          style={{ width: "48px", height: "48px", borderRadius: "14px" }}
        >
          <svg
            className="p-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ width: "22px", height: "22px" }}
          >
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2z" />
          </svg>
        </span>
        <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <strong style={{ fontSize: "16px" }}>Projects</strong>
          <span className="p-small">4 answers</span>
        </span>
      </button>
      <button
        type="button"
        data-motion-card=""
        className="p-card p-lift hp-cat"
        aria-pressed="false"
        data-cat="payments"
      >
        <span
          className="p-tile p-tile--ink"
          style={{ width: "48px", height: "48px", borderRadius: "14px" }}
        >
          <svg
            className="p-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ width: "22px", height: "22px" }}
          >
            <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM2 10h20" />
          </svg>
        </span>
        <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <strong style={{ fontSize: "16px" }}>
            Payments &amp; installments
          </strong>
          <span className="p-small">3 answers</span>
        </span>
      </button>
      <button
        type="button"
        data-motion-card=""
        className="p-card p-lift hp-cat"
        aria-pressed="false"
        data-cat="account"
      >
        <span
          className="p-tile p-tile--muted"
          style={{ width: "48px", height: "48px", borderRadius: "14px" }}
        >
          <svg
            className="p-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ width: "22px", height: "22px" }}
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          </svg>
        </span>
        <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <strong style={{ fontSize: "16px" }}>Account &amp; login</strong>
          <span className="p-small">3 answers</span>
        </span>
      </button>
      <button
        type="button"
        data-motion-card=""
        className="p-card p-lift hp-cat"
        aria-pressed="false"
        data-cat="certificates"
      >
        <span
          className="p-tile"
          style={{ width: "48px", height: "48px", borderRadius: "14px" }}
        >
          <svg
            className="p-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ width: "22px", height: "22px" }}
          >
            <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.2 13.9 7 23l5-3 5 3-1.2-9.1" />
          </svg>
        </span>
        <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <strong style={{ fontSize: "16px" }}>Certificates</strong>
          <span className="p-small">2 answers</span>
        </span>
      </button>
    </div>
  );
}
