import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Page content modules are large HTML strings ported from the static prototype.
  experimental: {
    largePageDataBytes: 1024 * 1024,
  },
};

export default nextConfig;
