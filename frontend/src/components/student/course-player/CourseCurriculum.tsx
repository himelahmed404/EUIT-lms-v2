import { StudentIcon } from "@/components/student/shared/StudentIcon";
import { DemoLesson } from "@/content/student/demo-course-data";

type Props = {
  lessons: DemoLesson[];
  activeLessonId: string;
  onSelectLesson: (id: string) => void;
};

export function CourseCurriculum({
  lessons,
  activeLessonId,
  onSelectLesson,
}: Props) {
  const activeIndex = lessons.findIndex((l) => l.id === activeLessonId);
  const progressPct = Math.round(((activeIndex + 1) / lessons.length) * 100);

  return (
    <aside
      className="p-card p-card--flush"
      aria-labelledby="curr-title"
      style={{
        flex: "1 1 340px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "20px 20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <h2 id="curr-title" className="p-h3">
          Course content
        </h2>
        <div className="p-row" style={{ justifyContent: "space-between" }}>
          <span className="p-small">
            {activeIndex + 1} of {lessons.length} demo lessons
          </span>
          <strong style={{ fontSize: "14px" }}>{progressPct}%</strong>
        </div>
        <div
          className="p-bar p-bar--thin"
          role="img"
          aria-label={`${progressPct}% complete`}
        >
          <span style={{ width: `${progressPct}%` }} />
        </div>
      </div>
      <div style={{ padding: "16px 20px 0px" }}>
        <div className="p-notice" style={{ fontSize: "13px" }}>
          <StudentIcon width="18" height="18">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-5" />
            <path d="M12 8h.01" />
          </StudentIcon>
          <span>
            Click on any lesson below to switch videos instantly in the YouTube demo player.
          </span>
        </div>
      </div>
      <div
        style={{
          padding: "12px 8px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <div
          style={{
            padding: "8px 12px 4px",
            fontSize: "12px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.06em",
            color: "var(--cyan-deep)",
            fontWeight: 600,
          }}
        >
          MODULE 1 · VIDEO DEMO SHOWCASE
        </div>

        <ol
          style={{
            listStyle: "none",
            margin: "0px 0px 8px",
            padding: "0px 0px 0px 4px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {lessons.map((item) => {
            const isActive = item.id === activeLessonId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelectLesson(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                    minHeight: "48px",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    border: isActive
                      ? "1px solid var(--cyan)"
                      : "1px solid transparent",
                    background: isActive
                      ? "var(--cyan-soft, rgba(0, 180, 216, 0.08))"
                      : "transparent",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      flex: "0 0 auto",
                      background: isActive
                        ? "var(--cyan)"
                        : "var(--success-soft)",
                      color: isActive ? "var(--on-cyan)" : "var(--success)",
                    }}
                  >
                    {isActive ? (
                      <StudentIcon width="14" height="14">
                        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                      </StudentIcon>
                    ) : (
                      <svg
                        className="eit-icon"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <span
                    className="p-grow"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "var(--cyan-deep)" : "var(--ink-2)",
                      }}
                    >
                      {item.title}
                    </span>
                    <span className="p-small" style={{ fontSize: "12px" }}>
                      {item.durationLabel} · {isActive ? "Playing now" : "Click to play"}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Future Modules */}
        <button
          type="button"
          aria-disabled="true"
          title="Locked"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minHeight: "52px",
            padding: "0px 12px",
            border: "0px",
            background: "transparent",
            textAlign: "left",
            font: "inherit",
            cursor: "not-allowed",
            borderRadius: "var(--radius-md)",
            color: "var(--ink-3)",
          }}
        >
          <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "14px", color: "var(--ink-2)" }}>
              2 · Advanced Workflows
            </strong>
            <span className="p-small">Opens after Module 1 demo</span>
          </span>
        </button>

        <button
          type="button"
          aria-disabled="true"
          title="Locked"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minHeight: "52px",
            padding: "0px 12px",
            border: "0px",
            background: "transparent",
            textAlign: "left",
            font: "inherit",
            cursor: "not-allowed",
            borderRadius: "var(--radius-md)",
            color: "var(--ink-3)",
          }}
        >
          <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span
            className="p-grow"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ fontSize: "14px", color: "var(--ink-2)" }}>
              3 · Final Projects &amp; Review
            </strong>
            <span className="p-small">Opens after Module 2</span>
          </span>
        </button>
      </div>
    </aside>
  );
}
