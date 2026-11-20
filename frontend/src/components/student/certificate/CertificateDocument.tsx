export function CertificateDocument() {
  return (
    <div
      className="cert-sheet"
      style={{
        position: "relative",
        width: "1123px",
        height: "794px",
        boxSizing: "border-box",
        overflow: "hidden",
        background: "rgb(255, 255, 255)",
        color: "var(--charcoal)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px",
          height: "14px",
          background: "var(--violet)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "32px",
          border: "1px solid #dedce2",
          borderRadius: "4px",
        }}
      />
      <svg
        width="360"
        height="360"
        viewBox="0 0 360 360"
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-120px",
          bottom: "-120px",
        }}
      >
        <circle
          cx="180"
          cy="180"
          r="150"
          fill="none"
          stroke="#f1e7fe"
          strokeWidth="40"
        />
        <circle
          cx="180"
          cy="180"
          r="96"
          fill="none"
          stroke="#d9c4ef"
          strokeWidth="2"
        />
      </svg>
      <svg
        width="200"
        height="140"
        viewBox="0 0 200 140"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "56px",
          bottom: "150px",
          opacity: "0.6",
        }}
      >
        <defs>
          <pattern id="d" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill="#d9c4ef" />
          </pattern>
        </defs>
        <rect width="200" height="140" fill="url(#d)" />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: "72px 80px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "var(--violet)",
              }}
            />
            <span style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  letterSpacing: "0",
                  lineHeight: "1.1",
                }}
              >
                European IT
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.16em",
                  color: "var(--quiet)",
                }}
              >
                INSTITUTE
              </span>
            </span>
          </div>
          <div
            style={{
              textAlign: "right",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.1em",
                color: "var(--quiet)",
              }}
            >
              CERTIFICATE ID
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              EIT-C-2026-0412
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            paddingLeft: "4px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "15px",
              letterSpacing: "0.18em",
              color: "var(--violet)",
            }}
          >
            CERTIFICATE OF COMPLETION
          </span>
          <span style={{ fontSize: "18px", color: "#433f49" }}>
            This certifies that
          </span>
          <span
            style={{
              fontSize: "72px",
              fontWeight: "700",
              letterSpacing: "0",
              lineHeight: "1.05",
              alignSelf: "flex-start",
              boxShadow: "#d6f48b 0px -18px 0px inset",
            }}
          >
            Nusrat Jahan
          </span>
          <span
            style={{
              fontSize: "18px",
              color: "#433f49",
              marginTop: "6px",
            }}
          >
            has completed the course
          </span>
          <span
            style={{
              fontSize: "34px",
              fontWeight: "700",
              letterSpacing: "0",
            }}
          >
            Digital Marketing Essentials
          </span>
          <span style={{ fontSize: "16px", color: "#433f49" }}>
            12 weeks · 36 hours of live classes · 2 projects approved by the
            mentor · completed 30 June 2026
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "56px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              width: "220px",
            }}
          >
            <span style={{ height: "32px" }} aria-hidden="true">
              <svg
                width="150"
                height="32"
                viewBox="0 0 150 32"
                aria-hidden="true"
                style={{ display: "block" }}
              >
                <path
                  d="M4 24c10-14 18-18 22-12s-6 14 2 10 12-16 18-14-4 16 4 14 10-10 16-12 6 8 12 6 14-6 22-8 10 2 16 0 14-4 30-6"
                  fill="none"
                  stroke="#433f49"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span style={{ height: "1px", background: "var(--charcoal)" }} />
            <strong style={{ fontSize: "15px" }}>[DIRECTOR NAME]</strong>
            <span style={{ fontSize: "13px", color: "var(--quiet)" }}>
              Director, European IT Institute
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              width: "220px",
            }}
          >
            <span style={{ height: "32px" }} aria-hidden="true">
              <svg
                width="150"
                height="32"
                viewBox="0 0 150 32"
                aria-hidden="true"
                style={{ display: "block" }}
              >
                <path
                  d="M4 24c10-14 18-18 22-12s-6 14 2 10 12-16 18-14-4 16 4 14 10-10 16-12 6 8 12 6 14-6 22-8 10 2 16 0 14-4 30-6"
                  fill="none"
                  stroke="#433f49"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span style={{ height: "1px", background: "var(--charcoal)" }} />
            <strong style={{ fontSize: "15px" }}>Imran Kabir</strong>
            <span style={{ fontSize: "13px", color: "var(--quiet)" }}>
              Course mentor
            </span>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                textAlign: "right",
              }}
            >
              <span style={{ fontSize: "13px", color: "var(--quiet)" }}>
                Scan or visit to verify
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                europeanit-inst.com/verify
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "var(--violet)",
                }}
              >
                EIT-C-2026-0412
              </span>
            </div>
            <div
              style={{
                width: "104px",
                height: "104px",
                border: "1px solid #dedce2",
                borderRadius: "8px",
                display: "grid",
                placeItems: "center",
                background: "rgb(255, 255, 255)",
                color: "rgb(0, 88, 122)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.08em",
              }}
            >
              <svg
                width="72"
                height="72"
                viewBox="0 0 29 29"
                role="img"
                aria-label="QR code for the verify link"
                shapeRendering="crispEdges"
              >
                <path
                  fill="var(--charcoal)"
                  d="M0 0h7v7H0zM22 0h7v7h-7zM0 22h7v7H0z"
                />
                <path
                  fill="rgb(255, 255, 255)"
                  d="M1 1h5v5H1zM23 1h5v5h-5zM1 23h5v5H1z"
                />
                <path
                  fill="var(--charcoal)"
                  d="M2 2h3v3H2zM24 2h3v3h-3zM2 24h3v3H2zM9 1h2v2H9zM13 0h1v4h-1zM16 2h3v1h-3zM9 5h4v1H9zM15 5h2v2h-2zM19 4h1v3h-1zM8 8h3v2H8zM13 8h2v1h-2zM17 9h4v1h-4zM23 9h2v3h-2zM27 8h2v2h-2zM0 9h2v2H0zM4 10h3v1H4zM10 11h2v3h-2zM14 11h3v2h-3zM19 12h2v2h-2zM25 13h4v1h-4zM1 13h3v2H1zM6 13h2v3H6zM12 15h4v1h-4zM17 15h1v4h-1zM21 15h3v2h-3zM27 16h2v3h-2zM0 17h3v1H0zM8 17h3v2H8zM13 18h3v1h-3zM20 19h4v1h-4zM9 21h2v3H9zM12 22h4v2h-4zM18 21h2v2h-2zM22 22h3v1h-3zM26 21h3v2h-3zM9 26h3v2H9zM14 25h2v4h-2zM18 25h4v1h-4zM23 25h1v3h-1zM26 26h3v3h-3zM18 27h3v2h-3z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
