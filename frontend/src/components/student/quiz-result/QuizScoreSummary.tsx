import Link from "next/link";

export function QuizScoreSummary() {
  return (
    <section
      data-motion-intro=""
      className="p-hero"
      data-theme="ink"
      aria-labelledby="res-title"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "32px",
        alignItems: "center",
      }}
    >
      <span className="p-ring-wrap">
        <svg
          className="p-ring"
          width="140"
          height="140"
          viewBox="0 0 44 44"
          role="img"
          aria-label="Score 10 out of 10"
        >
          <circle
            className="p-ring-track"
            cx="22"
            cy="22"
            r="18"
            style={{ stroke: "rgba(255, 255, 255, 0.12)" }}
          />
          <circle
            className="p-ring-fill"
            cx="22"
            cy="22"
            r="18"
            pathLength="100"
            style={{ strokeDashoffset: "0", stroke: "var(--warning)" }}
          />
        </svg>
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "var(--ink)",
          }}
        >
          <strong
            style={{
              fontSize: "30px",
              lineHeight: "1",
              letterSpacing: "0",
            }}
          >
            10/10
          </strong>
          <span
            style={{
              fontSize: "12px",
              color: "var(--ink-3)",
              fontWeight: "500",
            }}
          >
            Class 12
          </span>
        </span>
      </span>
      <div
        style={{
          flex: "1 1 360px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <span className="eit-badge eit-badge--warning">
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
          All 10 right · Module progress
        </span>
        <h1 id="res-title" className="p-h1" style={{ fontSize: "34px" }}>
          Full marks, Nusrat!
        </h1>
        <p className="p-body" style={{ fontSize: "16px" }}>
          Every answer right in 6 min 48 s. Your quiz mark is saved. Projects
          decide your leaderboard points.
        </p>
        <div className="p-row" style={{ flexWrap: "wrap" }}>
          <Link
            href="/student/course-player"
            className="eit-btn eit-btn--primary eit-btn--md"
          >
            <span className="eit-btn__label">Back to the course</span>
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
          <Link
            className="p-link"
            href="/student/leaderboard"
            style={{ color: "var(--ink)" }}
          >
            See the leaderboard
          </Link>
        </div>
      </div>
    </section>
  );
}
