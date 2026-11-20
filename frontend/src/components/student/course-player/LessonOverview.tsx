export function LessonOverview() {
  return (
    <div
      role="tabpanel"
      id="lp-ov"
      aria-labelledby="lt-ov"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <p className="p-body">
        Colour and contrast decide whether a social post gets read. See how to
        pick a palette that fits the brand, check that the text stays readable
        on a phone screen, and keep the busiest part of the image away from the
        caption.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <span className="p-mono">In this lesson</span>
        <ul
          style={{
            listStyle: "none",
            margin: "0",
            padding: "0",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontSize: "15px",
            color: "var(--ink-2)",
          }}
        >
          <li
            className="p-row"
            style={{ gap: "10px", alignItems: "flex-start" }}
          >
            <span style={{ color: "var(--success)", marginTop: "2px" }}>
              <svg
                className="p-icon p-icon--sm"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span>
              Build a palette of one main colour, one accent and two neutrals
              for a brand
            </span>
          </li>
          <li
            className="p-row"
            style={{ gap: "10px", alignItems: "flex-start" }}
          >
            <span style={{ color: "var(--success)", marginTop: "2px" }}>
              <svg
                className="p-icon p-icon--sm"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span>
              Check text against its background: 4.5:1 for small text, 3:1 for
              large
            </span>
          </li>
          <li
            className="p-row"
            style={{ gap: "10px", alignItems: "flex-start" }}
          >
            <span style={{ color: "var(--success)", marginTop: "2px" }}>
              <svg
                className="p-icon p-icon--sm"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span>
              Place captions and logos on calm areas of a photo, or add a soft
              overlay
            </span>
          </li>
        </ul>
      </div>
      <div className="p-notice" style={{ fontSize: "14px" }}>
        <svg
          className="p-icon p-icon--sm"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect x="8" y="2" width="8" height="4" rx="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="m9 14 2 2 4-4" />
        </svg>
        <span>
          The Lesson 7 quiz opens when this video is done. Quizzes unlock the
          next module: take every quiz in a module to open the one after it.
        </span>
      </div>
    </div>
  );
}
