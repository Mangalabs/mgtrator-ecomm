import { Metadata } from 'next'
import { LojasPageClient } from '@/components/lojas/LojasPageClient'
import { storesData } from '@/data/stores'
import { jsonLdGraph, organizationJsonLd, storeJsonLd } from '@/lib/structuredData'

const title = 'Lojas em São Luís/MA e Araguaína/TO | MG Tratorpeças'
const description =
  'Visite a MG Tratorpeças em São Luís/MA (Av. Guajajaras, 402 - Tirirical) e em Araguaína/TO. Peças para máquinas pesadas da linha amarela e atendimento pelo WhatsApp.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    'loja de peças São Luís',
    'loja de peças Araguaína',
    'MG Tratorpeças endereço',
    'peças máquinas pesadas maranhão',
    'peças máquinas pesadas tocantins',
    'peças linha amarela',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: 'https://www.mgtratorpecas.com.br/lojas',
    siteName: 'MG Tratorpeças',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://www.mgtratorpecas.com.br/logo-azul.png',
        width: 1200,
        height: 630,
        alt: 'Lojas MG Tratorpeças em São Luís/MA e Araguaína/TO',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.mgtratorpecas.com.br/lojas',
  },
}

export default function LojasPage() {
  const jsonLd = jsonLdGraph(organizationJsonLd(storesData), ...storesData.map(storeJsonLd))

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
