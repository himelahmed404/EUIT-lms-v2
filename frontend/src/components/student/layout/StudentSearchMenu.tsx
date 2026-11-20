import { Search, X } from "lucide-react";
import Link from "next/link";
export function StudentSearchMenu({ slug }: { slug: string }) {
  return (
    <section
      className="directory-view"
      aria-labelledby="directory-title"
      hidden
    >
      <div className="directory-head">
        <div>
          <h2 id="directory-title">Search</h2>
          <button
            type="button"
            className="directory-control"
            data-dropdown-close=""
            aria-label="Close search"
          >
            <X size={17} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
        <label className="directory-search">
          <Search size={16} strokeWidth={1.8} aria-hidden="true" />
          <input
            type="search"
            aria-label="Search by page name"
            placeholder="Search student services"
          />
        </label>
      </div>
      <div className="directory-results" hidden>
        <Link
          className="page-option"
          href="/student/dashboard"
          data-alias=""
          hidden
          aria-current={slug === "dashboard" ? "page" : undefined}
        >
          Dashboard
        </Link>
        <Link
          className="page-option"
          href="/student/courses"
          data-alias="my courses lessons classes"
          hidden
          aria-current={slug === "courses" ? "page" : undefined}
        >
          Courses
        </Link>
        <Link
          className="page-option"
          href="/student/assignments"
          data-alias=""
          hidden
          aria-current={slug === "assignments" ? "page" : undefined}
        >
          Assignments
        </Link>
        <Link
          className="page-option"
          href="/student/routine"
          data-alias="routine calendar"
          hidden
          aria-current={slug === "routine" ? "page" : undefined}
        >
          Schedule
        </Link>
        <Link
          className="page-option"
          href="/student/assistant"
          data-alias="study chat milo"
          hidden
          aria-current={slug === "assistant" ? "page" : undefined}
        >
          Assistant
        </Link>
        <Link
          className="page-option"
          href="/student/certificates"
          data-alias="certificate awards credentials"
          hidden
          aria-current={slug === "certificates" ? "page" : undefined}
        >
          Certificates
        </Link>
        <Link
          className="page-option"
          href="/student/payments"
          data-alias="fees invoices billing receipts installments"
          hidden
          aria-current={slug === "payments" ? "page" : undefined}
        >
          Payments
        </Link>
        <Link
          className="page-option"
          href="/student/saved"
          data-alias="bookmarks"
          hidden
          aria-current={slug === "saved" ? "page" : undefined}
        >
          Saved &amp; notes
        </Link>
        <Link
          className="page-option"
          href="/student/questions"
          data-alias="ask mentor"
          hidden
          aria-current={slug === "questions" ? "page" : undefined}
        >
          My questions
        </Link>
        <Link
          className="page-option"
          href="/student/leaderboard"
          data-alias=""
          hidden
          aria-current={slug === "leaderboard" ? "page" : undefined}
        >
          Leaderboard
        </Link>
        <Link
          className="page-option"
          href="/student/help"
          data-alias="support"
          hidden
          aria-current={slug === "help" ? "page" : undefined}
        >
          Help centre
        </Link>
        <Link
          className="page-option"
          href="/student/profile"
          data-alias="account"
          hidden
          aria-current={slug === "profile" ? "page" : undefined}
        >
          Profile and settings
        </Link>
        <Link
          className="page-option"
          href="/student/notifications"
          data-alias="alerts"
          hidden
          aria-current={slug === "notifications" ? "page" : undefined}
        >
          Notifications
        </Link>
        <Link
          className="page-option"
          href="/student/quizzes"
          data-alias="quiz"
          hidden
          aria-current={slug === "quizzes" ? "page" : undefined}
        >
          Quizzes
        </Link>
        <Link
          className="page-option"
          href="/student/projects"
          data-alias=""
          hidden
          aria-current={slug === "projects" ? "page" : undefined}
        >
          Projects
        </Link>
        <p className="empty-search" hidden>
          No matching pages.
        </p>
      </div>
      <span className="sr-only" data-search-count="" role="status" />
    </section>
  );
}
