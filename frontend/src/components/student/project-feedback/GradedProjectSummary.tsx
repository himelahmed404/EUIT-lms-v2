import { StudentIcon } from "@/components/student/shared/StudentIcon";

export function GradedProjectSummary() {
  return (
    <section
      data-motion-intro=""
      className="p-card"
      aria-labelledby="fb-title"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "24px",
      }}
    >
      <span className="p-ring-wrap">
        <svg
          className="p-ring"
          width="104"
          height="104"
          viewBox="0 0 44 44"
          role="img"
          aria-label="Score 86 of 100"
        >
          <circle className="p-ring-track" cx="22" cy="22" r="18" />
          <circle
            className="p-ring-fill"
            cx="22"
            cy="22"
            r="18"
            pathLength="100"
            style={{ strokeDashoffset: "14", stroke: "var(--success)" }}
          />
        </svg>
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <strong style={{ fontSize: "26px", lineHeight: "1" }}>86</strong>
          <span
            style={{
              fontSize: "11px",
              color: "var(--ink-3)",
              fontWeight: "500",
            }}
          >
            of 100
          </span>
        </span>
      </span>
      <div
        style={{
          flex: "1 1 340px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div className="p-row" style={{ gap: "10px", flexWrap: "wrap" }}>
          <span className="eit-badge eit-badge--success">Approved</span>
          <span className="p-small">
            Milestone 1 project · Web Design &amp; Development with WordPress
          </span>
        </div>
        <h1 id="fb-title" className="p-h1" style={{ fontSize: "28px" }}>
          Personal portfolio homepage
        </h1>
        <p className="p-body">
          Approved on 8 Oct. This project counts toward your WordPress
          certificate.
        </p>
      </div>
      <div className="p-row" style={{ flexWrap: "wrap" }}>
        <a className="p-ghostbtn" href="#">
          <svg
            className="p-icon p-icon--sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="m7 10 5 5 5-5" />
            <path d="M12 15V3" />
          </svg>
          Download feedback
        </a>
        <a className="p-ghostbtn" href="#">
          <StudentIcon width="16" height="16">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </StudentIcon>
          Message Kamrul
        </a>
      </div>
    </section>
  );
}
