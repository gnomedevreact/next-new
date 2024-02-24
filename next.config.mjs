/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  env: {
    APP_URL: process.env.APP_HOST,
    BACK_URL: process.env.BACK_HOST,
    SOCKET_URL: process.env.SOCKET_HOST,
  },
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
