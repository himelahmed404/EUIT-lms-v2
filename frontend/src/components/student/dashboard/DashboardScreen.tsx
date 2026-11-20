import Link from "next/link";
import { AssignmentsWidget } from "./AssignmentsWidget";
import { AssistantLauncher } from "./AssistantLauncher";
import { DashboardCalendar } from "./DashboardCalendar";
import { EnrolledCoursesWidget } from "./EnrolledCoursesWidget";
import { HoursActivityWidget } from "./HoursActivityWidget";
import { StudentProfileWidget } from "./StudentProfileWidget";
import { StudyProgressWidget } from "./StudyProgressWidget";
import { StudyToolsWidget } from "./StudyToolsWidget";
export function DashboardScreen() {
  return (
    <>
      <main className="dashboard-grid" aria-label="Student dashboard">
        <div className="center-stack stack">
          <EnrolledCoursesWidget />
          <div className="middle-pair">
            <AssignmentsWidget />
            <StudyProgressWidget />
          </div>
          <AssistantLauncher />
        </div>
        <div className="left-stack stack">
          <StudentProfileWidget />
          <StudyToolsWidget />
        </div>
        <div className="right-stack stack">
          <div className="kpi-pair">
            <Link
              href="/student/certificates"
              data-motion-card=""
              className="widget kpi highlight"
            >
              <strong>01</strong>
              <span>Courses completed</span>
            </Link>
            <Link
              href="/student/courses?filter=active"
              data-motion-card=""
              className="widget kpi"
            >
              <strong>02</strong>
              <span>Courses in progress</span>
            </Link>
          </div>
          <HoursActivityWidget />
          <DashboardCalendar />
        </div>
      </main>
    </>
  );
}
