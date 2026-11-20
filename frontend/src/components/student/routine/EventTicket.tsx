import {
ArrowUpRight,
CalendarClock,
ClipboardCheck,
Clock3,
FileText,
Flag,
MapPin,
Video,
Wallet,
} from "lucide-react";
import Link from "next/link";
import {
courses,
displayDate,
selectedDate,
type ScheduleEvent,
} from "./schedule";
const labels = {
  campus: "On campus",
  online: "Online live",
  deadline: "Deadline",
};
const icon = { strokeWidth: 1.8, "aria-hidden": true } as const;
export function EventTicket({ event }: { event: ScheduleEvent }) {
  const HeadingIcon = event.kind === "deadline" ? Flag : CalendarClock;
  const PlaceIcon =
    event.kind === "campus"
      ? MapPin
      : event.kind === "online"
        ? Video
        : event.time
          ? FileText
          : Wallet;
  return (
    <article
      className="routine-ticket"
      data-ticket={event.date}
      data-course={event.course}
      data-kind={event.kind}
      hidden={event.date !== selectedDate}
    >
      <div className="ticket-top">
        <span>
          <HeadingIcon {...icon} size={18} />{" "}
          <span data-ticket-heading="">
            {event.date === selectedDate ? "Next class" : labels[event.kind]}
          </span>
        </span>
        <span className="ticket-format">{labels[event.kind]}</span>
      </div>
      <div className="ticket-body">
        <time dateTime={event.date}>
          {displayDate(event.date, {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </time>
        <h2>{event.title}</h2>
        <p>
          {courses[event.course]} · {event.label}
        </p>
      </div>
      <div className="ticket-facts">
        {event.time && (
          <p>
            <Clock3 {...icon} size={16} /> {event.time}
          </p>
        )}
        <p>
          <PlaceIcon {...icon} size={16} /> {event.place}
        </p>
        {event.status && event.status !== "Upcoming" && (
          <p>
            <ClipboardCheck {...icon} size={16} /> Attendance: {event.status}
          </p>
        )}
      </div>
      <Link className="ticket-action" href={event.href}>
        {event.action} <ArrowUpRight {...icon} size={15} />
      </Link>
    </article>
  );
}
