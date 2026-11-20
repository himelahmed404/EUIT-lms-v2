import { ArrowUpRight,CalendarDays,School,Video } from "lucide-react";
import Link from "next/link";
import { EventTicket } from "./EventTicket";
import { schedule } from "./schedule";

export function RoutineSidebar() {
  return (
    <aside
      data-motion-intro=""
      className="routine-sidebar"
      aria-label="Schedule details"
    >
      <section className="ticket-holder" aria-label="Selected date">
        {schedule.map((event) => (
          <EventTicket key={event.date + event.title} event={event} />
        ))}
        <article
          className="routine-ticket ticket-empty"
          data-empty-day=""
          hidden
        >
          <span>
            <CalendarDays size={20} strokeWidth={1.8} aria-hidden="true" /> Day
            schedule
          </span>
          <h2 data-empty-title="" />
          <p>No events scheduled for this course selection.</p>
        </article>
      </section>
      <section className="weekly-routine">
        <h2>Weekly routine</h2>
        <Link
          className="weekly-course kind-campus"
          href="/student/course-offline"
          data-weekly-course="wordpress"
        >
          <span className="weekly-icon">
            <School size={19} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <h3>
              WordPress <span>· Batch 14</span>
            </h3>
            <p>Monday &amp; Thursday · 7:00–9:00 PM</p>
            <small>11 of 12 classes attended</small>
          </div>
          <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
        </Link>
        <Link
          className="weekly-course kind-online"
          href="/student/course-player"
          data-weekly-course="design"
        >
          <span className="weekly-icon">
            <Video size={19} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <h3>
              Graphic Design <span>· Batch 9</span>
            </h3>
            <p>Wednesday · 8:00–9:30 PM</p>
            <small>7 of 7 sessions attended</small>
          </div>
          <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </section>
    </aside>
  );
}
