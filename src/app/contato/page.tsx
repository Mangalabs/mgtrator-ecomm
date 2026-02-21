import { Metadata } from 'next'
import { ContatoPageClient } from '@/components/contato/ContatoPageClient'

export const metadata: Metadata = {
  title: 'Contato - Fale Conosco | MG Trator Peças',
  description: 'Entre em contato com a MG Trator Peças. Atendimento via WhatsApp, telefone e e-mail. Tire suas dúvidas sobre peças para tratores e máquinas pesadas.',
  keywords: ['contato MG Trator', 'telefone peças tratores', 'WhatsApp MG Trator', 'fale conosco'],
}

export default function ContatoPage() {
  return <ContatoPageClient />
}