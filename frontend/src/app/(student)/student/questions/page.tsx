import { StudentPage } from "@/components/student/layout/StudentPage";
import { QuestionsScreen } from "@/components/student/questions/QuestionsScreen";
export const metadata = { title: "My questions · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="questions" legacy>
      <QuestionsScreen />
    </StudentPage>
  );
}
