'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from '@/components/products/ProductCard'
import { QuickViewModal } from '@/components/products/QuickViewModal'
import { products } from '@/data/mockData'
import type { Product } from '@/data/types'

export const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  
  const featuredProducts = products.filter((p) => p.isFeatured)

  return (
    <>
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-black text-4xl md:text-5xl text-slate-900 mb-5">
              Produtos em Destaque
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Confira nossa seleção de peças mais procuradas para maquinas pesadas e máquinas pesadas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7 mb-12">
            {featuredProducts.map((product) => (
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

          <div className="text-center">
            <Link
              href="/produtos"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#213A77] to-[#1a2d5e] text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  )
}