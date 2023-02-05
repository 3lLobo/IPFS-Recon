/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/localhost:5001/:path*',
  //       destination: 'http://0.0.0.0:5001/:path*', // Proxy to the Hive
  //     },
  //   ]
  // },
}

module.exports = nextConfig
