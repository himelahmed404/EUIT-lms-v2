import { ForgotPasswordScreen } from "@/components/student/forgot-password/ForgotPasswordScreen";
import { StudentPage } from "@/components/student/layout/StudentPage";
export const metadata = { title: "Password recovery · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="forgot-password">
      <ForgotPasswordScreen />
    </StudentPage>
  );
}
