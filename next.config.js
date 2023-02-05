/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/virustotal/:path*',
        has: [
          {
            type: 'header',
            key: 'x-apikey',
            value: process.env.VT_APIKEY,
          },
        ],
        destination: 'https://www.virustotal.com/:path*', // Proxy to the Hive
      },
    ]
  },
}

module.exports = nextConfig
