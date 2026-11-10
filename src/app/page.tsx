import { Metadata } from 'next'
import { HomePageClient } from '@/components/home/HomePageClient'
import { storesData } from '@/data/stores'

export const metadata: Metadata = {
  title: 'MG Tratorpeças | Peças para Máquinas e Equipamentos Pesados',
  description:
    'Peças para máquinas pesadas da linha amarela e, com a MG Agro, para máquinas agrícolas. Consulte pelo WhatsApp em São Luís/MA e Araguaína/TO.',
  keywords: [
    'peças máquinas pesadas',
    'peças linha amarela',
    'peças escavadeiras',
    'peças carregadeiras',
    'peças originais trator',
    'peças sistema hidráulico',
    'cotação peças linha amarela',
    'peças máquinas agrícolas',
    'peças plantadeira',
    'peças pulverizador',
    'peças colheitadeira',
    'MG Agro',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'MG Tratorpeças | Peças para Máquinas e Equipamentos Pesados',
    description:
      'Especialistas em peças originais e alternativas para linha amarela. Encontre tudo para escavadeiras e carregadeiras.',
    url: 'https://www.mgtratorpecas.com.br',
    siteName: 'MG Tratorpeças',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/logo-azul.png',
        width: 1200,
        height: 630,
        alt: 'MG Tratorpeças - Loja Especialista em Peças para Linha Amarela',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MG Tratorpeças | Peças para Máquinas Pesadas',
    description: 'Especialistas em peças originais e alternativas para linha amarela.',
  },
  alternates: {
    canonical: 'https://www.mgtratorpecas.com.br',
  },
}

export default function Home() {
  const matriz = storesData[0]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoPartsStore', 
    name: 'MG Tratorpeças',
    url: 'https://www.mgtratorpecas.com.br',
    description: 'Peças para máquinas pesadas da linha amarela e para máquinas agrícolas (MG Agro).',
    image: 'https://www.mgtratorpecas.com.br/logo-azul.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${matriz.address.street}, ${matriz.address.number} - ${matriz.address.neighborhood}`,
      addressLocality: matriz.address.city,
      addressRegion: matriz.address.state,
      postalCode: matriz.address.zipCode,
      addressCountry: 'BR'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient />
    </>
  )
}