import { CourseBookmark } from "@/components/student/shared/CourseBookmark";
import { CourseNotes } from "@/components/student/shared/CourseNotes";
import Link from "next/link";
import { CourseCurriculum } from "./CourseCurriculum";
import { LessonDiscussion } from "./LessonDiscussion";
import { LessonOverview } from "./LessonOverview";
import { LessonQuizPrompt } from "./LessonQuizPrompt";
import { LessonResources } from "./LessonResources";
import { LessonTabs } from "./LessonTabs";
import { LessonVideoPlayer } from "./LessonVideoPlayer";
export function CoursePlayerScreen() {
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
          <span style={{ color: "var(--ink-2)" }}>Graphic Design</span>
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
            <LessonVideoPlayer />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <div className="p-row lesson-title-row">
                <h1 className="p-h1" style={{ fontSize: "26px" }}>
                  Colour and contrast for social posts
                </h1>
                <CourseBookmark lesson="colour" />
              </div>
              <span className="p-muted">
                18 min · Mentor: Nadia Rahman · Last watched today
              </span>
            </div>
            <LessonQuizPrompt />
            <LessonTabs />
            <LessonOverview />
            <LessonResources />
            <LessonDiscussion />
            <div
              role="tabpanel"
              id="lp-notes"
              aria-labelledby="lt-notes"
              hidden
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <CourseNotes source="colour" />
            </div>
          </div>
          <CourseCurriculum />
        </div>
      </main>
    </>
  );
}
