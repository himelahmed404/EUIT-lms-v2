import { StudentIcon } from "@/components/student/shared/StudentIcon";
import Link from "next/link";
import { EarnedCertificate } from "./EarnedCertificate";
import { UpcomingCertificates } from "./UpcomingCertificates";
export function CertificatesScreen() {
  return (
    <>
      <main className="p-main">
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <h1 className="student-page-title p-h1">Certificates</h1>
          <p className="p-body">
            Finish a course to earn a certificate. Anyone can check it is real
            with its link or ID.
          </p>
        </div>
        <EarnedCertificate />
        <UpcomingCertificates />
        <div className="p-notice">
          <StudentIcon width="18" height="18">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-5" />
            <path d="M12 8h.01" />
          </StudentIcon>
          <span>
            Your certificate shows your name as it is on your profile. Check it
            is spelled correctly before you finish a course:{" "}
            <Link
              href="/student/profile"
              style={{ color: "inherit", fontWeight: "600" }}
            >
              edit your name
            </Link>
            .
          </span>
        </div>
      </main>
    </>
  );
}
