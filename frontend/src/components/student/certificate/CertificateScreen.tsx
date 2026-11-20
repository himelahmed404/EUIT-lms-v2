import { CertificateDocument } from "./CertificateDocument";
import { CertificateToolbar } from "./CertificateToolbar";
export function CertificateScreen() {
  return (
    <>
      <main className="certificate-preview">
        <header className="workspace-heading">
          <div className="page-intro">
            <h1 className="student-page-title">Certificate</h1>
          </div>
          <div className="head-actions" />
        </header>
        <CertificateToolbar />
        <p className="cert-hint p-small">
          Choose “Save as PDF” in the print window. The certificate prints on
          one A4 page, landscape.
        </p>
        <div data-motion-intro="" className="cert-stage">
          <div className="cert-fit" data-fit="">
            <CertificateDocument />
          </div>
        </div>
      </main>
    </>
  );
}
