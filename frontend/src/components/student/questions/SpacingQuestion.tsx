import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";

export function SpacingQuestion() {
  return (
    <article className="p-card mq-card" data-list-item="" data-tags="answered">
      <div className="mq-top">
        <span className="p-small">
          Graphic Design · Batch 9 · Live 6 · Grids and layout · at 52:10
        </span>
        <span className="eit-badge eit-badge--success">Answered</span>
      </div>
      <div className="mq-ask">
        <span className="p-avatar p-avatar--sm" aria-hidden="true">
          NJ
        </span>
        <div className="mq-text">
          <h3 className="p-h3">
            Should the margins be the same on every side?
          </h3>
          <span className="p-small">You · 7 Oct</span>
          <p className="p-body">
            In the grid exercise my post looks crowded at the bottom. Should the
            margins be the same on every side of the post?
          </p>
        </div>
      </div>
      <div className="mq-answer">
        <span className="p-avatar p-avatar--sm" aria-hidden="true">
          NR
        </span>
        <div className="mq-text">
          <strong>
            Nadia Rahman{" "}
            <span className="eit-badge eit-badge--success">Mentor</span>
          </strong>
          <span className="p-small">8 Oct</span>
          <p className="p-body">
            Not always. Keep the outer margins equal, then give the bottom a
            little more room when a caption or logo sits there. Slide 12 of the
            Live 6 deck shows both versions.
          </p>
        </div>
      </div>
      <div className="mq-foot">
        <Link className="p-link" href="/student/course-player#lp-ask">
          Open the lesson
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
        <button
          type="button"
          className="p-ghostbtn"
          data-toast="Thanks. Nadia sees that this helped."
        >
          This helped
        </button>
      </div>
    </article>
  );
}
