import { CalendarDays,CheckCircle2,Clock3 } from "lucide-react";
import { AccountName, AccountPhoto } from "@/components/account/account-identity";
import Link from "next/link";

export function StudentProfileWidget() {
  return (
    <section data-motion-intro="" className="widget profile-widget">
      <div className="greeting flex items-center">
        <Link
          className="profile-portrait"
          href="/student/profile"
          aria-label="Open student profile"
        >
          <AccountPhoto />
          <span>Student</span>
        </Link>
        <h2>
          Welcome back,
          <br />
          <span data-profile-first=""><AccountName first /></span>
        </h2>
      </div>
      <div className="activity-summary">
        <strong>69%</strong>
        <span>
          Weekly study
          <br />
          goal reached
        </span>
      </div>
      <div className="mix" aria-label="Distribution of study time">
        <div style={{ flex: "42" }} title="Lessons: 42%">
          <i className="violet" />
          <span aria-label="Lessons 42 percent">42%</span>
        </div>
        <div style={{ flex: "15" }} title="Practice: 15%">
          <i className="green" />
          <span aria-label="Practice 15 percent">15%</span>
        </div>
        <div style={{ flex: "43" }} title="Projects: 43%">
          <i className="dark" />
          <span aria-label="Projects 43 percent">43%</span>
        </div>
      </div>
      <div className="mini-grid">
        <Link href="/student/courses?filter=active">
          <span className="mini-icon violet">
            <Clock3 size={17} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <b>2</b>
          <small>In progress</small>
        </Link>
        <Link href="/student/routine">
          <span className="mini-icon green">
            <CalendarDays size={17} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <b>3</b>
          <small>Upcoming</small>
        </Link>
        <Link href="/student/certificates">
          <span className="mini-icon dark">
            <CheckCircle2 size={17} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <b>1</b>
          <small>Completed</small>
        </Link>
      </div>
    </section>
  );
}
