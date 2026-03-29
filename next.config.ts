import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// Use GitHub Pages basePath only when explicitly building for GitHub Pages
// For custom domains or other deployments, use empty basePath (root)
const basePath = isProd && process.env.DEPLOY_TARGET === "github-pages" ? "/suriya" : "";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
