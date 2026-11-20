import { StudentPage } from "@/components/student/layout/StudentPage";
import { LoginScreen } from "@/components/student/login/LoginScreen";
export const metadata = { title: "Student sign-in · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="login">
      <LoginScreen />
    </StudentPage>
  );
}
