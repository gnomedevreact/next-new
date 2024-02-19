/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://nest-new.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
