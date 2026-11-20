import { CoursePaymentPlan } from "./CoursePaymentPlan";
import { CurrentInstallment } from "./CurrentInstallment";
import { PaymentHistory } from "./PaymentHistory";
import { PaymentReferral } from "./PaymentReferral";
export function PaymentsScreen() {
  return (
    <>
      <main className="p-main">
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <h1 className="student-page-title p-h1">Payments</h1>
          <p className="p-body">
            Your course fees, installments and receipts in one place.
          </p>
        </div>
        <div className="p-split">
          <div
            style={{
              flex: "1.45 1 560px",
              minWidth: "0px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <CoursePaymentPlan />
            <section
              className="p-card"
              aria-label="Graphic Design fee"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <strong style={{ fontSize: "16px" }}>Graphic Design</strong>
                <span className="p-small">
                  Batch 9 · Online · ৳8,000 paid 28 Aug 2026
                </span>
              </div>
              <span className="eit-badge eit-badge--success">Paid in full</span>
            </section>
            <PaymentHistory />
          </div>
          <CurrentInstallment />
        </div>
        <PaymentReferral />
      </main>
    </>
  );
}
