import { StudentIcon } from "@/components/student/shared/StudentIcon";

export function SubmittedProject() {
  return (
    <section
      className="p-card"
      aria-labelledby="sub-title"
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <h2 id="sub-title" className="p-h3" style={{ fontSize: "16px" }}>
        Your submission
      </h2>
      <a className="p-link" href="#">
        nusrat-portfolio.netlify.app
        <StudentIcon width="16" height="16">
          <path d="M7 17L17 7" />
          <path d="M8 7h9v9" />
        </StudentIcon>
      </a>
      <div className="p-row" style={{ gap: "12px" }}>
        <span
          className="p-tile p-tile--muted"
          style={{ width: "36px", height: "36px" }}
        >
          <svg
            className="p-icon p-icon--sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          </svg>
        </span>
        <span
          className="p-grow"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <strong style={{ fontSize: "14px" }}>portfolio.zip</strong>
          <span className="p-small">1.6 MB · attempt 1</span>
        </span>
      </div>
    </section>
  );
}
