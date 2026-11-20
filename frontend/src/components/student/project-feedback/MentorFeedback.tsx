export function MentorFeedback() {
  return (
    <section
      className="p-card"
      aria-labelledby="mfb-title"
      style={{ display: "flex", flexDirection: "column", gap: "14px" }}
    >
      <div className="p-row">
        <span className="p-avatar">KH</span>
        <span style={{ display: "flex", flexDirection: "column" }}>
          <h2 id="mfb-title" className="p-h3" style={{ fontSize: "16px" }}>
            Feedback from Kamrul Hasan
          </h2>
          <span className="p-small">Reviewed Thu, 8 Oct</span>
        </span>
      </div>
      <p
        className="p-body"
        style={{
          fontSize: "16px",
          background: "var(--surface)",
          borderRadius: "16px",
          padding: "16px 18px",
        }}
      >
        Really clean work, Nusrat. The page holds up at every width and your
        sections are easy to scan. Next time, compress large images and add alt
        text everywhere; that is the difference between 86 and 95.
      </p>
      <span className="p-label">Notes on your page</span>
      <ul className="p-rows" style={{ margin: "0px -12px -12px" }}>
        <li style={{ alignItems: "flex-start" }}>
          <span
            className="p-tile p-tile--green"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
            }}
          >
            <svg
              className="p-icon p-icon--sm"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
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
            <span className="p-row" style={{ gap: "8px" }}>
              <strong style={{ fontSize: "14px" }}>Hero section</strong>
              <span
                className="p-pill"
                style={{ height: "20px", fontSize: "11px" }}
              >
                Good
              </span>
            </span>
            <span style={{ fontSize: "14px", color: "var(--ink-2)" }}>
              Strong headline and a clear call to action. Easy to scan.
            </span>
          </span>
        </li>
        <li style={{ alignItems: "flex-start" }}>
          <span
            className="p-tile p-tile--green"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
            }}
          >
            <svg
              className="p-icon p-icon--sm"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
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
            <span className="p-row" style={{ gap: "8px" }}>
              <strong style={{ fontSize: "14px" }}>Projects grid</strong>
              <span
                className="p-pill"
                style={{ height: "20px", fontSize: "11px" }}
              >
                Good
              </span>
            </span>
            <span style={{ fontSize: "14px", color: "var(--ink-2)" }}>
              Works well from phone to desktop.
            </span>
          </span>
        </li>
        <li style={{ alignItems: "flex-start" }}>
          <span
            className="p-tile"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
            }}
          >
            <svg
              className="p-icon p-icon--sm"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
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
            <span className="p-row" style={{ gap: "8px" }}>
              <strong style={{ fontSize: "14px" }}>Images</strong>
              <span
                className="p-pill"
                style={{ height: "20px", fontSize: "11px" }}
              >
                Tip
              </span>
            </span>
            <span style={{ fontSize: "14px", color: "var(--ink-2)" }}>
              Add alt text to the three project thumbnails and compress the hero
              image.
            </span>
          </span>
        </li>
      </ul>
    </section>
  );
}
