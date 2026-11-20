import { CertificatesScreen } from "@/components/student/certificates/CertificatesScreen";
import { StudentPage } from "@/components/student/layout/StudentPage";
export const metadata = { title: "Certificates · European IT Institute" };
export default function Page() {
  return (
    <StudentPage slug="certificates" legacy>
      <CertificatesScreen />
    </StudentPage>
  );
}
