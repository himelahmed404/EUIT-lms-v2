import { StudentIcon } from "@/components/student/shared/StudentIcon";
import { RankingTable } from "./RankingTable";
export function BatchRanking() {
  return (
    <section
      className="p-card p-card--flush"
      aria-labelledby="rank-title"
      style={{
        flex: "1.6 1 560px",
        minWidth: "0px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="p-card-head" style={{ padding: "20px 24px 16px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <h2 id="rank-title" className="p-h3">
            Batch ranking
          </h2>
          <span className="p-small">WordPress B14 · 20 students</span>
        </span>
        <span className="p-pill" style={{ height: "28px", fontSize: "12px" }}>
          <span className="p-live" />
          Updated when a project is marked
        </span>
      </div>
      <div className="p-scroll">
        <RankingTable />
      </div>
      <div
        className="p-row"
        style={{
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          padding: "16px 24px",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <span className="p-small">
          Same points? The student who reached them first ranks higher.
        </span>
        <button
          type="button"
          className="p-ghostbtn"
          aria-expanded="false"
          data-reveal="rv0 rv1 rv2 rv3 rv4 rv5 rv6 rv7 rv8 rv9 rv10 rv11"
          data-on-look="rvlook12"
        >
          Show all 20 students
          <span
            style={{
              display: "inline-flex",
              transition: "transform 200ms",
              transform: "rotate(0deg)",
            }}
          >
            <StudentIcon width="16" height="16">
              <path d="M6 9l6 6 6-6" />
            </StudentIcon>
          </span>
        </button>
      </div>
    </section>
  );
}
