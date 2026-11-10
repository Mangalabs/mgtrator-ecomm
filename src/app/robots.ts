import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.mgtratorpecas.com.br'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/carrinho',
        '/busca',
        '/api/',
        '/*?q=*', 
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}