import { MetadataRoute } from 'next'
import { catalogLines } from '@/data/catalog'
import { storesData } from '@/data/stores'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mgtratorpecas.com.br'

  return [
    '',
    '/catalogo',
    ...catalogLines.map((line) => `/catalogo/${line.id}`),
    '/lojas',
    ...storesData.map((store) => `/lojas/${store.slug}`),
    '/contato',
    '/politicas',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
