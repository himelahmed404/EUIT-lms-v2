import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Mentor handbook · European IT LMS" };

type Rule = { t: string; s: string };

const SECTIONS: { id: string; title: string; sub: string; href: string; cta: string; d: string; rules: Rule[] }[] = [
  {
    id: "hb-projects",
    title: "Projects & rubrics",
    sub: "How marks are given",
    href: "/mentor/review",
    cta: "Reviews",
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 15l2 2 4-4",
    rules: [
      { t: "Pass mark is 60 out of 100", s: "Unless the course sets another pass mark" },
      { t: "Mark against the four rubric areas", s: "Layout 30 · Code quality 25 · Visual design 25 · Performance 20" },
      { t: "Review within 3 days", s: "Older projects are flagged as waiting on your dashboard" },
      { t: "Request changes with a clear note", s: "The student sees your feedback under Projects straight away" },
    ],
  },
  {
    id: "hb-attendance",
    title: "Attendance",
    sub: "Every class, every batch",
    href: "/mentor/batch",
    cta: "My batches",
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM16 11l2 2 4-4",
    rules: [
      { t: "Mark Present, Late or Absent", s: "Before the next class starts" },
      { t: "Certificates need 75% attendance", s: "Students see their own count on the dashboard" },
      { t: "Nudge students who fall behind", s: "A nudge goes to the student by SMS" },
    ],
  },
  {
    id: "hb-recordings",
    title: "Classes & recordings",
    sub: "Online and onsite",
    href: "/mentor/schedule",
    cta: "Schedule",
    d: "M15 10l5-3v10l-5-3M3 6h12v12H3z",
    rules: [
      { t: "Upload the recording by 9:00 AM", s: "The morning after class, from Schedule & recordings" },
      { t: "Onsite classes are recorded too", s: "Record on the lab laptop or camera, MP4 or MOV up to 4 GB" },
      { t: "Start online classes from the dashboard", s: "The Zoom link is shared with the batch automatically" },
    ],
  },
  {
    id: "hb-courses",
    title: "Courses & quizzes",
    sub: "Building content",
    href: "/mentor/course-builder",
    cta: "Courses",
    d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
    rules: [
      { t: "An admin reviews a course before it is published", s: "Send it for review from the course builder" },
      { t: "Every lesson ends with a quiz", s: "A module opens only when every quiz before it is taken" },
      { t: "Answer student questions within a day", s: "The oldest question is shown first" },
    ],
  },
];

export default function Page() {
  return (
    <main id="main-content" tabIndex={-1} className="p-main c-dash">
      <div className="c-grid">
        {SECTIONS.map((s) => (
          <section key={s.id} className="c-panel" data-span="6" aria-labelledby={s.id}>
            <div className="c-panel-head">
              <span className="c-ico" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                  <path d={s.d} />
                </svg>
              </span>
              <div className="c-panel-title">
                <h2 id={s.id}>{s.title}</h2>
                <span className="c-panel-sub">{s.sub}</span>
              </div>
              <Link className="c-link" href={s.href}>
                {s.cta} →
              </Link>
            </div>
            <div className="c-panel-body">
              <ul className="c-lines">
                {s.rules.map((r) => (
                  <li key={r.t} className="c-line">
                    <span className="c-line-text">
                      <span className="c-line-t">{r.t}</span>
                      <span className="c-line-s">{r.s}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
        <section className="c-panel" data-span="12" aria-labelledby="hb-help">
          <div className="c-panel-head">
            <div className="c-panel-title">
              <h2 id="hb-help">Need something the handbook doesn&apos;t cover?</h2>
              <span className="c-panel-sub">Full teaching standards arrive with the owner copy</span>
            </div>
            <Link className="c-link" href="/mentor/profile">
              Your profile →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
