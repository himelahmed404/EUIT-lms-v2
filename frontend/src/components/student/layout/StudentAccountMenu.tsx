import {
  Award,
  BarChart2,
  Bookmark,
  CircleHelp,
  CreditCard,
  LogOut,
  MessageCircle,
} from "lucide-react";
import { AccountName, AccountPhoto, AccountId } from "@/components/account/account-identity";
import { SignOutButton } from "@/components/account/auth-provider";
import Link from "next/link";
export function StudentAccountMenu({ slug }: { slug: string }) {
  return (
    <section className="account-view" aria-label="Student account">
      <div className="account-identity">
        <AccountPhoto />
        <h2 data-profile-name="">{<AccountName />}</h2>
        <p>Account: {<AccountId />}</p>
        <Link
          className="account-profile"
          href="/student/profile"
          aria-current={slug === "profile" ? "page" : undefined}
        >
          View profile
        </Link>
      </div>
      <nav className="account-links" aria-label="Student account navigation">
        <ul className="account-group" aria-label="Student records">
          <li>
            <Link
              className="account-row"
              href="/student/certificates"
              aria-current={slug === "certificates" ? "page" : undefined}
            >
              <Award size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>Certificates</span>
            </Link>
          </li>
          <li>
            <Link
              className="account-row"
              href="/student/payments"
              aria-current={slug === "payments" ? "page" : undefined}
            >
              <CreditCard size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>Payments</span>
            </Link>
          </li>
        </ul>
        <ul className="account-group" aria-label="Study tools and support">
          <li>
            <Link
              className="account-row"
              href="/student/saved"
              aria-current={slug === "saved" ? "page" : undefined}
            >
              <Bookmark size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>Saved &amp; notes</span>
            </Link>
          </li>
          <li>
            <Link
              className="account-row"
              href="/student/questions"
              aria-current={slug === "questions" ? "page" : undefined}
            >
              <MessageCircle size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>My questions</span>
            </Link>
          </li>
          <li>
            <Link
              className="account-row"
              href="/student/leaderboard"
              aria-current={slug === "leaderboard" ? "page" : undefined}
            >
              <BarChart2 size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>Leaderboard</span>
            </Link>
          </li>
          <li>
            <Link
              className="account-row"
              href="/student/help"
              aria-current={slug === "help" ? "page" : undefined}
            >
              <CircleHelp size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>Help centre</span>
            </Link>
          </li>
        </ul>
      </nav>
      <footer className="account-exit">
        <SignOutButton className="account-row">
          <LogOut size={17} strokeWidth={1.8} aria-hidden="true" />
          <span>Sign out</span>
        </SignOutButton>
      </footer>
    </section>
  );
}
