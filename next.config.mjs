/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mui/x-charts'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "erp-shop-public.s3.ap-northeast-1.amazonaws.com",
        port: "",
        pathname: "*/**",
      },
    ],
  },
};

export default nextConfig;
