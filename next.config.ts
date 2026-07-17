import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow next/image optimization for Unsplash placeholder pictures
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
