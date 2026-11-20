import { StudentIcon } from "@/components/student/shared/StudentIcon";
import { Check } from "lucide-react";
import Link from "next/link";
import { questions } from "./questions";
import { QuizQuestionNavigation } from "./QuizQuestionNavigation";

export function QuizQuestion({ number }: { number: number }) {
  const question = questions[number - 1];
  return (
    <div className="p-split" data-region="quiz">
      <section
        data-motion-intro=""
        className="p-card"
        aria-labelledby="q-text"
        style={{
          flex: "2 1 560px",
          padding: "clamp(18px, 2.5vw, 32px)",
          display: "flex",
          flexDirection: "column",
          gap: "22px",
        }}
      >
        <div
          className="p-row"
          style={{ justifyContent: "space-between", flexWrap: "wrap" }}
        >
          <span className="p-eyebrow">
            Question {number} of {questions.length}
          </span>
          <button
            type="button"
            className="p-ghostbtn"
            aria-pressed={number === 3}
          >
            <svg
              className="p-icon p-icon--sm"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <path d="M4 22v-7" />
            </svg>
            Flag to check again
          </button>
        </div>
        <h1
          id="q-text"
          className="p-h2"
          style={{ fontSize: "24px", lineHeight: "1.35" }}
        >
          {question.title}
        </h1>
        <div
          role="radiogroup"
          aria-labelledby="q-text"
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {question.answers.map((answer, index) => (
            <button
              type="button"
              className="p-option"
              role="radio"
              key={answer.label}
              aria-checked={index === question.selected}
            >
              <span
                style={{
                  width: "34px",
                  height: "34px",
                  flex: "0 0 auto",
                  borderRadius: "10px",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: "700",
                  fontSize: "14px",
                  transition:
                    "background 150ms,\n                      color 150ms",
                  background:
                    index === question.selected ? "#0a1b2c" : "var(--track)",
                  color: index === question.selected ? "#fff" : "var(--ink-2)",
                }}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: answer.code ? "var(--font-mono)" : "inherit",
                }}
              >
                {answer.label}
              </span>
            </button>
          ))}
        </div>
        <div
          className="p-row"
          style={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            paddingTop: "6px",
          }}
        >
          <button
            type="button"
            className="p-ghostbtn"
            data-show-state={"q" + (number - 1)}
            disabled={number === 1}
          >
            <span
              style={{ display: "inline-flex", transform: "rotate(180deg)" }}
            >
              <StudentIcon width="16" height="16">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </StudentIcon>
            </span>
            Previous
          </button>
          {number === questions.length ? (
            <Link
              className="eit-btn eit-btn--primary eit-btn--md"
              href="/student/quiz-result"
            >
              <Check size={16} aria-hidden="true" /> Submit quiz
            </Link>
          ) : (
            <button
              type="button"
              className="eit-btn eit-btn--primary eit-btn--md"
              data-show-state={"q" + (number + 1)}
            >
              <span className="eit-btn__label">Next question</span>
              <svg
                className="eit-icon eit-btn__trail"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                focusable="false"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>
          )}
        </div>
      </section>
      <QuizQuestionNavigation number={number} />
    </div>
  );
}
