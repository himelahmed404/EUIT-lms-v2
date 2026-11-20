import { StudentIcon } from "@/components/student/shared/StudentIcon";
import { StudentTemplate } from "@/components/student/shared/StudentTemplate";
export function LeaderboardTemplates() {
  return (
    <>
      <StudentTemplate id="rvlook12">
        Show top 8
        <span
          style={{
            display: "inline-flex",
            transition: "transform 200ms",
            transform: "rotate(180deg)",
          }}
        >
          <StudentIcon width="16" height="16">
            <path d="M6 9l6 6 6-6" />
          </StudentIcon>
        </span>
      </StudentTemplate>
    </>
  );
}
