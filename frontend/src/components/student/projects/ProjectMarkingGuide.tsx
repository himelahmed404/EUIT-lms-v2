import Link from "next/link";

export function ProjectMarkingGuide() {
  return (
    <section
      className="p-card"
      aria-labelledby="rules-title"
      style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}
    >
      <div
        style={{
          flex: "1 1 320px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h2 id="rules-title" className="p-h3">
          How projects are marked
        </h2>
        <p className="p-muted" style={{ margin: "0px" }}>
          Each project has its own rubric, shown on its details page. Most
          follow this split:
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "8px 16px",
            fontSize: "14px",
            color: "var(--ink-2)",
          }}
        >
          <span>Does what the brief asks</span>
          <strong style={{ fontVariantNumeric: "tabular-nums" }}>30</strong>
          <span>Quality of the work</span>
          <strong style={{ fontVariantNumeric: "tabular-nums" }}>30</strong>
          <span>Design and presentation</span>
          <strong style={{ fontVariantNumeric: "tabular-nums" }}>25</strong>
          <span>On time and well documented</span>
          <strong style={{ fontVariantNumeric: "tabular-nums" }}>15</strong>
        </div>
      </div>
      <div
        style={{
          flex: "1 1 320px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h2 className="p-h3">Late? Use your points</h2>
        <p className="p-muted" style={{ margin: "0px" }}>
          After the due date the project closes. You can open it again with a
          late pass:
          <strong style={{ color: "var(--ink)" }}>
            15 points for each extra day
          </strong>
          , up to 3 days per project. Earn points from marked projects.
        </p>
        <Link className="p-link" href="/student/help">
          More about points
        </Link>
      </div>
    </section>
  );
}
