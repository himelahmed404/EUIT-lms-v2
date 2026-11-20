import {
courses,
displayDate,
schedule,
selectedDate,
today,
} from "./schedule";

export function MonthGrid({ month }: { month: string }) {
  const first = new Date(month + "-01T12:00:00Z");
  const offset = first.getUTCDay();
  const days = new Date(
    Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0),
  ).getUTCDate();
  const cells = Math.ceil((offset + days) / 7) * 7;
  return (
    <div data-calendar-month={month} hidden={!selectedDate.startsWith(month)}>
      <div className="routine-weekdays" aria-hidden="true">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div
        className="routine-cells"
        role="group"
        aria-label={
          displayDate(month + "-01", { month: "long", year: "numeric" }) +
          " dates"
        }
      >
        {Array.from({ length: cells }, (_, index) => {
          const day = index - offset + 1;
          if (day < 1 || day > days)
            return (
              <div key={index} className="routine-blank" aria-hidden="true" />
            );
          const date = month + "-" + String(day).padStart(2, "0");
          const name = displayDate(date, {
            weekday: "long",
            day: "numeric",
            month: "long",
          });
          const entries = schedule.filter((event) => event.date === date);
          return (
            <button
              key={date}
              type="button"
              className="routine-day"
              data-day={date}
              data-name={name}
              aria-pressed={date === selectedDate}
              aria-current={date === today ? "date" : undefined}
              aria-label={[
                name,
                ...entries.map(
                  (event) => courses[event.course] + " " + event.label,
                ),
              ].join(", ")}
            >
              <span className="day-number">{day}</span>
              {entries.map((event) => (
                <span
                  key={event.title}
                  className={"calendar-entry kind-" + event.kind}
                  data-entry-course={event.course}
                  data-description={courses[event.course] + " " + event.label}
                >
                  <i />
                  <span>{event.label}</span>
                </span>
              ))}
            </button>
          );
        })}
      </div>
    </div>
  );
}
