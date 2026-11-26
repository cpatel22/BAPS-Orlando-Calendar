import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ship shared/*.js with the calendar.ics serverless function (Vercel).
  outputFileTracingIncludes: {
    "/calendar.ics": ["./shared/**/*"],
  },
  async rewrites() {
    // beforeFiles: run before App Router 404 so / and /v1|/v2 hit public HTML.
    return {
      beforeFiles: [
        { source: "/", destination: "/index.html" },
        { source: "/v1", destination: "/index-v1.html" },
        { source: "/v2", destination: "/index-v2.html" },
      ],
    };
  },
  async headers() {
    // always re-check the pages / shared scripts so new deployments show immediately
    return [
      "/",
      "/v1",
      "/v2",
      "/:page(index|index-v1|index-v2).html",
      "/events.js",
      "/calendar-core.js",
    ].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: "no-cache" }],
    }));
  },
};

export default nextConfig;
