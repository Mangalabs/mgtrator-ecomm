import { Metadata } from 'next'
import { ProductDetailClient } from '@/components/products/ProductDetailClient'
import { products } from '@/data/mockData'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products
    .filter(product => typeof product.slug === 'string' && product.slug.length > 0)
    .map(product => ({
      slug: product.slug,
    }))
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params

  const product = products.find(p => p.slug === slug)

  if (!product) {
    return {
      title: 'Produto não encontrado | MG Trator Peças',
      description: 'Produto não encontrado no catálogo da MG Trator Peças.',
    }
  }

  return {
    title: `${product.name} - ${product.partNumber || product.sku} | ${product.brandName} - MG Trator Peças`,
    description: `${product.name} - Código ${product.partNumber || product.sku}. Peça original ${product.brandName}.`,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params

  return <ProductDetailClient slug={slug} />
}