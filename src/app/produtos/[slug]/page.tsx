import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from '@/components/products/ProductDetailClient'
import { getProductBySlug, getRelatedProducts } from '@/services/api'

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const productResponse = await getProductBySlug(slug)

  if (!productResponse.data) {
    return {
      title: 'Produto não encontrado | MG Tratorpeças',
      description: 'Produto não encontrado no catálogo da MG Tratorpeças.',
    }
  }

  const product = productResponse.data
  const productCode = product.partNumber || product.sku || product.code || ''
  const brandName = product.brandName || ''

  return {
    title: `${product.name} | Código ${productCode} | Peças Linha Amarela - MG Tratorpeças`,
    description: `${product.name} - Código ${productCode}. Peça original ${brandName} para máquinas pesadas da linha amarela. Consulte disponibilidade e faça sua cotação na MG Tratorpeças.`,
    keywords: [
      product.name,
      productCode,
      brandName,
      'peças linha amarela',
      'peças máquinas pesadas',
      'peças para escavadeiras',
      'peças para maquinas pesadas',
      'peças para carregadeiras',
      'mg tratorpeças',
    ].filter(Boolean),
    alternates: {
      canonical: `https://www.mgtratorpecas.com.br/produtos/${slug}`,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params

  const productResponse = await getProductBySlug(slug)
  if (!productResponse.data) {
    notFound()
  }

  const product = productResponse.data
  const relatedResponse = await getRelatedProducts(product.id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image:
      product.thumbnail ||
      product.images?.[0] ||
      'https://www.mgtratorpecas.com.br/no-image.jpg',
    description: `
      ${product.name} para máquinas pesadas. Peça de reposição desenvolvida para aplicações em equipamentos de construção e linha amarela. Ideal para manutenção preventiva e corretiva, garantindo desempenho, resistência e confiabilidade.
      `.trim(),
    sku: product.sku || product.code || product.partNumber,
    mpn: product.partNumber,
    brand: {
      '@type': 'Brand',
      name: product.brandName || 'Genérica',
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.mgtratorpecas.com.br/produtos/${slug}`,
      priceCurrency: 'BRL',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedResponse.data || []}
      />
    </>
  )
}
