import { helpFaqs } from "./help-faqs";
import { HelpContact } from "./HelpContact";
import { HelpFaqItem } from "./HelpFaqItem";
import { HelpFaqTemplates } from "./HelpFaqTemplates";
import { HelpQuickLinks } from "./HelpQuickLinks";
import { HelpSearch } from "./HelpSearch";
import { HelpTopics } from "./HelpTopics";
export function HelpScreen() {
  return (
    <>
      <main className="p-main">
        <HelpSearch />
        <HelpTopics />
        <div className="p-split">
          <section
            className="p-card p-card--flush"
            aria-labelledby="faq-title"
            style={{ flex: "1.6 1 560px", minWidth: "0px" }}
          >
            <div className="p-card-head" style={{ padding: "20px 24px 12px" }}>
              <span
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <h2 id="faq-title" className="p-h3">
                  Common questions
                </h2>
                <span className="p-small">21 answers across 6 topics</span>
              </span>
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: "0px",
                padding: "0px 8px 10px",
                display: "flex",
                flexDirection: "column",
              }}
              data-faq-list=""
            >
              {helpFaqs.map((faq) => (
                <HelpFaqItem key={faq.targetId} faq={faq} />
              ))}
            </ul>
          </section>
          <div
            className="p-stagger p-sticky"
            style={{
              flex: "1 1 320px",
              minWidth: "0px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <HelpContact />
            <HelpQuickLinks />
          </div>
        </div>
      </main>
      <HelpFaqTemplates />
    </>
  );
}
