import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    turbopack: {
    root: path.join(__dirname),
    },
    async rewrites() {
    return [
      {
        source: "/items/:path*",
        destination: "http://localhost:8000/items/:path*",
      },
      
    ];
  },
  devIndicators: false
};

export default nextConfig;