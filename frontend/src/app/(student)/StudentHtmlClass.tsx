"use client";
import { useEffect } from "react";
export function StudentHtmlClass() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("is-student");
    root.classList.remove("is-console");
    return () => root.classList.remove("is-student");
  }, []);
  return null;
}
