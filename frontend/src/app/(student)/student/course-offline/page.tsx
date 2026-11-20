import { CourseOfflineScreen } from "@/components/student/course-offline/CourseOfflineScreen";
import { StudentPage } from "@/components/student/layout/StudentPage";
export const metadata = { title: "Offline course · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="course-offline" legacy>
      <CourseOfflineScreen />
    </StudentPage>
  );
}
