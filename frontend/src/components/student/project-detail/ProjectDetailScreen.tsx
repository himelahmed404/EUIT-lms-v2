import Link from "next/link";
import { ProjectBrief } from "./ProjectBrief";
import { ProjectDetailTemplates } from "./ProjectDetailTemplates";
import { ProjectLatePass } from "./ProjectLatePass";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectRubric } from "./ProjectRubric";
import { ProjectSubmission } from "./ProjectSubmission";
import { ProjectTimeline } from "./ProjectTimeline";
export function ProjectDetailScreen() {
  return (
    <>
      <main className="p-main">
        <nav
          aria-label="Breadcrumb"
          className="p-row"
          style={{
            gap: "8px",
            fontSize: "14px",
            color: "var(--ink-3)",
            flexWrap: "wrap",
          }}
        >
          <Link
            className="p-link"
            href="/student/projects"
            style={{ fontWeight: "500" }}
          >
            Projects
          </Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: "var(--ink-2)" }}>Social media post set</span>
        </nav>
        <ProjectOverview />
        <div className="p-split">
          <div
            style={{
              flex: "1.5 1 560px",
              minWidth: "0px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <ProjectBrief />
            <ProjectRubric />
          </div>
          <div
            style={{
              flex: "1 1 360px",
              minWidth: "0px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <ProjectSubmission />
              <ProjectLatePass />
            </div>
            <ProjectTimeline />
          </div>
        </div>
      </main>
      <ProjectDetailTemplates />
    </>
  );
}
