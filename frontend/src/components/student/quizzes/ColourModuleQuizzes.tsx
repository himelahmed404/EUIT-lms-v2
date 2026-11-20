import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";

export function ColourModuleQuizzes() {
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
        data-conceal="c1rv0"
        data-on-look="c1rvlook1"
      >
        <span className="p-mono" style={{ color: "var(--cyan-ink)" }}>
          02
        </span>
        <span
          className="p-grow"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <strong style={{ fontSize: "16px" }}>Typography and colour</strong>
          <span className="p-small">
            Live classes 5–8 · 3 of 4 quizzes done
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
        id="c1rv0"
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
              Live 5 quiz · Type families
            </strong>
            <span className="p-small">Taken 30 Sep</span>
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
              Live 6 quiz · Pairing fonts
            </strong>
            <span className="p-small">Taken 7 Oct</span>
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
              Live 7 quiz · Colour and contrast
            </strong>
            <span className="p-small">Taken 14 Oct</span>
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
              Live 8 quiz · Typography for social posts
            </strong>
            <span className="p-small">
              Opens after the class on Wed, 21 Oct
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
