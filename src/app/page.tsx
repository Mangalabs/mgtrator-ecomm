import { Metadata } from 'next'
import { HomePageClient } from '@/components/home/HomePageClient'
import { getFeaturedProducts, getProducts } from '@/services/api'

export const revalidate = 60

export const metadata: Metadata = {
  title:
    'MG Trator Peças - Distribuidora de Peças para Tratores e Máquinas Pesadas | Caterpillar, Volvo, Case, JCB',
  description:
    'Distribuidora especializada em peças originais para tratores e máquinas pesadas. Estoque completo Caterpillar, Volvo, Case, JCB. Atendimento em MG. Peças com garantia e pronta entrega.',
  keywords: [
    'peças para tratores',
    'peças caterpillar',
    'peças volvo',
    'peças case',
    'peças jcb',
    'distribuidora peças MG',
    'peças máquinas pesadas',
    'filtros tratores',
    'sistema hidráulico',
  ],
}

export default async function HomePage() {
  const featuredLimit = 6
  const newLimit = 8
  const [featuredResponse, productsResponse] = await Promise.all([
    getFeaturedProducts(featuredLimit),
    getProducts({ inStock: true }, { page: 1, limit: newLimit }),
  ])
  const fallbackNewProducts = featuredResponse.data?.slice(0, newLimit) || []
  const newProducts = productsResponse.data?.data?.length
    ? productsResponse.data.data
    : fallbackNewProducts

  return (
    <HomePageClient
      featuredProducts={featuredResponse.data || []}
      newProducts={newProducts}
    />
  )
}
