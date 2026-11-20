export function ProjectLatePass() {
  return (
    <section
      className="p-card"
      aria-labelledby="late-title"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        borderColor: "var(--cyan-line)",
      }}
    >
      <div className="p-row">
        <span
          className="p-tile"
          style={{
            background: "var(--cyan)",
            color: "var(--on-cyan)",
          }}
        >
          <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
          </svg>
        </span>
        <span style={{ display: "flex", flexDirection: "column" }}>
          <h2 id="late-title" className="p-h3" style={{ fontSize: "16px" }}>
            Need more time?
          </h2>
          <span className="p-small">Buy a late pass with your quiz points</span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
        data-region="late-pass"
      >
        <div
          className="p-seg"
          role="group"
          aria-label="Extra days"
          style={{ alignSelf: "flex-start" }}
        >
          <button type="button" aria-pressed="false">
            +1 day
          </button>
          <button type="button" aria-pressed="true">
            +2 days
          </button>
          <button type="button" aria-pressed="false">
            +3 days
          </button>
        </div>
        <div
          className="p-row"
          style={{
            justifyContent: "space-between",
            fontSize: "14px",
          }}
        >
          <span className="p-muted">New due date</span>
          <strong>Thu, 29 Oct</strong>
        </div>
        <div
          className="p-row"
          style={{
            justifyContent: "space-between",
            fontSize: "14px",
          }}
        >
          <span className="p-muted">Cost · you have 90</span>
          <strong>30 points</strong>
        </div>
        <button
          type="button"
          className="p-ghostbtn"
          style={{
            borderColor: "var(--cyan-ink)",
            color: "var(--cyan-deep)",
          }}
          data-show-state="bought"
        >
          Use 30 points
        </button>
      </div>
    </section>
  );
}
