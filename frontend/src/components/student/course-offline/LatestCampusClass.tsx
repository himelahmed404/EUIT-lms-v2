import { CourseBookmark } from "@/components/student/shared/CourseBookmark";

export function LatestCampusClass() {
  return (
    <div
      role="tabpanel"
      id="cl-12"
      aria-labelledby="cr-12"
      hidden
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div className="p-row lesson-title-row">
          <h1 className="p-h1" style={{ fontSize: "26px" }}>
            Class 12 · Custom header walkthrough
          </h1>
          <div className="p-row">
            <span className="eit-badge eit-badge--success">Present</span>
            <CourseBookmark lesson="header" />
          </div>
        </div>
        <span className="p-muted">
          Thu 15 Oct · Lab 2, Mirpur-10 · Mentor: Kamrul Hasan
        </span>
      </div>
      <div className="p-notice" style={{ fontSize: "14px" }}>
        <svg
          className="p-icon p-icon--sm"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
        </svg>
        <span>
          Mentor is uploading this recording. You&apos;ll get a notification
          when it is ready.
        </span>
      </div>
    </div>
  );
}
