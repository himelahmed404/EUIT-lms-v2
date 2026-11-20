import type { StudentRanking } from "./rankings";
export function RankingRow({ student: s }: { student: StudentRanking }) {
  return (
    <tr className={s.className} id={s.id} hidden={s.hidden || undefined}>
      <td>
        <span className="lb-rank" style={s.rankStyle}>
          {s.rank}
        </span>
      </td>
      <td>
        <span className="p-cell-person">
          <span className="p-avatar p-avatar--sm" style={s.avatarStyle}>
            {s.initials}
          </span>
          <strong>{s.name}</strong>
          {s.current && <span className="eit-badge eit-badge--cyan">You</span>}
        </span>
      </td>
      <td style={{ fontVariantNumeric: "tabular-nums" }}>{s.projects}</td>
      <td style={{ fontVariantNumeric: "tabular-nums" }}>{s.average}</td>
      <td>
        <strong style={{ fontVariantNumeric: "tabular-nums" }}>
          {s.points}
        </strong>
      </td>
      <td>
        <span className="lb-trend" style={s.trendStyle}>
          <svg
            className="p-icon p-icon--sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d={s.trendPath} />
          </svg>
          {s.trendLabel}
        </span>
      </td>
    </tr>
  );
}
