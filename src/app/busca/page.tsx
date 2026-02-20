import { Suspense } from 'react'
import { Metadata } from 'next'
import { SearchResultsClient } from '@/components/busca/SearchResultsClient'

export const metadata: Metadata = {
  title: 'Busca de Produtos - MG Trator Peças',
  description:
    'Resultados da busca por peças para tratores e máquinas pesadas. Encontre filtros, sistemas hidráulicos, peças elétricas e mais.',
  robots: 'noindex, follow',
}

export default function BuscaPage() {
  return (
    <Suspense fallback={<div className='p-8 text-center'>Carregando...</div>}>
      <SearchResultsClient />
    </Suspense>
  )
}
