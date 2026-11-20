export function initPage(signal) {
  const form = document.getElementById("recovery-form");
  const steps = [...form.querySelectorAll("[data-recovery]")];
  let index = 0;
  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      const current = steps[index];
      current.hidden = true;
      current.querySelector("input").disabled = true;
      index += 1;
      if (index === steps.length) {
        form.reset();
        form.hidden = true;
        document.getElementById("recovery-done").hidden = false;
        return;
      }
      steps[index].hidden = false;
      const next = steps[index].querySelector("input");
      next.disabled = false;
      next.focus();
      document.getElementById("recovery-next").textContent =
        index === 1 ? "Verify demo code" : "Finish recovery";
    },
    { signal },
  );
}
