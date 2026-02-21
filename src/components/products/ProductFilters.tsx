'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/data/types'
import { categories, brands } from '@/data/mockData'
import { Filter } from 'lucide-react'

interface ProductFiltersProps {
  onFilter: (filtered: Product[]) => void
  allProducts: Product[]
}

export const ProductFilters = ({ onFilter, allProducts }: ProductFiltersProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [inStockOnly, setInStockOnly] = useState(false)

  useEffect(() => {
    let filtered = [...allProducts]

    if (selectedCategory) {
      filtered = filtered.filter(p => p.categoryId === selectedCategory)
    }

    if (selectedBrand) {
      filtered = filtered.filter(p => p.brandId === selectedBrand)
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      filtered = filtered.filter(p => {
        if (max) return p.price >= min && p.price <= max
        return p.price >= min
      })
    }

    if (inStockOnly) {
      filtered = filtered.filter(p => p.inStock)
    }

    onFilter(filtered)
  }, [selectedCategory, selectedBrand, priceRange, inStockOnly, allProducts, onFilter])

  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedBrand('')
    setPriceRange('all')
    setInStockOnly(false)
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 w-full lg:w-72">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#213A77]" />
          <h2 className="font-black text-lg">Filtros</h2>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-[#213A77] hover:underline font-semibold"
        >
          Limpar
        </button>
      </div>

      <div className="mb-6">
        <label className="font-bold text-sm text-slate-900 mb-3 block">Categoria</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-[#213A77] focus:outline-none"
        >
          <option value="">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="font-bold text-sm text-slate-900 mb-3 block">Marca</label>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-[#213A77] focus:outline-none"
        >
          <option value="">Todas as marcas</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="font-bold text-sm text-slate-900 mb-3 block">Faixa de Preço</label>
        <div className="space-y-2">
          {[
            { label: 'Todos os preços', value: 'all' },
            { label: 'Até R$ 500', value: '0-500' },
            { label: 'R$ 500 - R$ 1.000', value: '500-1000' },
            { label: 'R$ 1.000 - R$ 2.000', value: '1000-2000' },
            { label: 'Acima de R$ 2.000', value: '2000-999999' },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                value={option.value}
                checked={priceRange === option.value}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-4 h-4 text-[#213A77]"
              />
              <span className="text-sm text-slate-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-5 h-5 rounded text-[#213A77]"
          />
          <span className="font-semibold text-sm text-slate-900">Apenas em estoque</span>
        </label>
      </div>
    </div>
  )
}
