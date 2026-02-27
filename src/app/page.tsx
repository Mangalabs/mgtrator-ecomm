import { Metadata } from 'next'
import { HomePageClient } from '@/components/home/HomePageClient'
import { getFeaturedProducts, getProducts } from '@/services/api'
import type { Product } from '@/data/types'

export const revalidate = 60

export const metadata: Metadata = {
  title:
    'MG Tratorpeças - Peças para Máquinas Pesadas | Escavadeiras, maquinas pesadas e Equipamentos Pesados',
  description:
    'Revendedora especializada em peças para máquinas pesadas da linha amarela. Peças originais e alternativas para escavadeiras, carregadeiras, maquinas pesadas e equipamentos pesados. Faça sua cotação.',
  keywords: [
    'peças',
    'peças máquinas pesadas',
    'peças linha amarela',
    'peças para máquinas pesadas',
    'peças para escavadeiras',
    'peças para maquinas pesadas',
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
  openGraph: {
    title:
      'MG Tratorpeças - Peças para Máquinas Pesadas | Escavadeiras, maquinas pesadas e Equipamentos Pesados',
    description:
      'Revendedora especializada em peças para máquinas pesadas da linha amarela. Peças originais e alternativas para escavadeiras, carregadeiras, maquinas pesadas e equipamentos pesados. Faça sua cotação.',
    url: 'https://www.mgtratorpecas.com.br',
    siteName: 'MG Tratorpeças',
    locale: 'pt_BR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.mgtratorpecas.com.br',
  },
}

const prioritizeImages = (products: Product[], limit: number) => {
  const withImages: Product[] = []
  const withoutImages: Product[] = []

  for (const p of products) {
    if (p.thumbnail) {
      withImages.push(p)
    } else {
      withoutImages.push(p)
    }
  }

  const result: Product[] = []
  for (let i = 0; i < limit; i++) {
    if (i < withImages.length) {
      result.push(withImages[i])
    } else if (i - withImages.length < withoutImages.length) {
      result.push(withoutImages[i - withImages.length])
    } else {
      break
    }
  }

  return result
}

export default async function HomePage() {
  const fetchLimit = 40
  const displayLimit = 10

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
