import { CourseBookmark } from "@/components/student/shared/CourseBookmark";
import { CourseNotes } from "@/components/student/shared/CourseNotes";
import { CampusLessonDiscussion } from "./CampusLessonDiscussion";
import { CampusLessonNotes } from "./CampusLessonNotes";
import { CampusLessonResources } from "./CampusLessonResources";
import { CampusLessonTabs } from "./CampusLessonTabs";
import { CampusRecording } from "./CampusRecording";
export function ActiveCampusLesson() {
  return (
    <div
      role="tabpanel"
      id="cl-11"
      aria-labelledby="cr-11"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <CampusRecording />
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div className="p-row lesson-title-row">
          <h1 className="p-h1" style={{ fontSize: "26px" }}>
            Class 11 · Enqueueing scripts
          </h1>
          <div className="p-row">
            <span className="eit-badge eit-badge--success">Present</span>
            <CourseBookmark lesson="scripts" />
          </div>
        </div>
        <span className="p-muted">
          Mon 12 Oct · 1:52:10 · Lab 2, Mirpur-10 · Mentor: Kamrul Hasan
        </span>
      </div>
      <CampusLessonTabs />
      <CampusLessonNotes />
      <CampusLessonResources />
      <CampusLessonDiscussion />
      <div
        role="tabpanel"
        id="op-mine"
        aria-labelledby="ot-mine"
        hidden
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <CourseNotes source="scripts" />
      </div>
    </div>
  );
}
