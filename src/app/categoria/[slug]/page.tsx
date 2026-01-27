import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CategoriaPageClient } from '@/components/categoria/CategoriaPageClient'
import { getCategoryBySlug, getProducts } from '@/services/api'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const response = await getCategoryBySlug(resolvedParams.slug)
  const category = response.data
  
  if (!category) {
    return {
      title: 'Categoria não encontrada | MG Trator Peças'
    }
  }
  
  return {
    title: category.seoTitle || `${category.name} - Peças Originais | MG Trator Peças`,
    description: category.seoDescription || category.description,
    keywords: [
      category.name,
      'peças originais',
      'manutenção',
      'máquinas pesadas',
      'caterpillar',
      'volvo',
      'komatsu',
      'case',
      'jcb',
      'john deere'
    ],
    openGraph: {
      title: category.name,
      description: category.description,
      images: category.image ? [category.image] : [],
      type: 'website'
    }
  }
}

export default async function CategoriaPage({ params }: Props) {
  const resolvedParams = await params
  const categoryResponse = await getCategoryBySlug(resolvedParams.slug)
  const category = categoryResponse.data
  
  if (!category) {
    notFound()
  }
  
  const productsResponse = await getProducts(
    { categoryId: category.id },
    { page: 1, limit: 100 }
  )
  
  return (
    <CategoriaPageClient 
      category={category}
      initialProducts={productsResponse.data.data}
    />
  )
}