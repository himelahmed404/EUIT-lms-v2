import { CalendarDays,FolderOpen } from "lucide-react";
import Link from "next/link";

export function TodayNotifications() {
  return (
    <section className="inbox-day" data-day-group="">
      <h3>Today</h3>
      <ul>
        <li
          data-motion-card=""
          className="inbox-row"
          data-alert-id="recording-12"
          data-topic="classes"
          data-new="true"
        >
          <Link href="/student/course-offline#cl-12">
            <span data-motion-detail="" className="inbox-symbol">
              <CalendarDays size={19} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="alert-copy">
              <strong>Class 12 recording is uploading</strong>
              <span>WordPress · Batch 14 · Custom header walkthrough</span>
            </span>
            <span className="alert-meta">
              <span>10 min ago</span>
              <i className="alert-dot">
                <span className="sr-only">Unread</span>
              </i>
            </span>
          </Link>
        </li>
        <li
          data-motion-card=""
          className="inbox-row"
          data-alert-id="portfolio-mark"
          data-topic="projects"
          data-new="true"
        >
          <Link href="/student/project-feedback">
            <span data-motion-detail="" className="inbox-symbol">
              <FolderOpen size={19} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="alert-copy">
              <strong>Portfolio homepage approved</strong>
              <span>
                86/100 · Kamrul Hasan left feedback on three sections of your
                page.
              </span>
            </span>
            <span className="alert-meta">
              <span>2 h ago</span>
              <i className="alert-dot">
                <span className="sr-only">Unread</span>
              </i>
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
