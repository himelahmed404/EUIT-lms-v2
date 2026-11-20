import { StudentPage } from "@/components/student/layout/StudentPage";
import { QuizScreen } from "@/components/student/quiz/QuizScreen";
export const metadata = { title: "Quiz · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="quiz" legacy>
      <QuizScreen />
    </StudentPage>
  );
}
