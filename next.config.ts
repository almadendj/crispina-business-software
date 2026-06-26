import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

// Workbox-based service worker (via Serwist) that precaches the app shell so the
// POS loads with no network — a hard requirement for a beach-resort device on
// slow/spotty internet (see docs/architecture.md). Disabled in dev so service
// worker caching never gets in the way while developing.
const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withSerwist(nextConfig);
