import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "covers.openlibrary.org" },
      { hostname: "*.bbci.co.uk" },
      { hostname: "*.bbc.co.uk" },
      { hostname: "*.redd.it" },
      { hostname: "*.reddit.com" },
    ],
  },
};

export default nextConfig;
