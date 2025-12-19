import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbs2.redgifs.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbs3.redgifs.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbs4.redgifs.com',
      },
      {
        protocol: 'https',
        hostname: '*.redgifs.com',
      },
    ],
  },
};

export default nextConfig;
