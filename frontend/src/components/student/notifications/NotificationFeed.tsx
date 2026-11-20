import { CheckCheck,Inbox } from "lucide-react";
import { EarlierNotifications } from "./EarlierNotifications";
import { TodayNotifications } from "./TodayNotifications";
import { YesterdayNotifications } from "./YesterdayNotifications";
export function NotificationFeed() {
  return (
    <section
      data-motion-intro=""
      className="inbox-feed"
      aria-labelledby="activity-title"
    >
      <header className="inbox-feed-head">
        <h2 id="activity-title">Activity</h2>
        <button type="button" className="inbox-mark" data-mark-all="" hidden>
          <CheckCheck size={17} strokeWidth={1.8} aria-hidden="true" /> Mark all
          as read
        </button>
      </header>
      <TodayNotifications />
      <YesterdayNotifications />
      <EarlierNotifications />
      <div className="inbox-empty" hidden>
        <Inbox size={30} strokeWidth={1.8} aria-hidden="true" />
        <h3>No matching notifications</h3>
        <button type="button" data-reset="">
          Show all activity
        </button>
      </div>
      <p className="sr-only" role="status" data-inbox-status="" />
    </section>
  );
}
