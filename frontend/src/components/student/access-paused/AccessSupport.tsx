export function AccessSupport() {
  return (
    <section
      className="p-card"
      aria-label="Paused course"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div
        className="p-thumb"
        style={{
          width: "100%",
          height: "96px",
          flex: "0 0 auto",
          background: "var(--track)",
          color: "var(--ink-3)",
        }}
      >
        <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div className="p-row" style={{ gap: "8px", flexWrap: "wrap" }}>
          <strong style={{ fontSize: "16px" }}>
            Web Design &amp; Development with WordPress
          </strong>
          <span className="eit-badge eit-badge--warning">Paused</span>
        </div>
        <span className="p-small">
          Batch 14 · Offline · stopped at Module 3, lesson 2
        </span>
        <div className="p-row" style={{ gap: "10px" }}>
          <span
            className="p-bar p-bar--thin"
            style={{ flex: "1 1 0%", maxWidth: "360px" }}
          >
            <span
              style={{
                width: "39%",
                background: "var(--line-control)",
              }}
            />
          </span>
          <span
            className="p-small"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            39% saved
          </span>
        </div>
      </div>
    </section>
  );
}
