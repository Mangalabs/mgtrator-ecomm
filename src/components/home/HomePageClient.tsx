'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingCart,
  Star,
  Truck,
  Warehouse,
  CreditCard,
  QrCode,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
} from 'lucide-react'
import { ProductCard } from '@/components/products/ProductCard'
import { QuickViewModal } from '@/components/products/QuickViewModal'
import type { Product } from '@/data/types'

type DeliveryType = 'pronta-entrega' | 'sob-encomenda' | 'importado'

const normalizeDeliveryType = (value: unknown): DeliveryType | undefined => {
  if (
    value === 'pronta-entrega' ||
    value === 'sob-encomenda' ||
    value === 'importado'
  ) {
    return value
  }
  return undefined
}

type HomePageClientProps = {
  featuredProducts: Product[]
  newProducts: Product[]
}

const buttonStyles = {
  products: {
    bg: 'bg-gradient-to-r from-[var(--secondary)] to-[#ffd93d] text-black hover:scale-105',
    Icon: ShoppingCart,
  },
  quote: {
    bg: 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:scale-105',
    Icon: MessageCircle,
  },
  location: {
    bg: 'bg-gradient-to-r from-[#0f0f62] to-[#12128c] text-white hover:scale-105',
    Icon: MapPin,
  },
} as const

type SlideType = keyof typeof buttonStyles

const heroSlides: Array<{
  image: string
  title: string
  subtitle: string
  description: string[]
  cta: string
  link: string
  type: SlideType
}> = [
  {
    image: '/escavadeira-cat.jpg',
    title: 'Peças para Máquinas Pesadas',
    subtitle:
      'Especialistas em peças originais Volvo e Caterpillar para todo o Brasil',
    description: [
      'Referência nacional na venda de peças para linha amarela — escavadeiras, carregadeiras, motoniveladoras, retroescavadeiras e outros equipamentos pesados.',
      'Peças originais e componentes de reposição para motor, sistema hidráulico, transmissão, material rodante e demais sistemas essenciais.',
    ],
    cta: 'Ver Produtos',
    link: '/produtos',
    type: 'products',
  },
  {
    image: '/retroescavadeira-cat.jpg',
    title: 'Precisa da Peça Certa para sua Máquina Pesada?',
    subtitle:
      'Solicite sua cotação com especialistas em peças para linha amarela',
    description: [
      'Nossa equipe técnica identifica a peça correta pelo código, modelo da máquina ou número de série, evitando compras erradas e máquinas paradas.',
      'Atendimento ágil pelo WhatsApp com orçamento sem compromisso para equipamentos de construção.',
    ],
    cta: 'Falar com Especialista',
    link: '/contato',
    type: 'quote',
  },
  {
    image: '/carregadeira-volvo.jpg',
    title: 'Prefere Comprar Presencialmente?',
    subtitle: 'Visite nossa loja física e veja o estoque de perto',
    description: [
      'Temos loja física com estoque disponível para retirada imediata. Nossos consultores estão prontos para te atender.',
      'Funcionamos de segunda a sexta das 8h às 18h. Venha nos visitar!',
    ],
    cta: 'Ver Endereço',
    link: '/lojas',
    type: 'location',
  },
]

