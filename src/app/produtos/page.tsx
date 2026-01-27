import { Metadata } from 'next'
import { ProductsPageClient } from '@/components/products/ProductsPageClient'

export const metadata: Metadata = {
  title: 'Catálogo de Peças para Tratores e Máquinas Pesadas | MG Trator Peças',
  description: 'Encontre peças genuínas e compatíveis para tratores e máquinas pesadas das marcas Caterpillar, Volvo, Case, JCB, John Deere e Komatsu. Entrega rápida e garantia. Mais de 1.500 peças em estoque.',
  keywords: ['peças para tratores', 'peças para máquinas pesadas', 'peças Caterpillar', 'peças Volvo', 'peças Case', 'peças JCB', 'filtros', 'sistema hidráulico'],
}

export default function ProdutosPage() {
  return <ProductsPageClient />
}