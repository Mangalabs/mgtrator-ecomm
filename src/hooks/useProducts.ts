import { useEffect, useState } from 'react'
import type { Product } from '@/data/types'

type ProductsResponse = {
  success: boolean
  data?: {
    data: Product[]
  }
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products', {
          signal: controller.signal,
        })
        const data = (await response.json()) as ProductsResponse
        setProducts(data.data?.data || [])
      } catch (error) {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()

    return () => controller.abort()
  }, [])

  return { products, loading }
}
