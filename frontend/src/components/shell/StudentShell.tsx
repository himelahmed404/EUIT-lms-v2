"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { studentNav, isNavCurrent } from "@/config/nav";
import { NavIcon } from "@/config/navIcons";
import { notificationsByRole } from "@/data/demo";
import { nusrat } from "@/data/demo/people";
import { Icon } from "@/components/eit/Icon";
import { NotificationMenu } from "@/components/shell/NotificationMenu";

const unread = () => notificationsByRole.student.filter((n) => n.unread).length;

export function StudentShell({
  children,
  nextClass,
}: {
  children: React.ReactNode;
  nextClass?: { title: string; meta: string; href?: string };
}) {
  const pathname = usePathname();
  const count = unread();
  const next = nextClass || {
    title: "WordPress · Class 13",
    meta: "Mon 19 Oct, 7:00 PM · Lab 2",
    href: "/student/routine",
  };

  return (
    <div className="p-shell">
      <aside className="p-side">
        <Link className="p-brand" href="/student/dashboard">
          <span className="p-brand-mark" aria-hidden />
          <span className="p-brand-text">
            <span className="p-brand-name">European IT</span>
            <span className="p-brand-sub">INSTITUTE</span>
          </span>
        </Link>
        <nav className="p-nav" aria-label="Student panel">
          {studentNav.map((group) => (
            <Fragment key={group.label}>
              <span className="p-nav-label">{group.label}</span>
              {group.items.map((item) => {
                const current = isNavCurrent(pathname, item);
                return (
                  <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}>
                    <NavIcon href={item.href} />
                    <span className="p-nav-text">{item.label}</span>
                    {item.short ? (
                      <span className="p-nav-short" aria-hidden>
                        {item.short}
                      </span>
                    ) : null}
                    {item.count ? <span className="p-count">{item.count}</span> : null}
                  </Link>
                );
              })}
            </Fragment>
          ))}
        </nav>
        <Link
          className="p-help p-lift"
          href="/student/leaderboard"
          style={{ marginTop: "auto", textDecoration: "none", color: "inherit" }}
        >
          <span className="p-row" style={{ gap: 10 }}>
            <span className="p-tile" style={{ width: 38, height: 38, background: "var(--cyan)", color: "var(--on-cyan)" }}>
              <Icon>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </Icon>
            </span>
            <span style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: 18, lineHeight: 1.15 }}>{nusrat.points} points</strong>
              <span className="p-small" style={{ color: "var(--cyan-deep)" }}>
                #{nusrat.rank} in WordPress B14
              </span>
            </span>
          </span>
          <span className="p-small" style={{ color: "var(--cyan-deep)" }}>
            Every marked project adds its mark
          </span>
        </Link>
      </aside>
      <div className="p-content">
        <header className="p-top">
          <Link className="p-next" href={next.href || "/student/routine"}>
            <span className="p-live" aria-hidden />
            <span className="p-next-text">
              <span className="p-next-l">Next class</span>
              <span className="p-next-t">{next.title}</span>
              <span className="p-next-m">{next.meta}</span>
            </span>
          </Link>
          <div className="p-top-right">
            <div className="eit-seg has-thumb" role="group" aria-label="Language">
              <button type="button" className="eit-seg__btn is-on" aria-pressed="true">
                EN
              </button>
              <button type="button" lang="bn" className="eit-seg__btn" aria-pressed="false">
                বাং
              </button>
            </div>
            <button className="p-iconbtn" data-theme-toggle="" type="button" aria-label="Dark mode" aria-pressed="false">
              <svg className="p-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
              <svg className="p-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            </button>
            <button
              type="button"
              className="p-iconbtn"
              data-notif-scope="student"
              aria-expanded="false"
              aria-controls="notif-menu"
              aria-label={`Notifications${count ? `, ${count} unread` : ""}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              {count ? (
                <span className="p-badge-count" data-unread-count="">
                  {count}
                </span>
              ) : null}
            </button>
            <Link
              className="p-me"
              href="/student/profile"
              aria-label={`${nusrat.name}, profile`}
              style={{ textDecoration: "none" }}
            >
              <span className="p-avatar" aria-hidden>
                NJ
              </span>
              <span style={{ display: "flex", flexDirection: "column" }}>
                <span className="p-me-name">{nusrat.name}</span>
                <span className="p-me-sub">Student · {nusrat.studentId}</span>
              </span>
            </Link>
            <NotificationMenu items={notificationsByRole.student} allHref="/student/notifications" />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
