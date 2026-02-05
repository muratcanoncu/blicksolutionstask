import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
    return [
      {
        source: "/items/:path*",
        destination: "http://localhost:8000/items/:path*",
      },
    ];
  },
};

export default nextConfig;