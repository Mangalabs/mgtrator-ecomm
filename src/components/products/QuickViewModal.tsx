'use client'

import { useState } from 'react'
import { X, Clock, Plane, Zap, ShoppingBag, Tag, Sparkles, Truck, Shield, CheckCircle, Plus, Minus, ShoppingCart, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { useCart } from '@/contexts/CartContext'
import type { Product } from '@/data/types'

interface QuickViewModalProps {
  product: Product | null
  onClose: () => void
}

const DELIVERY_CONFIG = {
  'pronta-entrega': {
    icon: Zap,
    label: 'Pronta Entrega',
    style: {
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      border: 'border-emerald-300',
      text: 'text-emerald-800',
      icon: 'text-emerald-600',
      dot: 'bg-emerald-500'
    },
    badges: {
      delivery: {
        Icon: Truck,
        style: 'text-emerald-600',
        title: 'Entrega Rápida',
        subtitle: '1-7 dias úteis'
      },
      warranty: {
        Icon: Shield,
        style: 'text-blue-600',
        title: 'Garantia',
        subtitle: 'Mín. 90 dias'
      }
    }
  },
  'sob-encomenda': {
    icon: Clock,
    label: 'Sob Encomenda',
    style: {
      bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
      border: 'border-orange-300',
      text: 'text-orange-800',
      icon: 'text-orange-600',
      dot: 'bg-orange-500'
    },
    badges: {
      delivery: {
        Icon: Clock,
        style: 'text-orange-600',
        title: 'Sob Encomenda',
        subtitle: '15-30 dias'
      },
      warranty: {
        Icon: Shield,
        style: 'text-blue-600',
        title: 'Garantia',
        subtitle: 'Mín. 90 dias'
      }
    }
  },
  'importado': {
    icon: Plane,
    label: 'Importado',
    style: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-300',
      text: 'text-blue-800',
      icon: 'text-blue-600',
      dot: 'bg-blue-500'
    },
    badges: {
      delivery: {
        Icon: Plane,
        style: 'text-sky-600',
        title: 'Importado',
        subtitle: '30-60 dias'
      },
      warranty: {
        Icon: Shield,
        style: 'text-purple-600',
        title: 'Garantia Estendida',
        subtitle: '6 meses'
      }
    }
  }
} as const

