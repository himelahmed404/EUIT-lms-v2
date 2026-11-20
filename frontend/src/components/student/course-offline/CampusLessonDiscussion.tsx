import Link from "next/link";
import { LessonQuestionForm } from "../shared/LessonQuestionForm";

export function CampusLessonDiscussion() {
  return (
    <div
      role="tabpanel"
      id="op-ask"
      aria-labelledby="ot-ask"
      hidden
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <LessonQuestionForm
        label="Ask Kamrul about this class"
        medium="recording"
        mentor="Kamrul"
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
                Is 400ms too slow for the menu slide-in?
                <span
                  className="eit-badge eit-badge--warning"
                  style={{ marginLeft: "6px" }}
                >
                  Waiting
                </span>
              </strong>
              <span className="p-small">
                You · 2 h ago · at 11:36 in the recording
              </span>
              <p
                className="p-body"
                style={{ margin: "4px 0 0", fontSize: "14px" }}
              >
                I used 400ms for the mobile menu slide-in. It feels a bit slow
                on my phone. Is that okay, or should it be faster?
              </p>
            </div>
          </div>
        </article>
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
                Why is my menu not showing?
              </strong>
              <span className="p-small">
                You · 12 Oct · at 9:40 in the recording
              </span>
              <p
                className="p-body"
                style={{ margin: "4px 0 0", fontSize: "14px" }}
              >
                I registered the menu but nothing shows in the header.
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
            <span className="p-avatar p-avatar--sm">KH</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <strong style={{ fontSize: "14px" }}>
                Kamrul Hasan
                <span
                  className="eit-badge eit-badge--success"
                  style={{ marginLeft: "6px" }}
                >
                  Mentor
                </span>
              </strong>
              <span className="p-small">12 Oct</span>
              <p
                className="p-body"
                style={{ margin: "4px 0 0", fontSize: "14px" }}
              >
                Check that the theme location in <code>wp_nav_menu()</code>{" "}
                matches the one in <code>register_nav_menus()</code>, then
                assign a menu to it under Appearance → Menus.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
