import Link from "next/link";

export function PointsHistory() {
  return (
    <section
      className="p-card"
      aria-labelledby="hist-title"
      style={{ display: "flex", flexDirection: "column", gap: "6px" }}
    >
      <div className="p-card-head">
        <h2 id="hist-title" className="p-h3">
          Points history
        </h2>
        <Link className="p-link" href="/student/projects">
          All projects
        </Link>
      </div>
      <ul style={{ listStyle: "none", margin: "0px", padding: "0px" }}>
        <li className="lb-hist">
          <span
            className="p-tile p-tile--green"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
            }}
          >
            <svg
              className="p-icon p-icon--sm"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "14px" }}>
              Logo redesign brief · 78/100
            </strong>
            <span className="p-small" style={{ fontSize: "12px" }}>
              Graphic Design · Milestone 1 · 14 Oct
            </span>
          </span>
          <span
            style={{
              fontWeight: "700",
              fontSize: "15px",
              fontVariantNumeric: "tabular-nums",
              color: "var(--success)",
            }}
          >
            +78
          </span>
        </li>
        <li className="lb-hist">
          <span
            className="p-tile p-tile--green"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
            }}
          >
            <svg
              className="p-icon p-icon--sm"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "14px" }}>
              Personal portfolio homepage · 86/100
            </strong>
            <span className="p-small" style={{ fontSize: "12px" }}>
              WordPress · Milestone 1 · 2 Oct
            </span>
          </span>
          <span
            style={{
              fontWeight: "700",
              fontSize: "15px",
              fontVariantNumeric: "tabular-nums",
              color: "var(--success)",
            }}
          >
            +86
          </span>
        </li>
      </ul>
      <div
        className="p-row"
        style={{
          justifyContent: "space-between",
          paddingTop: "12px",
          borderTop: "1px solid var(--line)",
        }}
      >
        <span className="p-small">Balance · none spent yet</span>
        <strong
          style={{
            fontSize: "18px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          164 points
        </strong>
      </div>
    </section>
  );
}
