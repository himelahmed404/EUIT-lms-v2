export function FeedbackTimeline() {
  return (
    <section
      className="p-card"
      aria-labelledby="tl-title"
      style={{ display: "flex", flexDirection: "column", gap: "14px" }}
    >
      <h2 id="tl-title" className="p-h3" style={{ fontSize: "16px" }}>
        Timeline
      </h2>
      <ol
        style={{
          listStyle: "none",
          margin: "0px",
          padding: "0px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <li style={{ display: "flex", gap: "12px" }}>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "var(--ink)",
              }}
            />
            <span
              style={{
                width: "2px",
                flex: "1 1 0%",
                minHeight: "22px",
                background: "var(--line)",
              }}
            />
          </span>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "14px",
            }}
          >
            <strong style={{ fontSize: "14px" }}>Submitted</strong>
            <span className="p-small">Tue, 6 Oct · 10:42 PM</span>
          </span>
        </li>
        <li style={{ display: "flex", gap: "12px" }}>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "var(--ink)",
              }}
            />
            <span
              style={{
                width: "2px",
                flex: "1 1 0%",
                minHeight: "22px",
                background: "var(--line)",
              }}
            />
          </span>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "14px",
            }}
          >
            <strong style={{ fontSize: "14px" }}>
              Kamrul started reviewing
            </strong>
            <span className="p-small">Wed, 7 Oct · 11:10 AM</span>
          </span>
        </li>
        <li style={{ display: "flex", gap: "12px" }}>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "var(--success)",
                boxShadow: "0 0 0 4px var(--success-soft)",
              }}
            />
          </span>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "14px",
            }}
          >
            <strong style={{ fontSize: "14px" }}>Approved · 86 of 100</strong>
            <span className="p-small">Thu, 8 Oct · 4:25 PM</span>
          </span>
        </li>
      </ol>
    </section>
  );
}
