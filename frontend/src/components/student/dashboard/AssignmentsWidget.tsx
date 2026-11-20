import { ChartNoAxesCombined,Sun,Triangle } from "lucide-react";
import Link from "next/link";

export function AssignmentsWidget() {
  return (
    <section data-motion-intro="" className="widget assignments-widget">
      <div className="widget-heading">
        <h2>Assignments</h2>
        <Link className="soft-button" href="/student/assignments">
          View all
        </Link>
      </div>
      <div className="row-list">
        <Link
          data-motion-card=""
          className="assignment-row"
          href="/student/quiz"
        >
          <span data-motion-detail="" className="row-icon violet">
            <ChartNoAxesCombined
              size={19}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </span>
          <span className="row-text">
            <b>Custom header quiz</b>
            <small>15 Oct · 9:00 PM</small>
          </span>
          <span className="status violet">In progress</span>
        </Link>
        <Link
          data-motion-card=""
          className="assignment-row"
          href="/student/project-feedback"
        >
          <span data-motion-detail="" className="row-icon green">
            <Triangle size={19} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="row-text">
            <b>Portfolio homepage</b>
            <small>8 Oct · 6:00 PM</small>
          </span>
          <span className="status green">Completed</span>
        </Link>
        <Link
          data-motion-card=""
          className="assignment-row"
          href="/student/project-detail"
        >
          <span data-motion-detail="" className="row-icon neutral">
            <Sun size={19} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="row-text">
            <b>Social media post set</b>
            <small>27 Oct · 11:59 PM</small>
          </span>
          <span className="status neutral">Upcoming</span>
        </Link>
      </div>
    </section>
  );
}
