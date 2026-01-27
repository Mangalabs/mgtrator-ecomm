'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, Filter } from 'lucide-react'
import { ProductCard } from '@/components/products/ProductCard'
import { QuickViewModal } from '@/components/products/QuickViewModal'
import { products, brands } from '@/data/mockData'
import type { Product } from '@/data/types'

export const SearchResultsClient = () => {
  const searchParams = useSearchParams()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const searchQuery = useMemo(() => {
    const q = searchParams.get('q')
    return q ? q.trim() : ''
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    let result = products

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const checkField = (field: unknown) => {
        if (Array.isArray(field)) {
          return field.some(item => String(item).toLowerCase().includes(query))
        }
        return field ? String(field).toLowerCase().includes(query) : false
      }

      result = result.filter((product) => (
        checkField(product.name) ||
        checkField(product.code) ||
        checkField(product.brandName) ||
        checkField(product.categoryName) ||
        checkField(product.compatibility) ||
        checkField(product.description)
      ))
    }

    if (selectedBrand) {
      result = result.filter(p => p.brandName === selectedBrand)
    }

    if (selectedCategory) {
      result = result.filter(p => p.categoryName === selectedCategory)
    }

    return result
  }, [searchQuery, selectedBrand, selectedCategory])

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.categoryName))
    return Array.from(cats).sort()
  }, [])

  const handleClearFilters = () => {
    setSelectedBrand('')
    setSelectedCategory('')
  }

  const hasActiveFilters = !!selectedBrand || !!selectedCategory

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-[var(--primary)]">Início</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Resultados da Busca</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">
                {searchQuery ? `Busca: "${searchQuery}"` : 'Todos os Produtos'}
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-bold"
            >
              <Filter className="w-4 h-4" />
              Filtros
              {hasActiveFilters && (
                <span className="bg-[var(--secondary)] text-black px-2 py-0.5 rounded-full text-xs font-black">
                  {(selectedBrand ? 1 : 0) + (selectedCategory ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-lg text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtros
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-[var(--primary)] hover:underline font-bold"
                  >
                    Limpar
                  </button>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Marca</h3>
                <div className="space-y-2">
                  {brands.map((brand) => {
                    const count = products.filter(p => p.brandName === brand.name).length
                    return (
                      <label key={brand.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                        <input
                          type="radio"
                          name="brand"
                          checked={selectedBrand === brand.name}
                          onChange={() => setSelectedBrand(selectedBrand === brand.name ? '' : brand.name)}
                          className="w-4 h-4 text-[var(--primary)] focus:ring-[var(--primary)]"
                        />
                        <span className="text-sm text-gray-700 flex-1">{brand.name}</span>
                        <span className="text-xs text-gray-500">({count})</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Categoria</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const count = products.filter(p => p.categoryName === category).length
                    return (
                      <label key={category} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                          className="w-4 h-4 text-[var(--primary)] focus:ring-[var(--primary)]"
                        />
                        <span className="text-sm text-gray-700 flex-1">{category}</span>
                        <span className="text-xs text-gray-500">({count})</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600 mb-6">Tente buscar por outro termo ou remova alguns filtros.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/produtos">
                    <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-bold">
                      Ver Todos os Produtos
                    </button>
                  </Link>
                  {hasActiveFilters && (
                    <button
                      onClick={handleClearFilters}
                      className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold"
                    >
                      Limpar Filtros
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
        </div>
      </div>

      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  )
}