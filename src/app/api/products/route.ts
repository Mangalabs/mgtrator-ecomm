import { NextResponse } from 'next/server'
import { getProducts } from '@/services/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const search =
    searchParams.get('search') || searchParams.get('q') || undefined
  const categoryId =
    searchParams.get('category') || searchParams.get('categoryId') || undefined
  const brandId = searchParams.get('brandId') || undefined
  const inStockParam = searchParams.get('inStock')
  const inStock =
    inStockParam === 'true'
      ? true
      : inStockParam === 'false'
        ? false
        : undefined
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 20)

  const response = await getProducts(
    {
      search,
      categoryId,
      brandId,
      inStock,
    },
    { page, limit },
  )

  return NextResponse.json(response)
}
