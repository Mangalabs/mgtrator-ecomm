import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LojasPageClient } from '@/components/lojas/LojasPageClient'
import { storesData } from '@/data/stores'
import { jsonLdGraph, organizationJsonLd, storeJsonLd, storeUrl } from '@/lib/structuredData'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return storesData.map((store) => ({ slug: store.slug }))
}

const findStore = (slug: string) => storesData.find((store) => store.slug === slug)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const store = findStore(slug)
  if (!store) return {}

  const { address } = store
  const title = `Peças para máquinas pesadas em ${address.city}/${address.state}`
  const description = `MG Tratorpeças em ${address.city}/${address.state}: ${address.street}, ${address.number} - ${address.neighborhood}. ${store.hours.label}. WhatsApp ${store.contact.phoneFormatted}.`

  return {
    title,
    description,
    alternates: { canonical: storeUrl(store) },
    openGraph: {
      title: `${title} | MG Tratorpeças`,
      description,
      url: storeUrl(store),
      siteName: 'MG Tratorpeças',
      locale: 'pt_BR',
      type: 'website',
    },
  }
}

export default async function LojaPage({ params }: Props) {
  const { slug } = await params
  const store = findStore(slug)
  if (!store) notFound()

  const jsonLd = jsonLdGraph(organizationJsonLd(storesData), storeJsonLd(store))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LojasPageClient
        stores={[store]}
        title={`MG Tratorpeças em ${store.address.city}/${store.address.state}`}
        description={`${store.address.street}, ${store.address.number} - ${store.address.neighborhood}`}
        breadcrumbs={[
          { label: 'Lojas', href: '/lojas' },
          { label: store.address.city, href: '' },
        ]}
      />
    </>
  )
}
