import { StudentIcon } from "@/components/student/shared/StudentIcon";

export function ProjectBrief() {
  return (
    <section
      className="p-card"
      aria-labelledby="brief-title"
      style={{ display: "flex", flexDirection: "column", gap: "14px" }}
    >
      <h2 id="brief-title" className="p-h3">
        The brief
      </h2>
      <p className="p-body">
        Design five Facebook and Instagram posts for a Dhaka coffee shop
        launching a winter menu. Use one type pairing and a colour palette of no
        more than four colours across the set.
      </p>
      <span className="p-label">What to hand in</span>
      <ul
        style={{
          listStyle: "none",
          margin: "0px",
          padding: "0px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <li
          className="p-row"
          style={{
            gap: "10px",
            fontSize: "14px",
            color: "var(--ink-2)",
            alignItems: "flex-start",
          }}
        >
          <span style={{ color: "var(--cyan-ink)", paddingTop: "2px" }}>
            <StudentIcon width="16" height="16">
              <path d="M20 6L9 17l-5-5" />
            </StudentIcon>
          </span>
          5 posts at 1080 × 1080 px, exported as PNG
        </li>
        <li
          className="p-row"
          style={{
            gap: "10px",
            fontSize: "14px",
            color: "var(--ink-2)",
            alignItems: "flex-start",
          }}
        >
          <span style={{ color: "var(--cyan-ink)", paddingTop: "2px" }}>
            <StudentIcon width="16" height="16">
              <path d="M20 6L9 17l-5-5" />
            </StudentIcon>
          </span>
          A link to your working file (Figma or Canva), view-only
        </li>
        <li
          className="p-row"
          style={{
            gap: "10px",
            fontSize: "14px",
            color: "var(--ink-2)",
            alignItems: "flex-start",
          }}
        >
          <span style={{ color: "var(--cyan-ink)", paddingTop: "2px" }}>
            <StudentIcon width="16" height="16">
              <path d="M20 6L9 17l-5-5" />
            </StudentIcon>
          </span>
          One short paragraph explaining your type and colour choices
        </li>
      </ul>
      <span className="p-label" style={{ marginTop: "4px" }}>
        Resources
      </span>
      <div className="p-row" style={{ gap: "10px", flexWrap: "wrap" }}>
        <a
          className="p-pill"
          href="#"
          style={{
            height: "34px",
            textDecoration: "none",
            color: "var(--ink)",
          }}
        >
          <svg
            className="p-icon p-icon--sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Brand notes and menu.pdf
        </a>
        <a
          className="p-pill"
          href="#"
          style={{
            height: "34px",
            textDecoration: "none",
            color: "var(--ink)",
          }}
        >
          <svg
            className="p-icon p-icon--sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Photo pack.zip
        </a>
      </div>
    </section>
  );
}
