import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
export function LogoRedesignProjectCard() {
  return (
    <ProjectCard
      tileClassName="p-tile"
      milestone={<>1</>}
      title={<>Logo redesign brief</>}
      description={<>Graphic Design · Milestone 1</>}
      timingLabel={<>Submitted</>}
      timingValue={<>Mon, 12 Oct · on time</>}
      grade={
        <>
          <span className="p-mono" style={{ fontSize: "11px" }}>
            Mark
          </span>
          <span className="p-small">Nadia is reviewing</span>
        </>
      }
      status={<span className="eit-badge eit-badge--success">Approved</span>}
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
