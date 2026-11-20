import { ArrowUpRight,CheckCircle2,MessageSquareText } from "lucide-react";
import Link from "next/link";

export function LatestFeedbackCard() {
  return (
    <aside
      data-motion-intro=""
      className="work-feedback"
      aria-labelledby="work-feedback-title"
    >
      <div className="work-panel-heading">
        <h2 id="work-feedback-title">
          <MessageSquareText size={18} strokeWidth={1.8} aria-hidden="true" />{" "}
          Latest feedback
        </h2>
      </div>
      <div className="feedback-score">
        <p className="score-figure">
          86<span> / 100</span>
        </p>
        <span className="score-approved">
          <CheckCircle2 size={15} strokeWidth={1.8} aria-hidden="true" />{" "}
          Approved
        </span>
      </div>
      <h3>Portfolio homepage</h3>
      <p className="feedback-byline">
        Kamrul Hasan · <time dateTime="2026-10-08">8 Oct</time>
      </p>
      <dl className="score-breakdown">
        <div>
          <dt>Layout and responsiveness</dt>
          <dd>
            27<span> / 30</span>
            <span className="score-track" aria-hidden="true">
              <i style={{ width: "90%" }} />
            </span>
          </dd>
        </div>
        <div>
          <dt>Code quality</dt>
          <dd>
            22<span> / 25</span>
            <span className="score-track" aria-hidden="true">
              <i style={{ width: "88%" }} />
            </span>
          </dd>
        </div>
        <div>
          <dt>Visual design</dt>
          <dd>
            21<span> / 25</span>
            <span className="score-track" aria-hidden="true">
              <i style={{ width: "84%" }} />
            </span>
          </dd>
        </div>
        <div>
          <dt>Performance and accessibility</dt>
          <dd>
            16<span> / 20</span>
            <span className="score-track" aria-hidden="true">
              <i style={{ width: "80%" }} />
            </span>
          </dd>
        </div>
      </dl>
      <Link
        data-motion-card=""
        className="feedback-link"
        href="/student/project-feedback"
      >
        Read feedback{" "}
        <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
      </Link>
    </aside>
  );
}
