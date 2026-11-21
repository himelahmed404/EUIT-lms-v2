"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  RotateCcw,
  Home,
  LifeBuoy,
  WifiOff,
  Copy,
  Check,
  ShieldAlert,
} from "lucide-react";
import { SignOutButton } from "./auth-provider";

interface AccountUnavailableProps {
  error: string;
  onRetry: () => void | Promise<void>;
}

export function AccountUnavailableScreen({
  error,
  onRetry,
}: AccountUnavailableProps) {
  const [retrying, setRetrying] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleRetry() {
    setRetrying(true);
    try {
      await onRetry();
    } finally {
      setTimeout(() => setRetrying(false), 600);
    }
  }

  function handleCopyError() {
    if (!error) return;
    navigator.clipboard?.writeText(error).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="account-unavailable-container">
      {/* Branded Header Masthead */}
      <header className="account-unavailable-header">
        <div className="account-unavailable-header-inner">
          <Link href="/" className="account-unavailable-brand" aria-label="European IT Institute Home">
            <div className="account-unavailable-logo-badge">
              <span className="account-unavailable-logo-text">EU</span>
              <span className="account-unavailable-logo-dot" />
            </div>
            <div className="account-unavailable-brand-titles">
              <span className="account-unavailable-brand-main">European IT</span>
              <span className="account-unavailable-brand-sub">Institute LMS</span>
            </div>
          </Link>
          <div className="account-unavailable-badge">
            <span className="account-unavailable-badge-pulse" />
            <span>Connection Interrupted</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="account-unavailable-card">
        {/* Status Icon */}
        <div className="account-unavailable-icon-wrapper">
          <div className="account-unavailable-icon-glow" />
          <div className="account-unavailable-icon-box">
            <WifiOff size={28} className="account-unavailable-icon" aria-hidden="true" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="account-unavailable-text">
          <div className="account-unavailable-tag">System Notice</div>
          <h1 className="account-unavailable-heading">Account unavailable</h1>
          <p className="account-unavailable-desc">
            We were unable to connect to your learning profile. Your network connection might have dropped, or your account session needs to be refreshed.
          </p>
        </div>

        {/* Diagnostic Alert Box with role="alert" */}
        <div className="account-unavailable-alert-box" role="alert">
          <div className="account-unavailable-alert-header">
            <div className="account-unavailable-alert-label">
              <AlertTriangle size={15} className="account-unavailable-alert-icon" aria-hidden="true" />
              <span>Diagnostic Details</span>
            </div>
            {error && (
              <button
                type="button"
                onClick={handleCopyError}
                className="account-unavailable-copy-btn"
                title="Copy error message"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
          <p className="account-unavailable-alert-msg">{error || "Unable to reach profile service"}</p>
        </div>

        {/* Primary Action Buttons */}
        <div className="account-unavailable-actions">
          <button
            type="button"
            onClick={handleRetry}
            disabled={retrying}
            className="account-unavailable-btn-primary"
            aria-label="Retry connection"
          >
            <RotateCcw
              size={16}
              className={retrying ? "animate-spin" : ""}
              aria-hidden="true"
            />
            <span>{retrying ? "Reconnecting…" : "Retry"}</span>
          </button>

          <SignOutButton className="account-unavailable-btn-secondary" />

          <Link href="/" className="account-unavailable-btn-ghost">
            <Home size={15} aria-hidden="true" />
            <span>Home</span>
          </Link>
        </div>

        {/* Quick Help / Troubleshooting Footer */}
        <div className="account-unavailable-troubleshoot">
          <div className="account-unavailable-troubleshoot-title">
            <ShieldAlert size={14} aria-hidden="true" />
            <span>Troubleshooting recommendations:</span>
          </div>
          <ul className="account-unavailable-troubleshoot-list">
            <li>Check your internet connection or disconnect from corporate VPNs.</li>
            <li>Click <strong>Retry</strong> above or refresh the page in your browser.</li>
            <li>If your session expired, click <strong>Sign out</strong> and log in again.</li>
          </ul>
          <div className="account-unavailable-support-row">
            <span>Need assistance?</span>
            <Link href="/student/help" className="account-unavailable-support-link">
              <LifeBuoy size={14} aria-hidden="true" />
              <span>Visit Student Help Center</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
