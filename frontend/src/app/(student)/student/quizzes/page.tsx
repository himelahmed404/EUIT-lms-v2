import { StudentPage } from "@/components/student/layout/StudentPage";
import { QuizzesScreen } from "@/components/student/quizzes/QuizzesScreen";
export const metadata = { title: "Quizzes · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="quizzes" legacy>
      <QuizzesScreen />
    </StudentPage>
  );
}
