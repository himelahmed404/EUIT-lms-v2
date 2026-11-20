import { AssignmentsScreen } from "@/components/student/assignments/AssignmentsScreen";
import { StudentPage } from "@/components/student/layout/StudentPage";
export const metadata = { title: "Assignments · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="assignments">
      <AssignmentsScreen />
    </StudentPage>
  );
}
