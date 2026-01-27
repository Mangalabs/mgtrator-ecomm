/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { api } from '@/services/api'

export const useProducts = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getProducts().then((res) => {
      setProducts(res.data.data)
      setLoading(false)
    })
  }, [])

  return { products, loading }
}
