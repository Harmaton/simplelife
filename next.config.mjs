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
      }
    ],
  },
};

export default nextConfig;
