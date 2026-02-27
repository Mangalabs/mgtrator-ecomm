'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from '@/components/products/ProductCard'
import { QuickViewModal } from '@/components/products/QuickViewModal'
import { getFeaturedProducts } from '@/services/api'
import type { Product } from '@/data/types'

export const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true)
        const response = await getFeaturedProducts(6)
        if (response.success && response.data) {
          setFeaturedProducts(response.data)
        }
      } catch (error) {
        setFeaturedProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  if (!loading && featuredProducts.length === 0) return null

  return (
    <>
      <section className='py-20 bg-white relative overflow-hidden'>
        <div
          className='absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white'
          aria-hidden='true'
        />

        <div className='relative max-w-7xl mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='font-black text-4xl md:text-5xl text-slate-900 mb-5'>
              Produtos em Destaque
            </h2>
            <p className='text-xl text-slate-600 max-w-3xl mx-auto'>
              Confira nossa seleção de peças mais procuradas para máquinas
              pesadas e equipamentos industriais
            </p>
          </div>

          {loading ? (
            <div className='flex flex-col items-center justify-center py-20 gap-4'>
              <Loader2 className='w-10 h-10 text-[#213A77] animate-spin' />
              <p className='text-slate-500 font-medium'>
                Carregando destaques...
              </p>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7 mb-12'>
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
                    stockQuantity={product.stockQuantity ?? 0}
                    thumbnail={product.thumbnail}
                    onQuickView={() => setSelectedProduct(product)}
                  />
                ))}
              </div>

              <div className='text-center'>
                <Link
                  href='/produtos'
                  className='group inline-flex items-center gap-3 bg-gradient-to-r from-[#213A77] to-[#1a2d5f] text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:scale-105 transition-all'>
                  <span>Ver Catálogo Completo</span>
                  <ArrowRight className='w-6 h-6 group-hover:translate-x-2 transition-transform' />
                </Link>
              </div>
            </>
          )}
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
