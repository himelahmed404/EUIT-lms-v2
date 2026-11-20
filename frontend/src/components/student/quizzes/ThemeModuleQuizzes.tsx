import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";

export function ThemeModuleQuizzes() {
  return (
    <section className="p-card p-card--flush">
      <button
        type="button"
        aria-expanded="true"
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
        data-conceal="rv0"
        data-on-look="rvlook1"
      >
        <span className="p-mono" style={{ color: "var(--cyan-ink)" }}>
          03
        </span>
        <span
          className="p-grow"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <strong style={{ fontSize: "16px" }}>Building a theme</strong>
          <span className="p-small">Classes 9–14 · 3 of 6 quizzes done</span>
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
          +20 pts
        </span>
        <span
          style={{
            display: "inline-flex",
            transition: "transform 200ms",
            transform: "rotate(180deg)",
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
        id="rv0"
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
              Class 9 quiz · Theme folder structure
            </strong>
            <span className="p-small">Taken Mon, 5 Oct</span>
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
              Class 10 quiz · The template hierarchy
            </strong>
            <span className="p-small">Taken Thu, 8 Oct</span>
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
            8/10
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
              Class 11 quiz · Enqueueing styles and scripts
            </strong>
            <span className="p-small">Taken Mon, 12 Oct</span>
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
          <span className="p-tile p-tile--amber">
            <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 2h8v4H8zM16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 14l2 2 4-4" />
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
              Class 12 quiz · Building a custom header
            </strong>
            <span className="p-small">
              Opened when the class ended, Thu 15 Oct
            </span>
          </span>
          <span
            style={{
              minWidth: "64px",
              textAlign: "right",
              fontSize: "15px",
              fontWeight: "700",
              fontVariantNumeric: "tabular-nums",
            }}
          />
          <span
            style={{
              minWidth: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span className="eit-badge eit-badge--warning">Open now</span>
          </span>
          <span
            style={{
              minWidth: "130px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link
              href="/student/quiz"
              className="eit-btn eit-btn--primary eit-btn--md"
            >
              <span className="eit-btn__label">Take quiz</span>
            </Link>
          </span>
        </li>
        <li style={{ flexWrap: "wrap" }}>
          <span className="p-tile p-tile--muted">
            <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 11h14v11H5zM7 11V7a5 5 0 0 1 10 0v4" />
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
              Class 13 quiz · Navigation menus
            </strong>
            <span className="p-small">
              Opens after the class on Mon, 19 Oct
            </span>
          </span>
          <span
            style={{
              minWidth: "64px",
              textAlign: "right",
              fontSize: "15px",
              fontWeight: "700",
              fontVariantNumeric: "tabular-nums",
            }}
          />
          <span
            style={{
              minWidth: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span className="eit-badge eit-badge--neutral">Locked</span>
          </span>
          <span
            style={{
              minWidth: "130px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span className="p-small">Not open yet</span>
          </span>
        </li>
        <li style={{ flexWrap: "wrap" }}>
          <span className="p-tile p-tile--muted">
            <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 11h14v11H5zM7 11V7a5 5 0 0 1 10 0v4" />
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
              Class 14 quiz · The loop and post templates
            </strong>
            <span className="p-small">
              Opens after the class on Thu, 22 Oct
            </span>
          </span>
          <span
            style={{
              minWidth: "64px",
              textAlign: "right",
              fontSize: "15px",
              fontWeight: "700",
              fontVariantNumeric: "tabular-nums",
            }}
          />
          <span
            style={{
              minWidth: "120px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span className="eit-badge eit-badge--neutral">Locked</span>
          </span>
          <span
            style={{
              minWidth: "130px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span className="p-small">Not open yet</span>
          </span>
        </li>
      </ul>
    </section>
  );
}
