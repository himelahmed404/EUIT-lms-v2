"use client";
import { useState,type ComponentProps } from "react";
import { createPortal } from "react-dom";

// Browser templates keep inert children in a separate DocumentFragment.
export function StudentTemplate({
  children,
  ...props
}: ComponentProps<"template">) {
  const [template, setTemplate] = useState<HTMLTemplateElement | null>(null);
  return (
    <>
      <template {...props} ref={setTemplate} />
      {template && createPortal(children, template.content)}
    </>
  );
}
