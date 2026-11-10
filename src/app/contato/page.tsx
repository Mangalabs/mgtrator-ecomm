import { Metadata } from 'next'
import { ContatoPageClient } from '@/components/contato/ContatoPageClient'

export const metadata: Metadata = {
  title: 'Contato e Orçamentos | MG Tratorpeças',
  description: 'Entre em contato com a MG Tratorpeças para cotações e dúvidas. Atendimento especializado via WhatsApp, telefone e e-mail.',
  keywords: [
    'contato MG Tratorpeças',
    'telefone MG Tratorpeças',
    'WhatsApp peças linha amarela',
    'orçamento peças máquinas pesadas',
    'fale conosco',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Fale Conosco | MG Tratorpeças',
    description: 'Entre em contato com a MG Tratorpeças para cotações e dúvidas. Atendimento especializado via WhatsApp, telefone e e-mail.',
    url: 'https://www.mgtratorpecas.com.br/contato',
    siteName: 'MG Tratorpeças',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://www.mgtratorpecas.com.br/logo-azul.png',
        width: 1200,
        height: 630,
        alt: 'Entre em contato com a MG Tratorpeças',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.mgtratorpecas.com.br/contato',
  },
}

export default function ContatoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contato MG Tratorpeças',
    url: 'https://www.mgtratorpecas.com.br/contato',
    description: 'Página de contato para cotação de peças para máquinas pesadas.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContatoPageClient />
    </>
  )
}