export function ProjectRubric() {
  return (
    <section className="p-card p-card--flush" aria-labelledby="mark-title">
      <div className="p-card-head" style={{ padding: "20px 24px 12px" }}>
        <h2 id="mark-title" className="p-h3">
          How it is marked
        </h2>
        <span className="p-small">Pass mark 60 · total 100</span>
      </div>
      <div className="p-scroll">
        <table className="p-table" style={{ minWidth: "560px" }}>
          <thead>
            <tr>
              <th scope="col">What we check</th>
              <th scope="col">What a full score looks like</th>
              <th scope="col" style={{ textAlign: "right" }}>
                Marks
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Does what the brief asks</strong>
              </td>
              <td>All 5 posts, right size, menu items correct</td>
              <td
                style={{
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <strong>30</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Typography</strong>
              </td>
              <td>One pairing, clear hierarchy, readable on a phone</td>
              <td
                style={{
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <strong>25</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Colour and layout</strong>
              </td>
              <td>Consistent palette and grid across the set</td>
              <td
                style={{
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <strong>25</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>On time and explained</strong>
              </td>
              <td>Submitted by the due date, choices explained</td>
              <td
                style={{
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <strong>20</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
