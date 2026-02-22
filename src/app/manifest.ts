import { siteConfig } from '@/data/site'
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MG Tratorpeças',
    short_name: 'MG',
    description: 'Empresa especializada em peças para máquinas pesadas.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F5F5',
    theme_color: '#213A77',
    icons: [
      {
        src: siteConfig.images.logo,
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}