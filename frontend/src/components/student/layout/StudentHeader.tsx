import { StudentNavigation } from "./StudentNavigation";
import { Bell, Search } from "lucide-react";
import { AccountPhoto } from "@/components/account/account-identity";
import Link from "next/link";
import { StudentAccountMenu } from "./StudentAccountMenu";
import { StudentBrand } from "./StudentBrand";
import { StudentSearchMenu } from "./StudentSearchMenu";
export function StudentHeader({ slug }: { slug: string }) {
  return (
    <header className="masthead">
      <StudentBrand href="/student/dashboard" />
      <StudentNavigation slug={slug} />
      <div className="header-tools flex items-center">
        <button
          type="button"
          className="round-tool"
          data-search-trigger=""
          aria-expanded="false"
          aria-controls="student-dropdown"
          title="Search pages"
          aria-label="Search pages"
        >
          <Search size={20} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <Link
          className="round-tool bell-tool"
          data-notif-scope="student"
          href="/student/notifications"
          aria-label="Notifications"
          title="Notifications"
          aria-current={slug === "notifications" ? "page" : undefined}
        >
          <Bell size={20} strokeWidth={1.8} aria-hidden="true" />
          <i aria-hidden="true" data-unread-count="" />
        </Link>
        <div className="account-anchor">
          <button
            type="button"
            className="round-tool avatar-tool"
            data-account-trigger=""
            aria-expanded="false"
            aria-controls="student-dropdown"
            aria-label="Student account"
            title="Student account"
          >
            <AccountPhoto />
          </button>
          <div id="student-dropdown" className="student-dropdown" hidden>
            <StudentAccountMenu slug={slug} />
            <StudentSearchMenu slug={slug} />
          </div>
        </div>
      </div>
    </header>
  );
}
