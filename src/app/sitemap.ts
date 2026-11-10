import { MetadataRoute } from 'next'
import { getProducts } from '@/services/api'
import { catalogLines } from '@/data/catalog'
import { storesData } from '@/data/stores'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mgtratorpecas.com.br'

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/catalogo',
    ...catalogLines.map((line) => `/catalogo/${line.id}`),
    '/lojas',
    ...storesData.map((store) => `/lojas/${store.slug}`),
    '/contato',
    '/como-comprar',
    '/politicas',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))

  try {
    const productsResponse = await getProducts({}, { page: 1, limit: 1000 })
    const products = productsResponse.data?.data || []

    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${baseUrl}/produtos/${product.id}`,
      lastModified:
        product.updatedAt instanceof Date ? product.updatedAt : new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }))

    return [...staticRoutes, ...productRoutes]
  } catch (error) {
    return staticRoutes
  }
}
