import type { ReactNode } from "react";
type Props = {
  tileClassName: string;
  milestone: ReactNode;
  title: ReactNode;
  description: ReactNode;
  timingLabel: ReactNode;
  timingValue: ReactNode;
  grade: ReactNode;
  status: ReactNode;
  action: ReactNode;
};
export function ProjectCard({
  tileClassName,
  milestone,
  title,
  description,
  timingLabel,
  timingValue,
  grade,
  status,
  action,
}: Props) {
  return (
    <article
      className="p-card p-lift"
      style={{
        padding: "18px 20px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "16px 20px",
      }}
    >
      <span
        className={tileClassName}
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          flexDirection: "column",
          gap: "0px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.06em",
            lineHeight: "1",
          }}
        >
          M
        </span>
        <strong style={{ fontSize: "18px", lineHeight: "1" }}>
          {milestone}
        </strong>
      </span>
      <div
        style={{
          flex: "1 1 260px",
          minWidth: "0px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <div className="p-row" style={{ gap: "10px", flexWrap: "wrap" }}>
          <strong style={{ fontSize: "16px" }}>{title}</strong>
          {status}
        </div>
        <span className="p-small">{description}</span>
      </div>
      <div
        style={{
          flex: "0 1 220px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <span className="p-mono" style={{ fontSize: "11px" }}>
          {timingLabel}
        </span>
        <span style={{ fontSize: "14px", fontWeight: "600" }}>
          {timingValue}
        </span>
      </div>
      <div
        style={{
          flex: "0 1 150px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {grade}
      </div>
      {action}
    </article>
  );
}
