import { DemoLesson } from "@/content/student/demo-course-data";

type Props = {
  lesson: DemoLesson;
};

export function LessonOverview({ lesson }: Props) {
  return (
    <div
      role="tabpanel"
      id="lp-ov"
      aria-labelledby="lt-ov"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <p className="p-body">{lesson.summary}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <span className="p-mono">In this lesson</span>
        <ul
          style={{
            listStyle: "none",
            margin: "0",
            padding: "0",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontSize: "15px",
            color: "var(--ink-2)",
          }}
        >
          {lesson.takeaways.map((item, idx) => (
            <li
              key={idx}
              className="p-row"
              style={{ gap: "10px", alignItems: "flex-start" }}
            >
              <span style={{ color: "var(--success)", marginTop: "2px" }}>
                <svg
                  className="p-icon p-icon--sm"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-notice" style={{ fontSize: "14px" }}>
        <svg
          className="p-icon p-icon--sm"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect x="8" y="2" width="8" height="4" rx="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="m9 14 2 2 4-4" />
        </svg>
        <span>{lesson.notice}</span>
      </div>
    </div>
  );
}
