import { CourseNoteCount } from "@/components/student/shared/CourseNotes";

export function CampusLessonTabs() {
  return (
    <div className="p-tabs" role="tablist" aria-label="Class 11">
      <button
        type="button"
        role="tab"
        id="ot-notes"
        aria-selected="true"
        aria-controls="op-notes"
      >
        Class notes
      </button>
      <button
        type="button"
        role="tab"
        id="ot-res"
        aria-selected="false"
        aria-controls="op-res"
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
        id="ot-ask"
        aria-selected="false"
        aria-controls="op-ask"
        tabIndex={-1}
      >
        Ask the mentor
      </button>
      <button
        type="button"
        role="tab"
        id="ot-mine"
        aria-selected="false"
        aria-controls="op-mine"
        tabIndex={-1}
      >
        Notes{" "}
        <span className="p-pill" style={{ height: "22px", fontSize: "12px" }}>
          <CourseNoteCount source="scripts" />
        </span>
      </button>
    </div>
  );
}
