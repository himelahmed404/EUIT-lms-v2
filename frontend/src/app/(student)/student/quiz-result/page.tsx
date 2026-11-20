import { StudentPage } from "@/components/student/layout/StudentPage";
import { QuizResultScreen } from "@/components/student/quiz-result/QuizResultScreen";
export const metadata = { title: "Quiz result · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="quiz-result" legacy>
      <QuizResultScreen />
    </StudentPage>
  );
}
