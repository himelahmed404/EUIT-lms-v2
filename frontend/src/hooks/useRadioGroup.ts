"use client";

import { useCallback } from "react";

/**
 * Keyboard support for a button-based radiogroup (Arrow / Home / End).
 * Pair with role="radiogroup" and role="radio" buttons.
 */
export function useRadioGroup<T extends string>(
  values: readonly T[],
  value: T,
  onChange: (next: T) => void,
) {
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const keys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      const i = values.indexOf(value);
      if (i < 0) return;
      let next = i;
      if (e.key === "Home") next = 0;
      else if (e.key === "End") next = values.length - 1;
      else if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % values.length;
      else next = (i - 1 + values.length) % values.length;
      onChange(values[next]);
      const root = e.currentTarget as HTMLElement;
      const radios = root.querySelectorAll<HTMLElement>('[role="radio"]');
      radios[next]?.focus();
    },
    [values, value, onChange],
  );

  return { onKeyDown };
}
