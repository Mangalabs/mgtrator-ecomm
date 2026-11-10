import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CatalogLinePage } from '@/components/catalogo/CatalogLinePage'
import { catalogLines, getCatalogLine } from '@/data/catalog'
import type { CatalogLineId } from '@/data/types'

type Props = {
  params: Promise<{ linha: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return catalogLines.map((line) => ({ linha: line.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { linha } = await params
  const line = getCatalogLine(linha as CatalogLineId)
  if (!line) return {}

  const url = `https://www.mgtratorpecas.com.br/catalogo/${line.id}`
  const title = line.id === 'linha-verde' ? `${line.title} | MG Agro` : line.title

  return {
    title,
    description: line.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: line.description,
      url,
      siteName: 'MG Tratorpeças',
      locale: 'pt_BR',
      type: 'website',
    },
  }
}

export default async function CatalogLineRoute({ params }: Props) {
  const { linha } = await params
  const line = getCatalogLine(linha as CatalogLineId)
  if (!line) notFound()

  return <CatalogLinePage line={line} />
}
