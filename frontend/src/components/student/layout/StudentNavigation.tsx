"use client";

import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  LayoutGrid,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

const tabs = [
  ["dashboard", "Dashboard", LayoutGrid],
  ["courses", "Courses", BookOpen],
  ["assignments", "Assignments", ClipboardList],
  ["routine", "Schedule", CalendarDays],
  ["assistant", "Assistant", MessageSquare],
] as const;
const groups: Record<string, string> = {
  "course-offline": "courses",
  "course-player": "courses",
  quiz: "assignments",
  "quiz-result": "assignments",
  quizzes: "assignments",
  projects: "assignments",
  "project-detail": "assignments",
  "project-feedback": "assignments",
};

type Position = { key: string; left: number; width: number; viewport: number };
// The shell is route-owned. Retain only the last pill geometry across client
// navigation so the newly mounted header can continue the same movement.
let previous: Position | undefined;

export function StudentNavigation({ slug }: { slug: string }) {
  const active = groups[slug] ?? slug;
  const navigation = useRef<HTMLElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const nav = navigation.current;
    const pill = indicator.current;
    if (!nav || !pill) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    let mounted = true;
    let positioned = false;
    let geometry = "";
    function position() {
      if (!mounted || !nav || !pill) return;
      const current = nav.querySelector<HTMLElement>('[aria-current="page"]');
      if (!current) {
        pill.hidden = true;
        delete nav.dataset.liquidReady;
        previous = undefined;
        return;
      }
      // Route-owned stylesheet links can settle after the layout effect.
      // Never measure the temporary unstyled inline link as the active pill.
      if (
        getComputedStyle(nav).position !== "relative" ||
        current.offsetHeight < 32
      )
        return;
      const nextGeometry = [
        current.offsetLeft,
        current.offsetTop,
        current.offsetWidth,
        current.offsetHeight,
        innerWidth,
      ].join(":");
      if (geometry === nextGeometry) return;
      geometry = nextGeometry;
      const transition = !positioned;
      positioned = true;
      const next: Position = {
        key: active,
        left: current.offsetLeft,
        width: current.offsetWidth,
        viewport: window.innerWidth,
      };
      const from = previous;
      animation?.cancel();
      pill.hidden = false;
      pill.style.left = `${next.left}px`;
      pill.style.width = `${next.width}px`;
      pill.style.top = `${current.offsetTop}px`;
      pill.style.height = `${current.offsetHeight}px`;
      nav.dataset.liquidReady = "";
      previous = next;
      if (
        transition &&
        !reduced.matches &&
        from &&
        from.key !== next.key &&
        from.viewport === next.viewport
      ) {
        const bridgeLeft = Math.min(from.left, next.left);
        const bridgeWidth =
          Math.max(from.left + from.width, next.left + next.width) - bridgeLeft;
        animation = pill.animate(
          [
            {
              left: `${from.left}px`,
              width: `${from.width}px`,
              borderRadius: "28px",
              offset: 0,
            },
            {
              left: `${bridgeLeft}px`,
              width: `${bridgeWidth}px`,
              borderRadius: "20px",
              offset: 0.42,
            },
            {
              left: `${next.left}px`,
              width: `${next.width}px`,
              borderRadius: "28px",
              offset: 1,
            },
          ],
          { duration: 560, easing: "cubic-bezier(.22, 1, .36, 1)" },
        );
      }
    }
    position();
    // Observe the links as well as the track: a font/stylesheet change can alter
    // the active link's height or offset without resizing the whole navigation.
    const observer = new ResizeObserver(position);
    observer.observe(nav);
    nav.querySelectorAll(".nav-tab").forEach((tab) => observer.observe(tab));
    const frame = requestAnimationFrame(position);
    void document.fonts.ready.then(position);
    const cancelMotion = () => {
      if (reduced.matches) animation?.cancel();
    };
    reduced.addEventListener("change", cancelMotion);
    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduced.removeEventListener("change", cancelMotion);
      animation?.cancel();
    };
  }, [active]);

  return (
    <nav
      ref={navigation}
      className="nav-pills flex items-center"
      aria-label="Student navigation"
    >
      <span
        ref={indicator}
        className="nav-liquid-indicator"
        aria-hidden="true"
        hidden
      />
      {tabs.map(([key, label, Icon]) => (
        <Link
          key={key}
          className="nav-tab"
          href={`/student/${key}`}
          title={label}
          aria-label={label}
          aria-current={active === key ? "page" : undefined}
        >
          <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
          {active === key && <span>{label}</span>}
        </Link>
      ))}
    </nav>
  );
}
