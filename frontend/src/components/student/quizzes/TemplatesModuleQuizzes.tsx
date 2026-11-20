import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";

export function TemplatesModuleQuizzes() {
  return (
    <section className="p-card p-card--flush">
      <button
        type="button"
        aria-expanded="false"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "18px 20px",
          border: "0px",
          background: "transparent",
          font: "inherit",
          color: "var(--ink)",
          cursor: "pointer",
          textAlign: "left",
        }}
        data-reveal="rv2"
        data-on-look="rvlook3"
      >
        <span className="p-mono" style={{ color: "var(--cyan-ink)" }}>
          02
        </span>
        <span
          className="p-grow"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <strong style={{ fontSize: "16px" }}>
            HTML &amp; CSS for WordPress
          </strong>
          <span className="p-small">
            Classes 5–8 · 4 of 4 quizzes done · 3 full marks
          </span>
        </span>
        <span
          className="p-pill"
          style={{
            height: "26px",
            fontSize: "12px",
            background: "var(--success-soft)",
            color: "var(--success)",
            fontWeight: "700",
          }}
        >
          +30 pts
        </span>
        <span
          style={{
            display: "inline-flex",
            transition: "transform 200ms",
            transform: "rotate(0deg)",
          }}
        >
          <StudentIcon width="18" height="18">
            <path d="M6 9l6 6 6-6" />
          </StudentIcon>
        </span>
      </button>
      <ul
        className="p-rows"
        style={{
          padding: "0px 8px 10px",
          borderTop: "1px solid var(--line-soft)",
        }}
        id="rv2"
        hidden
      >
        <li style={{ flexWrap: "wrap" }}>
          <span className="p-tile p-tile--green">
            <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.2 13.9 7 23l5-3 5 3-1.2-9.1" />
            </svg>
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              flex: "1 1 260px",
            }}
          >
            <strong style={{ fontSize: "15px" }}>
              Class 5 quiz · Semantic HTML
            </strong>
            <span className="p-small">Taken 17 Sep</span>
          </span>
          <span
            style={{
              minWidth: "64px",
              textAlign: "right",
              fontSize: "15px",
              fontWeight: "700",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            10/10
          </span>
          <span
            style={{
              minWidth: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span className="eit-badge eit-badge--success">Full marks</span>
          </span>
          <span
            style={{
              minWidth: "130px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link className="p-link" href="/student/quiz-result">
              Review answers
            </Link>
          </span>
        </li>
        <li style={{ flexWrap: "wrap" }}>
          <span className="p-tile p-tile--green">
            <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.2 13.9 7 23l5-3 5 3-1.2-9.1" />
            </svg>
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              flex: "1 1 260px",
            }}
          >
            <strong style={{ fontSize: "15px" }}>
              Class 6 quiz · Flexbox and grid
            </strong>
            <span className="p-small">Taken 21 Sep</span>
          </span>
          <span
            style={{
              minWidth: "64px",
              textAlign: "right",
              fontSize: "15px",
              fontWeight: "700",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            10/10
          </span>
          <span
            style={{
              minWidth: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span className="eit-badge eit-badge--success">Full marks</span>
          </span>
          <span
            style={{
              minWidth: "130px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link className="p-link" href="/student/quiz-result">
              Review answers
            </Link>
          </span>
        </li>
        <li style={{ flexWrap: "wrap" }}>
          <span className="p-tile">
            <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              flex: "1 1 260px",
            }}
          >
            <strong style={{ fontSize: "15px" }}>
              Class 7 quiz · Responsive images
            </strong>
            <span className="p-small">Taken 24 Sep</span>
          </span>
          <span
            style={{
              minWidth: "64px",
              textAlign: "right",
              fontSize: "15px",
              fontWeight: "700",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            9/10
          </span>
          <span
            style={{
              minWidth: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span className="eit-badge eit-badge--cyan">Done · no points</span>
          </span>
          <span
            style={{
              minWidth: "130px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link className="p-link" href="/student/quiz-result">
              Review answers
            </Link>
          </span>
        </li>
        <li style={{ flexWrap: "wrap" }}>
          <span className="p-tile p-tile--green">
            <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.2 13.9 7 23l5-3 5 3-1.2-9.1" />
            </svg>
          </span>
          <span
            className="p-grow"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              flex: "1 1 260px",
            }}
          >
            <strong style={{ fontSize: "15px" }}>
              Class 8 quiz · CSS for WordPress themes
            </strong>
            <span className="p-small">Taken 28 Sep</span>
          </span>
          <span
            style={{
              minWidth: "64px",
              textAlign: "right",
              fontSize: "15px",
              fontWeight: "700",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            10/10
          </span>
          <span
            style={{
              minWidth: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span className="eit-badge eit-badge--success">Full marks</span>
          </span>
          <span
            style={{
              minWidth: "130px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link className="p-link" href="/student/quiz-result">
              Review answers
            </Link>
          </span>
        </li>
      </ul>
    </section>
  );
}
