/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // async headers() {
  //   return [
  //     {
  //       source: '/vt/hashReport/:path*',
  //       headers: [
  //         {
  //           key: 'access-control-allow-origin',
  //           value: '*',
  //         },
  //       ],
  //     },
  //   ]
  // },
  async rewrites() {
    return [
      {
        source: '/virustotal/:path*',
        has: [
          {
            type: 'header',
            key: 'x-apikey',
          },
          //   {
          //     type: 'header',
          //     key: 'cookie',
          //     value: '',
          //   },
          //   {
          //     type: 'host',
          //     value: ['localhost:3000', 'ipfs-recon.vercel.app'],
          //   }
        ],
        destination: 'https://www.virustotal.com/:path*', // Proxy to VT
        // missing: [
        //   {
        //     type: 'header',
        //     key: 'access-control-allow-origin',
        //     value: '*',
        //   },
        // ],
      },
    ]
  },
}

module.exports = nextConfig
