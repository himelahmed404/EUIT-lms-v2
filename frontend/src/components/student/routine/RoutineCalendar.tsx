import { ChevronLeft,ChevronRight } from "lucide-react";
import { MonthAgenda } from "./MonthAgenda";
import { MonthGrid } from "./MonthGrid";
import { displayDate,months,selectedDate } from "./schedule";
export function RoutineCalendar() {
  return (
    <section
      data-motion-intro=""
      className="routine-calendar"
      aria-labelledby="routine-month"
    >
      <div className="cal-toolbar">
        <h2 id="routine-month">
          {displayDate(selectedDate, { month: "long", year: "numeric" })}
        </h2>
        <div className="cal-controls" hidden>
          <button type="button" data-today-button="">
            Today
          </button>
          <button type="button" data-prev-month="" aria-label="Previous month">
            <ChevronLeft size={17} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <button type="button" data-next-month="" aria-label="Next month">
            <ChevronRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>
      {months.map((month) => (
        <MonthGrid key={month} month={month} />
      ))}
      <div className="calendar-key">
        <span className="kind-campus">
          <i />
          On campus
        </span>
        <span className="kind-online">
          <i />
          Online live
        </span>
        <span className="kind-deadline">
          <i />
          Deadline
        </span>
      </div>
      <p className="month-notice" data-month-notice="" hidden>
        Class dates after October have not been published.
      </p>
      <MonthAgenda />
    </section>
  );
}
