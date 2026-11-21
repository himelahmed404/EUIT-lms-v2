"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertOctagon,
  RotateCcw,
  Home,
  LifeBuoy,
  FileCode,
  Copy,
  Check,
  GraduationCap,
} from "lucide-react";

interface AppErrorViewProps {
  error: Error & { digest?: string };
  reset: () => void;
  portal?: "student" | "general" | "mentor" | "admin";
}

export function AppErrorView({ error, reset, portal = "general" }: AppErrorViewProps) {
  const [copied, setCopied] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  function handleReset() {
    setIsResetting(true);
    try {
      reset();
    } finally {
      setTimeout(() => setIsResetting(false), 800);
    }
  }

  function handleCopyDetails() {
    const details = `Error: ${error.message}\nDigest: ${error.digest || "N/A"}\nURL: ${typeof window !== "undefined" ? window.location.href : ""}`;
    navigator.clipboard?.writeText(details).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="error-page-container">
      {/* Masthead */}
      <header className="error-page-masthead">
        <div className="error-page-masthead-inner">
          <Link href="/" className="error-page-brand" aria-label="European IT Institute Home">
            <div className="error-page-brand-badge">
              <span className="error-page-brand-text">EU</span>
              <span className="error-page-brand-dot" />
            </div>
            <div className="error-page-brand-info">
              <span className="error-page-brand-title">European IT</span>
              <span className="error-page-brand-subtitle">
                {portal === "student" ? "Student Portal" : "System Status"}
              </span>
            </div>
          </Link>

          <nav className="error-page-nav-links" aria-label="Quick navigation">
            <Link href="/" className="error-page-nav-link">Home</Link>
            <Link href="/student/dashboard" className="error-page-nav-link">Student Portal</Link>
            <Link href="/student/help" className="error-page-nav-cta">
              <LifeBuoy size={14} aria-hidden="true" />
              <span>Support</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Error Content */}
      <main className="error-page-main">
        <div className="error-page-card">
          {/* Big Number Code & Error Icon */}
          <div className="error-page-code-wrap">
            <span className="error-page-code-number">500</span>
            <div className="error-page-icon-badge" style={{ background: "#ef4444", color: "#ffffff" }}>
              <AlertOctagon size={22} aria-hidden="true" />
            </div>
          </div>

          {/* Pill Badge */}
          <div className="error-page-badge-pill">
            <span className="error-page-badge-dot" />
            <span>Application Exception</span>
          </div>

          <h1 className="error-page-title">Something went wrong</h1>
          <p className="error-page-description">
            An unexpected error occurred while rendering this view. You can attempt to reload the component or return to the homepage.
          </p>

          {/* Diagnostic Error Box */}
          <div className="account-unavailable-alert-box" role="alert">
            <div className="account-unavailable-alert-header">
              <div className="account-unavailable-alert-label">
                <FileCode size={14} className="account-unavailable-alert-icon" aria-hidden="true" />
                <span>Error Diagnostic</span>
              </div>
              <button
                type="button"
                onClick={handleCopyDetails}
                className="account-unavailable-copy-btn"
                title="Copy error details"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy details</span>
                  </>
                )}
              </button>
            </div>
            <p className="account-unavailable-alert-msg">
              {error.message || "An unexpected error occurred without an error message"}
            </p>
            {error.digest && (
              <p style={{ margin: "6px 0 0", fontSize: "11px", color: "#991b1b", fontFamily: "monospace" }}>
                Digest: {error.digest}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="error-page-actions">
            <button
              type="button"
              onClick={handleReset}
              disabled={isResetting}
              className="error-page-btn-primary"
            >
              <RotateCcw
                size={16}
                className={isResetting ? "animate-spin" : ""}
                aria-hidden="true"
              />
              <span>{isResetting ? "Retrying…" : "Try again"}</span>
            </button>

            <Link href="/" className="error-page-btn-secondary">
              <Home size={16} aria-hidden="true" />
              <span>Return to Home</span>
            </Link>

            <Link href="/student/dashboard" className="error-page-btn-ghost">
              <GraduationCap size={15} aria-hidden="true" />
              <span>Portal Dashboard</span>
            </Link>
          </div>

          {/* Bento Quick Navigation */}
          <div className="error-page-bento">
            <div className="error-page-bento-label">Need Assistance?</div>
            <div className="error-page-bento-grid">
              <Link href="/student/help" className="error-page-bento-item">
                <div className="error-page-bento-icon">
                  <LifeBuoy size={16} />
                </div>
                <span className="error-page-bento-title">Student Help Center</span>
                <span className="error-page-bento-desc">Common issues, technical support, and ticket submission.</span>
              </Link>

              <Link href="/enroll/course" className="error-page-bento-item">
                <div className="error-page-bento-icon">
                  <Home size={16} />
                </div>
                <span className="error-page-bento-title">Course Catalog</span>
                <span className="error-page-bento-desc">Browse our programs, curriculum, and upcoming batches.</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="error-page-footer">
        <p>© {new Date().getFullYear()} European IT Institute. All rights reserved.</p>
      </footer>
    </div>
  );
}
