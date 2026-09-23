/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@jothi-matrimony/shared'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'mjcbbjwttlteiqnntuet.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'ukno.in',
      },
      {
        protocol: 'https',
        hostname: 'vkno.in',
      },
    ],
  },
};

export default nextConfig;
