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
  
  const pageTitle = `${product.name}${productCode ? ` - Cód: ${productCode}` : ''} | MG Tratorpeças`
  const pageDescription = `Faça a cotação de ${product.name}${productCode ? ` (Código: ${productCode})` : ''} para máquinas pesadas da linha amarela na MG Tratorpeças.`
  const productImage = product.thumbnail || product.images?.[0] || 'https://www.mgtratorpecas.com.br/logo-azul.png'

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      product.name,
      productCode,
      'peças linha amarela',
      'peças máquinas pesadas',
      'peças reposição trator',
      'mg tratorpeças',
    ].filter(Boolean),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://www.mgtratorpecas.com.br/produtos/${slug}`,
      siteName: 'MG Tratorpeças',
      images: [
        {
          url: productImage.startsWith('http') ? productImage : `https://www.mgtratorpecas.com.br${productImage}`,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
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
  
  const productCode = product.partNumber || product.sku || product.code

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image:
      product.thumbnail ||
      product.images?.[0] ||
      'https://www.mgtratorpecas.com.br/logo-azul.png',
    description: `Peça de reposição: ${product.name}. Desenvolvida para aplicações em equipamentos de maquinas pesadas. Faça sua cotação.`,
    sku: productCode || undefined,
    mpn: product.partNumber || undefined,
    offers: {
      '@type': 'Offer',
      url: `https://www.mgtratorpecas.com.br/produtos/${slug}`,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedResponse.data || []}
      />
    </>
  )
}