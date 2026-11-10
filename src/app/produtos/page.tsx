import { Metadata } from 'next'
import { ProductsPageClient } from '@/components/products/ProductsPageClient'
import { getProducts } from '@/services/api'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Catálogo de Peças para Máquinas Pesadas | MG Tratorpeças',
  description:
    'Encontre peças para máquinas pesadas da linha amarela. Entrega rápida, garantia e amplo estoque para escavadeiras e carregadeiras.',
  keywords: [
    'peças para máquinas pesadas',
    'catálogo peças linha amarela',
    'peças escavadeiras',
    'peças carregadeiras',
    'filtros máquinas pesadas',
    'sistema hidráulico',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Catálogo de Peças para Máquinas Pesadas | MG Tratorpeças',
    description:
      'Encontre peças para máquinas pesadas da linha amarela. Entrega rápida, garantia e amplo estoque.',
    url: 'https://www.mgtratorpecas.com.br/produtos',
    siteName: 'MG Tratorpeças',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://www.mgtratorpecas.com.br/logo-azul.png',
        width: 1200,
        height: 630,
        alt: 'Catálogo de Peças - MG Tratorpeças',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.mgtratorpecas.com.br/produtos',
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