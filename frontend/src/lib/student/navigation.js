export function initPage(signal, revealMenu) {
  const bell = document.querySelector("[data-notif-scope]");
  function syncNotificationBell() {
    try {
      if (
        bell &&
        localStorage.getItem("eit-read-" + bell.dataset.notifScope) === "1"
      )
        bell.querySelector("[data-unread-count]")?.remove();
    } catch {
      /* Storage is optional for file previews. */
    }
  }
  syncNotificationBell();
  window.addEventListener("pageshow", syncNotificationBell, { signal });
  window.addEventListener(
    "storage",
    (event) => {
      if (event.key === "eit-read-student") syncNotificationBell();
    },
    { signal },
  );

  const panel = document.getElementById("student-dropdown");
  const avatar = document.querySelector("[data-account-trigger]");
  const searchButton = document.querySelector("[data-search-trigger]");
  const account = panel.querySelector(".account-view");
  const directory = panel.querySelector(".directory-view");
  const search = directory.querySelector("input");
  const results = directory.querySelector(".directory-results");
  const links = [...results.querySelectorAll(".page-option")].map((link) => ({
    link,
    keywords: (link.textContent + " " + link.dataset.alias).toLocaleLowerCase(),
  }));
  let opener;

  function fitPanel() {
    if (panel.hidden) return;
    const viewport = window.visualViewport;
    const bottom = viewport
      ? viewport.height + viewport.offsetTop
      : window.innerHeight;
    const space = bottom - avatar.getBoundingClientRect().bottom - 18;
    panel.style.setProperty(
      "--account-space",
      Math.max(0, Math.floor(space)) + "px",
    );
  }
  function filter() {
    const query = search.value.trim().toLocaleLowerCase();
    const words = query.split(/\s+/);
    results.hidden = !query;
    let visible = 0;
    for (const { link, keywords } of links) {
      link.hidden = !query || !words.every((word) => keywords.includes(word));
      if (!link.hidden) visible++;
    }
    directory.querySelector("[data-search-count]").textContent = query
      ? visible + (visible === 1 ? " matching page" : " matching pages")
      : "";
    results.querySelector(".empty-search").hidden = !query || visible !== 0;
    results.scrollTop = 0;
  }
  function show(trigger) {
    opener = trigger;
    account.hidden = trigger !== avatar;
    directory.hidden = !account.hidden;
    panel.hidden = false;
    panel.scrollTop = 0;
    avatar.setAttribute("aria-expanded", String(opener === avatar));
    searchButton.setAttribute("aria-expanded", String(opener === searchButton));
    fitPanel();
    revealMenu(panel);
    if (!directory.hidden) {
      search.value = "";
      filter();
      search.focus({ preventScroll: true });
    }
  }
  function close(restoreFocus = false) {
    if (panel.hidden) return;
    panel.hidden = true;
    avatar.setAttribute("aria-expanded", "false");
    searchButton.setAttribute("aria-expanded", "false");
    if (restoreFocus) opener.focus({ preventScroll: true });
  }
  // The legacy student pages also delegate disclosure clicks to the document.
  avatar.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();
      if (!panel.hidden && opener === avatar) close();
      else show(avatar);
    },
    { signal },
  );
  searchButton.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();
      if (!panel.hidden && opener === searchButton) close(true);
      else show(searchButton);
    },
    { signal },
  );
  directory
    .querySelector("[data-dropdown-close]")
    .addEventListener("click", () => close(true), { signal });
  search.addEventListener("input", filter, { signal });
  const inside = (target) =>
    panel.contains(target) ||
    avatar.contains(target) ||
    searchButton.contains(target);
  document.addEventListener(
    "pointerdown",
    (e) => {
      if (!inside(e.target)) close();
    },
    { signal },
  );
  document.addEventListener(
    "focusin",
    (e) => {
      if (!inside(e.target)) close();
    },
    { signal },
  );
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Escape" && !e.isComposing && !panel.hidden) {
        e.preventDefault();
        close(true);
      }
    },
    { signal },
  );
  window.addEventListener("resize", fitPanel, { signal });
  window.visualViewport?.addEventListener("resize", fitPanel, { signal });
  window.addEventListener("pageshow", () => close(), { signal });
}
