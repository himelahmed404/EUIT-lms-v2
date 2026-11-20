import Link from "next/link";
export function CertificateToolbar() {
  return (
    <div className="cert-bar">
      <Link className="p-link" href="/student/certificates">
        <svg
          className="p-icon p-icon--sm"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to certificates
      </Link>
      <div className="p-row" style={{ gap: "10px", flexWrap: "wrap" }}>
        <button
          type="button"
          className="p-ghostbtn"
          data-copy="https://europeanit-inst.com/verify/EIT-C-2026-0412"
        >
          <svg
            className="p-icon p-icon--sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span>Copy verify link</span>
        </button>
        <button
          type="button"
          className="eit-btn eit-btn--primary eit-btn--md"
          data-print=""
        >
          <svg
            className="eit-icon eit-btn__lead"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          <span className="eit-btn__label">Download PDF</span>
        </button>
      </div>
    </div>
  );
}
