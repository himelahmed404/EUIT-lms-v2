import Link from "next/link";
import { FeedbackTimeline } from "./FeedbackTimeline";
import { GradedProjectSummary } from "./GradedProjectSummary";
import { MentorFeedback } from "./MentorFeedback";
import { ProjectMarkBreakdown } from "./ProjectMarkBreakdown";
import { SubmittedProject } from "./SubmittedProject";
export function ProjectFeedbackScreen() {
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
          <span style={{ color: "var(--ink-2)" }}>
            Personal portfolio homepage
          </span>
        </nav>
        <GradedProjectSummary />
        <div className="p-split">
          <div
            style={{
              flex: "1.5 1 540px",
              minWidth: "0px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <ProjectMarkBreakdown />
            <MentorFeedback />
          </div>
          <div
            style={{
              flex: "1 1 320px",
              minWidth: "0px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <SubmittedProject />
            <FeedbackTimeline />
          </div>
        </div>
      </main>
    </>
  );
}
