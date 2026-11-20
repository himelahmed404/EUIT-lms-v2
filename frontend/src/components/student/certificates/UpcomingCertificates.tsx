import { DesignCertificateProgress } from "./DesignCertificateProgress";
import { WordPressCertificateProgress } from "./WordPressCertificateProgress";
export function UpcomingCertificates() {
  return (
    <section
      aria-labelledby="prog-title"
      style={{ display: "flex", flexDirection: "column", gap: "14px" }}
    >
      <h2 id="prog-title" className="p-h3">
        On the way
      </h2>
      <div
        className="p-stagger"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(380px, 100%), 1fr))",
          gap: "16px",
        }}
      >
        <DesignCertificateProgress />
        <WordPressCertificateProgress />
      </div>
    </section>
  );
}
