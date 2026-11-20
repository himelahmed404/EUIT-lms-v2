import { ExitQuizDialog } from "./ExitQuizDialog";
import { QuizQuestion } from "./QuizQuestion";
import { QuizTemplates } from "./QuizTemplates";
import { QuizToolbar } from "./QuizToolbar";
import { SubmitQuizDialog } from "./SubmitQuizDialog";
export function QuizScreen() {
  return (
    <>
      <div className="quiz-workspace">
        <QuizToolbar />
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={10}
          aria-valuenow={3}
          aria-label="Questions answered"
          style={{ height: "6px", background: "var(--line-soft)" }}
        >
          <span
            style={{
              display: "block",
              height: "100%",
              background: "var(--cyan)",
              width: "30%",
              transition: "width 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
        <main className="p-main quiz-main">
          <QuizQuestion number={4} />
        </main>
      </div>
      <QuizTemplates />

      <ExitQuizDialog />
      <SubmitQuizDialog />
    </>
  );
}
