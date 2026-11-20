import { HelpScreen } from "@/components/student/help/HelpScreen";
import { StudentPage } from "@/components/student/layout/StudentPage";
export const metadata = { title: "Help centre · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="help" legacy>
      <HelpScreen />
    </StudentPage>
  );
}
