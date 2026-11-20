import {
Bell,
Camera,
ChevronRight,
LockKeyhole,
LogOut,
Ticket,
Trophy,
User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProfileSidebar() {
  return (
    <aside className="pf-side">
      <section data-motion-intro="" className="pf-id" aria-labelledby="pf-name">
        <div className="pf-picture">
          <Image
            unoptimized
            src="/student-assets/nusrat.webp"
            width="76"
            height="76"
            alt=""
            data-profile-photo=""
          />
          <button
            type="button"
            id="photo-select"
            aria-label="Change profile photo"
            title="Change profile photo"
          >
            <Camera size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <input
            type="file"
            id="photo-file"
            accept="image/jpeg,image/png,image/webp"
            hidden
          />
        </div>
        <h2 id="pf-name" data-profile-name="">
          Nusrat Jahan
        </h2>
        <p>Student ID · EIT-24-0148</p>
        <p className="pf-status" id="photo-status" role="status" />
        <Link className="pf-rank" href="/student/leaderboard">
          <Trophy size={17} strokeWidth={1.8} aria-hidden="true" />{" "}
          <b>164 points</b>
          <span>Rank #3</span>
          <ChevronRight size={15} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </section>
      <nav className="pf-nav" aria-label="Profile settings">
        <a href="#pf-account" data-pf-tab="pf-account" aria-current="location">
          <User2 size={17} strokeWidth={1.8} aria-hidden="true" />
          Personal details
        </a>
        <a href="#notifications" data-pf-tab="notifications">
          <Bell size={17} strokeWidth={1.8} aria-hidden="true" />
          Notifications
        </a>
        <a href="#pf-refer" data-pf-tab="pf-refer">
          <Ticket size={17} strokeWidth={1.8} aria-hidden="true" />
          Referrals &amp; coupons
        </a>
        <a href="#pf-security" data-pf-tab="pf-security">
          <LockKeyhole size={17} strokeWidth={1.8} aria-hidden="true" />
          Security
        </a>
        <Link className="pf-signout" href="/student/login">
          <LogOut size={17} strokeWidth={1.8} aria-hidden="true" /> Sign out
        </Link>
      </nav>
    </aside>
  );
}
