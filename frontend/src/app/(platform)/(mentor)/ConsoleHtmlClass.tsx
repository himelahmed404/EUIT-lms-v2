"use client";
import { useEffect } from "react";
export function ConsoleHtmlClass() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("is-console");
    root.classList.remove("is-student");
    try {
      if (localStorage.getItem("eit-nav") === "mini") root.setAttribute("data-nav", "mini");
    } catch {
      // The console is usable when browser storage is unavailable.
    }
    return () => {
      root.classList.remove("is-console");
      root.removeAttribute("data-nav");
    };
  }, []);
  return null;
}
