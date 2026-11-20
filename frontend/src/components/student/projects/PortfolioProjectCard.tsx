import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
export function PortfolioProjectCard() {
  return (
    <ProjectCard
      tileClassName="p-tile p-tile--green"
      milestone={<>1</>}
      title={<>Personal portfolio homepage</>}
      description={<>WordPress · Milestone 1</>}
      timingLabel={<>Marked</>}
      timingValue={<>Thu, 8 Oct</>}
      grade={
        <>
          <span className="p-mono" style={{ fontSize: "11px" }}>
            Mark
          </span>
          <span className="p-row" style={{ gap: "8px" }}>
            <strong
              style={{
                fontSize: "16px",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              86/100
            </strong>
            <span className="p-bar p-bar--thin" style={{ flex: "1 1 0%" }}>
              <span style={{ width: "86%", background: "var(--success)" }} />
            </span>
          </span>
        </>
      }
      status={<span className="eit-badge eit-badge--success">Approved</span>}
      action={
        <Link className="p-ghostbtn" href="/student/project-feedback">
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
