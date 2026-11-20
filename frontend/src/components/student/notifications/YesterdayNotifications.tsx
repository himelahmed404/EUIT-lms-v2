import { CreditCard } from "lucide-react";
import Link from "next/link";

export function YesterdayNotifications() {
  return (
    <section className="inbox-day" data-day-group="">
      <h3>Yesterday</h3>
      <ul>
        <li
          data-motion-card=""
          className="inbox-row"
          data-alert-id="installment-2"
          data-topic="payments"
        >
          <Link href="/student/payments#pay-title">
            <span data-motion-detail="" className="inbox-symbol">
              <CreditCard size={19} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="alert-copy">
              <strong>Installment 2 is due on 15 November</strong>
              <span>
                ৳5,000 for WordPress. Your SMS reminder arrives three days
                before the due date.
              </span>
            </span>
            <span className="alert-meta">
              <span>14 Oct</span>
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
