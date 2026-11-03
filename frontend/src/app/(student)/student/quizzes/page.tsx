import type { Metadata } from "next";
import { HtmlMain } from "@/components/shell/HtmlMain";
import { html, title as pageTitle } from "@/content/student/quizzes";

export const metadata: Metadata = { title: `${pageTitle} · European IT LMS` };

export default function Page() {
  return <HtmlMain html={html} />;
}
