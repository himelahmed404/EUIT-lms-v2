import Link from "next/link";
import { LessonQuestionForm } from "../shared/LessonQuestionForm";

export function LessonDiscussion() {
  return (
    <div
      role="tabpanel"
      id="lp-ask"
      aria-labelledby="lt-ask"
      hidden
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <LessonQuestionForm
        label="Ask Nadia about this lesson"
        medium="video"
        mentor="Nadia"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          className="p-row"
          style={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span className="p-mono">Your questions on this course</span>
          <Link className="p-link" href="/student/questions">
            All your questions
          </Link>
        </div>
        <article
          className="p-card"
          style={{
            padding: "16px",
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "var(--surface)",
          }}
        >
          <div
            className="p-row"
            style={{ gap: "10px", alignItems: "flex-start" }}
          >
            <span className="p-avatar p-avatar--sm">NJ</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <strong style={{ fontSize: "14px" }}>
                Should the margins be the same on every side?
              </strong>
              <span className="p-small">
                You · 7 Oct · Live 6 · Grids and layout · at 52:10
              </span>
              <p
                className="p-body"
                style={{ margin: "4px 0 0", fontSize: "14px" }}
              >
                In the grid exercise my post looks crowded at the bottom. Should
                the margins be the same on every side of the post?
              </p>
            </div>
          </div>
          <div
            className="p-row"
            style={{
              gap: "10px",
              alignItems: "flex-start",
              paddingLeft: "42px",
            }}
          >
            <span className="p-avatar p-avatar--sm">NR</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <strong style={{ fontSize: "14px" }}>
                Nadia Rahman
                <span
                  className="eit-badge eit-badge--success"
                  style={{ marginLeft: "6px" }}
                >
                  Mentor
                </span>
              </strong>
              <span className="p-small">8 Oct</span>
              <p
                className="p-body"
                style={{ margin: "4px 0 0", fontSize: "14px" }}
              >
                Not always. Keep the outer margins equal, then give the bottom a
                little more room when a caption or logo sits there. Slide 12 of
                the Live 6 deck shows both versions.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
