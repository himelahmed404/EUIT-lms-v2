"use client";
import { useEffect } from "react";
export function ConsoleHtmlClass() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("is-console");
    root.classList.remove("is-student");
    return () => root.classList.remove("is-console");
  }, []);
  return null;
}
