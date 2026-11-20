export function initPage(signal) {
  const checklist = document.querySelector("[data-checklist]");
  const boxes = [...checklist.querySelectorAll('input[type="checkbox"]')];
  const counter = checklist.querySelector("[data-prep-count]");
  const storageKey = "eit.student.assignment." + checklist.dataset.checklist;
  function showCount() {
    const prepared = boxes.filter((box) => box.checked);
    counter.textContent = prepared.length + " of " + boxes.length + " ready";
    return prepared.map((box) => box.value);
  }
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (Array.isArray(saved))
      boxes.forEach((box) => {
        box.checked = saved.includes(box.value);
      });
  } catch {
    /* The checklist can also be used without storage. */
  }
  showCount();
  counter.hidden = false;
  checklist.addEventListener(
    "change",
    () => {
      const prepared = showCount();
      try {
        localStorage.setItem(storageKey, JSON.stringify(prepared));
      } catch {}
    },
    { signal },
  );
}
