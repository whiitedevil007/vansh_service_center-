/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['framer-motion'],
  output: 'export', // Required for static export
  eslint: {
    ignoreDuringBuilds: true, // Prevent ESLint errors during export
  },
  images: {
    unoptimized: true, // Required when using `output: 'export'`
  },
  trailingSlash: true, // Optional: ensures static routing consistency
};

module.exports = nextConfig;
