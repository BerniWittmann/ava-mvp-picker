import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ava-mvp-picker",
  images: { unoptimized: true },
};

export default nextConfig;
