import { Metadata } from 'next'
import { HomePageClient } from '@/components/home/HomePageClient'
import { getFeaturedProducts, getProducts } from '@/services/api'
import type { Product } from '@/data/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'MG Tratorpeças | Peças para Máquinas e Equipamentos Pesados',
  description:
    'Especialistas em peças originais e alternativas para linha amarela, escavadeiras e carregadeiras. Solicite sua cotação na MG Tratorpeças!',
  keywords: [
    'peças máquinas pesadas',
    'peças linha amarela',
    'peças escavadeiras',
    'peças carregadeiras',
    'peças originais trator',
    'peças sistema hidráulico',
    'cotação peças linha amarela',
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

const prioritizeImages = (products: Product[], limit: number) => {
  const withImages: Product[] = []
  const withoutImages: Product[] = []

  for (const p of products) {
    if (p.thumbnail) {
      withImages.push(p)
    } else {
      withoutImages.push(p)
    }
  }

  const result: Product[] = []
  for (let i = 0; i < limit; i++) {
    if (i < withImages.length) {
      result.push(withImages[i])
    } else if (i - withImages.length < withoutImages.length) {
      result.push(withoutImages[i - withImages.length])
    } else {
      break
    }
  }

  return result
}

export default async function HomePage() {
  const fetchLimit = 40
  const displayLimit = 10

  const [featuredResponse, productsResponse] = await Promise.all([
    getFeaturedProducts(fetchLimit),
    getProducts({}, { page: 1, limit: fetchLimit }),
  ])

  const rawFeatured = featuredResponse.data || []
  const featuredProducts = prioritizeImages(rawFeatured, displayLimit)

  const rawNew = productsResponse.data?.data || []
  const newProducts = prioritizeImages(
    rawNew.length ? rawNew : rawFeatured,
    displayLimit,
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoPartsStore', 
    name: 'MG Tratorpeças',
    url: 'https://www.mgtratorpecas.com.br',
    description: 'Especialistas em peças originais e alternativas para máquinas pesadas da linha amarela.',
    image: 'https://www.mgtratorpecas.com.br/logo-azul.png',
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
      <HomePageClient
        featuredProducts={featuredProducts}
        newProducts={newProducts}
      />
    </>
  )
}