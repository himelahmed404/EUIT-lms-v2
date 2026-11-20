import { StudentPage } from "@/components/student/layout/StudentPage";
import { ProfileScreen } from "@/components/student/profile/ProfileScreen";
export const metadata = { title: "Profile & settings · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="profile">
      <ProfileScreen />
    </StudentPage>
  );
}
