/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'mgtratorpecas.com.br',
      'www.mgtratorpecas.com.br',
      'images.unsplash.com',
      'res.cloudinary.com',
      'firebasestorage.googleapis.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.gestaoclick.com',
      },
      {
        protocol: 'https',
        hostname: 'upload-arquivos.s3-sa-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'download.logo.wine',
      },
      {
        protocol: 'https',
        hostname: 'brandlogos.net', 
      },
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
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; frame-src 'self' https://www.google.com;",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
