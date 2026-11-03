import type { Metadata } from "next";
import { BodyClass } from "@/components/shell/BodyClass";
import { HtmlMain } from "@/components/shell/HtmlMain";
import { html, title as pageTitle } from "@/content/student/certificate";

export const metadata: Metadata = { title: `${pageTitle} · European IT LMS` };

export default function Page() {
  return (
    <>
      <BodyClass name="page-print" />
      <HtmlMain html={html} />
    </>
  );
}
