import { Metadata } from 'next'
import { LojasPageClient } from '@/components/lojas/LojasPageClient'

export const metadata: Metadata = {
  title: 'Nossas Lojas - Contagem e Betim/MG | Peças para Tratores | MG Trator Peças',
  description: 'Visite nossas lojas físicas em Contagem e Betim/MG. Atendimento presencial especializado, estoque completo de peças para tratores e máquinas pesadas. Horário estendido.',
  keywords: ['loja peças tratores Contagem', 'loja peças Betim MG', 'MG Trator Peças endereço', 'peças máquinas pesadas Contagem', 'horário funcionamento'],
}

export default function LojasPage() {
  return <LojasPageClient />
}