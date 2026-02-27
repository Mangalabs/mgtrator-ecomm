import { Metadata } from 'next'
import { LojasPageClient } from '@/components/lojas/LojasPageClient'

export const metadata: Metadata = {
  title: 'Nossa Loja - São Luis - MA | Peças para maquinas pesadas | MG Tratorpeças',
  description: 'Visite nossas lojas físicas em São Luis - MA. Atendimento presencial especializado, estoque completo de peças para maquinas pesadas e máquinas pesadas.',
  keywords: ['loja peças maquinas pesadas São Luis', 'loja peças Betim MG', 'MG Tratorpeças endereço', 'peças máquinas pesadas', 'horário funcionamento'],
  openGraph: {
    title: 'Nossas Lojas - São Luis - MA | Peças para maquinas pesadas | MG Tratorpeças',
    description: 'Visite nossas lojas físicas em São Luis - MA. Atendimento presencial especializado, estoque completo de peças para máquinas pesadas. Horário estendido.',
    url: 'https://www.mgtratorpecas.com.br/lojas',
    siteName: 'MG Tratorpeças',
    locale: 'pt_BR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.mgtratorpecas.com.br/lojas',
  },
}

export default function LojasPage() {
  return <LojasPageClient />
}