export const QuickViewModal = ({ product, onClose }: QuickViewModalProps) => {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  if (!product) return null

  const productCode = product.code || product.partNumber || product.sku
  const deliveryType = (product.deliveryType as keyof typeof DELIVERY_CONFIG) || 'pronta-entrega'
  const config = DELIVERY_CONFIG[deliveryType] || DELIVERY_CONFIG['pronta-entrega']
  const DeliveryIcon = config.icon
  
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) 
    : 0

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá! Gostaria de consultar a peça:\n\n*${product.name}*\nCódigo: ${productCode}\nPreço: R$ ${product.price.toFixed(2)}\n\nPode me ajudar?`
    )
    window.open(`https://wa.me/5531998753200?text=${message}`, '_blank')
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    onClose()
  }

  const { delivery: deliveryBadge, warranty: warrantyBadge } = config.badges

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="bg-white rounded-[32px] w-full max-w-[1000px] shadow-[0_20px_70px_rgba(0,0,0,0.3)] overflow-hidden border border-[var(--neutral-200)] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gradient-to-br from-[var(--primary)] via-[#1a2d5f] to-[var(--primary)] px-6 py-4 overflow-hidden sticky top-0 z-10">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-white/15 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                  <ShoppingBag className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="modal-title" className="text-white font-black text-lg tracking-tight">
                    Visualização Rápida
                  </h2>
                  <p className="text-white/60 text-xs font-medium">Informações do produto</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all backdrop-blur-xl border border-white/20 cursor-pointer"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-white via-slate-50/30 to-white">
            <div className="grid lg:grid-cols-[400px_1fr] gap-6">
              
              <div>
                <div className="relative aspect-square bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 rounded-[24px] overflow-hidden border-2 border-[var(--neutral-200)] shadow-xl group">
                  {product.thumbnail && (
                    <Image
                      src={product.thumbnail}
                      alt={`${product.name} - ${product.brandName}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

                  {hasDiscount && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
                      animate={{ opacity: 1, scale: 1, rotate: -6 }}
                      className="absolute top-4 right-4 backdrop-blur-2xl bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-red-400/30"
                    >
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                      <span className="font-black text-sm">-{discountPercent}%</span>
                    </motion.div>
                  )}

                  <div className="absolute top-4 left-4 backdrop-blur-2xl bg-white/95 border border-white/60 px-4 py-2.5 rounded-2xl shadow-2xl">
                    <span className="text-sm font-black text-[var(--primary)] uppercase tracking-wider">
                      {product.brandName}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="text-center p-3 bg-[var(--neutral-50)] rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <deliveryBadge.Icon className={`w-6 h-6 ${deliveryBadge.style}`} />
                    </div>
                    <div className="text-[10px] text-[var(--neutral-600)] font-semibold">{deliveryBadge.title}</div>
                    <div className="text-[8px] text-[var(--neutral-600)] font-semibold">{deliveryBadge.subtitle}</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--neutral-50)] rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <warrantyBadge.Icon className={`w-6 h-6 ${warrantyBadge.style}`} />
                    </div>
                    <div className="text-[10px] text-[var(--neutral-600)] font-semibold">{warrantyBadge.title}</div>
                    <div className="text-[8px] text-[var(--neutral-600)] font-semibold">{warrantyBadge.subtitle}</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--neutral-50)] rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-[10px] text-[var(--neutral-600)] font-semibold">100% Original</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-black text-2xl text-[var(--neutral-900)] mb-3 leading-tight">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2.5 flex-wrap mb-4">
                    {productCode && (
                      <div className="inline-flex items-center gap-2 bg-gradient-to-br from-[var(--neutral-100)] to-[var(--neutral-200)] px-3.5 py-2 rounded-xl border border-[var(--neutral-300)] shadow-sm">
                        <Tag className="w-3.5 h-3.5 text-[var(--primary)]" />
                        <span className="text-xs text-[var(--neutral-900)] font-mono font-black tracking-wider">
                          {productCode}
                        </span>
                      </div>
                    )}

                    <div className={`${config.style.bg} border-2 ${config.style.border} rounded-xl px-3 py-2 shadow-md inline-flex items-center gap-2`}>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${config.style.dot}`} />
                        <DeliveryIcon className={`w-3.5 h-3.5 ${config.style.icon}`} />
                      </div>
                      <span className={`text-xs font-black ${config.style.text}`}>
                        {config.label}
                      </span>
                    </div>
                  </div>

                  {product.description && (
                    <p className="text-[var(--neutral-700)] leading-relaxed mb-4 text-sm">
                      {product.description}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  {hasDiscount && (
                    <div className="flex items-center gap-3">
                      <span className="text-base text-[var(--neutral-400)] line-through font-medium">
                        R$ {product.originalPrice!.toFixed(2)}
                      </span>
                      <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 px-3 py-1.5 rounded-xl">
                        <span className="text-xs font-black text-red-600 uppercase tracking-wide">
                          Economize {discountPercent}%
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="relative bg-gradient-to-br from-[var(--primary)] via-[#1a2d5f] to-[var(--primary)] rounded-[20px] p-5 shadow-2xl overflow-hidden border border-[var(--primary)]/50">
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      backgroundSize: '24px 24px'
                    }} />
                    
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)] animate-pulse" />
                        <span className="text-[11px] text-white/70 uppercase tracking-widest font-bold">
                          Valor especial
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base text-white/80 font-bold">R$</span>
                        <span className="text-[42px] font-black text-white leading-none tracking-tighter">
                          {product.price.toFixed(2).split('.')[0]}
                        </span>
                        <span className="text-2xl font-black text-white/90 leading-none">
                          ,{product.price.toFixed(2).split('.')[1]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white border-2 border-[var(--neutral-200)] rounded-xl p-1">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 bg-[var(--neutral-100)] hover:bg-[var(--neutral-200)] rounded-lg flex items-center justify-center transition-all cursor-pointer"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-4 h-4 text-[var(--neutral-700)]" />
                      </motion.button>
                      <span className="w-12 text-center font-black text-[var(--neutral-900)]">{quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 bg-[var(--neutral-100)] hover:bg-[var(--neutral-200)] rounded-lg flex items-center justify-center transition-all cursor-pointer"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-4 h-4 text-[var(--neutral-700)]" />
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAddToCart}
                      className="flex-1 relative overflow-hidden bg-gradient-to-br from-[var(--primary)] via-[#2847a0] to-[#1a2d5f] text-white py-4 rounded-2xl font-black shadow-2xl hover:shadow-[var(--primary)]/50 transition-all flex items-center justify-center gap-2.5 group/cart border-2 border-white/20 cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover/cart:opacity-100 transition-opacity" />
                      <ShoppingCart className="w-5 h-5 relative z-10 group-hover/cart:scale-110 transition-transform" />
                      <span className="relative z-10">Adicionar ao Carrinho</span>
                    </motion.button>
                  </div>

                  <div className="relative h-px bg-gradient-to-r from-transparent via-[var(--neutral-200)] to-transparent" />

                  <div className="space-y-2.5">
                    <Link href={`/produtos/${product.slug}`} onClick={onClose}>
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full border-2 border-[var(--neutral-300)] text-[var(--neutral-700)] hover:border-[var(--primary)] hover:text-[var(--primary)] py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Ver mais detalhes</span>
                      </motion.button>
                    </Link>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleWhatsApp}
                      className="w-full bg-gradient-to-r from-[#25D366] to-[#20BD5A] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#25D366]/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Dúvidas? Fale conosco</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}