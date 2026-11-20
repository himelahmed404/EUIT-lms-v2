import {
CalendarDays,
CreditCard,
FolderOpen,
ListChecks,
MessageSquare,
} from "lucide-react";
import Link from "next/link";

export function EarlierNotifications() {
  return (
    <section className="inbox-day" data-day-group="">
      <h3>Earlier</h3>
      <ul>
        <li
          data-motion-card=""
          className="inbox-row"
          data-alert-id="live-8"
          data-topic="classes"
        >
          <Link href="/student/routine">
            <span data-motion-detail="" className="inbox-symbol">
              <CalendarDays size={19} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="alert-copy">
              <strong>Graphic Design Live 8 moved to 8:00 PM</strong>
              <span>Wednesday, 21 October · Join with the same Zoom link.</span>
            </span>
            <span className="alert-meta">
              <span>13 Oct</span>
            </span>
          </Link>
        </li>
        <li
          data-motion-card=""
          className="inbox-row"
          data-alert-id="header-question"
          data-topic="messages"
        >
          <Link href="/student/questions">
            <span data-motion-detail="" className="inbox-symbol">
              <MessageSquare size={19} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="alert-copy">
              <strong>Kamrul answered your question</strong>
              <span>
                “Why is my menu not showing?” · Building a custom header
              </span>
            </span>
            <span className="alert-meta">
              <span>12 Oct</span>
            </span>
          </Link>
        </li>
        <li
          data-motion-card=""
          className="inbox-row"
          data-alert-id="quiz-11"
          data-topic="quizzes"
        >
          <Link href="/student/leaderboard">
            <span data-motion-detail="" className="inbox-symbol">
              <ListChecks size={19} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="alert-copy">
              <strong>Full marks on the Class 11 quiz</strong>
              <span>You moved up to #3 in WordPress Batch 14.</span>
            </span>
            <span className="alert-meta">
              <span>12 Oct</span>
            </span>
          </Link>
        </li>
        <li
          data-motion-card=""
          className="inbox-row"
          data-alert-id="certificate-progress"
          data-topic="projects"
        >
          <Link href="/student/certificates">
            <span data-motion-detail="" className="inbox-symbol">
              <FolderOpen size={19} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="alert-copy">
              <strong>One project left for your WordPress certificate</strong>
              <span>You’ve completed two of the three requirements.</span>
            </span>
            <span className="alert-meta">
              <span>11 Oct</span>
            </span>
          </Link>
        </li>
        <li
          data-motion-card=""
          className="inbox-row"
          data-alert-id="payment-receipt"
          data-topic="payments"
        >
          <Link href="/student/payments#hist-title">
            <span data-motion-detail="" className="inbox-symbol">
              <CreditCard size={19} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="alert-copy">
              <strong>Payment received · ৳5,000</strong>
              <span>
                Installment 1 was paid via bKash. Your receipt is ready.
              </span>
            </span>
            <span className="alert-meta">
              <span>10 Sep</span>
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
