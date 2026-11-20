import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";

export function QuestionGuidance() {
  return (
    <aside className="mq-side">
      <section
        className="p-card"
        aria-labelledby="mq-how"
        style={{ display: "flex", flexDirection: "column", gap: "14px" }}
      >
        <h2 id="mq-how" className="p-h3">
          How asking works
        </h2>
        <ol className="mq-steps">
          <li>
            <span className="mq-step-n">1</span>
            <span>
              <strong>Pause where you&apos;re stuck</strong>
              <span className="p-small">
                Note the time in the video, so your mentor can see the same
                moment.
              </span>
            </span>
          </li>
          <li>
            <span className="mq-step-n">2</span>
            <span>
              <strong>Ask under the lesson</strong>
              <span className="p-small">
                Open the lesson&apos;s Ask the mentor tab and say what you tried
                and what happened.
              </span>
            </span>
          </li>
          <li>
            <span className="mq-step-n">3</span>
            <span>
              <strong>Get the answer here</strong>
              <span className="p-small">
                Answers show on this page and under the lesson, and come by SMS
                too.
              </span>
            </span>
          </li>
        </ol>
        <Link
          className="eit-btn eit-btn--primary eit-btn--md eit-btn--block"
          href="/student/course-player#lp-ask"
        >
          <span className="eit-btn__label">Ask about your current lesson</span>
        </Link>
      </section>
      <section
        className="p-card"
        aria-labelledby="mq-faq"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <h2 id="mq-faq" className="p-h3">
          Not about a lesson?
        </h2>
        <p className="p-small" style={{ margin: "0" }}>
          Payments, log in and certificates are answered in the help centre.
        </p>
        <Link className="p-link" href="/student/help">
          Go to Help
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
      </section>
    </aside>
  );
}
