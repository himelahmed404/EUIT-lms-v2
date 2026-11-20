import { StudentPage } from "@/components/student/layout/StudentPage";
import { LeaderboardScreen } from "@/components/student/leaderboard/LeaderboardScreen";
export const metadata = { title: "Leaderboard · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="leaderboard" legacy>
      <LeaderboardScreen />
    </StudentPage>
  );
}
