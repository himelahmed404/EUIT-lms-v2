export function CampusLessonNotes() {
  return (
    <div
      role="tabpanel"
      id="op-notes"
      aria-labelledby="ot-notes"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <p className="p-small" style={{ margin: "0" }}>
        Class notes · written by Kamrul Hasan · 12 Oct
      </p>
      <p className="p-body">
        Today we moved the theme&apos;s scripts and styles out of{" "}
        <code>header.php</code> and loaded them the WordPress way, from{" "}
        <code>functions.php</code>, so plugins and child themes can work with
        them.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <span className="p-mono">What we covered</span>
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
              Hook into <code>wp_enqueue_scripts</code> and load styles with{" "}
              <code>wp_enqueue_style()</code>
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
              Add a script with <code>wp_enqueue_script()</code>, its
              dependencies and the footer option
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
              Use <code>get_template_directory_uri()</code> so paths still work
              after a move
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
          Before Class 13: enqueue your header styles and bring your menu
          location code.
        </span>
      </div>
    </div>
  );
}
