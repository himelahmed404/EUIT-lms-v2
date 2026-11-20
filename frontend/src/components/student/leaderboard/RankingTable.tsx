import { RankingRow } from "./RankingRow";
import { rankings } from "./rankings";
export function RankingTable() {
  return (
    <table className="p-table">
      <thead>
        <tr>
          <th scope="col" style={{ width: "64px" }}>
            Rank
          </th>
          <th scope="col">Student</th>
          <th scope="col">Projects marked</th>
          <th scope="col">Average mark</th>
          <th scope="col">Points</th>
          <th scope="col">This week</th>
        </tr>
      </thead>
      <tbody className="p-stagger">
        {rankings.map((student, index) => (
          <RankingRow key={student.id ?? index} student={student} />
        ))}
      </tbody>
    </table>
  );
}
