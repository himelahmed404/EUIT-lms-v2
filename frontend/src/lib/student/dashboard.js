import data from "./dashboard-data.json";
export function initPage(signal) {
  const selector = document.querySelector("#study-period");
  if (!selector) return;
  selector.addEventListener(
    "change",
    () => {
      const values = data.progress[selector.value];
      document.querySelectorAll(".study-fill").forEach((bar, i) => {
        bar.style.setProperty("--value", values[i] + "%");
        bar.querySelector("b").textContent = values[i] + "%";
        bar.classList.toggle("peak", values[i] === Math.max(...values));
      });
    },
    { signal },
  );

  const track = document.querySelector(".course-track");
  const arrows = [...document.querySelectorAll("[data-slide]")];
  function updateArrows() {
    const fits = track.scrollWidth <= track.clientWidth + 2;
    arrows.forEach((button) => {
      const atEdge =
        Number(button.dataset.slide) < 0
          ? track.scrollLeft <= 2
          : track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
      button.disabled = fits || atEdge;
    });
  }
  arrows.forEach((button) =>
    button.addEventListener(
      "click",
      () => {
        const step =
          track.children[1].offsetLeft - track.children[0].offsetLeft;
        track.scrollBy({
          left: Number(button.dataset.slide) * step,
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
      },
      { signal },
    ),
  );
  const observer = new ResizeObserver(updateArrows);
  observer.observe(track);
  signal.addEventListener("abort", () => observer.disconnect(), { once: true });
  track.addEventListener("scroll", updateArrows, { signal, passive: true });
  updateArrows();

  const weeks = document.querySelector("#activity-week");
  const bars = [...document.querySelectorAll(".hour-col")];
  function selectDay(index) {
    bars.forEach((b, i) => b.setAttribute("aria-pressed", String(i === index)));
  }
  bars.forEach((button, i) =>
    button.addEventListener("click", () => selectDay(i), { signal }),
  );
  weeks.addEventListener(
    "change",
    () => {
      const values = data.activity[Number(weeks.value)];
      bars.forEach((button, i) => {
        const mins = values[i];
        const time =
          Math.floor(mins / 60) +
          "h " +
          String(mins % 60).padStart(2, "0") +
          "m";
        button
          .querySelector(".hour-bar")
          .style.setProperty("--value", mins / 6 + "%");
        button.querySelector(".hour-tooltip").textContent = time;
        button.setAttribute(
          "aria-label",
          button.querySelector("small").textContent + ", " + time,
        );
      });
      selectDay(values.indexOf(Math.max(...values)));
      const sum = (a) => a.reduce((x, y) => x + y, 0);
      document.querySelector("#week-note").textContent =
        weeks.value === "1"
          ? "27 September – 3 October"
          : "+" +
            Math.round(
              100 * (sum(data.activity[0]) / sum(data.activity[1]) - 1),
            ) +
            "% than last week";
    },
    { signal },
  );
  const detail = document.querySelector(".day-detail");
  const days = [...document.querySelectorAll("[data-date]")];
  days.forEach((button) =>
    button.addEventListener(
      "click",
      () => {
        days.forEach((day) =>
          day.setAttribute("aria-pressed", String(day === button)),
        );
        detail.hidden = false;
        detail.textContent =
          button.textContent +
          " October · " +
          (data.events[button.dataset.date] || "No scheduled tasks.");
      },
      { signal },
    ),
  );
}
