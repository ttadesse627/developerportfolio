import type { NextConfig } from "next";
import NextBundleAnalyzer from "@next/bundle-analyzer";


const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
});


const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: true
};

export default withBundleAnalyzer(nextConfig);


