import { Metadata } from 'next'
import { HomePageClient } from '@/components/home/HomePageClient'
import { getFeaturedProducts, getProducts } from '@/services/api'
import type { Product } from '@/data/types'

export const revalidate = 60

export const metadata: Metadata = {
  title:
    'MG Tratorpeças - Peças para Máquinas Pesadas | Escavadeiras, Tratores e Equipamentos Pesados',
  description:
    'Revendedora especializada em peças para máquinas pesadas da linha amarela. Peças originais e alternativas para escavadeiras, carregadeiras, tratores e equipamentos pesados. Faça sua cotação no WhatsApp.',
  keywords: [
    'peças',
    'peças máquinas pesadas',
    'peças linha amarela',
    'peças para máquinas pesadas',
    'peças para escavadeiras',
    'peças para tratores',
    'peças para carregadeiras',
    'peças equipamentos pesados',
    'peças originais',
    'peças alternativas',
    'peças sistema hidráulico',
    'filtros máquinas pesadas',
    'cotação de peças',
    'peças pronta entrega',
    'peças para caminhões',
  ],
}

const prioritizeImages = (products: Product[], limit: number) => {
  const withImages = products.filter((p) => p.thumbnail)
  const withoutImages = products.filter((p) => !p.thumbnail)
  return [...withImages, ...withoutImages].slice(0, limit)
}

export default async function HomePage() {
  const fetchLimit = 40
  const displayLimit = 8

  const [featuredResponse, productsResponse] = await Promise.all([
    getFeaturedProducts(fetchLimit),
    getProducts({}, { page: 1, limit: fetchLimit }),
  ])

  const rawFeatured = featuredResponse.data || []
  const featuredProducts = prioritizeImages(rawFeatured, displayLimit)

  const rawNew = productsResponse.data?.data || []
  const newProducts = prioritizeImages(
    rawNew.length ? rawNew : rawFeatured,
    displayLimit,
  )

  return (
    <HomePageClient
      featuredProducts={featuredProducts}
      newProducts={newProducts}
    />
  )
}