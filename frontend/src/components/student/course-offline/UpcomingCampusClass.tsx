import Link from "next/link";

export function UpcomingCampusClass() {
  return (
    <div
      role="tabpanel"
      id="cl-13"
      aria-labelledby="cr-13"
      hidden
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div className="p-row lesson-title-row">
          <h1 className="p-h1" style={{ fontSize: "26px" }}>
            Class 13 · Navigation menus
          </h1>
          <span className="eit-badge eit-badge--neutral">Upcoming</span>
        </div>
        <span className="p-muted">
          Mon 19 Oct · 7:00–9:00 PM · Lab 2, Mirpur-10 · Mentor: Kamrul Hasan
        </span>
      </div>
      <div className="p-notice" style={{ fontSize: "14px" }}>
        <svg
          className="p-icon p-icon--sm"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>
          This class hasn&apos;t happened yet. The recording appears here after
          the class ends.
        </span>
      </div>
      <Link className="p-link" href="/student/routine">
        See it in your routine
      </Link>
    </div>
  );
}
