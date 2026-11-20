import Link from "next/link";
import { RankingPodium } from "./RankingPodium";
export function StudentRankingSummary() {
  return (
    <section
      data-motion-intro=""
      className="p-hero"
      data-theme="ink"
      aria-labelledby="pos-title"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "32px",
        alignItems: "stretch",
      }}
    >
      <div
        style={{
          flex: "1 1 360px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        <span className="p-eyebrow" style={{ color: "var(--cyan)" }}>
          Your position · WordPress B14
        </span>
        <div className="p-row" style={{ gap: "16px", alignItems: "flex-end" }}>
          <h2
            id="pos-title"
            style={{
              margin: "0px",
              fontSize: "72px",
              lineHeight: "0.9",
              fontWeight: "700",
              letterSpacing: "0",
              color: "var(--ink)",
            }}
          >
            <span className="eit-sr">Rank </span>#3
          </h2>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "4px",
            }}
          >
            <strong style={{ fontSize: "18px", color: "var(--ink)" }}>
              of 20 students
            </strong>
            <span className="p-small" style={{ color: "var(--ink-2)" }}>
              Top 15% of your batch
            </span>
          </span>
        </div>
        <div className="p-row" style={{ flexWrap: "wrap", gap: "8px" }}>
          <span
            className="p-pill"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              color: "var(--ink)",
              height: "32px",
              fontWeight: "600",
            }}
          >
            <svg
              className="p-icon p-icon--sm"
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{ color: "var(--cyan)" }}
            >
              <path d="M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
            </svg>
            <span className="eit-count">
              <span className="eit-sr">164</span>
              <span className="eit-count__ghost" aria-hidden="true">
                164
              </span>
              <span className="eit-count__n" aria-hidden="true">
                164
              </span>
            </span>
             points
          </span>
          <span
            className="p-pill"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              color: "var(--ink)",
              height: "32px",
            }}
          >
            <svg
              className="p-icon p-icon--sm"
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{ color: "var(--success)" }}
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            2 projects marked
          </span>
          <span
            className="p-pill"
            style={{
              height: "32px",
              fontWeight: "600",
              background: "rgba(79, 211, 154, 0.16)",
              color: "var(--success)",
            }}
          >
            <svg
              className="p-icon p-icon--sm"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
            Up 2 places this week
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "16px 18px",
            borderRadius: "18px",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <div
            className="p-row"
            style={{
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <strong style={{ fontSize: "16px", color: "var(--ink)" }}>
              8 points to reach #2
            </strong>
            <span className="p-small" style={{ color: "var(--ink-2)" }}>
              Farhana R. has 172
            </span>
          </div>
          <div
            className="p-bar"
            role="img"
            aria-label="164 of 172 points"
            style={{ background: "rgba(255, 255, 255, 0.14)" }}
          >
            <span style={{ width: "95%" }} />
          </div>
          <div
            className="p-row"
            style={{
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <span className="p-small" style={{ color: "var(--ink-2)" }}>
              One strong project mark gets you there.
            </span>
            <Link
              href="/student/projects"
              className="eit-btn eit-btn--primary eit-btn--md"
            >
              <span className="eit-btn__label">Open projects</span>
              <svg
                className="eit-icon eit-btn__trail"
                width="16"
                height="16"
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
          </div>
        </div>
      </div>
      <RankingPodium />
    </section>
  );
}
