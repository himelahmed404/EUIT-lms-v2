import {
CalendarDays,
CreditCard,
FolderOpen,
Inbox,
Layers2,
ListChecks,
ListFilter,
Mail,
MessageSquare,
} from "lucide-react";

export function NotificationFilters() {
  return (
    <aside
      className="inbox-filters"
      aria-label="Inbox filters"
      data-filter-panel=""
      hidden
    >
      <div className="inbox-views" role="group" aria-label="Read status">
        <button type="button" data-view="all" aria-pressed="true">
          <Inbox size={18} strokeWidth={1.8} aria-hidden="true" /> All activity{" "}
          <b>8</b>
        </button>
        <button type="button" data-view="unread" aria-pressed="false">
          <Mail size={18} strokeWidth={1.8} aria-hidden="true" /> Unread{" "}
          <b data-count="">2</b>
        </button>
      </div>
      <div className="inbox-topics">
        <h2>Topics</h2>
        <div role="group" aria-label="Filter by topic">
          <button type="button" data-topic-filter="all" aria-pressed="true">
            <Layers2 size={16} strokeWidth={1.8} aria-hidden="true" /> All
            topics
          </button>
          <button
            type="button"
            data-topic-filter="classes"
            aria-pressed="false"
          >
            <CalendarDays size={16} strokeWidth={1.8} aria-hidden="true" />{" "}
            Classes
          </button>
          <button
            type="button"
            data-topic-filter="quizzes"
            aria-pressed="false"
          >
            <ListChecks size={16} strokeWidth={1.8} aria-hidden="true" />{" "}
            Quizzes
          </button>
          <button
            type="button"
            data-topic-filter="projects"
            aria-pressed="false"
          >
            <FolderOpen size={16} strokeWidth={1.8} aria-hidden="true" />{" "}
            Projects
          </button>
          <button
            type="button"
            data-topic-filter="payments"
            aria-pressed="false"
          >
            <CreditCard size={16} strokeWidth={1.8} aria-hidden="true" />{" "}
            Payments
          </button>
          <button
            type="button"
            data-topic-filter="messages"
            aria-pressed="false"
          >
            <MessageSquare size={16} strokeWidth={1.8} aria-hidden="true" />{" "}
            Messages
          </button>
        </div>
      </div>
      <label className="inbox-select">
        <ListFilter size={16} strokeWidth={1.8} aria-hidden="true" />
        <select aria-label="Filter by topic">
          <option value="all">All topics</option>
          <option value="classes">Classes</option>
          <option value="quizzes">Quizzes</option>
          <option value="projects">Projects</option>
          <option value="payments">Payments</option>
          <option value="messages">Messages</option>
        </select>
      </label>
    </aside>
  );
}
