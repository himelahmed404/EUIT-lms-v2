import { CourseNoteCount } from "@/components/student/shared/CourseNotes";

export function LessonTabs() {
  return (
    <div className="p-tabs" role="tablist" aria-label="Lesson">
      <button
        type="button"
        role="tab"
        id="lt-ov"
        aria-selected="true"
        aria-controls="lp-ov"
      >
        Overview
      </button>
      <button
        type="button"
        role="tab"
        id="lt-res"
        aria-selected="false"
        aria-controls="lp-res"
        tabIndex={-1}
      >
        Resources{" "}
        <span className="p-pill" style={{ height: "22px", fontSize: "12px" }}>
          2
        </span>
      </button>
      <button
        type="button"
        role="tab"
        id="lt-ask"
        aria-selected="false"
        aria-controls="lp-ask"
        tabIndex={-1}
      >
        Ask the mentor
      </button>
      <button
        type="button"
        role="tab"
        id="lt-notes"
        aria-selected="false"
        aria-controls="lp-notes"
        tabIndex={-1}
      >
        Notes{" "}
        <span className="p-pill" style={{ height: "22px", fontSize: "12px" }}>
          <CourseNoteCount source="colour" />
        </span>
      </button>
    </div>
  );
}
