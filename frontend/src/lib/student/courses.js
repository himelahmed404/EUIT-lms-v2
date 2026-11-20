export function initPage(signal) {
  const container = document.querySelector("[data-library-filters]");
  const buttons = [...container.querySelectorAll("[data-course-filter]")];
  const cards = [...document.querySelectorAll("[data-course-state]")];
  const status = document.querySelector("[data-filter-status]");
  function select(key) {
    const filter = buttons.some((b) => b.dataset.courseFilter === key)
      ? key
      : "all";
    buttons.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.courseFilter === filter)),
    );
    cards.forEach((c) => {
      c.hidden = filter !== "all" && c.dataset.courseState !== filter;
    });
    const count = cards.filter((c) => !c.hidden).length;
    status.textContent =
      count + (count === 1 ? " course shown." : " courses shown.");
  }
  function fromLocation() {
    select(new URLSearchParams(location.search).get("filter"));
  }
  buttons.forEach((button) =>
    button.addEventListener(
      "click",
      () => {
        const key = button.dataset.courseFilter;
        select(key);
        const url = new URL(location.href);
        if (key === "all") url.searchParams.delete("filter");
        else url.searchParams.set("filter", key);
        if (url.href !== location.href) {
          try {
            history.pushState(null, "", url);
          } catch {
            /* Filters also work in restricted file previews. */
          }
        }
      },
      { signal },
    ),
  );
  fromLocation();
  container.hidden = false;
  window.addEventListener("popstate", fromLocation, { signal });
}
