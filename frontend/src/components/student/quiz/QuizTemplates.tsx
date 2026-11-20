import { StudentTemplate } from "../shared/StudentTemplate";
import { QuizQuestion } from "./QuizQuestion";
import { questions } from "./questions";
export function QuizTemplates() {
  return (
    <>
      {questions.map((_, i) => (
        <StudentTemplate
          key={i}
          data-state={"q" + (i + 1)}
          data-region="[data-region='quiz']"
        >
          <QuizQuestion number={i + 1} />
        </StudentTemplate>
      ))}
    </>
  );
}
