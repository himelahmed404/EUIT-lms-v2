import { StudentIcon } from "../shared/StudentIcon";
import type { HelpFaq } from "./help-faqs";
import { HelpTopicIcon } from "./HelpTopicIcon";
export function HelpFaqToggle({
  faq,
  expanded,
}: {
  faq: HelpFaq;
  expanded: boolean;
}) {
  return (
    <>
      <HelpTopicIcon category={faq.category} />
      <strong
        className="p-grow"
        style={{ fontSize: "15px", fontWeight: "600" }}
      >
        {faq.question}
      </strong>
      <span
        style={{
          display: "inline-flex",
          color: "var(--ink-3)",
          transition: "transform 200ms",
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        <StudentIcon width="18" height="18">
          <path d="M6 9l6 6 6-6" />
        </StudentIcon>
      </span>
    </>
  );
}
