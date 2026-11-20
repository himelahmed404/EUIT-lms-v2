import { DashboardScreen } from "@/components/student/dashboard/DashboardScreen";
import { StudentPage } from "@/components/student/layout/StudentPage";
export const metadata = { title: "Student dashboard · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="dashboard">
      <DashboardScreen />
    </StudentPage>
  );
}
