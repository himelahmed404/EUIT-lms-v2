import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";

export function DesignQuizStats() {
  return (
    <div
      className="p-stagger"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
        gap: "16px",
      }}
      data-region="course-1"
    >
      <Link
        href="/student/leaderboard"
        className="p-card p-stat p-lift"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="p-stat-top">
          <span
            className="p-tile"
            style={{ background: "var(--cyan)", color: "var(--on-cyan)" }}
          >
            <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </span>
          <span className="p-pill" style={{ height: "24px", fontSize: "12px" }}>
            #7 of 24
          </span>
        </div>
        <span className="p-num">40</span>
        <span className="p-small">Points in this course</span>
      </Link>
      <div className="p-card p-stat p-lift">
        <div className="p-stat-top">
          <span className="p-tile p-tile--green">
            <StudentIcon width="20" height="20">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12.5l2.7 2.7L16.5 9.5" />
            </StudentIcon>
          </span>
        </div>
        <span className="p-num">
          4<span style={{ fontSize: "16px", color: "var(--ink-3)" }}> / 6</span>
        </span>
        <span className="p-small">Quizzes with full marks</span>
      </div>
      <div className="p-card p-stat p-lift">
        <div className="p-stat-top">
          <span className="p-tile p-tile--amber">
            <StudentIcon width="20" height="20">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </StudentIcon>
          </span>
        </div>
        <span className="p-num">1</span>
        <span className="p-small">Quiz left to unlock Module 3</span>
      </div>
      <div className="p-card p-stat p-lift">
        <div className="p-stat-top">
          <span className="p-tile">
            <StudentIcon width="20" height="20">
              <path d="M22 7l-8.5 8.5-5-5L2 17" />
              <path d="M16 7h6v6" />
            </StudentIcon>
          </span>
        </div>
        <span className="p-num">
          9.3
          <span style={{ fontSize: "16px", color: "var(--ink-3)" }}> / 10</span>
        </span>
        <span className="p-small">Average score</span>
      </div>
    </div>
  );
}
