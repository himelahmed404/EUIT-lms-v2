import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";

export function AnimationQuestion() {
  return (
    <article
      data-motion-intro=""
      className="p-card mq-card"
      data-list-item=""
      data-tags="waiting"
    >
      <div className="mq-top">
        <span className="p-small">
          WordPress · Batch 14 · Class 12 · Building a custom header · at 11:36
        </span>
        <span className="eit-badge eit-badge--warning">Waiting</span>
      </div>
      <div className="mq-ask">
        <span className="p-avatar p-avatar--sm" aria-hidden="true">
          NJ
        </span>
        <div className="mq-text">
          <h3 className="p-h3">Is 400ms too slow for the menu slide-in?</h3>
          <span className="p-small">You · Today, 2 h ago</span>
          <p className="p-body">
            I used 400ms for the mobile menu slide-in. It feels a bit slow on my
            phone. Is that okay, or should it be faster?
          </p>
        </div>
      </div>
      <p className="p-notice mq-wait">
        <StudentIcon width="18" height="18">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </StudentIcon>
        <span>
          Kamrul usually replies within a day. You get a notification and an SMS
          when he does.
        </span>
      </p>
      <div className="mq-foot">
        <Link className="p-link" href="/student/course-offline#op-ask">
          Open the lesson
          <span className="p-arrow" style={{ display: "inline-flex" }}>
            <StudentIcon width="16" height="16">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </StudentIcon>
          </span>
        </Link>
      </div>
    </article>
  );
}
