export function ProjectSubmission() {
  return (
    <section
      className="p-card"
      aria-labelledby="sub-title"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h2 id="sub-title" className="p-h3">
        Submit your project
      </h2>
      <div className="eit-field">
        <label className="eit-field__label" htmlFor="eit-field-1">
          Link to your work
        </label>
        <div className="eit-field__wrap">
          <input
            id="eit-field-1"
            name="link"
            type="url"
            className="eit-field__control"
            placeholder="https://"
            aria-describedby="eit-field-1-note"
            defaultValue=""
          />
        </div>
        <p id="eit-field-1-note" className="eit-field__note">
          Behance, Google Drive or Figma, set to view-only
        </p>
      </div>
      <div className="p-drop">
        <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="m17 8-5-5-5 5" />
          <path d="M12 3v12" />
        </svg>
        <span style={{ fontSize: "14px", color: "var(--ink-2)" }}>
          Drop your 5 PNG files or a .zip
        </span>
        <span className="p-small">Up to 50 MB</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <label className="p-label" htmlFor="note">
          Note to Nadia{" "}
          <span style={{ fontWeight: "400", color: "var(--ink-3)" }}>
            (optional)
          </span>
        </label>
        <textarea
          id="note"
          className="p-textarea"
          placeholder="Anything you want feedback on"
          style={{ minHeight: "80px" }}
        />
      </div>
      <button
        type="button"
        className="eit-btn eit-btn--primary eit-btn--md eit-btn--block"
        data-toast="Project sent to Nadia for marking"
      >
        <svg
          className="eit-icon eit-btn__lead"
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
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <span className="eit-btn__label">Submit project</span>
      </button>
    </section>
  );
}
