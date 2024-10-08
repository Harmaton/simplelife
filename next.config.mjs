/** @type {import('next').NextConfig} */
 // Start of Selection
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'static.hotmart.com'
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      }
    ],
  },
};

export default nextConfig;
