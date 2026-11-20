import type { ReactNode } from "react";
const icons: Record<string, ReactNode> = {
  quizzes: (
    <span
      className="p-tile p-tile--green"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
      }}
    >
      <svg className="p-icon p-icon--sm" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 2h8v4H8zM16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 14l2 2 4-4" />
      </svg>
    </span>
  ),
  classes: (
    <span
      className="p-tile"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
      }}
    >
      <svg className="p-icon p-icon--sm" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM10 8l6 4-6 4V8z" />
      </svg>
    </span>
  ),
  projects: (
    <span
      className="p-tile p-tile--amber"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
      }}
    >
      <svg className="p-icon p-icon--sm" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2z" />
      </svg>
    </span>
  ),
  payments: (
    <span
      className="p-tile p-tile--ink"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
      }}
    >
      <svg className="p-icon p-icon--sm" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM2 10h20" />
      </svg>
    </span>
  ),
  account: (
    <span
      className="p-tile p-tile--muted"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
      }}
    >
      <svg className="p-icon p-icon--sm" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      </svg>
    </span>
  ),
  certificates: (
    <span
      className="p-tile"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
      }}
    >
      <svg className="p-icon p-icon--sm" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.2 13.9 7 23l5-3 5 3-1.2-9.1" />
      </svg>
    </span>
  ),
};
export function HelpTopicIcon({ category }: { category: string }) {
  return icons[category];
}
