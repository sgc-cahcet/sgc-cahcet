import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dbqjkjl0c/image/upload/**", // Match images in your Cloudinary folder
      },
    ],
  },
};

export default nextConfig;