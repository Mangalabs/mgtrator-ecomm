import { Metadata } from 'next'
import { HomePageClient } from '@/components/home/HomePageClient'

export const metadata: Metadata = {
  title: 'MG Trator Peças - Distribuidora de Peças para Tratores e Máquinas Pesadas | Caterpillar, Volvo, Case, JCB',
  description: 'Distribuidora especializada em peças originais para tratores e máquinas pesadas. Estoque completo Caterpillar, Volvo, Case, JCB. Atendimento em MG. Peças com garantia e pronta entrega.',
  keywords: ['peças para tratores', 'peças caterpillar', 'peças volvo', 'peças case', 'peças jcb', 'distribuidora peças MG', 'peças máquinas pesadas', 'filtros tratores', 'sistema hidráulico'],
}

export default function HomePage() {
  return <HomePageClient />
}
