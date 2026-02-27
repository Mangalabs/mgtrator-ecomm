'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, Filter, Loader2, ArrowUpDown, X } from 'lucide-react'
import { ProductCard } from '@/components/products/ProductCard'
import { QuickViewModal } from '@/components/products/QuickViewModal'
import type { Product } from '@/data/types'

const ITEMS_PER_PAGE = 12

type PaginationInfo = {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export const SearchResultsClient = () => {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedBrand, setSelectedBrand] = useState('')
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc'>('name-asc')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)

  const searchQuery = useMemo(() => {
    return searchParams.get('search')?.trim() || searchParams.get('q')?.trim() || ''
  }, [searchParams])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedBrand])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchResults = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.set('page', String(currentPage))
        params.set('limit', String(ITEMS_PER_PAGE))
        params.set('sortBy', sortBy)
        
        if (searchQuery) params.set('search', searchQuery)
        if (selectedBrand) params.set('brand', selectedBrand)

        const queryString = params.toString().replace(/\+/g, '%20')
        const response = await fetch(`/api/products?${queryString}`, {
          signal: controller.signal
        })
        const payload = await response.json()

        if (!isMounted) return

        if (payload.success && payload.data) {
          setProducts(payload.data.data || [])
          setPagination(payload.data.pagination || null)
        } else {
          setProducts([])
          setPagination(null)
        }
      } catch (error) {
        if (isMounted && error instanceof Error && error.name !== 'AbortError') {
          setProducts([])
          setPagination(null)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchResults()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [searchQuery, currentPage, sortBy, selectedBrand])

  const brands = useMemo(() => {
    const uniqueBrands = Array.from(new Set(products.map(p => p.brandName))).filter(Boolean)
    return uniqueBrands.sort()
  }, [products])

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
      return b.name.localeCompare(a.name)
    })
  }, [products, sortBy])

  const totalItems = pagination?.total ?? sortedProducts.length
  const totalPages = pagination?.totalPages ?? 1
  
  const pageItems = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const items: Array<number | '...'> = []
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    items.push(1)
    if (start > 2) items.push('...')
    for (let page = start; page <= end; page += 1) items.push(page)
    if (end < totalPages - 1) items.push('...')
    items.push(totalPages)
    return items
  }, [currentPage, totalPages])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleClearFilters = () => {
    setSelectedBrand('')
    setSortBy('name-asc')
    setCurrentPage(1)
  }

  const hasActiveFilters = !!selectedBrand || sortBy !== 'name-asc'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-[var(--primary)]">Início</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Resultados da Busca</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
              <h1 className="text-3xl font-black text-gray-900">
                {searchQuery ? `Busca: "${searchQuery}"` : 'Todos os Produtos'}
              </h1>
              {!loading && (
                <span className="text-lg font-medium text-gray-500 whitespace-nowrap">
                  ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
                </span>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-xl font-bold shadow-md active:scale-95 transition-all"
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 relative min-h-[400px]">
            <div className={`transition-opacity duration-300 ${loading ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              {sortedProducts.length === 0 && !loading ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum produto encontrado</h3>
                  <p className="text-gray-600 mb-6">Tente buscar por outro termo ou remova os filtros.</p>
                  <button onClick={handleClearFilters} className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all">
                    <X className="w-5 h-5" />
                    Limpar Filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.thumbnail}
                      code={product.code}
                      brand={product.brandName}
                      stock={product.inStock ? 'in-stock' : 'out-of-stock'} 
                      onQuickView={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              )}
            </div>

            {loading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-white/90 px-8 py-6 rounded-2xl shadow-2xl flex items-center gap-4 backdrop-blur-sm border border-gray-100">
                  <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin" />
                  <span className="font-black text-[var(--primary)] text-lg">Carregando produtos...</span>
                </div>
              </div>
            )}

            {totalPages > 1 && !loading && sortedProducts.length > 0 && (
              <div className="flex justify-center flex-wrap gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination?.hasPrev}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl font-bold bg-white hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:opacity-50 transition-all"
                >
                  Anterior
                </button>
                {pageItems.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    className={`px-4 py-2 rounded-xl font-bold transition-all ${currentPage === page ? 'bg-[var(--primary)] text-white shadow-md scale-105' : 'border-2 border-gray-200 bg-white hover:border-[var(--primary)] hover:text-[var(--primary)]'}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination?.hasNext}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl font-bold bg-white hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:opacity-50 transition-all"
                >
                  Próxima
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}