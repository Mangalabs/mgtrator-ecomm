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
      title: 'Produto não encontrado | MG Trator Peças',
      description: 'Produto não encontrado no catálogo da MG Trator Peças.',
    }
  }

  const product = productResponse.data

  return {
    title: `${product.name} - ${product.partNumber || product.sku} | ${product.brandName} - MG Trator Peças`,
    description: `${product.name} - Código ${product.partNumber || product.sku}. Peça original ${product.brandName}.`,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params

  const productResponse = await getProductBySlug(slug)
  if (!productResponse.data) {
    notFound()
  }

  const relatedResponse = await getRelatedProducts(productResponse.data.id)

  return (
    <ProductDetailClient
      product={productResponse.data}
      relatedProducts={relatedResponse.data || []}
    />
  )
}
