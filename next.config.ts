import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'authclass-prod.oss-cn-hongkong.aliyuncs.com',
      },
      {
        protocol: 'https',
        hostname: 'authclass-dev.oss-cn-hongkong.aliyuncs.com',
      },
    ],
  },
};

export default nextConfig;
