import { CorrectAnswers } from "./CorrectAnswers";
import { IncorrectAnswers } from "./IncorrectAnswers";
export function AnswerReview() {
  return (
    <section
      className="p-card"
      aria-labelledby="rev-title"
      style={{
        flex: "2 1 520px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div className="p-card-head">
        <h2 id="rev-title" className="p-h3">
          Check your answers
        </h2>
        <div className="p-seg" role="tablist" aria-label="Show">
          <button
            type="button"
            role="tab"
            id="ans-tab-all"
            aria-selected="true"
            aria-controls="ans-all"
          >
            All 10
          </button>
          <button
            type="button"
            role="tab"
            id="ans-tab-wrong"
            aria-selected="false"
            aria-controls="ans-wrong"
            tabIndex={-1}
          >
            Wrong only · 0
          </button>
        </div>
      </div>
      <CorrectAnswers />
      <IncorrectAnswers />
    </section>
  );
}
