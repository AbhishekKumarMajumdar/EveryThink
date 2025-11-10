import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true
  },
  transpilePackages: ["@ecommerce/ui", "@ecommerce/utils"]
};

export default nextConfig;
