import { AnimationQuestion } from "./AnimationQuestion";
import { MenuQuestion } from "./MenuQuestion";
import { QuestionFilters } from "./QuestionFilters";
import { QuestionGuidance } from "./QuestionGuidance";
import { SpacingQuestion } from "./SpacingQuestion";
export function QuestionsScreen() {
  return (
    <>
      <main className="p-main">
        <div className="mq-head">
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <h1 className="student-page-title p-h1">My questions</h1>
            <p className="p-body">
              Everything you asked your mentors under a lesson, and their
              answers.
            </p>
          </div>
        </div>
        <div className="p-split">
          <div className="mq-main" data-list="">
            <div className="mq-bar">
              <QuestionFilters />
              <span className="p-small">
                <span data-list-shown="">3</span> shown
              </span>
            </div>
            <div className="mq-list">
              <AnimationQuestion />
              <MenuQuestion />
              <SpacingQuestion />
            </div>
            <p className="p-notice" data-list-empty="" hidden>
              Nothing here yet.
            </p>
          </div>
          <QuestionGuidance />
        </div>
      </main>
    </>
  );
}
