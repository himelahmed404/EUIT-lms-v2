import Link from "next/link";
import { RoutineCalendar } from "./RoutineCalendar";
import { RoutineSidebar } from "./RoutineSidebar";
import { displayDate,schedule,selectedDate,today } from "./schedule";
import { UpcomingDeadlines } from "./UpcomingDeadlines";
export function RoutineScreen() {
  return (
    <>
      <main
        className="routine-room"
        data-routine=""
        data-today={today}
        data-initial={selectedDate}
      >
        <header className="routine-title">
          <div>
            <h1 className="student-page-title">Routine</h1>
            <p>Classes and deadlines in Dhaka time.</p>
          </div>
          <div
            className="routine-filters"
            role="group"
            aria-label="Filter routine by course"
            hidden
          >
            <button type="button" data-course-filter="all" aria-pressed="true">
              All courses
            </button>
            <button
              type="button"
              data-course-filter="wordpress"
              aria-pressed="false"
            >
              WordPress
            </button>
            <button
              type="button"
              data-course-filter="design"
              aria-pressed="false"
            >
              Graphic Design
            </button>
          </div>
        </header>
        <div className="routine-layout">
          <RoutineCalendar />
          <RoutineSidebar />
        </div>
        <UpcomingDeadlines />
        <p className="sr-only" role="status" data-routine-status="" />
        <noscript>
          <h2>Class and deadline links</h2>
          <ul>
            {schedule.map((event) => (
              <li key={event.date + event.title}>
                {displayDate(event.date, { day: "numeric", month: "short" })} ·{" "}
                <Link href={event.href}>{event.title}</Link>
              </li>
            ))}
          </ul>
        </noscript>
      </main>
    </>
  );
}
