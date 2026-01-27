import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { ComoComprarPageClient } from '@/components/como-comprar/ComoComprarPageClient'

export const metadata: Metadata = {
  title: 'Como Comprar - Passo a Passo para Pedidos Online | MG Trator Peças',
  description: 'Aprenda a comprar peças para tratores online de forma fácil e segura. Veja o passo a passo, formas de pagamento, prazos de entrega e canais de atendimento.',
  keywords: ['como comprar peças tratores online', 'passo a passo compra e-commerce', 'formas de pagamento peças', 'prazo de entrega tratores', 'comprar peças seguro'],
}

export default function ComoComprarPage() {
  return (
    <>
      <ComoComprarPageClient />
    </>
  )
}
