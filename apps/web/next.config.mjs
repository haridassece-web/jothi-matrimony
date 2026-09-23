/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@jothi-matrimony/shared'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
