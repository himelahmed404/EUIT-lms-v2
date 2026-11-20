import { CourseBookmark } from "@/components/student/shared/CourseBookmark";
import { TemplateHierarchyRecording } from "./TemplateHierarchyRecording";
export function TemplateHierarchyLesson() {
  return (
    <div
      role="tabpanel"
      id="cl-10"
      aria-labelledby="cr-10"
      hidden
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TemplateHierarchyRecording />
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div className="p-row lesson-title-row">
          <h1 className="p-h1" style={{ fontSize: "26px" }}>
            Class 10 · Template hierarchy
          </h1>
          <div className="p-row">
            <span className="eit-badge eit-badge--success">Present</span>
            <CourseBookmark lesson="templates" />
          </div>
        </div>
        <span className="p-muted">
          Thu 8 Oct · 1:48:33 · Lab 2, Mirpur-10 · Mentor: Kamrul Hasan
        </span>
      </div>
      <p className="p-body">
        How WordPress picks a template for each page, and how to override it
        with <code>single.php</code>, <code>page.php</code> and{" "}
        <code>archive.php</code>.
      </p>
    </div>
  );
}
