"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Home,
  GraduationCap,
  BookOpen,
  LifeBuoy,
} from "lucide-react";

interface NotFoundViewProps {
  portal?: "student" | "general" | "mentor" | "admin";
}

export function NotFoundView({ portal = "general" }: NotFoundViewProps) {
  const isStudent = portal === "student";

  return (
    <div className="error-page-container">
      {/* Top Masthead */}
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
                {isStudent ? "Student Portal" : "Institute LMS"}
              </span>
            </div>
          </Link>

          <nav className="error-page-nav-links" aria-label="Quick navigation">
            <Link href="/" className="error-page-nav-link">Home</Link>
            <Link href="/enroll/course" className="error-page-nav-link">Courses</Link>
            <Link href="/student/dashboard" className="error-page-nav-link">Student Portal</Link>
            <Link href="/student/help" className="error-page-nav-cta">
              <LifeBuoy size={14} aria-hidden="true" />
              <span>Help Center</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main 404 Visual Content */}
      <main className="error-page-main">
        <div className="error-page-card">
          {/* Big Number & Floating Badge */}
          <div className="error-page-code-wrap">
            <span className="error-page-code-number">404</span>
            <div className="error-page-icon-badge">
              <Compass size={22} aria-hidden="true" />
            </div>
          </div>

          {/* Pill Badge */}
          <div className="error-page-badge-pill">
            <span className="error-page-badge-dot is-warning" />
            <span>Resource Not Found</span>
          </div>

          <h1 className="error-page-title">Page not found</h1>
          <p className="error-page-description">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let&apos;s get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="error-page-actions">
            <Link href="/" className="error-page-btn-primary">
              <Home size={16} aria-hidden="true" />
              <span>Return to Homepage</span>
            </Link>

            <Link href="/student/dashboard" className="error-page-btn-secondary">
              <GraduationCap size={16} aria-hidden="true" />
              <span>Student Dashboard</span>
            </Link>

            <Link href="/enroll/course" className="error-page-btn-ghost">
              <BookOpen size={15} aria-hidden="true" />
              <span>Browse Courses</span>
            </Link>
          </div>

          {/* Bento Quick Navigation */}
          <div className="error-page-bento">
            <div className="error-page-bento-label">Popular Destinations</div>
            <div className="error-page-bento-grid">
              <Link href="/enroll/course" className="error-page-bento-item">
                <div className="error-page-bento-icon">
                  <BookOpen size={16} />
                </div>
                <span className="error-page-bento-title">Course Catalog</span>
                <span className="error-page-bento-desc">View full curriculum, live batch schedules, and fees.</span>
              </Link>

              <Link href="/student/dashboard" className="error-page-bento-item">
                <div className="error-page-bento-icon">
                  <GraduationCap size={16} />
                </div>
                <span className="error-page-bento-title">Student Portal</span>
                <span className="error-page-bento-desc">Access enrolled classes, recorded lessons, and assignments.</span>
              </Link>

              <Link href="/student/help" className="error-page-bento-item">
                <div className="error-page-bento-icon">
                  <LifeBuoy size={16} />
                </div>
                <span className="error-page-bento-title">Help & FAQs</span>
                <span className="error-page-bento-desc">Get assistance with credentials, class links, or payments.</span>
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
