import { BatchRanking } from "./BatchRanking";
import { LeaderboardHelp } from "./LeaderboardHelp";
import { LeaderboardTemplates } from "./LeaderboardTemplates";
import { PointsHistory } from "./PointsHistory";
import { PointsRules } from "./PointsRules";
import { StudentRankingSummary } from "./StudentRankingSummary";
export function LeaderboardScreen() {
  return (
    <>
      <main className="p-main">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              maxWidth: "660px",
            }}
          >
            <h1 className="student-page-title p-h1">Leaderboard</h1>
            <p className="p-body">
              See your points and where you stand in your batch. Your points are
              the sum of your marked project marks.
            </p>
          </div>
          <div className="p-seg" role="group" aria-label="Course">
            <button type="button" aria-pressed="true">
              WordPress · B14
            </button>
            <button type="button" aria-pressed="false">
              Graphic Design · B9
            </button>
          </div>
        </div>
        <StudentRankingSummary />
        <div className="p-split">
          <BatchRanking />
          <div
            className="p-stagger"
            style={{
              flex: "1 1 320px",
              minWidth: "0px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <PointsRules />
            <PointsHistory />
            <LeaderboardHelp />
          </div>
        </div>
      </main>
      <LeaderboardTemplates />
    </>
  );
}
