import {
ArrowUpRight,
ChevronDown,
Clock3,
FolderOpen,
ListTodo,
} from "lucide-react";
import Link from "next/link";

export function UpcomingProjectCard() {
  return (
    <section
      data-motion-intro=""
      className="work-project"
      aria-labelledby="work-project-title"
    >
      <div className="work-panel-heading">
        <h2 id="work-project-title">
          <FolderOpen size={18} strokeWidth={1.8} aria-hidden="true" /> Upcoming
          project
        </h2>
        <span>Graphic Design · Milestone 2</span>
      </div>
      <div className="project-overview">
        <div className="work-date" aria-hidden="true">
          <span>Oct</span>
          <b>27</b>
        </div>
        <div className="work-project-copy">
          <h3>Social media post set</h3>
          <p>Design five social posts for a Dhaka coffee shop’s winter menu.</p>
          <p className="work-deadline">
            <Clock3 size={15} strokeWidth={1.8} aria-hidden="true" />
            <time dateTime="2026-10-27T23:59:00+06:00">
              Due 27 Oct · 11:59 PM
            </time>
          </p>
        </div>
      </div>
      <details className="work-prep" data-checklist="social-posts">
        <summary>
          <ListTodo size={18} strokeWidth={1.8} aria-hidden="true" /> Submission
          checklist <span className="prep-count" data-prep-count="" hidden />
          <ChevronDown size={16} strokeWidth={1.8} aria-hidden="true" />
        </summary>
        <fieldset>
          <legend className="sr-only">Items prepared for submission</legend>
          <label>
            <input type="checkbox" defaultValue="exports" />{" "}
            <span>Five 1080 × 1080 px PNGs</span>
          </label>
          <label>
            <input type="checkbox" defaultValue="source" />{" "}
            <span>A view-only link to the Figma or Canva file</span>
          </label>
          <label>
            <input type="checkbox" defaultValue="rationale" />{" "}
            <span>A paragraph explaining your type and colour choices</span>
          </label>
        </fieldset>
      </details>
      <Link
        data-motion-card=""
        className="project-brief-link"
        href="/student/project-detail"
      >
        Open project brief{" "}
        <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
      </Link>
    </section>
  );
}
