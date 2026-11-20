import { StudentIcon } from "@/components/student/shared/StudentIcon";

export function DesignCertificateProgress() {
  return (
    <article
      className="p-card p-lift"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div
        className="p-row"
        style={{
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <strong style={{ fontSize: "17px" }}>
            Web Design &amp; Development with WordPress
          </strong>
          <span className="p-small">Batch 14 · ends Feb 2027</span>
        </div>
        <span className="p-ring-wrap">
          <svg
            className="p-ring"
            width="56"
            height="56"
            viewBox="0 0 44 44"
            aria-hidden="true"
          >
            <circle className="p-ring-track" cx="22" cy="22" r="18" />
            <circle
              className="p-ring-fill"
              cx="22"
              cy="22"
              r="18"
              pathLength="100"
              style={{ strokeDashoffset: "67" }}
            />
          </svg>
          <span style={{ fontSize: "12px" }}>1/3</span>
        </span>
      </div>
      <ul
        style={{
          listStyle: "none",
          margin: "0px",
          padding: "0px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          fontSize: "14px",
        }}
      >
        <li
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <span className="p-row" style={{ justifyContent: "space-between" }}>
            <span>All lessons watched</span>
            <span className="p-small">23 / 54</span>
          </span>
          <span className="p-bar p-bar--thin">
            <span style={{ width: "43%" }} />
          </span>
        </li>
        <li
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <span className="p-row" style={{ justifyContent: "space-between" }}>
            <span>3 milestone projects marked</span>
            <span className="p-small">1 / 3</span>
          </span>
          <span className="p-bar p-bar--thin">
            <span style={{ width: "33%" }} />
          </span>
        </li>
        <li className="p-row" style={{ justifyContent: "space-between" }}>
          <span className="p-row" style={{ gap: "8px" }}>
            <span style={{ color: "var(--success)" }}>
              <StudentIcon width="16" height="16">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12.5l2.7 2.7L16.5 9.5" />
              </StudentIcon>
            </span>
            Attendance 75% or more
          </span>
          <span
            className="p-small"
            style={{ color: "var(--success)", fontWeight: "600" }}
          >
            92%
          </span>
        </li>
      </ul>
    </article>
  );
}
