import Link from "next/link";
import type { NotificationItem } from "@/types";

const TILE: Record<string, { cls: string; d: string }> = {
  quiz: { cls: "", d: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" },
  question: { cls: "p-tile--muted", d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
  review: { cls: "p-tile--green", d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 15l2 2 4-4" },
  schedule: { cls: "p-tile--muted", d: "M3 5h18v16H3zM16 3v4M8 3v4M3 10h18" },
  course: { cls: "", d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" },
  payment: { cls: "p-tile--amber", d: "M2 5h20v14H2zM2 10h20" },
  lead: { cls: "p-tile--green", d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM19 8v6M22 11h-6" },
};

const linkReset: React.CSSProperties = {
  border: 0,
  background: "none",
  padding: 0,
  font: "inherit",
  fontWeight: 600,
  fontSize: 13,
  cursor: "pointer",
};

export function NotificationMenu({ items, allHref }: { items: NotificationItem[]; allHref: string }) {
  return (
    <div className="p-dropdown" role="dialog" aria-label="Notifications" id="notif-menu" hidden data-popover="">
      <div className="p-row" style={{ justifyContent: "space-between", padding: "16px 18px 10px" }}>
        <strong style={{ fontSize: 16 }}>Notifications</strong>
        <button type="button" className="p-link" style={linkReset} data-mark-read="#notif-menu">
          Mark all as read
        </button>
      </div>
      <ul className="p-rows" style={{ padding: "0 8px 8px" }}>
        {items.map((n) => {
          const tile = TILE[n.type || ""] || TILE.course;
          return (
            <li key={n.id} style={{ alignItems: "flex-start", padding: 0 }}>
              <Link
                href={n.href}
                className="p-row"
                style={{
                  alignItems: "flex-start",
                  gap: 12,
                  width: "100%",
                  padding: "10px 10px",
                  borderRadius: 12,
                  color: "inherit",
                  textDecoration: "none",
                  minHeight: 44,
                }}
              >
                <span className={`p-tile ${tile.cls}`} style={{ width: 36, height: 36, borderRadius: 10, flex: "0 0 auto" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                    <path d={tile.d} />
                  </svg>
                </span>
                <span className="p-grow" style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                  <span style={{ fontSize: 14, lineHeight: 1.4, color: "var(--ink)", fontWeight: n.unread ? 600 : 500 }}>
                    {n.title}
                  </span>
                  <span className="p-small" style={{ fontSize: 12 }}>
                    {n.body} · {n.when}
                  </span>
                </span>
                {n.unread ? (
                  <span
                    aria-label="Unread"
                    data-unread=""
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--cyan)",
                      marginTop: 6,
                      flex: "0 0 auto",
                    }}
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        href={allHref}
        className="p-link"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 12,
          borderTop: "1px solid var(--line-soft)",
          borderRadius: 0,
        }}
      >
        See all notifications
      </Link>
    </div>
  );
}
