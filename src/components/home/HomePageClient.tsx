/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingCart, Star, TrendingUp, Package, Truck, CreditCard, Shield,
  ArrowRight, ChevronLeft, ChevronRight, Percent
} from 'lucide-react'
import { ProductCard } from '@/components/products/ProductCard'
import { QuickViewModal } from '@/components/products/QuickViewModal'
import { products, brands } from '@/data/mockData'

type DeliveryType = 'pronta-entrega' | 'sob-encomenda' | 'importado'

const normalizeDeliveryType = (value: unknown): DeliveryType | undefined => {
  if (value === 'pronta-entrega' || value === 'sob-encomenda' || value === 'importado') {
    return value
  }
  return undefined
}

export const HomePageClient = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8)
  const newProducts = products.slice(0, 8)

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1665152998573-9ddafb89278f?w=1920&h=600&fit=crop',
      title: 'Peças Originais Caterpillar',
      subtitle: 'Entrega Rápida em Todo Brasil',
      cta: 'Ver Produtos',
      link: '/produtos?marca=caterpillar'
    },
    {
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&h=600&fit=crop',
      title: 'Sistema Hidráulico Completo',
      subtitle: 'Peças Genuínas com Garantia',
      cta: 'Conferir',
      link: '/categoria/sistema-hidraulico'
    },
    {
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&h=600&fit=crop',
      title: 'Filtros de Alta Performance',
      subtitle: 'Estoque Permanente',
      cta: 'Comprar Agora',
      link: '/categoria/filtros'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        <div className="relative h-[450px] lg:h-[550px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0">
                <Image
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
              </div>

              <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
                <div className="max-w-2xl">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white font-black text-4xl lg:text-6xl mb-4 leading-tight"
                  >
                    {heroSlides[currentSlide].title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-[var(--secondary)] text-2xl lg:text-3xl font-bold mb-8"
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link href={heroSlides[currentSlide].link}>
                      <button className="bg-[var(--secondary)] hover:bg-[#ffd93d] text-black px-10 py-4 rounded-xl font-black text-lg shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3">
                        <ShoppingCart className="w-6 h-6" />
                        <span>{heroSlides[currentSlide].cta}</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-20 border border-white/20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-20 border border-white/20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-[var(--secondary)] w-8'
                    : 'bg-white/50 w-6 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900">Entrega Rápida</div>
                <div className="text-xs text-gray-600">Para todo Brasil</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900">Estoque Próprio</div>
                <div className="text-xs text-gray-600">Pronta entrega</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900">Parcele em 12x</div>
                <div className="text-xs text-gray-600">No cartão</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <Percent className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900">Desconto no PIX</div>
                <div className="text-xs text-gray-600">À vista</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h2 className="font-black text-3xl text-gray-900">Produtos em Destaque</h2>
                <p className="text-gray-600 text-sm">Nossas peças mais procuradas</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => {
              const deliveryType = normalizeDeliveryType((product as any).deliveryType)
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard
                  image={''} {...product}
                  deliveryType={deliveryType}
                  onQuickView={() => setSelectedProduct(product)}
                  showInstallments={true}
                  installmentsCount={12}                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-black text-3xl text-gray-900">Recém Chegados</h2>
                <p className="text-gray-600 text-sm">Últimas adições ao nosso catálogo</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.map((product, index) => {
              const deliveryType = normalizeDeliveryType((product as any).deliveryType)
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard
                  image={''} {...product}
                  deliveryType={deliveryType}
                  onQuickView={() => setSelectedProduct(product)}
                  showInstallments={true}
                  installmentsCount={12}                  />
                </motion.div>
              )
            })}
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
