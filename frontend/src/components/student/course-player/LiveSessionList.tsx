import Link from "next/link";
export function LiveSessionList() {
  return (
    <ol
      id="pl-live"
      style={{
        listStyle: "none",
        margin: "0px 0px 8px",
        padding: "0px 0px 0px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
      }}
    >
      <li
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          minHeight: "48px",
          padding: "6px 12px",
          borderRadius: "12px",
        }}
      >
        <span
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            flex: "0 0 auto",
            background: "var(--warning-soft)",
            color: "var(--warning)",
          }}
        >
          <svg
            className="p-icon p-icon--sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </span>
        <span
          className="p-grow"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "var(--ink)",
            }}
          >
            Live 8 · Typography for social posts
          </span>
          <span className="p-small" style={{ fontSize: "12px" }}>
            Upcoming · Wed 21 Oct · 8:00 PM · Zoom
          </span>
        </span>
      </li>
      <li
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          minHeight: "48px",
          padding: "6px 12px",
          borderRadius: "12px",
        }}
      >
        <span
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            flex: "0 0 auto",
            background: "var(--success-soft)",
            color: "var(--success)",
          }}
        >
          <svg
            className="p-icon p-icon--sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M10 8l6 4-6 4z" />
          </svg>
        </span>
        <span
          className="p-grow"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
          }}
        >
          <span style={{ fontSize: "14px", color: "var(--ink-2)" }}>
            Live 7 · Colour and contrast
          </span>
          <span className="p-small" style={{ fontSize: "12px" }}>
            Recording · 1:30:41 · watched
          </span>
        </span>
        <Link
          className="p-link"
          href="/student/routine"
          style={{ fontSize: "13px", whiteSpace: "nowrap" }}
        >
          Watch
        </Link>
      </li>
    </ol>
  );
}
