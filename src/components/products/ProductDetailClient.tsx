'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  ShoppingCart,
  Check,
  Truck,
  Shield,
  Plus,
  Minus,
  Package,
  CreditCard,
  RotateCcw,
  BadgeCheck,
  Phone,
  ChevronDown,
  ChevronUp,
  Star,
  MessageCircle,
  Clock,
  Plane,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from 'lucide-react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import type { Product } from '@/data/types'
import { useCart } from '@/contexts/CartContext'
import { motion, AnimatePresence } from 'motion/react'
import { ProductCard } from './ProductCard'
import Link from 'next/link'
import { getWhatsAppUrl } from '@/lib/whatsapp'

const IS_CATALOG_MODE = true

interface ProductDetailClientProps {
  product: Product | null
  relatedProducts: Product[]
}

export const ProductDetailClient = ({
  product,
  relatedProducts,
}: ProductDetailClientProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const { addItem } = useCart()

  const rawImages = product
    ? [product.thumbnail, ...(product.images || [])]
    : []
  const uniqueImages = Array.from(
    new Set(rawImages.filter(Boolean)),
  ) as string[]
  const safeImages =
    uniqueImages.length === 0 ? ['/placeholder.png'] : uniqueImages

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % safeImages.length)
  }

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + safeImages.length) % safeImages.length,
    )
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return
      if (e.key === 'Escape') setIsLightboxOpen(false)
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, nextImage, prevImage])

  if (!product) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center p-4'>
        <h1 className='text-2xl font-bold text-gray-800 mb-2'>
          Produto não encontrado
        </h1>
        <p className='text-gray-600'>
          O produto não foi localizado em nosso catálogo.
        </p>
        <Link href='/produtos' className='mt-4 text-blue-600 hover:underline'>
          Voltar para loja
        </Link>
      </div>
    )
  }
  const deliveryType = product.deliveryType || 'pronta-entrega'

  const getTrustBadges = () => {
    switch (deliveryType) {
      case 'pronta-entrega':
        return {
          delivery: {
            icon: Truck,
            bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
            borderColor: 'border-emerald-200',
            iconColor: 'text-emerald-600',
            titleColor: 'text-emerald-900',
            subtitleColor: 'text-emerald-700',
            title: IS_CATALOG_MODE ? 'Entrega Facilitada' : 'Entrega Rápida',
            subtitle: IS_CATALOG_MODE ? 'Consulte regiões' : '1-7 dias úteis',
          },
          warranty: {
            icon: Shield,
            bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
            borderColor: 'border-blue-200',
            iconColor: 'text-blue-600',
            titleColor: 'text-blue-900',
            subtitleColor: 'text-blue-700',
            title: 'Garantia',
            subtitle: 'Mínimo 90 dias',
          },
        }
      case 'sob-encomenda':
        return {
          delivery: {
            icon: Clock,
            bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
            borderColor: 'border-orange-200',
            iconColor: 'text-orange-600',
            titleColor: 'text-orange-900',
            subtitleColor: 'text-orange-700',
            title: 'Sob Encomenda',
            subtitle: IS_CATALOG_MODE ? 'Consulte prazos' : '15-30 dias',
          },
          warranty: {
            icon: Shield,
            bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
            borderColor: 'border-blue-200',
            iconColor: 'text-blue-600',
            titleColor: 'text-blue-900',
            subtitleColor: 'text-blue-700',
            title: 'Garantia',
            subtitle: 'Mínimo 90 dias',
          },
        }
      case 'importado':
        return {
          delivery: {
            icon: Plane,
            bgColor: 'bg-gradient-to-br from-sky-50 to-sky-100',
            borderColor: 'border-sky-200',
            iconColor: 'text-sky-600',
            titleColor: 'text-sky-900',
            subtitleColor: 'text-sky-700',
            title: 'Importado',
            subtitle: IS_CATALOG_MODE ? 'Consulte prazos' : '30-60 dias',
          },
          warranty: {
            icon: Shield,
            bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
            borderColor: 'border-purple-200',
            iconColor: 'text-purple-600',
            titleColor: 'text-purple-900',
            subtitleColor: 'text-purple-700',
            title: 'Garantia Estendida',
            subtitle: '6 meses',
          },
        }
      default:
        return {
          delivery: {
            icon: Truck,
            bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
            borderColor: 'border-emerald-200',
            iconColor: 'text-emerald-600',
            titleColor: 'text-emerald-900',
            subtitleColor: 'text-emerald-700',
            title: IS_CATALOG_MODE ? 'Entrega Facilitada' : 'Entrega Rápida',
            subtitle: IS_CATALOG_MODE ? 'Consulte regiões' : '1-7 dias úteis',
          },
          warranty: {
            icon: Shield,
            bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
            borderColor: 'border-blue-200',
            iconColor: 'text-blue-600',
            titleColor: 'text-blue-900',
            subtitleColor: 'text-blue-700',
            title: 'Garantia',
            subtitle: 'Mínimo 90 dias',
          },
        }
    }
  }

  const trustBadges = getTrustBadges()

  const handleAddToCart = () => {
    if (IS_CATALOG_MODE) return
    for (let i = 0; i < quantity; i++) {
      addItem({
        ...product,
        id: String(product.id),
        brandName: product.brandName,
        sku: product.code || product.sku,
        thumbnail: product.thumbnail,
      })
    }
    setQuantity(1)
  }

  const handleWhatsApp = () => {
    window.open(getWhatsAppUrl(product.name, product.sku || product.partNumber || product.code), '_blank')
  }

  const faqs = [
    {
      question: 'Esta peça é original ou compatível?',
      answer:
        'Trabalhamos com peças 100% originais de fábrica. Todas nossas peças possuem certificado de autenticidade e garantia do fabricante.',
    },
    {
      question: 'Como faço para comprar?',
      answer:
        'Como atuamos com peças técnicas, preferimos um atendimento consultivo. Clique no botão de WhatsApp para falar com um especialista que confirmará a aplicação correta e passará os valores atualizados.',
    },
    {
      question: 'A peça tem garantia?',
      answer:
        'Sim! Todas as peças possuem garantia de fábrica de no mínimo 90 dias contra defeitos de fabricação. Peças específicas podem ter garantia estendida.',
    },
    {
      question: 'Como sei se a peça é compatível com meu equipamento?',
      answer:
        'Nossa equipe técnica está disponível para confirmar compatibilidade. Entre em contato via WhatsApp com o modelo e série do seu equipamento que faremos a verificação.',
    },
  ]

  const paymentMethods = [
    { name: 'PIX', discount: '5% OFF', icon: '' },
    { name: 'Cartão', installments: 'até 12x', icon: '' },
    { name: 'Boleto', discount: '3% OFF', icon: '' },
    { name: 'Transferência', discount: '3% OFF', icon: '' },
  ]

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <Breadcrumbs
          items={[
            { label: 'Catálogo', href: '/produtos' },
            { label: product.categoryName || 'Peças', href: '/produtos' },
            { label: product.name },
          ]}
        />

        <div className='grid lg:grid-cols-2 gap-12 mt-8 mb-16'>
          <div>
            <div
              className='aspect-square bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 rounded-2xl overflow-hidden mb-4 border-2 border-[var(--neutral-200)] relative group cursor-zoom-in'
              onClick={() => setIsLightboxOpen(true)}>
              <ImageWithFallback
                src={safeImages[selectedImage]}
                alt={product.name}
                className='w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500'
              />
              <div className='absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2'>
                <ZoomIn className='w-4 h-4' />
                Clique para ampliar
              </div>
            </div>

            {safeImages.length > 1 && (
              <div className='grid grid-cols-4 gap-3'>
                {safeImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-[var(--neutral-100)] rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedImage === idx
                        ? 'border-[var(--primary)] shadow-lg'
                        : 'border-transparent'
                    }`}>
                    <ImageWithFallback
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className='w-full h-full object-cover'
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className='inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary)] to-[#1a2d5f] text-white px-5 py-2.5 rounded-full font-bold mb-4 shadow-lg'>
              <BadgeCheck className='w-4 h-4' />
              {product.brandName}
            </div>

            <h1 className='mb-4 text-3xl lg:text-4xl'>{product.name}</h1>

            <div className='flex items-center gap-4 mb-6 flex-wrap'>
              <div className='flex items-center gap-2 bg-[var(--neutral-100)] px-3 py-1.5 rounded-lg'>
                <Package className='w-4 h-4 text-[var(--primary)]' />
                <span className='text-sm'>
                  Código:{' '}
                  <span className='font-bold text-[var(--neutral-900)]'>
                    {product.sku || product.partNumber || product.code}
                  </span>
                </span>
              </div>

              {!IS_CATALOG_MODE && (
                <>
                  <div className='w-2 h-2 bg-[var(--neutral-300)] rounded-full hidden sm:block'></div>
                  <div className='flex items-center gap-2 text-green-600 font-semibold bg-green-50 px-3 py-1.5 rounded-lg'>
                    <Check className='w-4 h-4' />
                    Em estoque
                  </div>
                </>
              )}
            </div>

            {product.compatibility && (
              <div className='bg-gradient-to-r from-[var(--secondary)]/10 via-[var(--secondary)]/5 to-transparent border-l-4 border-[var(--secondary)] rounded-xl p-4 mb-6'>
                <div className='flex items-start gap-3'>
                  <div className='w-10 h-10 bg-[var(--secondary)]/20 rounded-xl flex items-center justify-center flex-shrink-0'>
                    <Check className='w-5 h-5 text-[var(--secondary)]' />
                  </div>
                  <div>
                    <div className='font-black text-[var(--neutral-900)] mb-1'>
                      Compatibilidade
                    </div>
                    <div className='text-[var(--neutral-700)] text-sm leading-relaxed'>
                      {product.compatibility}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className='bg-gradient-to-br from-[var(--neutral-50)] to-white border-2 border-[var(--neutral-200)] rounded-2xl p-6 mb-6'>
              {!IS_CATALOG_MODE ? (
                <>
                  <div className='flex items-baseline gap-3 mb-3'>
                    <div className='text-sm text-[var(--neutral-600)] font-medium'>
                      Preço:
                    </div>
                    <div className='text-5xl font-black text-[var(--primary)]'>
                      R$ {product.price.toFixed(2).split('.')[0]}
                      <span className='text-3xl'>
                        ,{product.price.toFixed(2).split('.')[1]}
                      </span>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-2 mb-4'>
                    {paymentMethods.map((method) => (
                      <div
                        key={method.name}
                        className='bg-white border border-[var(--neutral-200)] rounded-lg p-2 text-center'>
                        <div className='text-lg mb-0.5'>{method.icon}</div>
                        <div className='font-bold text-xs text-[var(--neutral-900)]'>
                          {method.name}
                        </div>
                        {method.discount && (
                          <div className='text-[10px] text-green-600 font-semibold'>
                            {method.discount}
                          </div>
                        )}
                        {method.installments && (
                          <div className='text-[10px] text-[var(--neutral-600)]'>
                            {method.installments}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div>
                  <div className='flex items-baseline gap-3 mb-2'>
                    <div className='flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 w-full'>
                      <Info className='w-4 h-4' />
                      <span className='text-sm font-semibold'>
                        Preço e disponibilidade sob consulta
                      </span>
                    </div>
                  </div>

                  <div className='text-sm text-[var(--neutral-600)] mt-3'>
                    Para garantir a aplicação correta e o melhor preço
                    atualizado, fale com um de nossos consultores.
                  </div>
                </div>
              )}

              <div className='text-xs text-gray-900 text-center mt-2'>
                Condições especiais para atacado • Consulte-nos
              </div>
            </div>

            <div className='space-y-3 mb-6'>
              {!IS_CATALOG_MODE && (
                <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-2 bg-white border-2 border-[var(--neutral-300)] rounded-xl p-1.5'>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className='w-10 h-10 bg-[var(--neutral-100)] hover:bg-[var(--neutral-200)] rounded-lg flex items-center justify-center transition-all'
                      aria-label='Diminuir quantidade'>
                      <Minus className='w-5 h-5 text-[var(--neutral-700)]' />
                    </motion.button>
                    <span className='w-16 text-center font-black text-xl text-[var(--neutral-900)]'>
                      {quantity}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className='w-10 h-10 bg-[var(--neutral-100)] hover:bg-[var(--neutral-200)] rounded-lg flex items-center justify-center transition-all'
                      aria-label='Aumentar quantidade'>
                      <Plus className='w-5 h-5 text-[var(--neutral-700)]' />
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className='flex-1 relative overflow-hidden bg-gradient-to-br from-[var(--primary)] via-[#2847a0] to-[#1a2d5f] text-white py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-[var(--primary)]/50 transition-all flex items-center justify-center gap-3 group border-2 border-white/20'>
                    <div className='absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity' />
                    <ShoppingCart className='w-6 h-6 relative z-10 group-hover:scale-110 transition-transform' />
                    <span className='relative z-10'>Adicionar ao Carrinho</span>
                  </motion.button>
                </div>
              )}

              {IS_CATALOG_MODE && (
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  className='w-full relative overflow-hidden bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-[#25D366]/50 transition-all flex items-center justify-center gap-3 group border-2 border-white/20 cursor-pointer'>
                  <div className='absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity' />
                  <MessageCircle className='w-6 h-6 relative z-10 group-hover:scale-110 transition-transform' />
                  <span className='relative z-10'>Solicitar cotação</span>
                </motion.button>
              )}

              {!IS_CATALOG_MODE && (
                <div className='text-center text-sm text-[var(--neutral-600)]'>
                  <span className='font-semibold text-green-600'>
                    ✓ Estoque disponível
                  </span>{' '}
                  • Envio imediato
                </div>
              )}
            </div>

            <div className='space-y-3 mb-6'>
              {!IS_CATALOG_MODE && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  className='w-full bg-gradient-to-r from-[#25D366] to-[#20BD5A] text-white py-4 px-6 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20'>
                  <MessageCircle className='w-5 h-5' />
                  Dúvidas? Fale conosco
                </motion.button>
              )}
            </div>

            <div className='grid grid-cols-2 gap-3 mb-6'>
              <div
                className={`text-center p-4 bg-gray-50 border border-gray-200 rounded-xl`}>
                <div className='flex items-center justify-center mb-2'>
                  <Shield className={`w-8 h-8 text-blue-600`} />
                </div>
                <div className={`text-xs text-gray-900 font-bold`}>
                  Garantia Assegurada
                </div>
                <div className={`text-[10px] text-gray-600`}>
                  Peças com procedência
                </div>
              </div>

              <div className='text-center p-4 bg-gray-50 rounded-xl border border-gray-200'>
                <div className='flex items-center justify-center mb-2'>
                  <BadgeCheck className='w-8 h-8 text-green-600' />
                </div>
                <div className='text-xs text-gray-900 font-bold'>
                  Qualidade Original
                </div>
                <div className='text-[10px] text-gray-600'>Certificada</div>
              </div>
            </div>

            <div className='bg-gradient-to-br from-slate-50 to-white border border-[var(--neutral-200)] rounded-xl p-4'>
              <div className='grid grid-cols-2 gap-3 text-xs'>
                <div className='flex items-center gap-2'>
                  <RotateCcw className='w-4 h-4 text-[var(--primary)]' />
                  <span className='text-[var(--neutral-700)]'>Troca fácil</span>
                </div>
                {!IS_CATALOG_MODE && (
                  <div className='flex items-center gap-2'>
                    <CreditCard className='w-4 h-4 text-[var(--primary)]' />
                    <span className='text-[var(--neutral-700)]'>
                      Parcele em 12x
                    </span>
                  </div>
                )}
                <div className='flex items-center gap-2'>
                  <BadgeCheck className='w-4 h-4 text-[var(--primary)]' />
                  <span className='text-[var(--neutral-700)]'>
                    Peça original
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Phone className='w-4 h-4 text-[var(--primary)]' />
                  <span className='text-[var(--neutral-700)]'>
                    Suporte técnico
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mb-16'>
          <div className='border-b border-[var(--neutral-200)] mb-8'>
            <div className='flex gap-8'>
              <button className='pb-4 border-b-2 border-[var(--primary)] text-[var(--primary)] font-bold'>
                Descrição
              </button>
            </div>
          </div>

          <div className='grid lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2'>
              <h2 className='mb-6 text-2xl'>Descrição do Produto</h2>
              <div className='prose max-w-none text-[var(--neutral-700)] leading-relaxed space-y-4'>
                <p className='text-base'>
                  {product.description ||
                    'Peça de alta qualidade para equipamentos pesados.'}
                </p>
                <p className='text-base'>
                  Esta peça {product.brandName} é ideal para manutenção
                  preventiva e corretiva de equipamentos pesados. Entre em
                  contato para verificar a aplicação exata.
                </p>
              </div>
            </div>

            <div>
              <div className='bg-gradient-to-br from-slate-50 to-white border-2 border-[var(--neutral-200)] rounded-2xl p-6 sticky top-24 shadow-lg'>
                <h3 className='mb-5 flex items-center gap-2 text-xl font-black'>
                  <Package className='w-5 h-5 text-[var(--primary)]' />
                  Especificações Técnicas
                </h3>
                <dl className='space-y-3'>
                  <div className='bg-white rounded-xl p-3 border border-[var(--neutral-200)] shadow-sm'>
                    <dt className='text-xs text-[var(--neutral-600)] uppercase tracking-wider font-bold mb-1'>
                      Marca
                    </dt>
                    <dd className='font-black text-[var(--primary)]'>
                      {product.brandName}
                    </dd>
                  </div>
                  <div className='bg-white rounded-xl p-3 border border-[var(--neutral-200)] shadow-sm'>
                    <dt className='text-xs text-[var(--neutral-600)] uppercase tracking-wider font-bold mb-1'>
                      Código
                    </dt>
                    <dd className='font-black text-[var(--primary)]'>
                      {product.sku || product.partNumber || product.code}
                    </dd>
                  </div>
                  <div className='bg-white rounded-xl p-3 border border-[var(--neutral-200)] shadow-sm'>
                    <dt className='text-xs text-[var(--neutral-600)] uppercase tracking-wider font-bold mb-1'>
                      Categoria
                    </dt>
                    <dd className='font-black text-[var(--primary)]'>
                      {product.categoryName}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className='mb-16 max-w-3xl mx-auto'>
          <div className='text-center mb-8'>
            <h2 className='mb-3 text-3xl'>Perguntas Frequentes</h2>
            <p className='text-[var(--neutral-600)]'>
              Tudo o que você precisa saber sobre este produto
            </p>
          </div>
          <div className='space-y-3'>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className='bg-white border-2 border-[var(--neutral-200)] rounded-xl overflow-hidden hover:border-[var(--primary)]/30 transition-colors'>
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className='w-full px-6 py-4 flex items-center justify-between gap-4 text-left'>
                  <span className='font-bold text-[var(--neutral-900)]'>
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <ChevronUp className='w-5 h-5 text-[var(--primary)] flex-shrink-0' />
                  ) : (
                    <ChevronDown className='w-5 h-5 text-[var(--neutral-400)] flex-shrink-0' />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className='px-6 pb-4'>
                    <p className='text-[var(--neutral-700)] leading-relaxed'>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className='mb-12'>
            <div className='text-center mb-8'>
              <h2 className='mb-3 text-3xl'>Produtos Relacionados</h2>
              <p className='text-[var(--neutral-600)]'>
                Outras peças que podem te interessar
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  image={p.thumbnail}
                  code={p.code}
                  partNumber={p.partNumber}
                  brand={p.brandName}
                  deliveryType={p.deliveryType}
                  stockQuantity={p.inStock ? 10 : 0}
                  thumbnail={p.thumbnail}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4'>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className='absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50'>
              <X className='w-8 h-8' />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center'>
              <ImageWithFallback
                src={safeImages[selectedImage]}
                alt={product.name}
                className='w-full h-full object-contain'
              />

              {safeImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className='absolute left-0 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-r-xl transition-all'>
                    <ChevronLeft className='w-8 h-8' />
                  </button>
                  <button
                    onClick={nextImage}
                    className='absolute right-0 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-l-xl transition-all'>
                    <ChevronRight className='w-8 h-8' />
                  </button>

                  <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4 py-2 bg-black/40 backdrop-blur-md rounded-full'>
                    {safeImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                          selectedImage === idx
                            ? 'border-white opacity-100'
                            : 'border-transparent opacity-50 hover:opacity-80'
                        }`}>
                        <ImageWithFallback
                          src={img}
                          alt=''
                          className='w-full h-full object-cover'
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}