import { initDashboardMotion } from "./dashboard-motion";
import { animate } from "framer-motion/dom/mini";

type Frames = Parameters<typeof animate>[1];
type Playback = ReturnType<typeof animate>;

const cardSelector =
  "[data-motion-card], .eit-btn, .p-ghostbtn, .primary-action, .library-action, .ticket-action, .work-resume";
const controlSelector = "button, a[href], summary, [role='button']";
const panelSelector =
  "[data-motion-reveal], [role='tabpanel'], [data-pf-panel], [data-ticket], [data-course-state], [data-region='quiz']";

export function initStudentMotion(signal: AbortSignal) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce), print");
  const hover = window.matchMedia("(any-hover: hover)");
  const content = document.getElementById("content");
  const shell = content?.closest<HTMLElement>("[data-student-page]");
  const playing = new Map<
    Element,
    { animation: Playback; restore: () => void }
  >();

  // Each effect settles back to the component's own CSS. In particular, a
  // progress indicator or a sticky panel must keep its original transform.
  function play(element: Element, frames: Frames, duration: number, delay = 0) {
    if (signal.aborted || reduced.matches) return;
    const existing = playing.get(element);
    existing?.animation.cancel();
    existing?.restore();
    const style = (element as HTMLElement | SVGElement).style;
    const original = Object.keys(frames).map((key) => {
      const property = key.replace(
        /[A-Z]/g,
        (letter) => `-${letter.toLowerCase()}`,
      );
      return [
        property,
        style.getPropertyValue(property),
        style.getPropertyPriority(property),
      ] as const;
    });
    function restore() {
      for (const [property, value, priority] of original) {
        if (value) style.setProperty(property, value, priority);
        else style.removeProperty(property);
      }
    }
    const animation = animate(element, frames, {
      duration,
      delay,
      ease: "easeOut",
    });
    playing.set(element, { animation, restore });
    void animation.then(() => {
      if (playing.get(element)?.animation !== animation) return;
      // Motion commits its last frame inline. Release those properties so
      // CSS hover/focus states can take over after the entrance settles.
      animation.cancel();
      restore();
      playing.delete(element);
    });
  }

  function settle() {
    for (const { animation, restore } of playing.values()) {
      animation.cancel();
      restore();
    }
    playing.clear();
  }
  reduced.addEventListener(
    "change",
    () => {
      if (reduced.matches) settle();
    },
    { signal },
  );
  signal.addEventListener("abort", settle, { once: true });

  if (content && shell) {
    play(content, { opacity: [0.92, 1] }, 0.18);
    if (shell.dataset.studentPage === "dashboard") {
      initDashboardMotion(content, signal, play);
    } else if (!reduced.matches) {
      // Only the first visible group enters. Scrolling never replays it.
      const panels = [
        ...content.querySelectorAll<HTMLElement>("[data-motion-intro]"),
      ]
        .filter(
          (panel) =>
            panel.getClientRects().length &&
            panel.getBoundingClientRect().top < innerHeight,
        )
        .slice(0, 3);
      panels.forEach((panel, i) =>
        play(panel, { translate: ["0 5px", "none"] }, 0.2, i * 0.025),
      );
    }

    const options = { signal, passive: true };
    function closest(target: EventTarget | null, selector: string) {
      const el =
        target instanceof Element
          ? target.closest<HTMLElement>(selector)
          : null;
      return el &&
        shell?.contains(el) &&
        !el.closest(":disabled, [aria-disabled='true'], [inert]")
        ? el
        : null;
    }

    // The card remains a stationary hit target. Animate its icon or heading
    // so the pointer doesn't repeatedly enter and leave a moving edge.
    function highlight(target: EventTarget | null, from: EventTarget | null) {
      if (reduced.matches) return;
      const card = closest(target, cardSelector);
      if (!card || (from instanceof Node && card.contains(from))) return;
      const detail =
        card.querySelector("[data-motion-detail]") ??
        card.querySelector("h3, svg, strong");
      if (detail) play(detail, { translate: ["0 2px", "none"] }, 0.16);
    }
    shell.addEventListener(
      "pointerover",
      (event) => {
        if (event.pointerType !== "touch" && hover.matches && !event.buttons)
          highlight(event.target, event.relatedTarget);
      },
      options,
    );
    shell.addEventListener(
      "focusin",
      (event) => {
        if (
          event.target instanceof Element &&
          event.target.matches(":focus-visible")
        )
          highlight(event.target, event.relatedTarget);
      },
      options,
    );

    function press(target: EventTarget | null) {
      if (reduced.matches) return;
      const control = closest(target, controlSelector);
      if (
        control &&
        !control.matches(".nav-tab") &&
        getComputedStyle(control).display !== "inline"
      )
        play(control, { scale: ["1", "0.975", "none"] }, 0.15);
    }
    shell.addEventListener(
      "pointerdown",
      (event) => {
        if (
          event.isPrimary &&
          event.button === 0 &&
          event.pointerType !== "touch"
        )
          press(event.target);
      },
      options,
    );
    // A completed touch click distinguishes a tap from the start of a scroll.
    shell.addEventListener(
      "click",
      (event) => {
        if (event instanceof PointerEvent && event.pointerType === "touch")
          press(event.target);
      },
      options,
    );
    shell.addEventListener(
      "keydown",
      (event) => {
        if (event.repeat || event.altKey || event.ctrlKey || event.metaKey)
          return;
        if (
          event.key === "Enter" ||
          (event.key === " " &&
            closest(event.target, "button, summary, [role='button']"))
        )
          press(event.target);
      },
      options,
    );

    // React inserts chat turns and editors. The course and quiz controllers
    // also reveal existing panels or replace them with template content.
    const observer = new MutationObserver((records) => {
      if (reduced.matches || signal.aborted) return;
      const shown = new Set<HTMLElement>();
      function include(node: Node) {
        if (
          node instanceof HTMLElement &&
          node.matches(panelSelector) &&
          !node.closest("[hidden]")
        )
          shown.add(node);
      }
      for (const record of records) {
        if (record.type === "attributes") {
          if (record.oldValue !== null) include(record.target);
        } else {
          record.addedNodes.forEach(include);
        }
      }
      for (const panel of shown)
        play(panel, { opacity: [0.9, 1], translate: ["0 3px", "none"] }, 0.16);
    });
    observer.observe(content, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["hidden"],
      attributeOldValue: true,
    });
    signal.addEventListener("abort", () => observer.disconnect(), {
      once: true,
    });
  }

  return function revealMenu(panel: HTMLElement) {
    play(
      panel,
      { opacity: [0.94, 1], transform: ["translateY(-3px)", "none"] },
      0.14,
    );
  };
}
