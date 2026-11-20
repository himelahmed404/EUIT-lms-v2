import Link from "next/link";
import { ActiveCampusLesson } from "./ActiveCampusLesson";
import { CampusCurriculum } from "./CampusCurriculum";
import { LatestCampusClass } from "./LatestCampusClass";
import { TemplateHierarchyLesson } from "./TemplateHierarchyLesson";
import { ThemeStructureLesson } from "./ThemeStructureLesson";
import { UpcomingCampusClass } from "./UpcomingCampusClass";
export function CourseOfflineScreen() {
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
            href="/student/courses"
            style={{ fontWeight: "500" }}
          >
            My courses
          </Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: "var(--ink-2)" }}>WordPress Batch 14</span>
        </nav>
        <div className="p-split">
          <div
            style={{
              flex: "2 1 600px",
              minWidth: "0px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <UpcomingCampusClass />
            <LatestCampusClass />
            <ActiveCampusLesson />
            <TemplateHierarchyLesson />
            <ThemeStructureLesson />
          </div>
          <CampusCurriculum />
        </div>
      </main>
    </>
  );
}
