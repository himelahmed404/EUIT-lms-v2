import { ArrowRight,ListChecks } from "lucide-react";
import Link from "next/link";

export function ActiveQuizCard() {
  return (
    <section
      data-motion-intro=""
      className="work-quiz"
      aria-labelledby="work-quiz-title"
    >
      <div className="work-quiz-copy">
        <p className="work-phase">
          <span />
          In progress
        </p>
        <div>
          <p className="work-meta">WordPress · Module 3 · Class 12</p>
          <h2 id="work-quiz-title">Custom header quiz</h2>
        </div>
        <Link className="work-resume" href="/student/quiz">
          Resume quiz{" "}
          <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
      <div className="work-sheet-wrap">
        <div className="work-sheet">
          <div className="sheet-caption">
            <ListChecks size={18} strokeWidth={1.8} aria-hidden="true" /> Quiz
            progress
          </div>
          <p className="sheet-figure">
            <strong>3</strong>
            <span> / 10 answered</span>
          </p>
          <div className="sheet-grid" aria-hidden="true">
            <i className="answered">1</i>
            <i className="answered">2</i>
            <i className="answered">3</i>
            <i className="">4</i>
            <i className="">5</i>
            <i className="">6</i>
            <i className="">7</i>
            <i className="">8</i>
            <i className="">9</i>
            <i className="">10</i>
          </div>
        </div>
      </div>
    </section>
  );
}
