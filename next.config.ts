/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'mgtratorpecas.com.br',
      'images.unsplash.com',
      'res.cloudinary.com',
      'firebasestorage.googleapis.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },

  experimental: {
    optimizeCss: true,
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
