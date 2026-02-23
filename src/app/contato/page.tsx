import { Metadata } from 'next'
import { ContatoPageClient } from '@/components/contato/ContatoPageClient'

export const metadata: Metadata = {
  title: 'Contato - Fale Conosco | MG Tratorpeças',
  description: 'Entre em contato com a MG Tratorpeças. Atendimento via WhatsApp, telefone e e-mail. Tire suas dúvidas sobre peças para máquinas pesadas.',
  keywords: ['contato MG Trator', 'telefone peças maquinas pesadas', 'WhatsApp MG Trator', 'fale conosco'],
  openGraph: {
    title: 'Contato - Fale Conosco | MG Tratorpeças',
    description: 'Entre em contato com a MG Tratorpeças. Atendimento via WhatsApp, telefone e e-mail. Tire suas dúvidas sobre peças para máquinas pesadas.',
    url: 'https://mgtratorpecas.com.br/contato',
    siteName: 'MG Tratorpeças',
    locale: 'pt_BR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mgtratorpecas.com.br/contato',
  },
}

export default function ContatoPage() {
  return <ContatoPageClient />
}