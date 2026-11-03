"use client";

/** Renders ported markup from the static HTML prototype (class names preserved). */
export function HtmlMain({ html, className }: { html: string; className?: string }) {
  return (
    <div id="main-content" className={className} tabIndex={-1} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
