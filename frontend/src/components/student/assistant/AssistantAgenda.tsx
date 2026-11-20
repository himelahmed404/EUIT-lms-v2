import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function AssistantAgenda() {
  return (
    <aside className="assistant-agenda" aria-labelledby="agenda-title">
      <h2 id="agenda-title">Coming up</h2>
      <Link data-motion-card="" className="agenda-item" href="/student/routine">
        <span className="agenda-date">
          <small>Oct</small>
          <b>19</b>
        </span>
        <span className="agenda-copy">
          <small>Next class</small>
          <strong>WordPress · Class 13</strong>
        </span>
        <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
      </Link>
      <Link
        data-motion-card=""
        className="agenda-item"
        href="/student/project-detail"
      >
        <span className="agenda-date">
          <small>Oct</small>
          <b>27</b>
        </span>
        <span className="agenda-copy">
          <small>Project due</small>
          <strong>Social media post set</strong>
        </span>
        <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
      </Link>
    </aside>
  );
}
