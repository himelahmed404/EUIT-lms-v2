"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav, mentorNav, isNavCurrent, type NavGroup } from "@/config/nav";
import { ConsoleNavIcon, NavIcon } from "@/config/navIcons";
import { NotificationMenu } from "@/components/shell/NotificationMenu";
import { headerActions } from "@/content/headerActions";
import { notificationsByRole } from "@/data/demo";
import { useAccount, SignOutButton } from "@/components/account/auth-provider";
import type { Role } from "@/types";

function MenuIcon({ d }: { d: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export function ConsoleShell({
  role,
  title,
  subtitle,
  crumbs,
  actions,
  children,
}: {
  role: "mentor" | "admin";
  title: string;
  subtitle?: string;
  crumbs?: { href?: string; label: string }[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const groups: NavGroup[] = role === "admin" ? adminNav : mentorNav;
  const { profile } = useAccount();
  const person = { name: profile?.fullName ?? "" };
  const brandSub = role === "admin" ? "admin console" : "mentor panel";
  const home = role === "admin" ? "/admin/overview" : "/mentor/dashboard";
  const notifs = notificationsByRole[role as Role];
  const count = notifs.filter((n) => n.unread).length;
  const currentHref =
    groups.flatMap((g) => g.items).find((item) => isNavCurrent(pathname, item))?.href ?? pathname;
  const roleLabel = profile?.roleName ?? "";
  const roleDetail = `${roleLabel} · European IT`;
  const initials = person.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="p-shell p-console">
      <aside className="c-side" id="c-side">
        <div className="c-brand">
          <Link className="c-brand-link" href={home} aria-label={`European IT ${brandSub}, home`}>
            <span className="c-logo" aria-hidden>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" />
              </svg>
            </span>
            <span className="c-brand-text">
              <span className="c-brand-name">European IT</span>
              <span className="c-brand-sub">{brandSub}</span>
            </span>
          </Link>
          <button type="button" className="c-iconbtn c-collapse" data-nav-toggle="" aria-label="Collapse menu" title="Collapse menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M3 3h18v18H3zM9 3v18M16 9l-3 3 3 3" />
            </svg>
          </button>
          <button type="button" className="c-iconbtn c-close" data-nav-close="" aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="c-nav" aria-label={`${role} panel`}>
          {groups.map((group, gi) => (
            <div className="c-group" key={group.label || `g${gi}`}>
              {group.label ? <div className="c-group-label">{group.label}</div> : null}
              {group.items.map((item) => {
                const current = isNavCurrent(pathname, item);
                return (
                  <Link
                    key={item.href}
                    className="c-item"
                    href={item.href}
                    aria-current={current ? (pathname === item.href.split("#")[0] ? "page" : "true") : undefined}
                  >
                    <span className="c-ico" aria-hidden>
                      <ConsoleNavIcon href={item.href} />
                    </span>
                    <span className="c-label">{item.label}</span>
                    {item.count != null ? <span className="c-count">{item.count}</span> : null}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
      <div className="p-content">
        <header className="c-top">
          <div className="c-top-in">
            <button
              type="button"
              className="c-iconbtn c-menu"
              data-nav-open=""
              aria-label="Open menu"
              aria-controls="c-side"
              aria-expanded="false"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="c-top-ico" aria-hidden>
              <NavIcon href={currentHref} size={20} className="" />
            </span>
            <div className="c-top-title">
              {crumbs?.length ? (
                <nav className="c-crumbs" aria-label="Breadcrumb">
                  {crumbs.map((c, i) => (
                    <span key={`${c.label}-${i}`}>
                      {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
                      {i < crumbs.length - 1 ? <span aria-hidden> / </span> : null}
                    </span>
                  ))}
                </nav>
              ) : null}
              <h1>{title}</h1>
              {subtitle ? <p className="c-top-sub">{subtitle}</p> : null}
            </div>
            <div className="c-grow" />
            {actions ? (
              <div className="c-actions">{actions}</div>
            ) : headerActions[pathname] ? (
              <div className="c-actions" dangerouslySetInnerHTML={{ __html: headerActions[pathname] }} />
            ) : null}
            <label className="c-search" title="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3" />
              </svg>
              <span className="eit-sr">Search</span>
              <input type="search" placeholder="Search…" />
              <kbd className="c-kbd">Ctrl K</kbd>
            </label>
            <div className="c-pop-wrap">
              <button
                type="button"
                className="c-iconbtn c-bordered"
                data-notif-scope={role}
                aria-expanded="false"
                aria-controls="notif-menu"
                aria-label={`Notifications${count ? `, ${count} unread` : ""}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                {count ? (
                  <span className="c-badge" data-unread-count="">
                    {count}
                  </span>
                ) : null}
              </button>
              <NotificationMenu items={notifs} allHref={`/${role}/notifications`} />
            </div>
            <button
              type="button"
              className="c-iconbtn c-bordered c-theme"
              data-theme-toggle=""
              aria-label="Dark mode"
              aria-pressed="false"
              title="Switch to dark mode"
            >
              <svg className="c-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
              <svg className="c-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            </button>
            <div className="c-pop-wrap">
              <button
                type="button"
                className="c-me"
                aria-expanded="false"
                aria-controls="me-menu"
                aria-label={`Your account: ${person.name}`}
              >
                <span className="c-avatar" aria-hidden>
                  {initials}
                </span>
                <span className="c-me-text">
                  <span className="c-me-name">{person.name}</span>
                  <span className="c-me-sub">{roleLabel}</span>
                </span>
              </button>
              <div className="c-pop" id="me-menu" hidden data-popover="" role="group" aria-label="Your account">
                <div className="c-pop-head">
                  <strong>{person.name}</strong>
                  <span className="p-small">{roleDetail}</span>
                </div>
                <Link href={`/${role}/profile`}>
                  <MenuIcon d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 3.6-7 8-7s8 3 8 7" />
                  My profile
                </Link>
                <Link href={`/${role}/notifications`}>
                  <MenuIcon d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  Notifications
                </Link>
                {role === "admin" ? (
                  <Link href="/admin/settings">
                    <MenuIcon d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
                    Settings
                  </Link>
                ) : (
                  <Link href="/mentor/profile#notifications">
                    <MenuIcon d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
                    Notification settings
                  </Link>
                )}
                <div className="c-pop-row">
                  <span className="p-row" style={{ gap: 10 }}>
                    <MenuIcon d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
                    Language
                  </span>
                  <div className="eit-seg" role="group" aria-label="Language">
                    <button type="button" className="eit-seg__btn is-on" aria-pressed="true">
                      EN
                    </button>
                    <button type="button" lang="bn" className="eit-seg__btn" aria-pressed="false">
                      বাং
                    </button>
                  </div>
                </div>
                <hr />
                <SignOutButton />
              </div>
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
