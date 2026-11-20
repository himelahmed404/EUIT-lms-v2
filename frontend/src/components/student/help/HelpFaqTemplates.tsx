import { StudentTemplate } from "../shared/StudentTemplate";
import { helpFaqs } from "./help-faqs";
import { HelpFaqToggle } from "./HelpFaqToggle";
export function HelpFaqTemplates() {
  return (
    <>
      {helpFaqs.map((faq) => (
        <StudentTemplate key={faq.lookId} id={faq.lookId}>
          <HelpFaqToggle faq={faq} expanded={!faq.expanded} />
        </StudentTemplate>
      ))}
    </>
  );
}
