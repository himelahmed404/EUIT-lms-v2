import { StudentPage } from "@/components/student/layout/StudentPage";
import { ProjectDetailScreen } from "@/components/student/project-detail/ProjectDetailScreen";
export const metadata = { title: "Project details · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="project-detail" legacy>
      <ProjectDetailScreen />
    </StudentPage>
  );
}
