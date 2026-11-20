export function ProjectTimeline() {
  return (
    <section
      className="p-card"
      aria-labelledby="tl-title"
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
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
            <strong style={{ fontSize: "14px" }}>Milestone 2 opened</strong>
            <span className="p-small">Fri, 16 Oct</span>
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
                background: "var(--cyan)",
                boxShadow: "0 0 0 4px var(--cyan-soft)",
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
            <strong style={{ fontSize: "14px" }}>Due</strong>
            <span className="p-small">Tue, 27 Oct, 11:59 PM</span>
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
                background: "var(--line-strong)",
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
            <strong style={{ fontSize: "14px" }}>Marks expected</strong>
            <span className="p-small">Within 3 days of submitting</span>
          </span>
        </li>
      </ol>
    </section>
  );
}
