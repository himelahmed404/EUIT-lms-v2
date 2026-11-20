import { StudentPage } from "@/components/student/layout/StudentPage";
import { PaymentsScreen } from "@/components/student/payments/PaymentsScreen";
export const metadata = { title: "Payments · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="payments" legacy>
      <PaymentsScreen />
    </StudentPage>
  );
}
