import { BookOpen } from "lucide-react";

export function PortalLoadingSkeleton() {
  return (
    <div
      className="portal-skeleton-shell"
      role="status"
      aria-busy="true"
      aria-label="Loading your account…"
    >
      <span className="sr-only">Loading your account…</span>

      {/* Masthead Skeleton matching Student / Staff masthead */}
      <header className="skeleton-masthead">
        <div className="skeleton-brand-area">
          <div className="skeleton skeleton-brand-icon">
            <BookOpen size={20} strokeWidth={1.8} style={{ opacity: 0.35 }} />
          </div>
          <div className="skeleton skeleton-brand-text" />
        </div>

        <nav className="skeleton-nav" aria-hidden="true">
          <div className="skeleton skeleton-nav-pill" style={{ width: 95 }} />
          <div className="skeleton skeleton-nav-pill" style={{ width: 85 }} />
          <div className="skeleton skeleton-nav-pill" style={{ width: 80 }} />
          <div className="skeleton skeleton-nav-pill" style={{ width: 70 }} />
        </nav>

        <div className="skeleton-tools" aria-hidden="true">
          <div className="skeleton skeleton-circle-tool" />
          <div className="skeleton skeleton-circle-tool" />
          <div className="skeleton skeleton-avatar-tool" />
        </div>
      </header>

      {/* Main Content Skeleton Canvas */}
      <main className="skeleton-main">
        {/* Hero Banner Skeleton */}
        <div className="skeleton-hero">
          <div className="skeleton-hero-left">
            <div
              className="skeleton skeleton-badge"
              style={{ width: 140, height: 22, borderRadius: 999 }}
            />
            <div
              className="skeleton skeleton-title"
              style={{ width: "min(360px, 80%)", height: 32, marginTop: 14 }}
            />
            <div
              className="skeleton skeleton-text"
              style={{ width: "min(520px, 95%)", height: 16, marginTop: 10 }}
            />
          </div>
          <div className="skeleton-hero-actions">
            <div
              className="skeleton skeleton-btn"
              style={{ width: 140, height: 42, borderRadius: 10 }}
            />
          </div>
        </div>

        {/* Metric / Stat Cards Grid */}
        <div className="skeleton-metrics-grid">
          {[1, 2, 3].map((card) => (
            <div key={card} className="skeleton-metric-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  className="skeleton skeleton-text"
                  style={{ width: 100, height: 14 }}
                />
                <div
                  className="skeleton skeleton-circle-tool"
                  style={{ width: 34, height: 34 }}
                />
              </div>
              <div
                className="skeleton skeleton-title"
                style={{ width: 120, height: 28, marginTop: 16 }}
              />
              <div
                className="skeleton skeleton-bar"
                style={{ width: "100%", height: 6, marginTop: 14, borderRadius: 999 }}
              />
            </div>
          ))}
        </div>

        {/* Two-Column Content Grid */}
        <div className="skeleton-content-grid">
          {/* Main Course Progress Area */}
          <section className="skeleton-content-card skeleton-content-card--main">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div
                className="skeleton skeleton-title"
                style={{ width: 200, height: 22 }}
              />
              <div
                className="skeleton skeleton-badge"
                style={{ width: 85, height: 24, borderRadius: 999 }}
              />
            </div>

            {[1, 2].map((item) => (
              <div key={item} className="skeleton-course-row">
                <div className="skeleton skeleton-thumbnail" />
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div
                    className="skeleton skeleton-title"
                    style={{ width: "65%", height: 18 }}
                  />
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "90%", height: 14 }}
                  />
                  <div
                    className="skeleton skeleton-bar"
                    style={{ width: "45%", height: 6, borderRadius: 999 }}
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Right Sidebar Area */}
          <aside className="skeleton-content-card skeleton-content-card--side">
            <div
              className="skeleton skeleton-title"
              style={{ width: 150, height: 22, marginBottom: 20 }}
            />
            {[1, 2, 3].map((notice) => (
              <div key={notice} className="skeleton-notice-row">
                <div
                  className="skeleton skeleton-circle-tool"
                  style={{ width: 38, height: 38, flexShrink: 0 }}
                />
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "88%", height: 14 }}
                  />
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "55%", height: 12 }}
                  />
                </div>
              </div>
            ))}
          </aside>
        </div>
      </main>

      {/* Floating Status Indicator */}
      <div className="skeleton-status-pill">
        <span className="skeleton-status-dot" aria-hidden="true" />
        <span>Loading your account…</span>
      </div>
    </div>
  );
}
