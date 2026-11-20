import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";
import { AnswerReview } from "./AnswerReview";
import { NextModuleProgress } from "./NextModuleProgress";
import { QuizScoreSummary } from "./QuizScoreSummary";
export function QuizResultScreen() {
  return (
    <>
      <main className="p-main">
        <nav
          aria-label="Breadcrumb"
          className="p-row"
          style={{
            gap: "8px",
            fontSize: "14px",
            color: "var(--ink-3)",
            flexWrap: "wrap",
          }}
        >
          <Link
            className="p-link"
            href="/student/quizzes"
            style={{ fontWeight: "500" }}
          >
            Quizzes
          </Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: "var(--ink-2)" }}>Class 12 quiz</span>
        </nav>
        <QuizScoreSummary />
        <div
          className="p-stagger"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            gap: "16px",
          }}
        >
          <div className="p-card p-stat">
            <div className="p-stat-top">
              <span
                className="p-tile"
                style={{ background: "var(--cyan)", color: "var(--on-cyan)" }}
              >
                <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </span>
              <span className="p-delta">+10 today</span>
            </div>
            <span className="p-num">
              <span className="eit-count">
                <span className="eit-sr">100</span>
                <span className="eit-count__ghost" aria-hidden="true">
                  100
                </span>
                <span className="eit-count__n" aria-hidden="true">
                  100
                </span>
              </span>
            </span>
            <span className="p-small">Leaderboard · #3 of 20</span>
          </div>
          <div className="p-card p-stat">
            <div className="p-stat-top">
              <span className="p-tile p-tile--amber">
                <svg className="p-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
            </div>
            <span className="p-num">
              4
              <span style={{ fontSize: "16px", color: "var(--ink-3)" }}>
                {" "}
                / 6
              </span>
            </span>
            <span className="p-small">
              Module 3 quizzes done · 2 more to unlock Module 4
            </span>
          </div>
          <div className="p-card p-stat">
            <div className="p-stat-top">
              <span className="p-tile">
                <StudentIcon width="20" height="20">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </StudentIcon>
              </span>
            </div>
            <span className="p-num">6:48</span>
            <span className="p-small">Time taken · limit 10:00</span>
          </div>
        </div>
        <div className="p-split">
          <AnswerReview />
          <aside
            style={{
              flex: "1 1 300px",
              minWidth: "0",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <NextModuleProgress />
            <section
              className="p-card"
              aria-labelledby="pts-title"
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <h2 id="pts-title" className="p-h3" style={{ fontSize: "16px" }}>
                How points work
              </h2>
              <p className="p-small" style={{ margin: "0" }}>
                Quizzes unlock modules. Leaderboard points come from project
                marks. You can spend points on a late pass for a project.
              </p>
              <Link className="p-link" href="/student/leaderboard">
                See the leaderboard
                <span className="p-arrow">
                  <svg
                    className="p-icon p-icon--sm"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}
