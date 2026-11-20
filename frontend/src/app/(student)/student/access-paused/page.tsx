import { AccessPausedScreen } from "@/components/student/access-paused/AccessPausedScreen";
import { StudentPage } from "@/components/student/layout/StudentPage";
export const metadata = { title: "Access paused · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="access-paused" legacy>
      <AccessPausedScreen />
    </StudentPage>
  );
}
