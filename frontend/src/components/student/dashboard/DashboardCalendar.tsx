import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function DashboardCalendar() {
  return (
    <section className="widget calendar-widget">
      <div className="widget-heading">
        <div>
          <p className="muted">Task schedule</p>
          <h2>October 2026</h2>
        </div>
        <Link
          className="outline-circle"
          aria-label="Open full schedule"
          href="/student/routine"
        >
          <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
      <div className="cal-grid">
        <abbr title="Sun">S</abbr>
        <abbr title="Mon">M</abbr>
        <abbr title="Tue">T</abbr>
        <abbr title="Wed">W</abbr>
        <abbr title="Thu">T</abbr>
        <abbr title="Fri">F</abbr>
        <abbr title="Sat">S</abbr>
        <span className="cal-out">27</span>
        <span className="cal-out">28</span>
        <span className="cal-out">29</span>
        <span className="cal-out">30</span>
        <button
          type="button"
          className="cal-day has-event"
          data-date="2026-10-01"
          aria-pressed="false"
          aria-label="1 October, WordPress · Class 8"
        >
          1
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-02"
          aria-pressed="false"
          aria-label="2 October, no scheduled tasks"
        >
          2
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-03"
          aria-pressed="false"
          aria-label="3 October, no scheduled tasks"
        >
          3
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-04"
          aria-pressed="false"
          aria-label="4 October, no scheduled tasks"
        >
          4
        </button>
        <button
          type="button"
          className="cal-day has-event"
          data-date="2026-10-05"
          aria-pressed="false"
          aria-label="5 October, WordPress · Class 9"
        >
          5
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-06"
          aria-pressed="false"
          aria-label="6 October, no scheduled tasks"
        >
          6
        </button>
        <button
          type="button"
          className="cal-day has-event"
          data-date="2026-10-07"
          aria-pressed="false"
          aria-label="7 October, Graphic Design · Live 6"
        >
          7
        </button>
        <button
          type="button"
          className="cal-day has-event"
          data-date="2026-10-08"
          aria-pressed="false"
          aria-label="8 October, WordPress · Class 10"
        >
          8
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-09"
          aria-pressed="false"
          aria-label="9 October, no scheduled tasks"
        >
          9
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-10"
          aria-pressed="false"
          aria-label="10 October, no scheduled tasks"
        >
          10
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-11"
          aria-pressed="false"
          aria-label="11 October, no scheduled tasks"
        >
          11
        </button>
        <button
          type="button"
          className="cal-day has-event"
          data-date="2026-10-12"
          aria-pressed="false"
          aria-label="12 October, WordPress · Class 11"
        >
          12
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-13"
          aria-pressed="false"
          aria-label="13 October, no scheduled tasks"
        >
          13
        </button>
        <button
          type="button"
          className="cal-day has-event"
          data-date="2026-10-14"
          aria-pressed="false"
          aria-label="14 October, Graphic Design · Live 7"
        >
          14
        </button>
        <button
          type="button"
          className="cal-day has-event"
          data-date="2026-10-15"
          aria-pressed="true"
          aria-label="15 October, WordPress · Class 12"
        >
          15
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-16"
          aria-pressed="false"
          aria-label="16 October, no scheduled tasks"
        >
          16
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-17"
          aria-pressed="false"
          aria-label="17 October, no scheduled tasks"
        >
          17
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-18"
          aria-pressed="false"
          aria-label="18 October, no scheduled tasks"
        >
          18
        </button>
        <button
          type="button"
          className="cal-day has-event"
          data-date="2026-10-19"
          aria-pressed="false"
          aria-label="19 October, WordPress · Class 13"
        >
          19
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-20"
          aria-pressed="false"
          aria-label="20 October, no scheduled tasks"
        >
          20
        </button>
        <button
          type="button"
          className="cal-day has-event"
          data-date="2026-10-21"
          aria-pressed="false"
          aria-label="21 October, Graphic Design · Live 8"
        >
          21
        </button>
        <button
          type="button"
          className="cal-day has-event"
          data-date="2026-10-22"
          aria-pressed="false"
          aria-label="22 October, WordPress · Class 14"
        >
          22
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-23"
          aria-pressed="false"
          aria-label="23 October, no scheduled tasks"
        >
          23
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-24"
          aria-pressed="false"
          aria-label="24 October, no scheduled tasks"
        >
          24
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-25"
          aria-pressed="false"
          aria-label="25 October, no scheduled tasks"
        >
          25
        </button>
        <button
          type="button"
          className="cal-day has-event"
          data-date="2026-10-26"
          aria-pressed="false"
          aria-label="26 October, WordPress · Class 15"
        >
          26
        </button>
        <button
          type="button"
          className="cal-day has-event"
          data-date="2026-10-27"
          aria-pressed="false"
          aria-label="27 October, Social media post set due"
        >
          27
        </button>
        <button
          type="button"
          className="cal-day has-event"
          data-date="2026-10-28"
          aria-pressed="false"
          aria-label="28 October, Graphic Design · Live 9"
        >
          28
        </button>
        <button
          type="button"
          className="cal-day has-event"
          data-date="2026-10-29"
          aria-pressed="false"
          aria-label="29 October, WordPress · Class 16"
        >
          29
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-30"
          aria-pressed="false"
          aria-label="30 October, no scheduled tasks"
        >
          30
        </button>
        <button
          type="button"
          className="cal-day"
          data-date="2026-10-31"
          aria-pressed="false"
          aria-label="31 October, no scheduled tasks"
        >
          31
        </button>
      </div>
      <p className="day-detail" aria-live="polite" hidden />
    </section>
  );
}
