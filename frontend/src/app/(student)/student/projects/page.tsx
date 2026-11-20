import { StudentPage } from "@/components/student/layout/StudentPage";
import { ProjectsScreen } from "@/components/student/projects/ProjectsScreen";
export const metadata = { title: "Projects · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="projects" legacy>
      <ProjectsScreen />
    </StudentPage>
  );
}
