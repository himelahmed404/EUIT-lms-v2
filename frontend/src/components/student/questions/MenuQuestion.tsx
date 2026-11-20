import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";

export function MenuQuestion() {
  return (
    <article className="p-card mq-card" data-list-item="" data-tags="answered">
      <div className="mq-top">
        <span className="p-small">
          WordPress · Batch 14 · Class 12 · Building a custom header · at 9:40
        </span>
        <span className="eit-badge eit-badge--success">Answered</span>
      </div>
      <div className="mq-ask">
        <span className="p-avatar p-avatar--sm" aria-hidden="true">
          NJ
        </span>
        <div className="mq-text">
          <h3 className="p-h3">Why is my menu not showing?</h3>
          <span className="p-small">You · 12 Oct</span>
          <p className="p-body">
            I registered the menu but nothing shows in the header.
          </p>
        </div>
      </div>
      <div className="mq-answer">
        <span className="p-avatar p-avatar--sm" aria-hidden="true">
          KH
        </span>
        <div className="mq-text">
          <strong>
            Kamrul Hasan{" "}
            <span className="eit-badge eit-badge--success">Mentor</span>
          </strong>
          <span className="p-small">12 Oct</span>
          <p className="p-body">
            Check that the theme location in <code>wp_nav_menu()</code> matches
            the one in <code>register_nav_menus()</code>, then assign a menu to
            it under Appearance → Menus.
          </p>
        </div>
      </div>
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
        <button
          type="button"
          className="p-ghostbtn"
          data-toast="Thanks. Kamrul sees that this helped."
        >
          This helped
        </button>
      </div>
    </article>
  );
}
