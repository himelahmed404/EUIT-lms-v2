import { AnswerReviewRow } from "./AnswerReviewRow";
import { reviewAnswers } from "./review-answers";
export function CorrectAnswers() {
  return (
    <div role="tabpanel" id="ans-all" aria-labelledby="ans-tab-all">
      <ol className="p-rows" style={{ margin: "0px -12px -12px" }}>
        {reviewAnswers.map((answer, index) => (
          <AnswerReviewRow key={index} answer={answer} />
        ))}
      </ol>
    </div>
  );
}
