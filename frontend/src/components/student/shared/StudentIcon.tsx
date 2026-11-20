import type { ComponentProps } from "react";

/** Shared outline icon canvas. Callers supply the original SVG geometry. */
export function StudentIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      className="eit-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden="true"
      {...props}
    />
  );
}
