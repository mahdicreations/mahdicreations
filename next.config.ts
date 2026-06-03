import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // إعداد الـ webpack لتمرير الـ WebSockets وتفادي حصر الـ HMR
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.config = config.config || {};
    }
    return config;
  },
};

export default nextConfig;