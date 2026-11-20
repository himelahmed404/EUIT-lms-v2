export function ProjectOverview() {
  return (
    <section
      data-motion-intro=""
      className="p-card"
      aria-labelledby="pd-title"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <span
        className="p-tile p-tile--amber"
        style={{ width: "60px", height: "60px", borderRadius: "18px" }}
      >
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              lineHeight: "1",
            }}
          >
            MILESTONE
          </span>
          <strong style={{ fontSize: "22px", lineHeight: "1.1" }}>2</strong>
        </span>
      </span>
      <div
        style={{
          flex: "1 1 360px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <div className="p-row" style={{ gap: "10px", flexWrap: "wrap" }}>
          <span className="eit-badge eit-badge--warning">Due in 11 days</span>
          <span className="p-small">Graphic Design · marked by Nadia</span>
        </div>
        <h1 id="pd-title" className="p-h1" style={{ fontSize: "28px" }}>
          Social media post set
        </h1>
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <div
          style={{
            background: "var(--surface)",
            borderRadius: "14px",
            padding: "10px 16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span className="p-mono" style={{ fontSize: "11px" }}>
            Due
          </span>
          <strong style={{ fontSize: "15px" }}>Tue, 27 Oct · 11:59 PM</strong>
        </div>
        <div
          style={{
            background: "var(--surface)",
            borderRadius: "14px",
            padding: "10px 16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span className="p-mono" style={{ fontSize: "11px" }}>
            Marked out of
          </span>
          <strong style={{ fontSize: "15px" }}>100</strong>
        </div>
      </div>
    </section>
  );
}
