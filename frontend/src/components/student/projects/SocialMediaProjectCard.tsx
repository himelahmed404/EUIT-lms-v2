import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
export function SocialMediaProjectCard() {
  return (
    <ProjectCard
      tileClassName="p-tile p-tile--amber"
      milestone={<>2</>}
      title={<>Social media post set</>}
      description={<>Graphic Design · Milestone 2</>}
      timingLabel={<>Due</>}
      timingValue={<>Tue, 27 Oct · 11:59 PM</>}
      grade={
        <>
          <span className="p-mono" style={{ fontSize: "11px" }}>
            Mark
          </span>
          <span className="p-small">After you submit</span>
        </>
      }
      status={
        <span className="eit-badge eit-badge--warning">Due in 11 days</span>
      }
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
