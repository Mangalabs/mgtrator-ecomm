'use client'

import { useState, useEffect } from 'react'
import { Filter, ChevronDown, Search, X } from 'lucide-react'
import { ProductCard } from './ProductCard'
import { QuickViewModal } from './QuickViewModal'
import { products, categories, brands } from '@/data/mockData'
import type { Product } from '@/data/types'
import PageHero from '../common/PageHero'

const IS_CATALOG_MODE = true
const ITEMS_PER_PAGE = 6

export const ProductsPageClient = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('relevance')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    requestAnimationFrame(() => {
      setCurrentPage(1)
    })
  }, [selectedCategory, selectedBrand, priceRange, searchQuery, sortBy])

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'all' && product.categoryName !== selectedCategory)
      return false
    if (selectedBrand !== 'all' && product.brandName !== selectedBrand)
      return false

    if (!IS_CATALOG_MODE) {
      if (priceRange === 'under200' && product.price >= 200) return false
      if (
        priceRange === '200-500' &&
        (product.price < 200 || product.price >= 500)
      )
        return false
      if (
        priceRange === '500-1000' &&
        (product.price < 500 || product.price >= 1000)
      )
        return false
      if (priceRange === 'over1000' && product.price < 1000) return false
    }

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        product.name.toLowerCase().includes(searchLower) ||
        product.code?.toLowerCase().includes(searchLower) ||
        product.brandName.toLowerCase().includes(searchLower) ||
        product.categoryName.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false
    }

    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = sortedProducts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const gridElement = document.getElementById('products-grid')
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
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
        className='py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-40' aria-hidden='true'>
          <div className='absolute top-20 right-0 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[120px]' />
          <div className='absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--secondary)]/5 rounded-full blur-[100px]' />
        </div>

        <div className='relative max-w-7xl mx-auto px-4'>
          <div className='mb-12'>
            <div className='relative max-w-4xl mx-auto'>
              <div className='relative'>
                <Search
                  className='absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--primary)]'
                  aria-hidden='true'
                />
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Buscar por peça, código, marca ou categoria... (Ex: filtro, bomba hidráulica, CAT)'
                  className='w-full py-5 pl-16 pr-16 rounded-3xl border-2 border-[var(--neutral-300)] bg-white focus:border-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 transition-all shadow-lg hover:shadow-xl text-lg'
                  aria-label='Buscar produtos - Digite peça, código ou marca'
                />
                {searchQuery && (
                  <button
                    type='button'
                    onClick={() => setSearchQuery('')}
                    className='absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--neutral-100)] text-[var(--neutral-500)] hover:bg-red-50 hover:text-red-600 transition-all'
                    aria-label='Limpar busca'>
                    <X className='w-5 h-5' />
                  </button>
                )}
              </div>
            </div>

            {searchQuery && (
              <div className='text-center mt-5'>
                <div className='inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary)] to-[#1a2d5e] text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg'>
                  <Search className='w-5 h-5' aria-hidden='true' />
                  <span>
                    {filteredProducts.length} resultado(s) encontrado(s) para
                    &quot;{searchQuery}&quot;
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className='flex flex-col lg:flex-row gap-8'>
            <div className='lg:w-72 flex-shrink-0'>
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
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className='w-full border-2 border-[var(--neutral-200)] rounded-xl px-4 py-3 text-sm font-semibold focus:ring-4 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] transition-all bg-white cursor-pointer hover:border-[var(--primary)]/50'>
                    <option value='all'>Todas as categorias</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name} ({cat.productCount})
                      </option>
                    ))}
                  </select>
                </div>

                <div className='mb-6'>
                  <h4 className='text-sm font-bold mb-3 text-[var(--neutral-700)] uppercase tracking-wide'>
                    Marca
                  </h4>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className='w-full border-2 border-[var(--neutral-200)] rounded-xl px-4 py-3 text-sm font-semibold focus:ring-4 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] transition-all bg-white cursor-pointer hover:border-[var(--primary)]/50'>
                    <option value='all'>Todas as marcas</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.name}>
                        {brand.name}
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
                    onChange={(e) => setSortBy(e.target.value)}
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
                    setSelectedBrand('all')
                    setPriceRange('all')
                    setSortBy('relevance')
                    setSearchQuery('')
                  }}
                  className='w-full bg-[var(--neutral-100)] text-[var(--primary)] font-bold text-sm py-3 px-4 rounded-xl hover:bg-[var(--primary)]/10 transition-all flex items-center justify-center gap-2'>
                  <X className='w-4 h-4' aria-hidden='true' />
                  Limpar Filtros
                </button>
              </div>
            </div>

            <div className='flex-1'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7'>
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.thumbnail}
                    code={product.code}
                    partNumber={product.partNumber}
                    brand={product.brandName}
                    deliveryType={product.deliveryType}
                    stockQuantity={product.inStock ? 100 : 0}
                    thumbnail={product.thumbnail}
                    onQuickView={() => setSelectedProduct(product)}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
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
                      setSelectedBrand('all')
                      setPriceRange('all')
                      setSearchQuery('')
                    }}
                    className='inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-bold hover:bg-[var(--primary)]/90 transition-all'>
                    <X className='w-5 h-5' aria-hidden='true' />
                    Limpar Filtros
                  </button>
                </div>
              )}

              {filteredProducts.length > ITEMS_PER_PAGE && (
                <div className='flex justify-center flex-wrap gap-2 mt-16'>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='px-5 py-3 border-2 border-[var(--neutral-200)] rounded-xl hover:bg-white hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all font-semibold bg-white/60 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-[var(--neutral-200)] disabled:hover:text-inherit'>
                    Anterior
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-5 py-3 rounded-xl font-bold shadow-sm transition-all ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-[var(--primary)] to-[#1a2d5e] text-white shadow-lg scale-105'
                            : 'border-2 border-[var(--neutral-200)] bg-white/60 backdrop-blur-sm hover:bg-white hover:border-[var(--primary)] hover:text-[var(--primary)]'
                        }`}>
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='px-5 py-3 border-2 border-[var(--neutral-200)] rounded-xl hover:bg-white hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all font-semibold bg-white/60 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-[var(--neutral-200)] disabled:hover:text-inherit'>
                    Próxima
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
