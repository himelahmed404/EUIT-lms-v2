export function PaymentHistory() {
  return (
    <section className="p-card p-card--flush" aria-labelledby="hist-title">
      <div className="p-card-head" style={{ padding: "20px 24px 12px" }}>
        <h2 id="hist-title" className="p-h3">
          Payment history
        </h2>
      </div>
      <div className="p-scroll">
        <table className="p-table" style={{ minWidth: "640px" }}>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">For</th>
              <th scope="col">Method</th>
              <th scope="col" style={{ textAlign: "right" }}>
                Amount
              </th>
              <th scope="col">Status</th>
              <th scope="col">
                <span className="eit-sr">Receipt</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ whiteSpace: "nowrap" }}>10 Sep 2026</td>
              <td>
                <strong>WordPress</strong> · installment 1 of 3
              </td>
              <td>bKash</td>
              <td
                style={{
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <strong>৳5,000</strong>
              </td>
              <td>
                <span className="eit-badge eit-badge--success">Paid</span>
              </td>
              <td>
                <a className="p-link" href="#">
                  Receipt
                </a>
              </td>
            </tr>
            <tr>
              <td style={{ whiteSpace: "nowrap" }}>28 Aug 2026</td>
              <td>
                <strong>Graphic Design</strong> · full fee
              </td>
              <td>Card</td>
              <td
                style={{
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <strong>৳8,000</strong>
              </td>
              <td>
                <span className="eit-badge eit-badge--success">Paid</span>
              </td>
              <td>
                <a className="p-link" href="#">
                  Receipt
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
