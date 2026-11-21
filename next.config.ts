import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  basePath: "/lotos2",
  images: { unoptimized: true },
};

export default nextConfig;
