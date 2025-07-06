import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['assets2.drugcarts.com', 'assets1.drugcarts.com', 'assets3.drugcarts.com','drugcarts-nextjs.s3.ap-south-1.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // this is your frontend URL
        destination: "https://main.diinz06zqqfgz.amplifyapp.com/api/:path*", // this is the real API URL
      },
    ];
  },
};

export default nextConfig;
