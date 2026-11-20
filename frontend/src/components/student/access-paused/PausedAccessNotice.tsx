import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";

export function PausedAccessNotice() {
  return (
    <section
      data-motion-intro=""
      className="p-card"
      aria-labelledby="paused-title"
      style={{
        flex: "2 1 560px",
        padding: "clamp(20px, 3vw, 40px)",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <span
        className="p-tile"
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "16px",
          background: "var(--warning-soft)",
          color: "var(--warning)",
        }}
      >
        <svg
          className="p-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{ width: "26px", height: "26px" }}
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "640px",
        }}
      >
        <h1 id="paused-title" className="p-h1">
          Your course access is paused
        </h1>
        <p className="p-body" style={{ fontSize: "17px" }}>
          Installment 2 of 3 (
          <strong style={{ color: "var(--ink)" }}>৳5,000</strong>) for Web
          Design &amp; Development with WordPress was due on 1 Oct 2026. Pay it
          and everything opens again straight away. Your progress, projects and
          attendance are all kept.
        </p>
      </div>
      <div className="p-row" style={{ flexWrap: "wrap", gap: "16px" }}>
        <Link
          href="/student/payments"
          className="eit-btn eit-btn--primary eit-btn--lg"
        >
          <span className="eit-btn__label">Pay ৳5,000 now</span>
          <svg
            className="eit-icon eit-btn__trail"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </Link>
        <Link className="p-link" href="/student/help">
          <StudentIcon width="16" height="16">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </StudentIcon>
          Need more time? Talk to the office
        </Link>
      </div>
      <hr className="p-divider" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
          gap: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <span className="p-mono">Paused until you pay</span>
          <ul
            style={{
              listStyle: "none",
              margin: "0px",
              padding: "0px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontSize: "15px",
              color: "var(--ink-2)",
            }}
          >
            <li className="p-row" style={{ gap: "10px" }}>
              <svg
                className="p-icon p-icon--sm"
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{ color: "var(--ink-3)" }}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Lessons and class recordings
            </li>
            <li className="p-row" style={{ gap: "10px" }}>
              <svg
                className="p-icon p-icon--sm"
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{ color: "var(--ink-3)" }}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Projects and quizzes
            </li>
            <li className="p-row" style={{ gap: "10px" }}>
              <svg
                className="p-icon p-icon--sm"
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{ color: "var(--ink-3)" }}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Joining classes
            </li>
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <span className="p-mono">Still open</span>
          <ul
            style={{
              listStyle: "none",
              margin: "0px",
              padding: "0px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontSize: "15px",
              color: "var(--ink-2)",
            }}
          >
            <li className="p-row" style={{ gap: "10px" }}>
              <span style={{ color: "var(--success)" }}>
                <StudentIcon width="16" height="16">
                  <path d="M20 6L9 17l-5-5" />
                </StudentIcon>
              </span>
              Payments and receipts
            </li>
            <li className="p-row" style={{ gap: "10px" }}>
              <span style={{ color: "var(--success)" }}>
                <StudentIcon width="16" height="16">
                  <path d="M20 6L9 17l-5-5" />
                </StudentIcon>
              </span>
              Your profile
            </li>
            <li className="p-row" style={{ gap: "10px" }}>
              <span style={{ color: "var(--success)" }}>
                <StudentIcon width="16" height="16">
                  <path d="M20 6L9 17l-5-5" />
                </StudentIcon>
              </span>
              Support on WhatsApp
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
