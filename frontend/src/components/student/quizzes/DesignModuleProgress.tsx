export function DesignModuleProgress() {
  return (
    <section
      className="p-card"
      aria-labelledby="gate-title"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "18px",
        borderColor: "var(--cyan-line)",
        background: "var(--cyan-soft)",
      }}
      data-region="course-2"
    >
      <span
        className="p-tile p-tile--ink"
        style={{ width: "52px", height: "52px", borderRadius: "16px" }}
      >
        <svg
          className="p-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{ width: "24px", height: "24px" }}
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </span>
      <div
        style={{
          flex: "1 1 320px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <h2
          id="gate-title"
          className="p-h3"
          style={{ color: "var(--cyan-deep)" }}
        >
          Module 3 · Layout for social media unlocks after 1 more quiz
        </h2>
        <div
          className="p-bar"
          role="img"
          aria-label="3 of 4 quizzes done in this module"
          style={{ background: "var(--on-ink)" }}
        >
          <span style={{ width: "75%" }} />
        </div>
        <span className="p-small" style={{ color: "var(--cyan-deep)" }}>
          3 of 4 quizzes done in this module
        </span>
      </div>
    </section>
  );
}
