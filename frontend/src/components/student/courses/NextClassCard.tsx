import { ArrowUpRight,CalendarDays,Clock3,MapPin } from "lucide-react";
import Link from "next/link";

export function NextClassCard() {
  return (
    <aside
      data-motion-intro=""
      className="next-class"
      aria-labelledby="next-class-name"
    >
      <div className="next-top">
        <p>
          <CalendarDays size={18} strokeWidth={1.8} aria-hidden="true" /> Next
          class
        </p>
        <time dateTime="2026-10-19" className="class-date">
          <span>OCT</span>
          <b>19</b>
        </time>
      </div>
      <div className="next-details">
        <p className="class-course">WordPress · Class 13</p>
        <h2 id="next-class-name">Navigation menus</h2>
        <p>
          <Clock3 size={15} strokeWidth={1.8} aria-hidden="true" /> Monday,
          7:00–9:00 PM
        </p>
        <p>
          <MapPin size={15} strokeWidth={1.8} aria-hidden="true" /> Lab 2,
          Mirpur-10
        </p>
      </div>
      <Link className="class-link" href="/student/routine">
        Open schedule{" "}
        <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
      </Link>
    </aside>
  );
}
