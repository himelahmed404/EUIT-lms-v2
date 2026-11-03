"use client";

import { useCallback, useEffect, useState } from "react";
import type { ThemeMode } from "@/types";

const THEME_KEY = "eit-theme";
const NAV_KEY = "eit-nav";

export function readStoredTheme(): ThemeMode {
  try {
    return window.localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>("light");

  useEffect(() => {
    setThemeState(readStoredTheme());
  }, []);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage blocked */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const toggleNav = useCallback(() => {
    const root = document.documentElement;
    const mini = root.getAttribute("data-nav") !== "mini";
    if (mini) root.setAttribute("data-nav", "mini");
    else root.removeAttribute("data-nav");
    try {
      window.localStorage.setItem(NAV_KEY, mini ? "mini" : "");
    } catch {
      /* storage blocked */
    }
  }, []);

  return { theme, setTheme, toggleTheme, toggleNav };
}
