import { CoursePlayerScreen } from "@/components/student/course-player/CoursePlayerScreen";
import { StudentPage } from "@/components/student/layout/StudentPage";
export const metadata = { title: "Course player · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="course-player" legacy>
      <CoursePlayerScreen />
    </StudentPage>
  );
}
