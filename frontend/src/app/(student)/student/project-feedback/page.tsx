import { StudentPage } from "@/components/student/layout/StudentPage";
import { ProjectFeedbackScreen } from "@/components/student/project-feedback/ProjectFeedbackScreen";
export const metadata = { title: "Project feedback · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="project-feedback" legacy>
      <ProjectFeedbackScreen />
    </StudentPage>
  );
}
