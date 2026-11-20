import { ListFilter } from "lucide-react";
import type { CSSProperties } from "react";

export function HoursActivityWidget() {
  return (
    <section className="widget hours-widget">
      <div className="widget-heading">
        <div>
          <h2>Hours activity</h2>
          <p className="muted" id="week-note">
            <b>+3%</b> than last week
          </p>
        </div>
        <label className="activity-choice" title="Choose activity week">
          <ListFilter size={17} strokeWidth={1.8} aria-hidden="true" />
          <select id="activity-week" aria-label="Activity week">
            <option value="0">4–10 October</option>
            <option value="1">27 September–3 October</option>
          </select>
        </label>
      </div>
      <div className="hours-chart">
        <div className="y-labels">
          <span>10h</span>
          <span>8h</span>
          <span>6h</span>
          <span>4h</span>
          <span>2h</span>
          <span>0h</span>
        </div>
        <div className="plot">
          <button
            className="hour-col"
            aria-label="Sun, 4h 00m"
            aria-pressed="false"
            data-day="0"
          >
            <span
              className="hour-bar"
              style={{ "--value": "40%" } as CSSProperties}
            >
              <span className="hour-tooltip">4h 00m</span>
            </span>
            <small>Sun</small>
          </button>
          <button
            className="hour-col"
            aria-label="Mon, 5h 30m"
            aria-pressed="false"
            data-day="1"
          >
            <span
              className="hour-bar"
              style={{ "--value": "55%" } as CSSProperties}
            >
              <span className="hour-tooltip">5h 30m</span>
            </span>
            <small>Mon</small>
          </button>
          <button
            className="hour-col"
            aria-label="Tue, 3h 18m"
            aria-pressed="false"
            data-day="2"
          >
            <span
              className="hour-bar"
              style={{ "--value": "33%" } as CSSProperties}
            >
              <span className="hour-tooltip">3h 18m</span>
            </span>
            <small>Tue</small>
          </button>
          <button
            className="hour-col"
            aria-label="Wed, 8h 45m"
            aria-pressed="true"
            data-day="3"
          >
            <span
              className="hour-bar"
              style={{ "--value": "87.5%" } as CSSProperties}
            >
              <span className="hour-tooltip">8h 45m</span>
            </span>
            <small>Wed</small>
          </button>
          <button
            className="hour-col"
            aria-label="Thu, 4h 48m"
            aria-pressed="false"
            data-day="4"
          >
            <span
              className="hour-bar"
              style={{ "--value": "48%" } as CSSProperties}
            >
              <span className="hour-tooltip">4h 48m</span>
            </span>
            <small>Thu</small>
          </button>
          <button
            className="hour-col"
            aria-label="Fri, 1h 48m"
            aria-pressed="false"
            data-day="5"
          >
            <span
              className="hour-bar"
              style={{ "--value": "18%" } as CSSProperties}
            >
              <span className="hour-tooltip">1h 48m</span>
            </span>
            <small>Fri</small>
          </button>
          <button
            className="hour-col"
            aria-label="Sat, 5h 48m"
            aria-pressed="false"
            data-day="6"
          >
            <span
              className="hour-bar"
              style={{ "--value": "58%" } as CSSProperties}
            >
              <span className="hour-tooltip">5h 48m</span>
            </span>
            <small>Sat</small>
          </button>
        </div>
      </div>
    </section>
  );
}
