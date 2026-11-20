import { ArrowUpRight,SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { NotificationFeed } from "./NotificationFeed";
import { NotificationFilters } from "./NotificationFilters";
export function NotificationsScreen() {
  return (
    <>
      <main className="inbox-room">
        <header className="inbox-title">
          <div>
            <p>Thursday 15 October</p>
            <h1 className="student-page-title">Notifications</h1>
          </div>
          <Link className="inbox-prefs" href="/student/profile#notifications">
            <SlidersHorizontal size={16} strokeWidth={1.8} aria-hidden="true" />{" "}
            Notification settings
          </Link>
        </header>
        <div className="inbox-layout">
          <NotificationFilters />
          <NotificationFeed />
          <nav className="inbox-shortcuts" aria-label="Related pages">
            <h2>Quick links</h2>
            <Link href="/student/course-offline">
              Class recordings{" "}
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </Link>
            <Link href="/student/payments">
              Payments{" "}
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </Link>
            <Link href="/student/help">
              Help centre{" "}
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </main>
    </>
  );
}