export function Highlights() {
  const features = [
    {
      icon: <Truck className='w-8 h-8' />,
      title: 'Entrega Rápida',
      description: 'Para todo Brasil',
      iconBg: 'bg-yellow-400',
      iconColor: 'text-blue-900',
      accentColor: 'bg-yellow-400',
    },
    {
      icon: <Warehouse className='w-8 h-8' />,
      title: 'Estoque Próprio',
      description: 'Pronta entrega',
      iconBg: 'bg-blue-600',
      iconColor: 'text-white',
      accentColor: 'bg-blue-600',
    },
    {
      icon: <CreditCard className='w-8 h-8' />,
      title: 'Parcele em 12x',
      description: 'No cartão',
      iconBg: 'bg-yellow-400',
      iconColor: 'text-blue-900',
      accentColor: 'bg-yellow-400',
    },
    {
      icon: <QrCode className='w-8 h-8' />,
      title: 'Desconto no PIX',
      description: 'À vista',
      iconBg: 'bg-blue-600',
      iconColor: 'text-white',
      accentColor: 'bg-blue-600',
    },
  ]

  return (
    <section className='relative bg-slate-50 overflow-hidden'>
      <div className=' max-w-9/10 mx-auto  relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className='flex items-center gap-5 p-6 rounded-xl bg-white shadow-md border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden'>
              <div
                className={`absolute left-0 top-0 bottom-0 w-2 ${feature.accentColor}`}></div>

              <div
                className={`p-4 rounded-lg ${feature.iconBg} ${feature.iconColor} shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                {feature.icon}
              </div>

              <div className='flex flex-col gap-1'>
                <h3 className='text-slate-900 font-bold text-xl leading-snug group-hover:text-blue-900 transition-colors'>
                  {feature.title}
                </h3>

                <p className='text-slate-600 font-medium text-base leading-normal'>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const HomePageClient = ({
  featuredProducts,
  newProducts,
}: HomePageClientProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    )

  return (
    <div className='min-h-screen bg-[#F5F5F5]'>
      <section className='relative bg-linear-to-br from-[#1a2d5e] to-[#0c162d] overflow-hidden min-h-[calc(100vh-100px)] flex flex-col justify-center py-32 md:py-40 lg:py-48'>
        <div
          className='absolute inset-0 bg-[url("/icon.png")] bg-repeat opacity-8 bg-[length:80px_80px] pointer-events-none'
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, black 0%, transparent 90%)',
            maskImage: 'linear-gradient(to right, black 0%, transparent 90%)',
          }}
        />
        <div className='relative w-full h-[500px] md:h-[450px] lg:h-[550px]'>
          {heroSlides.map((slide, index) => {
            const isActive = currentSlide === index
            const { bg, Icon } = buttonStyles[slide.type]

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 ${isActive ? 'z-10' : 'z-0 pointer-events-none'}`}>
                <div className='absolute inset-0'>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes='100vw'
                    className='object-cover'
                    priority={index === 0}
                  />
                  <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent' />
                </div>

                <div className='relative h-full max-w-9/10 mx-auto px-6 md:px-20 lg:px-24 flex items-center'>
                  <div className='max-w-2xl'>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: 0.2 }}
                      className='text-white font-black text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6 leading-tight'>
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: 0.3 }}
                      className='text-[var(--secondary)] text-lg md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6'>
                      {slide.subtitle}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: 0.35 }}
                      className='mb-8 md:mb-10 space-y-2 hidden sm:block'>
                      {slide.description.map((line, i) => (
                        <p
                          key={i}
                          className='text-white/80 text-sm md:text-base leading-relaxed'>
                          {line}
                        </p>
                      ))}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: 0.4 }}>
                      <Link href={slide.link}>
                        <button
                          className={`${bg} px-8 py-3 md:px-10 md:py-4 rounded-xl font-black text-base md:text-lg shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3`}>
                          <Icon className='w-5 h-5 md:w-6 md:h-6' />
                          <span>{slide.cta}</span>
                          <ArrowRight className='w-4 h-4 md:w-5 md:h-5' />
                        </button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}

          <button
            onClick={prevSlide}
            className='hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full items-center justify-center transition-all z-20 border border-white/20'>
            <ChevronLeft className='w-6 h-6 text-white' />
          </button>
          <button
            onClick={nextSlide}
            className='hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full items-center justify-center transition-all z-20 border border-white/20'>
            <ChevronRight className='w-6 h-6 text-white' />
          </button>

          <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20'>
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 md:h-1 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-[var(--secondary)] w-8'
                    : 'bg-white/50 w-6 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <Highlights />

      <section className='py-12 bg-[#F5F5F5]'>
        <div className='w-full max-w-9/10 mx-auto px-4'>
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-3'>
              <div>
                <h2 className='font-black text-3xl text-blue-900 uppercase font-bold'>
                  Produtos em Destaque
                </h2>
                <div className='h-2 md:w-72  rounded-full bg-linear-to-r from-blue-900 to-blue-200/5'></div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {featuredProducts.map((product, index) => {
              const deliveryType = normalizeDeliveryType(product.deliveryType)
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.thumbnail}
                    code={product.code}
                    partNumber={product.partNumber}
                    deliveryType={deliveryType}
                    stockQuantity={product.inStock ? 100 : 0}
                    thumbnail={product.thumbnail}
                    onQuickView={() => setSelectedProduct(product)}
                    showInstallments={true}
                    installmentsCount={12}
                  />
                </motion.div>
              )
            })}
          </div>

          <div className='mt-10 flex justify-center'>
            <Link href='/produtos'>
              <button className='bg-gradient-to-r from-[#0f0f62] to-[#12128c] text-white px-8 py-3 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2'>
                Ver Todos os Produtos
                <ArrowRight className='w-5 h-5' />
              </button>
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
    </div>
  )
}
