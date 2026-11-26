import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ship shared/*.js with the serverless functions that read them (Vercel).
  outputFileTracingIncludes: {
    "/events.js": ["./shared/**/*"],
    "/calendar-core.js": ["./shared/**/*"],
    "/calendar.ics": ["./shared/**/*"],
  },
  async rewrites() {
    // The three original designs, unchanged, from public/
    return [
      { source: "/", destination: "/index.html" },
      { source: "/v1", destination: "/index-v1.html" },
      { source: "/v2", destination: "/index-v2.html" },
    ];
  },
  async headers() {
    // always re-check the pages so new deployments show immediately
    return ["/", "/v1", "/v2", "/:page(index|index-v1|index-v2).html"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: "no-cache" }],
    }));
  },
};

export default nextConfig;
