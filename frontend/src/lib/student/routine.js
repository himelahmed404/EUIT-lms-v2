export function initPage(signal) {
  const room = document.querySelector("[data-routine]");
  const calendars = [...room.querySelectorAll("[data-calendar-month]")];
  const months = calendars.map((el) => el.dataset.calendarMonth);
  const days = [...room.querySelectorAll("[data-day]")];
  const tickets = [...room.querySelectorAll("[data-ticket]")];
  const filters = [...room.querySelectorAll("[data-course-filter]")];
  const prev = room.querySelector("[data-prev-month]");
  const next = room.querySelector("[data-next-month]");
  const empty = room.querySelector("[data-empty-day]");
  const live = room.querySelector("[data-routine-status]");
  const today = room.dataset.today;
  const requestedDate = new URLSearchParams(window.location.search).get("date");
  let selected = days.some((day) => day.dataset.day === requestedDate)
    ? requestedDate
    : room.dataset.initial;
  let month = selected.slice(0, 7);
  let course = "all";
  const matches = (value) => course === "all" || course === value;
  const monthLabel = () =>
    new Date(month + "-01T12:00:00Z").toLocaleDateString("en-GB", {
      timeZone: "UTC",
      month: "long",
      year: "numeric",
    });
  function monthEvents() {
    return tickets.filter(
      (t) => t.dataset.ticket.startsWith(month) && matches(t.dataset.course),
    );
  }
  function firstDate() {
    const upcoming = monthEvents();
    return (
      (upcoming.find((t) => t.dataset.ticket > today) || upcoming[0])?.dataset
        .ticket || month + "-01"
    );
  }
  function update() {
    const title = monthLabel();
    room.querySelector("#routine-month").textContent = title;
    prev.disabled = month === months[0];
    next.disabled = month === months[months.length - 1];
    calendars.forEach((cal) => {
      cal.hidden = cal.dataset.calendarMonth !== month;
    });
    filters.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.courseFilter === course)),
    );
    for (const day of days) {
      const chosen = day.dataset.day === selected;
      day.setAttribute("aria-pressed", String(chosen));
      day.tabIndex = chosen ? 0 : -1;
      const entries = [...day.querySelectorAll("[data-entry-course]")];
      entries.forEach((e) => {
        e.hidden = !matches(e.dataset.entryCourse);
      });
      const descriptions = entries
        .filter((e) => !e.hidden)
        .map((e) => e.dataset.description);
      day.setAttribute(
        "aria-label",
        [
          day.dataset.name,
          ...(descriptions.length ? descriptions : ["No events"]),
        ].join(", "),
      );
    }
    room.querySelectorAll("[data-agenda-date]").forEach((link) => {
      link.hidden =
        !link.dataset.agendaDate.startsWith(month) ||
        !matches(link.dataset.agendaCourse);
    });
    room.querySelector("[data-agenda-empty]").hidden = monthEvents().length > 0;
    const dayEvents = tickets.filter(
      (t) => t.dataset.ticket === selected && matches(t.dataset.course),
    );
    const nextClass = tickets.find(
      (t) =>
        matches(t.dataset.course) &&
        t.dataset.kind !== "deadline" &&
        t.dataset.ticket > today,
    );
    for (const ticket of tickets) {
      ticket.hidden = !dayEvents.includes(ticket);
      if (!ticket.hidden) {
        ticket.querySelector("[data-ticket-heading]").textContent =
          ticket === nextClass
            ? "Next class"
            : ticket.dataset.kind === "deadline"
              ? "Due date"
              : "Class details";
      }
    }
    const name = days.find((d) => d.dataset.day === selected).dataset.name;
    empty.hidden = dayEvents.length > 0;
    if (!empty.hidden)
      empty.querySelector("[data-empty-title]").textContent = name;
    room.querySelector("[data-month-notice]").hidden =
      monthEvents().some((t) => t.dataset.kind !== "deadline") ||
      month === today.slice(0, 7);
    room.querySelectorAll("[data-weekly-course]").forEach((el) => {
      el.hidden = !matches(el.dataset.weeklyCourse);
    });
    room.querySelectorAll("[data-deadline-course]").forEach((el) => {
      el.hidden = !matches(el.dataset.deadlineCourse);
    });
    live.textContent =
      name +
      ". " +
      (dayEvents.map((t) => t.querySelector("h2").textContent).join(", ") ||
        "No events scheduled.");
  }
  function selectDay(date, focus) {
    selected = date;
    month = date.slice(0, 7);
    update();
    if (focus) days.find((day) => day.dataset.day === date).focus();
  }
  function moveMonth(step) {
    const newMonth = months[months.indexOf(month) + step];
    if (!newMonth) return;
    month = newMonth;
    selected = firstDate();
    update();
    if (document.activeElement?.disabled) (step > 0 ? prev : next).focus();
  }
  filters.forEach((b) =>
    b.addEventListener(
      "click",
      () => {
        course = b.dataset.courseFilter;
        if (!monthEvents().some((t) => t.dataset.ticket === selected))
          selected = firstDate();
        update();
      },
      { signal },
    ),
  );
  prev.addEventListener("click", () => moveMonth(-1), { signal });
  next.addEventListener("click", () => moveMonth(1), { signal });
  room
    .querySelector("[data-today-button]")
    .addEventListener("click", () => selectDay(today, true), { signal });
  room.querySelector(".routine-calendar").addEventListener(
    "click",
    (e) => {
      const day = e.target.closest("[data-day]");
      if (day) selectDay(day.dataset.day, false);
    },
    { signal },
  );
  room.querySelector(".routine-calendar").addEventListener(
    "keydown",
    (e) => {
      const day = e.target.closest("[data-day]");
      if (!day) return;
      const index = days.indexOf(day);
      const weekday = new Date(day.dataset.day + "T12:00:00Z").getUTCDay();
      const offsets = {
        ArrowLeft: -1,
        ArrowRight: 1,
        ArrowUp: -7,
        ArrowDown: 7,
        Home: -weekday,
        End: 6 - weekday,
      };
      if (!(e.key in offsets)) return;
      e.preventDefault();
      const target =
        days[Math.min(days.length - 1, Math.max(0, index + offsets[e.key]))];
      selectDay(target.dataset.day, true);
    },
    { signal },
  );
  update();
  room.querySelector(".cal-controls").hidden = false;
  room.querySelector(".routine-filters").hidden = false;
}
