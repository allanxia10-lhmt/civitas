import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The project doesn't ship an ESLint config; type safety comes from `npm run typecheck`.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
