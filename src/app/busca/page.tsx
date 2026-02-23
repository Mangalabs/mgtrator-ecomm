import { Suspense } from 'react'
import { Metadata } from 'next'
import { SearchResultsClient } from '@/components/busca/SearchResultsClient'

export const metadata: Metadata = {
  title: 'Busca de Produtos - MG Tratorpeças',
  description:
    'Resultados da busca por peças para máquinas pesadas. Encontre filtros, sistemas hidráulicos, peças elétricas e mais.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Busca de Produtos - MG Tratorpeças',
    description: 'Resultados da busca por peças para máquinas pesadas. Encontre filtros, sistemas hidráulicos, peças elétricas e mais.',
    url: 'https://mgtratorpecas.com.br/busca',
    siteName: 'MG Tratorpeças',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function BuscaPage() {
  return (
    <Suspense fallback={<div className='p-8 text-center'>Carregando...</div>}>
      <SearchResultsClient />
    </Suspense>
  )
}