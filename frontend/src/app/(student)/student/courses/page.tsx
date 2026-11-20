import { CoursesScreen } from "@/components/student/courses/CoursesScreen";
import { StudentPage } from "@/components/student/layout/StudentPage";
export const metadata = { title: "My courses · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="courses">
      <CoursesScreen />
    </StudentPage>
  );
}
