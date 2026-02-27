import { Metadata } from 'next'
import { ComoComprarPageClient } from '@/components/como-comprar/ComoComprarPageClient'

export const metadata: Metadata = {
  title: 'Como Comprar - Passo a Passo para Pedidos Online | MG Tratorpeças',
  description: 'Aprenda a comprar peças da linha amarela online de forma fácil e segura. Veja o passo a passo, formas de pagamento, prazos de entrega e canais de atendimento.',
  keywords: ['como comprar peças de maquinas pesadas online', 'passo a passo compra e-commerce', 'formas de pagamento peças', 'prazo de entrega maquinas pesadas', 'comprar peças seguro'],
  openGraph: {
    title: 'Como Comprar - Passo a Passo para Pedidos Online | MG Tratorpeças',
    description: 'Aprenda a comprar peças para maquinas pesadas online de forma fácil e segura. Veja o passo a passo, formas de pagamento, prazos de entrega e canais de atendimento.',
    url: 'https://www.mgtratorpecas.com.br/como-comprar',
    siteName: 'MG Tratorpeças',
    locale: 'pt_BR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.mgtratorpecas.com.br/como-comprar',
  },
}

export default function ComoComprarPage() {
  return (
    <>
      <ComoComprarPageClient />
    </>
  )
}