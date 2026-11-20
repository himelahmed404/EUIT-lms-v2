import Link from "next/link";

export function NextModuleProgress() {
  return (
    <section
      className="p-card"
      aria-labelledby="next-title"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <span className="p-eyebrow">What’s next</span>
        <h2 id="next-title" className="p-h3">
          2 more quizzes to unlock Module 4
        </h2>
      </div>
      <div
        className="p-bar"
        role="img"
        aria-label="Module 3 quizzes: 4 of 6 done"
      >
        <span style={{ width: "66.7%" }} />
      </div>
      <ul className="p-list">
        <li style={{ alignItems: "flex-start" }}>
          <span
            className="p-tile"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
            }}
          >
            <svg
              className="p-icon p-icon--sm"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <strong style={{ fontSize: "14px" }}>
              Class 13 · Navigation menus
            </strong>
            <span className="p-small">
              Video opens when you finish the Class 12 video
            </span>
          </span>
        </li>
        <li style={{ alignItems: "flex-start" }}>
          <span
            className="p-tile p-tile--muted"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
            }}
          >
            <svg
              className="p-icon p-icon--sm"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            </svg>
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <strong style={{ fontSize: "14px" }}>Class 13 live class</strong>
            <span className="p-small">Mon, 19 Oct · 7:00 PM · Lab 2</span>
          </span>
        </li>
        <li style={{ alignItems: "flex-start" }}>
          <span
            className="p-tile p-tile--muted"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
            }}
          >
            <svg
              className="p-icon p-icon--sm"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <strong style={{ fontSize: "14px" }}>Class 13 quiz</strong>
            <span className="p-small">
              Opens after the class · pass to unlock the next class
            </span>
          </span>
        </li>
      </ul>
      <Link
        className="eit-btn eit-btn--primary eit-btn--md eit-btn--block"
        href="/student/course-player"
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
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </section>
  );
}
