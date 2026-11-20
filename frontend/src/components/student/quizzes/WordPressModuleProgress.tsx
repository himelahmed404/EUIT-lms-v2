import Link from "next/link";

export function WordPressModuleProgress({
  animate = true,
}: {
  animate?: boolean;
}) {
  return (
    <section
      data-motion-intro={animate ? "" : undefined}
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
          Module 4 · Plugins &amp; WooCommerce unlocks after 3 more quizzes
        </h2>
        <div
          className="p-bar"
          role="img"
          aria-label="3 of 6 quizzes done in this module"
          style={{ background: "var(--on-ink)" }}
        >
          <span style={{ width: "50%" }} />
        </div>
        <span className="p-small" style={{ color: "var(--cyan-deep)" }}>
          3 of 6 quizzes done in this module
        </span>
      </div>
      <Link
        href="/student/quiz"
        className="eit-btn eit-btn--primary eit-btn--md"
      >
        <span className="eit-btn__label">Open projects</span>
        <svg
          className="eit-icon eit-btn__trail"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </Link>
    </section>
  );
}
