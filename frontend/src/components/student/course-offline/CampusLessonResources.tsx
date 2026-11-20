export function CampusLessonResources() {
  return (
    <div
      role="tabpanel"
      id="op-res"
      aria-labelledby="ot-res"
      hidden
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <p className="p-small" style={{ margin: "0" }}>
        Files your mentor added for this class.
      </p>
      <ul className="p-list" aria-label="Resources">
        <li>
          <span className="p-tile">
            <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
          </span>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "14px" }}>
              class-11-theme-files.zip
            </strong>
            <span className="p-small">
              Theme files as left at the end of class · 0.9 MB
            </span>
          </span>
          <a className="p-link" href="#">
            Download
          </a>
        </li>
        <li>
          <span className="p-tile">
            <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
          </span>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "14px" }}>Enqueue cheat sheet</strong>
            <span className="p-small">PDF · 4 pages</span>
          </span>
          <a className="p-link" href="#">
            Download
          </a>
        </li>
      </ul>
    </div>
  );
}
