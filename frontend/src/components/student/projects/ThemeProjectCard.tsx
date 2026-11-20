import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
export function ThemeProjectCard() {
  return (
    <ProjectCard
      tileClassName="p-tile p-tile--muted"
      milestone={<>3</>}
      title={<>Blog theme</>}
      description={<>WordPress · Milestone 3</>}
      timingLabel={<>Opens</>}
      timingValue={<>When Module 3 ends</>}
      grade={
        <>
          <span className="p-mono" style={{ fontSize: "11px" }}>
            Mark
          </span>
          <span className="p-small">Not open yet</span>
        </>
      }
      status={<span className="eit-badge eit-badge--neutral">Opens later</span>}
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
