import type { NextConfig } from "next";

import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  return {
    distDir:
      process.env.EUIT_TEST_DIST_DIR ||
      (process.env.VERCEL ? ".next" : phase === PHASE_DEVELOPMENT_SERVER ? ".next" : ".next-production"),
    reactStrictMode: true,
    async redirects() {
      return [
        {
          source: "/student",
          destination: "/student/dashboard",
          permanent: false,
        },
        {
          source: "/student/:page.html",
          destination: "/student/:page",
          permanent: true,
        },
        {
          source: "/login.html",
          destination: "/student/login",
          permanent: true,
        },
        {
          source: "/forgot-password.html",
          destination: "/student/forgot-password",
          permanent: true,
        },
        {
          source: "/auth/action",
          destination: "/student/verify-email",
          permanent: false,
        },
        {
          source: "/__/auth/action",
          destination: "/student/verify-email",
          permanent: false,
        },
      ];
    },
    // Page content modules are large HTML strings ported from the static prototype.
    experimental: {
      largePageDataBytes: 1024 * 1024,
    },
  };
}
