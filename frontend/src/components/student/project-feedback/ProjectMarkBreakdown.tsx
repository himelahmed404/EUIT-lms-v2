export function ProjectMarkBreakdown() {
  return (
    <section
      className="p-card"
      aria-labelledby="rub-title"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div className="p-card-head">
        <h2 id="rub-title" className="p-h3">
          How it was marked
        </h2>
        <span className="p-small">Pass mark 60</span>
      </div>
      <div
        className="p-stagger"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div className="p-row" style={{ justifyContent: "space-between" }}>
            <span style={{ fontSize: "14px", fontWeight: "600" }}>
              Layout and responsiveness
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "700",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              27 / 30
            </span>
          </div>
          <div className="p-bar">
            <span style={{ width: "90%" }} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div className="p-row" style={{ justifyContent: "space-between" }}>
            <span style={{ fontSize: "14px", fontWeight: "600" }}>
              Code quality
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "700",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              22 / 25
            </span>
          </div>
          <div className="p-bar">
            <span style={{ width: "88%" }} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div className="p-row" style={{ justifyContent: "space-between" }}>
            <span style={{ fontSize: "14px", fontWeight: "600" }}>
              Visual design
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "700",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              21 / 25
            </span>
          </div>
          <div className="p-bar">
            <span style={{ width: "84%" }} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div className="p-row" style={{ justifyContent: "space-between" }}>
            <span style={{ fontSize: "14px", fontWeight: "600" }}>
              Performance and accessibility
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "700",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              16 / 20
            </span>
          </div>
          <div className="p-bar">
            <span style={{ width: "80%" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
