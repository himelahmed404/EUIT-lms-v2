import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";
import { AllProjects } from "./AllProjects";
import { ProjectFilters } from "./ProjectFilters";
import { ProjectMarkingGuide } from "./ProjectMarkingGuide";
import { ProjectsTemplates } from "./ProjectsTemplates";
export function ProjectsScreen() {
  return (
    <>
      <main className="p-main">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            maxWidth: "680px",
          }}
        >
          <h1 className="student-page-title p-h1">Projects</h1>
          <p className="p-body">
            Each milestone ends with a project. Submit it here, and your mentor
            marks it out of 100.
          </p>
        </div>
        <div
          className="p-stagger"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
            gap: "16px",
          }}
        >
          <div className="p-card p-stat p-lift">
            <div className="p-stat-top">
              <span className="p-tile">
                <StudentIcon width="20" height="20">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <path d="M17 8l-5-5-5 5" />
                  <path d="M12 3v12" />
                </StudentIcon>
              </span>
            </div>
            <div
              style={{ display: "flex", alignItems: "baseline", gap: "4px" }}
            >
              <span className="p-num">3</span>
              <span className="p-muted">/ 5</span>
            </div>
            <span className="p-small">
              Submitted · WordPress 2 of 3, Graphic Design 1 of 2
            </span>
          </div>
          <div className="p-card p-stat p-lift">
            <div className="p-stat-top">
              <span className="p-tile p-tile--amber">
                <StudentIcon width="20" height="20">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </StudentIcon>
              </span>
              <span
                className="p-pill"
                style={{ height: "24px", fontSize: "12px" }}
              >
                1 opens later
              </span>
            </div>
            <span className="p-num">2</span>
            <span className="p-small">Left to submit · next due 27 Oct</span>
          </div>
          <div className="p-card p-stat p-lift">
            <div className="p-stat-top">
              <span className="p-tile p-tile--green">
                <StudentIcon width="20" height="20">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5" />
                </StudentIcon>
              </span>
              <span
                className="p-pill"
                style={{ height: "24px", fontSize: "12px" }}
              >
                2 in review
              </span>
            </div>
            <span className="p-num">
              82
              <span style={{ fontSize: "16px", color: "var(--ink-3)" }}>
                {" "}
                / 100
              </span>
            </span>
            <span className="p-small">Average mark · 2 projects marked</span>
          </div>
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
                  <path d="M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                </svg>
              </span>
            </div>
            <span className="p-num">3 days</span>
            <span className="p-small">
              max late pass per project · 15 points a day
            </span>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <ProjectFilters />
          <span className="p-small" data-region="filtered-1">
            5 projects
          </span>
        </div>
        <AllProjects />
        <ProjectMarkingGuide />
      </main>
      <ProjectsTemplates />
    </>
  );
}
