import type { HelpFaq } from "./help-faqs";
import { HelpFaqToggle } from "./HelpFaqToggle";
export function HelpFaqItem({ faq }: { faq: HelpFaq }) {
  return (
    <li
      style={{ borderTop: "1px solid var(--line-soft)" }}
      data-cat={faq.category}
      data-cat-label={faq.categoryLabel}
    >
      <button
        type="button"
        className="hp-q"
        aria-expanded={faq.expanded}
        {...(faq.expanded
          ? { "data-conceal": faq.targetId }
          : { "data-reveal": faq.targetId })}
        data-on-look={faq.lookId}
      >
        <HelpFaqToggle faq={faq} expanded={faq.expanded} />
      </button>
      <div
        className="hp-a"
        id={faq.targetId}
        hidden={!faq.expanded || undefined}
      >
        {faq.answer}
      </div>
    </li>
  );
}
