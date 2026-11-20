import { StudentPage } from "@/components/student/layout/StudentPage";
import { RoutineScreen } from "@/components/student/routine/RoutineScreen";
export const metadata = { title: "Routine · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="routine">
      <RoutineScreen />
    </StudentPage>
  );
}
