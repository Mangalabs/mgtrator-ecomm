import { Metadata } from 'next'
import { ProductsPageClient } from '@/components/products/ProductsPageClient'
import { getProducts } from '@/services/api'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Catálogo de Peças para maquinas pesadas e Máquinas Pesadas | MG Tratorpeças',
  description:
    'Encontre peças genuínas e compatíveis para maquinas pesadas e máquinas pesadas das marcas Caterpillar, Volvo, Case, JCB, John Deere e Komatsu. Entrega rápida e garantia. Mais de 1.500 peças em estoque.',
  keywords: [
    'peças para maquinas pesadas',
    'peças para máquinas pesadas',
    'peças Caterpillar',
    'peças Volvo',
    'peças Case',
    'peças JCB',
    'filtros',
    'sistema hidráulico',
  ],
  openGraph: {
    title: 'Catálogo de Peças para Máquinas Pesadas | MG Tratorpeças',
    description:
      'Encontre peças genuínas e compatíveis para maquinas pesadas e máquinas pesadas das marcas Caterpillar, Volvo, Case, JCB, John Deere e Komatsu. Entrega rápida e garantia. Mais de 1.500 peças em estoque.',
    url: 'https://mgtratorpecas.com.br/produtos',
    siteName: 'MG Tratorpeças',
    locale: 'pt_BR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mgtratorpecas.com.br/produtos',
  },
}

export default async function ProdutosPage() {
  const productsResponse = await getProducts(
    { inStock: true },
    { page: 1, limit: 10 },
  )

  return (
    <ProductsPageClient
      initialProducts={productsResponse.data?.data || []}
      initialPagination={productsResponse.data?.pagination}
    />
  )
}
