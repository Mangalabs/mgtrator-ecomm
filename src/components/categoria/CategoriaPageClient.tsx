'use client'

import { useState, useMemo } from 'react'
import { Category, Product } from '@/data/types'
import { ProductCard } from '@/components/products/ProductCard'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { WhatsAppFloating } from '@/components/layout/WhatsAppFloating'
import { brandsData } from '@/data/brands'
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
    
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brandId))
    }
    
    if (priceRange) {
      filtered = filtered.filter(p => 
        p.price >= priceRange.min && p.price <= priceRange.max
      )
    }
    
    if (inStockOnly) {
      filtered = filtered.filter(p => p.inStock)
    }
    
    switch (sortBy) {
      case 'preco-menor':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'preco-maior':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'nome-az':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'nome-za':
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'novidades':
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        break
      default: 
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1
          if (!a.isFeatured && b.isFeatured) return 1
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return (b.rating || 0) - (a.rating || 0)
        })
    }
    
    return filtered
  }, [products, selectedBrands, priceRange, inStockOnly, sortBy])
  
  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    )
  }
  
  const clearFilters = () => {
    setSelectedBrands([])
    setPriceRange(null)
    setInStockOnly(false)
  }
  
  const hasActiveFilters = selectedBrands.length > 0 || priceRange !== null || inStockOnly
  
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div 
          className="relative h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#213A77]/90 to-[#213A77]/70" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
            <Breadcrumbs
              items={[
                { label: 'Produtos', href: '/produtos' },
                { label: category.name, href: `/categoria/${category.slug}` }
              ]}
              className="mb-4"
            />
            <h1 className="text-white mb-2">
              {category.name}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl">
              {category.description}
            </p>
            <div className="mt-4 flex items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                <span>{filteredProducts.length} peças disponíveis</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="flex items-center gap-2 text-gray-900">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filtros
                  </h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-[#213A77] hover:text-[#FDCC19] transition-colors"
                    >
                      Limpar
                    </button>
                  )}
                </div>
                
                <div className="mb-6">
                  <h3 className="mb-3 text-gray-900">
                    Marcas
                  </h3>
                  <div className="space-y-2">
                    {availableBrands.map(brand => {
                      const count = products.filter(p => p.brandId === brand.id).length
                      return (
                        <label
                          key={brand.id}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand.id)}
                            onChange={() => toggleBrand(brand.id)}
                            className="w-4 h-4 rounded border-gray-300 text-[#213A77] focus:ring-[#FDCC19]"
                          />
                          <span className="flex-1 text-sm text-gray-700">{brand.name}</span>
                          <span className="text-xs text-gray-500">({count})</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="mb-3 text-gray-900">
                    Faixa de Preço
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Mínimo</label>
                      <input
                        type="number"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange?.min || minPrice}
                        onChange={(e) => setPriceRange({
                          min: Number(e.target.value),
                          max: priceRange?.max || maxPrice
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCC19] focus:border-[#213A77]"
                        placeholder="R$ 0"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Máximo</label>
                      <input
                        type="number"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange?.max || maxPrice}
                        onChange={(e) => setPriceRange({
                          min: priceRange?.min || minPrice,
                          max: Number(e.target.value)
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCC19] focus:border-[#213A77]"
                        placeholder={`R$ ${maxPrice}`}
                      />
                    </div>
                    {priceRange && (
                      <div className="text-sm text-gray-600">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceRange.min)}
                        {' - '}
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceRange.max)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="mb-3 text-gray-900">
                    Disponibilidade
                  </h3>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-[#213A77] focus:ring-[#FDCC19]"
                    />
                    <span className="text-sm text-gray-700">Apenas em estoque</span>
                  </label>
                </div>
              </div>
            </aside>
            
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#213A77] text-white rounded-lg hover:bg-[#213A77]/90 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    Filtros
                  </button>
                  <p className="text-gray-600">
                    <span className="font-semibold text-[#213A77]">{filteredProducts.length}</span>
                    {' '}
                    {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCC19] focus:border-[#213A77] bg-white text-gray-700"
                    >
                      <option value="relevancia">Mais Relevantes</option>
                      <option value="preco-menor">Menor Preço</option>
                      <option value="preco-maior">Maior Preço</option>
                      <option value="nome-az">Nome (A-Z)</option>
                      <option value="nome-za">Nome (Z-A)</option>
                      <option value="novidades">Novidades</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                  
                  <div className="hidden sm:flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-[#213A77] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-[#213A77] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.thumbnail}
                      code={product.code}
                      brand={product.brandName}
                      stock={product.inStock ? 'in-stock' : 'out-of-stock'}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl mb-2 text-gray-900">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Não encontramos produtos com os filtros selecionados.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-[#213A77] text-white rounded-lg hover:bg-[#213A77]/90 transition-colors"
                  >
                    Limpar Filtros
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl mb-4 text-[#213A77]">
              Sobre {category.name}
            </h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700">
                A MG Trator Peças oferece uma linha completa de {category.name.toLowerCase()} para máquinas pesadas 
                das principais marcas do mercado. Todas as peças são originais e contam com garantia do fabricante.
              </p>
              <p className="text-gray-700">
                Nossa equipe técnica especializada está pronta para ajudar você a encontrar a peça correta 
                para seu equipamento. Entre em contato via WhatsApp ou telefone para mais informações.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <WhatsAppFloating />
    </>
  )
}