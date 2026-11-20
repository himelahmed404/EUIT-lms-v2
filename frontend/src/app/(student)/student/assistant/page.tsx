import { AssistantScreen } from "@/components/student/assistant/AssistantScreen";
import { StudentPage } from "@/components/student/layout/StudentPage";
export const metadata = { title: "Study assistant · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="assistant">
      <AssistantScreen />
    </StudentPage>
  );
}
