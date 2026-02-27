import { Metadata } from 'next'
import { LojasPageClient } from '@/components/lojas/LojasPageClient'

export const metadata: Metadata = {
  title: 'Nossa Loja em São Luís - MA | MG Tratorpeças',
  description: 'Visite nossa loja física em São Luís - MA. Atendimento especializado e estoque completo de peças para máquinas pesadas da linha amarela.',
  keywords: [
    'loja de peças São Luís',
    'MG Tratorpeças endereço',
    'peças máquinas pesadas maranhão',
    'peças escavadeiras são luís',
    'peças linha amarela',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Nossa Loja em São Luís - MA | MG Tratorpeças',
    description: 'Visite nossa loja física em São Luís - MA. Atendimento especializado e estoque completo de peças para máquinas pesadas.',
    url: 'https://www.mgtratorpecas.com.br/lojas',
    siteName: 'MG Tratorpeças',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://www.mgtratorpecas.com.br/logo-azul.png',
        width: 1200,
        height: 630,
        alt: 'Loja Física MG Tratorpeças em São Luís - MA',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.mgtratorpecas.com.br/lojas',
  },
}

export default function LojasPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoPartsStore',
    name: 'MG Tratorpeças',
    url: 'https://www.mgtratorpecas.com.br/lojas',
    image: 'https://www.mgtratorpecas.com.br/logo-azul.png',
    description: 'Loja especializada em peças para máquinas pesadas da linha amarela.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Guajajaras, 404 - Tirirical',
      addressLocality: 'São Luís',
      addressRegion: 'MA',
      postalCode: '65055-285',
      addressCountry: 'BR'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LojasPageClient />
    </>
  )
}