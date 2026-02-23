/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useMemo } from 'react'
import { Category, Product } from '@/data/types'
import { ProductCard } from '@/components/products/ProductCard'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { WhatsAppFloating } from '@/components/layout/WhatsAppFloating'
import { brands as brandsData } from '@/data/mockData'
import { Filter, SlidersHorizontal, Grid3x3, List, ChevronDown, Package } from 'lucide-react'

interface CategoriaPageClientProps {
  category: Category
  initialProducts: Product[]
}

type SortOption = 'relevancia' | 'preco-menor' | 'preco-maior' | 'nome-az' | 'nome-za' | 'novidades'
type ViewMode = 'grid' | 'list'

export function CategoriaPageClient({ category, initialProducts }: CategoriaPageClientProps) {
  const [products] = useState<Product[]>(initialProducts)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('relevancia')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(true)
  
  const availableBrands = useMemo(() => {
    const brandIds = [...new Set(products.map(p => p.brandId))]
    return brandsData.filter(b => brandIds.includes(b.id))
  }, [products])
  
  const { minPrice, maxPrice } = useMemo(() => {
    if (products.length === 0) return { minPrice: 0, maxPrice: 0 }
    const prices = products.map(p => p.price)
    return {
      minPrice: Math.floor(Math.min(...prices) / 100) * 100,
      maxPrice: Math.ceil(Math.max(...prices) / 100) * 100
    }
  }, [products])
  
  const filteredProducts = useMemo(() => {
    let filtered = [...products]
    if (selectedBrands.length > 0) filtered = filtered.filter(p => selectedBrands.includes(p.brandId))
    if (priceRange) filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max)
    if (inStockOnly) filtered = filtered.filter(p => p.inStock)
    
    switch (sortBy) {
      case 'preco-menor': filtered.sort((a, b) => a.price - b.price); break
      case 'preco-maior': filtered.sort((a, b) => b.price - a.price); break
      case 'nome-az': filtered.sort((a, b) => a.name.localeCompare(b.name)); break
      case 'nome-za': filtered.sort((a, b) => b.name.localeCompare(a.name)); break
      case 'novidades': filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break
      default: filtered.sort((a, b) => (a.isFeatured === b.isFeatured) ? 0 : a.isFeatured ? -1 : 1)
    }
    return filtered
  }, [products, selectedBrands, priceRange, inStockOnly, sortBy])
  
  const clearFilters = () => { setSelectedBrands([]); setPriceRange(null); setInStockOnly(false); }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="relative h-64 bg-cover bg-center mb-8" style={{ backgroundImage: `url(${category.image})` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#213A77]/90 to-[#213A77]/70" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
            <Breadcrumbs items={[{ label: 'Produtos', href: '/produtos' }, { label: category.name }]} className="mb-4" />
            <h1 className="text-white mb-2">{category.name}</h1>
            <p className="text-white/90 text-lg max-w-2xl">{category.description}</p>
            <div className="mt-4 flex items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                <span>{filteredProducts.length} peças disponíveis</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8 ">
            <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="flex items-center gap-2 text-gray-900 font-bold"><SlidersHorizontal className="w-5 h-5" /> Filtros</h2>
                  {(selectedBrands.length > 0 || priceRange || inStockOnly) && (
                    <button onClick={clearFilters} className="text-sm text-[#213A77] hover:text-[#FDCC19]">Limpar</button>
                  )}
                </div>
                <div className="mb-6">
                  <h3 className="mb-3 text-gray-900">Marcas</h3>
                  <div className="space-y-2">
                    {availableBrands.map(brand => (
                      <label key={brand.id} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.id)}
                          onChange={() => setSelectedBrands(prev => prev.includes(brand.id) ? prev.filter(id => id !== brand.id) : [...prev, brand.id])}
                          className="w-4 h-4 rounded border-gray-300 text-[#213A77]"
                        />
                        <span className="flex-1 text-sm text-gray-700">{brand.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
            
            <div className="flex-1 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#213A77] text-white rounded-lg"><Filter className="w-4 h-4" /> Filtros</button>
                <p className="text-gray-600 font-medium">{filteredProducts.length} produtos encontrados</p>
                <div className="flex items-center gap-4">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700">
                    <option value="relevancia">Mais Relevantes</option>
                    <option value="preco-menor">Menor Preço</option>
                    <option value="preco-maior">Maior Preço</option>
                    <option value="nome-az">Nome (A-Z)</option>
                    <option value="novidades">Novidades</option>
                  </select>
                  <div className="hidden sm:flex border border-gray-300 rounded-lg">
                    <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-[#213A77] text-white' : 'bg-white text-gray-600'}`}><Grid3x3 className="w-4 h-4" /></button>
                    <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-[#213A77] text-white' : 'bg-white text-gray-600'}`}><List className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
              
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.thumbnail || product.images[0]}
                    code={product.code}
                    brand={product.brandName}
                    deliveryType={product.deliveryType as any}
                    stockQuantity={product.inStock ? 10 : 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhatsAppFloating />
    </>
  )
}