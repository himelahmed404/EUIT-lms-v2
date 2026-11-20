import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
export function ResponsiveLandingProjectCard() {
  return (
    <ProjectCard
      tileClassName="p-tile"
      milestone={<>2</>}
      title={<>Responsive landing page</>}
      description={<>WordPress · Milestone 2</>}
      timingLabel={<>Submitted</>}
      timingValue={<>Wed, 14 Oct · on time</>}
      grade={
        <>
          <span className="p-mono" style={{ fontSize: "11px" }}>
            Mark
          </span>
          <span className="p-small">Kamrul is reviewing</span>
        </>
      }
      status={<span className="eit-badge eit-badge--cyan">In review</span>}
      action={
        <Link className="p-ghostbtn" href="/student/project-detail">
          Details
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
      }
    />
  );
}
