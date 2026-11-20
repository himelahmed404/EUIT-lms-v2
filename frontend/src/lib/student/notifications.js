export function initPage(signal) {
  const room = document.querySelector(".inbox-room");
  const rows = [...room.querySelectorAll("[data-alert-id]")];
  const initialUnread = rows.filter((row) => row.hasAttribute("data-new"));
  const views = [...room.querySelectorAll("[data-view]")];
  const topics = [...room.querySelectorAll("[data-topic-filter]")];
  const select = room.querySelector(".inbox-select select");
  const markAll = room.querySelector("[data-mark-all]");
  const read = new Set();
  const allReadKey = "eit-read-student";
  const readKey = (id) => "eit.student.notification.read." + id;
  let view = "all",
    topic = "all";

  function render() {
    let shown = 0,
      unreadCount = 0;
    rows.forEach((row) => {
      const unread =
        row.hasAttribute("data-new") && !read.has(row.dataset.alertId);
      row.classList.toggle("is-new", unread);
      const dot = row.querySelector(".alert-dot");
      if (dot) dot.hidden = !unread;
      if (unread) unreadCount++;
      row.hidden =
        (view === "unread" && !unread) ||
        (topic !== "all" && row.dataset.topic !== topic);
      if (!row.hidden) shown++;
    });
    room.querySelectorAll("[data-day-group]").forEach((g) => {
      g.hidden = !g.querySelector("li:not([hidden])");
    });
    views.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.view === view)),
    );
    topics.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.topicFilter === topic)),
    );
    select.value = topic;
    const empty = room.querySelector(".inbox-empty");
    empty.hidden = shown !== 0;
    empty.querySelector("h3").textContent =
      view === "unread" && !unreadCount
        ? "You’re all caught up"
        : "No matching notifications";
    room.querySelector("[data-count]").textContent = unreadCount;
    room.querySelector("[data-inbox-status]").textContent =
      shown + " shown, " + unreadCount + " unread.";
    markAll.disabled = unreadCount === 0;
    if (!unreadCount)
      document
        .querySelector("[data-notif-scope] [data-unread-count]")
        ?.remove();
  }

  function restore() {
    try {
      const all = localStorage.getItem(allReadKey) === "1";
      initialUnread.forEach((row) => {
        if (all || localStorage.getItem(readKey(row.dataset.alertId)) === "1")
          read.add(row.dataset.alertId);
      });
    } catch {
      /* In a private file preview read state lasts for this visit. */
    }
    render();
  }
  function markRead(items) {
    items.forEach((row) => {
      read.add(row.dataset.alertId);
      try {
        localStorage.setItem(readKey(row.dataset.alertId), "1");
      } catch {}
    });
    if (initialUnread.every((row) => read.has(row.dataset.alertId))) {
      try {
        localStorage.setItem(allReadKey, "1");
      } catch {}
    }
    render();
  }
  initialUnread.forEach((row) =>
    row
      .querySelector("a")
      .addEventListener("click", () => markRead([row]), { signal }),
  );
  markAll.addEventListener("click", () => markRead(initialUnread), { signal });
  views.forEach((b) =>
    b.addEventListener(
      "click",
      () => {
        view = b.dataset.view;
        render();
      },
      { signal },
    ),
  );
  topics.forEach((b) =>
    b.addEventListener(
      "click",
      () => {
        topic = b.dataset.topicFilter;
        render();
      },
      { signal },
    ),
  );
  select.addEventListener(
    "change",
    () => {
      topic = select.value;
      render();
    },
    { signal },
  );
  room.querySelector("[data-reset]").addEventListener(
    "click",
    () => {
      view = topic = "all";
      render();
      views[0].focus();
    },
    { signal },
  );
  room.querySelector("[data-filter-panel]").hidden = false;
  markAll.hidden = false;
  restore();
  window.addEventListener("pageshow", restore, { signal });
  window.addEventListener("storage", restore, { signal });
}
