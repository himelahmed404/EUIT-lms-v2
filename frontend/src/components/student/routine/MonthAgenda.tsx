import { ArrowUpRight,ChevronDown,List } from "lucide-react";
import Link from "next/link";
import { courses,displayDate,schedule,selectedDate } from "./schedule";

export function MonthAgenda() {
  return (
    <details className="month-agenda">
      <summary>
        <List size={16} strokeWidth={1.8} aria-hidden="true" /> Month agenda{" "}
        <ChevronDown size={16} strokeWidth={1.8} aria-hidden="true" />
      </summary>
      <div className="month-agenda-list">
        {schedule.map((event) => (
          <Link
            key={event.date + event.title}
            data-agenda-date={event.date}
            data-agenda-course={event.course}
            href={event.href}
            hidden={!event.date.startsWith(selectedDate.slice(0, 7))}
          >
            <time dateTime={event.date}>
              {displayDate(event.date, {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </time>
            <span>
              <strong>{event.title}</strong>
              <small>
                {courses[event.course]} · {event.time || event.place}
              </small>
            </span>
            <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        ))}
        <p data-agenda-empty="" hidden>
          No events published for this course this month.
        </p>
      </div>
    </details>
  );
}
