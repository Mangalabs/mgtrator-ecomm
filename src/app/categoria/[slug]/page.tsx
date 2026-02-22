import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CategoriaPageClient } from '@/components/categoria/CategoriaPageClient'
import { getCategoryBySlug, getBrandBySlug, getProducts } from '@/services/api'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const slug = decodeURIComponent(resolvedParams.slug)
  
  const catResponse = await getCategoryBySlug(slug)
  const brandResponse = await getBrandBySlug(slug)
  
  const data = catResponse.data || brandResponse.data
  
  if (!data) {
    return {
      title: 'Não encontrado | MG Tratorpeças'
    }
  }
  
  return {
    title: data.seoTitle || `${data.name} - Peças Originais | MG Tratorpeças`,
    description: data.seoDescription || data.description,
    openGraph: {
      title: data.name,
      description: data.description,
      images: 'logo' in data ? [data.logo] : [data.image],
      type: 'website'
    }
  }
}

export default async function CategoriaPage({ params }: Props) {
  const resolvedParams = await params
  const slug = decodeURIComponent(resolvedParams.slug)

  const categoryResponse = await getCategoryBySlug(slug)
  let category = categoryResponse.data
  let isBrand = false

  if (!category) {
    const brandResponse = await getBrandBySlug(slug)
    if (brandResponse.data) {
      category = {
        ...brandResponse.data,
        image: brandResponse.data.logo
      }
      isBrand = true
    }
  }
  
  if (!category) {
    notFound()
  }
  
  const productsResponse = await getProducts(
    isBrand ? { brandId: category.id } : { categoryId: category.id },
    { page: 1, limit: 100 }
  )
  
  return (
    <CategoriaPageClient 
      category={category}
      initialProducts={productsResponse.data?.data || []}
    />
  )
}