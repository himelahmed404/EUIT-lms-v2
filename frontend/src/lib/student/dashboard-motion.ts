import type { animate } from "framer-motion/dom/mini";

type Play = (
  element: Element,
  frames: Parameters<typeof animate>[1],
  duration: number,
  delay?: number,
) => void;

/** Reveal each dashboard widget once, including widgets below the mobile fold. */
export function initDashboardMotion(
  content: HTMLElement,
  signal: AbortSignal,
  play: Play,
) {
  const widgets = [
    ...content.querySelectorAll<HTMLElement>(".dashboard-grid .widget"),
  ];
  const entered = new WeakSet<Element>();
  function reveal(widget: HTMLElement, delay = 0) {
    if (entered.has(widget)) return;
    entered.add(widget);
    play(
      widget,
      {
        opacity: [0.45, 1],
        translate: ["0 14px", "none"],
        scale: ["0.985", "none"],
      },
      0.48,
      delay,
    );
    widget
      .querySelectorAll<HTMLElement>(".study-fill, .hour-bar")
      .forEach((bar, i) => {
        play(
          bar,
          { transform: ["scaleY(0.08)", "none"] },
          0.64,
          delay + 0.1 + i * 0.035,
        );
      });
    widget
      .querySelectorAll<HTMLElement>(".cal-day, .cal-out")
      .forEach((day, i) => {
        play(
          day,
          { opacity: [0.35, 1], scale: ["0.85", "none"] },
          0.32,
          delay + 0.1 + i * 0.008,
        );
      });
  }
  let order = 0;
  widgets.forEach((widget) => {
    const bounds = widget.getBoundingClientRect();
    if (bounds.top < innerHeight && bounds.bottom > 0)
      reveal(widget, Math.min(order++, 6) * 0.045);
  });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );
  widgets
    .filter((widget) => !entered.has(widget))
    .forEach((widget) => observer.observe(widget));
  signal.addEventListener("abort", () => observer.disconnect(), { once: true });
}
