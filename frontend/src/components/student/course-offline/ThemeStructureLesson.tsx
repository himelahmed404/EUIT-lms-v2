import { ThemeStructureRecording } from "./ThemeStructureRecording";
export function ThemeStructureLesson() {
  return (
    <div
      role="tabpanel"
      id="cl-9"
      aria-labelledby="cr-9"
      hidden
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <ThemeStructureRecording />
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div className="p-row lesson-title-row">
          <h1 className="p-h1" style={{ fontSize: "26px" }}>
            Class 9 · Theme folder structure
          </h1>
          <span className="eit-badge eit-badge--success">Present</span>
        </div>
        <span className="p-muted">
          Mon 5 Oct · 1:55:02 · Lab 2, Mirpur-10 · Mentor: Kamrul Hasan
        </span>
      </div>
      <p className="p-body">
        The files every theme needs, what goes in <code>style.css</code> and{" "}
        <code>functions.php</code>, and how to keep a theme tidy as it grows.
      </p>
    </div>
  );
}
