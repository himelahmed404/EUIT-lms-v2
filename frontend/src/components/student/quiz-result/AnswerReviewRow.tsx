import type { ReviewAnswer } from "./review-answers";
export function AnswerReviewRow({ answer }: { answer: ReviewAnswer }) {
  return (
    <li style={{ alignItems: "flex-start" }}>
      <span
        className="p-tile p-tile--green"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
        }}
      >
        <svg
          className="p-icon p-icon--sm"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <span
        className="p-grow"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <strong style={{ fontSize: "15px" }}>{answer.question}</strong>
        <span style={{ fontSize: "14px", color: "var(--ink-2)" }}>
          Your answer:
          <span style={answer.answerStyle}>{answer.answer}</span>
        </span>
      </span>
      <span className="p-small" style={{ whiteSpace: "nowrap" }}>
        {answer.score}
      </span>
    </li>
  );
}
