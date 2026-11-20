import { CertificateScreen } from "@/components/student/certificate/CertificateScreen";
import { StudentPage } from "@/components/student/layout/StudentPage";
export const metadata = { title: "Certificate · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="certificate" legacy>
      <CertificateScreen />
    </StudentPage>
  );
}
