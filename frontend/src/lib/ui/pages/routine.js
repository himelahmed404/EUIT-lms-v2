export function initPage() {

  "use strict";

  document.addEventListener("click", function (e) {
    if (!e.target.closest('[data-show-state^="month:"]')) {
      return;
    }
    var all = document.querySelector('#rt-month [data-filter="all"]');
    if (all) {
      all.click();
    }
  });

}
