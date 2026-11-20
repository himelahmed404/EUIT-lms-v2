import { StudentPage } from "@/components/student/layout/StudentPage";
import { SavedScreen } from "@/components/student/saved/SavedScreen";
export const metadata = { title: "Saved & notes · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="saved">
      <SavedScreen />
    </StudentPage>
  );
}
