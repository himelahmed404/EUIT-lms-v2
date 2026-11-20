import { StudentPage } from "@/components/student/layout/StudentPage";
import { NotificationsScreen } from "@/components/student/notifications/NotificationsScreen";
export const metadata = { title: "Notifications · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="notifications">
      <NotificationsScreen />
    </StudentPage>
  );
}
