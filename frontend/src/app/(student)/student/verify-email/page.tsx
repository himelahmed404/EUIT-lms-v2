import { Suspense } from "react";
import { StudentPage } from "@/components/student/layout/StudentPage";
import { VerifyEmailScreen } from "@/components/student/verify-email/VerifyEmailScreen";

export const metadata = {
  title: "Verify your email · European IT Institute",
};

export default function Page() {
  return (
    <StudentPage slug="verify-email">
      <Suspense
        fallback={
          <main className="account-card" style={{ maxWidth: 520, textAlign: "center" }} role="status">
            <span className="sr-only">Loading verification…</span>
            <div className="skeleton" style={{ width: 180, height: 24, margin: "0 auto 20px", borderRadius: 999 }} />
            <div className="skeleton" style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 16px" }} />
            <div className="skeleton" style={{ width: 240, height: 28, margin: "0 auto 12px" }} />
            <div className="skeleton" style={{ width: 340, height: 16, margin: "0 auto 28px" }} />
            <div className="skeleton" style={{ width: "100%", height: 44, borderRadius: 10 }} />
          </main>
        }
      >
        <VerifyEmailScreen />
      </Suspense>
    </StudentPage>
  );
}
