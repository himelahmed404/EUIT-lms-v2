import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function UpcomingDeadlines() {
  return (
    <section className="routine-deadlines" aria-labelledby="routine-deadlines">
      <h2 id="routine-deadlines">Upcoming deadlines</h2>
      <div className="deadlines-grid">
        <Link
          className="deadline-entry"
          data-deadline-course="design"
          href="/student/project-detail"
        >
          <time dateTime="2026-10-27">
            <span>Oct</span>
            <b>27</b>
          </time>
          <div>
            <p>Graphic Design · Project due</p>
            <h3>Social media post set</h3>
            <span>11:59 PM</span>
          </div>
          <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </Link>
        <Link
          className="deadline-entry"
          data-deadline-course="wordpress"
          href="/student/payments"
        >
          <time dateTime="2026-11-15">
            <span>Nov</span>
            <b>15</b>
          </time>
          <div>
            <p>WordPress · Payment due</p>
            <h3>Installment 2 of 3</h3>
            <span>৳5,000</span>
          </div>
          <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
