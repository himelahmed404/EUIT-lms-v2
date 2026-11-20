import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";

export function PointsRules() {
  return (
    <section
      className="p-card"
      aria-labelledby="how-title"
      style={{ display: "flex", flexDirection: "column", gap: "14px" }}
    >
      <h2 id="how-title" className="p-h3">
        How points work
      </h2>
      <ul className="p-rows" style={{ margin: "0px -12px" }}>
        <li style={{ alignItems: "flex-start" }}>
          <span className="p-tile p-tile--green">
            <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <strong style={{ fontSize: "15px" }}>Earn your project mark</strong>
            <span className="p-small">
              When a mentor marks a project, that mark is added to your points.
              Quizzes unlock modules but do not add points.
            </span>
          </span>
        </li>
        <li style={{ alignItems: "flex-start" }}>
          <span className="p-tile p-tile--amber">
            <StudentIcon width="20" height="20">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </StudentIcon>
          </span>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <strong style={{ fontSize: "15px" }}>Spend 15 points a day</strong>
            <span className="p-small">
              Buy a late pass for a milestone project, up to 3 extra days. 15
              points buys one day.
            </span>
            <Link
              className="p-link"
              href="/student/projects"
              style={{ marginTop: "4px" }}
            >
              Go to projects
              <span className="p-arrow" style={{ display: "inline-flex" }}>
                <StudentIcon width="16" height="16">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </StudentIcon>
              </span>
            </Link>
          </span>
        </li>
        <li style={{ alignItems: "flex-start" }}>
          <span className="p-tile p-tile--muted">
            <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="8" width="18" height="4" rx="1" />
              <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5" />
            </svg>
          </span>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <strong style={{ fontSize: "15px" }}>More rewards coming</strong>
            <span className="p-small">
              European IT will add more ways to use your points.
            </span>
          </span>
        </li>
      </ul>
      <div className="p-notice" style={{ fontSize: "13px" }}>
        <StudentIcon width="18" height="18">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-5" />
          <path d="M12 8h.01" />
        </StudentIcon>
        <span>
          Your rank counts the points you&apos;ve earned, so spending points on
          a late pass never moves you down.
        </span>
      </div>
    </section>
  );
}
