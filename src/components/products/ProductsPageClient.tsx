'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import { Filter, ChevronDown, Search, X, Loader2 } from 'lucide-react'
import { ProductCard } from './ProductCard'
import { QuickViewModal } from './QuickViewModal'
import type { Product } from '@/data/types'
import PageHero from '../common/PageHero'

const IS_CATALOG_MODE = true
const ITEMS_PER_PAGE = 10

type PaginationInfo = {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

type ProductsPageClientProps = {
  initialProducts: Product[]
  initialPagination?: PaginationInfo
}

export const ProductsPageClient = ({
  initialProducts,
  initialPagination,
}: ProductsPageClientProps) => {
  const isInitialMount = useRef(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('relevance')
  const [showFilters, setShowFilters] = useState(false)
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(initialPagination?.page ?? 1)
  const [pagination, setPagination] = useState<PaginationInfo | null>(
    initialPagination ?? null,
  )
  const [loading, setLoading] = useState(false)

  const categoryOptions = useMemo(() => {
    const counts = new Map<string, number>()
    initialProducts.forEach((product) => {
      const name = product.categoryName?.trim()
      if (!name) return
      counts.set(name, (counts.get(name) || 0) + 1)
    })

    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [initialProducts])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== searchInput) {
        setSearchQuery(searchInput)
        setCurrentPage(1)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [searchInput, searchQuery])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    let isMounted = true
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 12000)

    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.set('page', String(currentPage))
        params.set('limit', String(ITEMS_PER_PAGE))
        params.set('sortBy', sortBy)
        if (searchQuery.trim()) {
          params.set('search', searchQuery.trim())
        }
        if (selectedCategory !== 'all') {
          params.set('category', selectedCategory)
        }

        const response = await fetch(`/api/products?${params.toString()}`, {
          signal: controller.signal,
        })

        const payload = (await response.json()) as {
          success: boolean
          data?: {
            data: Product[]
            pagination?: PaginationInfo
          }
        }

        if (!isMounted) return
        if (payload.success && payload.data) {
          setProducts(payload.data.data || [])
          setPagination(payload.data.pagination ?? null)
        } else {
          setProducts([])
          setPagination(null)
        }
      } catch (error) {
        if (!isMounted) return
        setProducts([])
        setPagination(null)
      } finally {
        clearTimeout(timeoutId)
        if (isMounted) setLoading(false)
      }
    }

    fetchProducts()

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [currentPage, searchQuery, selectedCategory, sortBy])

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return IS_CATALOG_MODE ? 0 : a.price - b.price
      case 'price-desc':
        return IS_CATALOG_MODE ? 0 : b.price - a.price
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      case 'relevance':
      default:
        return 0
    }
  })

  const visibleProducts = sortedProducts
  const totalPages = pagination?.totalPages ?? 1
  const pageItems = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const items: Array<number | '...'> = []
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    items.push(1)
    if (start > 2) {
      items.push('...')
    }
    for (let page = start; page <= end; page += 1) {
      items.push(page)
    }
    if (end < totalPages - 1) {
      items.push('...')
    }
    items.push(totalPages)

    return items
  }, [currentPage, totalPages])

  const canGoPrev = pagination?.hasPrev ?? currentPage > 1
  const canGoNext = pagination?.hasNext ?? currentPage < totalPages

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const gridElement = document.getElementById('products-grid')
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setCurrentPage(1)
  }

  return (
    <div className='min-h-screen bg-white'>
      <PageHero
        breadcrumbs={[
          {
            label: 'Produtos',
            href: '',
          },
        ]}
        title='Catálogo de Peças'
        description='Encontre a peça ideal para seu trator ou máquina pesada'
      />

      <section
        id='products-grid'
        className='bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-40' aria-hidden='true'>
          <div className='absolute top-20 right-0 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[120px]' />
          <div className='absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--secondary)]/5 rounded-full blur-[100px]' />
        </div>

        <div className='relative max-w-9/10 mx-auto'>
          <div className='mb-12'>
            <div className='relative max-w-4xl mx-auto'>
              <div className='relative'>
                <Search
                  className='absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--primary)]'
                  aria-hidden='true'
                />
                <input
                  type='text'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder='Buscar por peça, código ou categoria... (Ex: filtro, bomba hidráulica)'
                  className='w-full py-5 pl-16 pr-16 rounded-3xl border-2 border-[var(--neutral-300)] bg-white focus:border-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 transition-all shadow-lg hover:shadow-xl text-lg'
                  aria-label='Buscar produtos - Digite peça, código ou categoria'
                />
                {searchInput && (
                  <button
                    type='button'
                    onClick={() => {
                      setSearchInput('')
                      setSearchQuery('')
                      setCurrentPage(1)
                    }}
                    className='absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--neutral-100)] text-[var(--neutral-500)] hover:bg-red-50 hover:text-red-600 transition-all'
                    aria-label='Limpar busca'>
                    <X className='w-5 h-5' />
                  </button>
                )}
              </div>
            </div>

            {searchQuery && (
              <div className='text-center'>
                <div className='inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary)] to-[#1a2d5e] text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg'>
                  <Search className='w-5 h-5' aria-hidden='true' />
                  <span>
                    {pagination?.total ?? visibleProducts.length} resultado(s)
                    encontrado(s) para &quot;{searchQuery}&quot;
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className='flex flex-col lg:flex-row gap-8'>
            {/* <div className='lg:w-72 flex-shrink-0'>
              <div className='lg:hidden mb-4'>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className='w-full bg-gradient-to-r from-[var(--primary)] to-[#1a2d5e] text-white py-3.5 px-5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all'>
                  <Filter className='w-5 h-5' />
                  Filtros
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              <div
                className={`bg-white/80 backdrop-blur-sm border-2 border-[var(--neutral-200)] rounded-2xl p-6 shadow-xl ${showFilters || 'hidden lg:block'}`}>
                <div className='flex items-center gap-2 mb-6'>
                  <div className='w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[#1a2d5e] rounded-xl flex items-center justify-center'>
                    <Filter className='w-5 h-5 text-white' aria-hidden='true' />
                  </div>
                  <h3 className='font-black text-xl'>Filtrar</h3>
                </div>

                <div className='mb-6'>
                  <h4 className='text-sm font-bold mb-3 text-[var(--neutral-700)] uppercase tracking-wide'>
                    Categoria
                  </h4>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className='w-full border-2 border-[var(--neutral-200)] rounded-xl px-4 py-3 text-sm font-semibold focus:ring-4 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] transition-all bg-white cursor-pointer hover:border-[var(--primary)]/50'>
                    <option value='all'>Todas as categorias</option>
                    {categoryOptions.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name} ({cat.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div className='mb-6'>
                  <h4 className='text-sm font-bold mb-3 text-[var(--neutral-700)] uppercase tracking-wide'>
                    Ordenar Por
                  </h4>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value)
                      setCurrentPage(1)
                    }}
                    className='w-full border-2 border-[var(--neutral-200)] rounded-xl px-4 py-3 text-sm font-semibold focus:ring-4 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] transition-all bg-white cursor-pointer hover:border-[var(--primary)]/50'>
                    <option value='relevance'>Mais Relevantes</option>
                    {!IS_CATALOG_MODE && (
                      <>
                        <option value='price-asc'>Menor Preço</option>
                        <option value='price-desc'>Maior Preço</option>
                      </>
                    )}
                    <option value='name-asc'>Nome A-Z</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSortBy('relevance')
                    setSearchInput('')
                    setSearchQuery('')
                    setCurrentPage(1)
                  }}
                  className='w-full bg-[var(--neutral-100)] text-[var(--primary)] font-bold text-sm py-3 px-4 rounded-xl hover:bg-[var(--primary)]/10 transition-all flex items-center justify-center gap-2'>
                  <X className='w-4 h-4' aria-hidden='true' />
                  Limpar Filtros
                </button>
              </div>
            </div> */}

            <div className='flex-1 relative min-h-[400px]'>
              <div
                className={`transition-opacity duration-300 ${loading ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6'>
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.thumbnail}
                      code={product.code}
                      partNumber={product.partNumber}
                      deliveryType={product.deliveryType}
                      stockQuantity={product.stockQuantity ?? 0}
                      thumbnail={product.thumbnail}
                      onQuickView={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              </div>

              {loading && (
                <div className='absolute inset-0 flex items-center justify-center z-10'>
                  <div className='bg-white/90 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-sm border border-gray-100'>
                    <Loader2 className='w-6 h-6 text-[var(--primary)] animate-spin' />
                    <span className='font-bold text-[var(--primary)]'>
                      Carregando produtos...
                    </span>
                  </div>
                </div>
              )}

              {!loading && visibleProducts.length === 0 && (
                <div className='text-center py-20'>
                  <div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[var(--neutral-100)] to-[var(--neutral-200)] rounded-3xl mb-6'>
                    <Search
                      className='w-12 h-12 text-[var(--neutral-400)]'
                      aria-hidden='true'
                    />
                  </div>
                  <h3 className='font-black text-2xl mb-3 text-[var(--neutral-900)]'>
                    Nenhum produto encontrado
                  </h3>
                  <p className='text-[var(--neutral-600)] text-lg mb-8'>
                    Tente ajustar os filtros ou entre em contato conosco
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      setSortBy('relevance')
                      setSearchInput('')
                      setSearchQuery('')
                      setCurrentPage(1)
                    }}
                    className='inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-bold hover:bg-[var(--primary)]/90 transition-all'>
                    <X className='w-5 h-5' aria-hidden='true' />
                    Limpar Filtros
                  </button>
                </div>
              )}

              {totalPages > 1 && (
                <div className='flex justify-center flex-wrap gap-2 mt-16'>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!canGoPrev || loading}
                    className='px-5 py-3 border-2 border-[var(--neutral-200)] rounded-xl hover:bg-white hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all font-semibold bg-white/60 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-[var(--neutral-200)] disabled:hover:text-inherit flex items-center justify-center gap-2'>
                    {loading && <Loader2 className='w-4 h-4 animate-spin' />}
                    Anterior
                  </button>

                  {pageItems.map((page, index) =>
                    page === '...' ? (
                      <span
                        key={`ellipsis-${index}`}
                        className='px-4 py-3 text-[var(--neutral-500)] font-semibold flex items-center justify-center'>
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page as number)}
                        disabled={loading}
                        className={`px-5 py-3 rounded-xl font-bold shadow-sm transition-all flex items-center justify-center min-w-[3.5rem] ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-[var(--primary)] to-[#1a2d5e] text-white shadow-lg scale-105'
                            : 'border-2 border-[var(--neutral-200)] bg-white/60 backdrop-blur-sm hover:bg-white hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-[var(--neutral-200)] disabled:hover:text-inherit'
                        }`}>
                        {loading ? (
                          <Loader2 className='w-5 h-5 animate-spin' />
                        ) : (
                          page
                        )}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!canGoNext || loading}
                    className='px-5 py-3 border-2 border-[var(--neutral-200)] rounded-xl hover:bg-white hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all font-semibold bg-white/60 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-[var(--neutral-200)] disabled:hover:text-inherit flex items-center justify-center gap-2'>
                    Próxima
                    {loading && <Loader2 className='w-4 h-4 animate-spin' />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
