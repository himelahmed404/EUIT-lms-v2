export function LessonResources() {
  return (
    <div
      role="tabpanel"
      id="lp-res"
      aria-labelledby="lt-res"
      hidden
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <p className="p-small" style={{ margin: "0" }}>
        Files your mentor added for this lesson. Download them before you start
        the video.
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
              social-palette-swatches.zip
            </strong>
            <span className="p-small">
              Swatches and a contrast checklist · 1.4 MB
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
            <strong style={{ fontSize: "14px" }}>Lesson slides</strong>
            <span className="p-small">PDF · 18 pages</span>
          </span>
          <a className="p-link" href="#">
            Download
          </a>
        </li>
      </ul>
    </div>
  );
}
