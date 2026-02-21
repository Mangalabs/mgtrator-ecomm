'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Minus, ShoppingBag, Tag, ArrowRight, X, CheckCircle2, Package } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { motion, AnimatePresence } from 'motion/react'

export function CarrinhoPageClient() {
  const router = useRouter()
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    applyCoupon, 
    removeCoupon, 
    coupon, 
    subtotal, 
    discount, 
    total, 
    itemCount 
  } = useCart()
  
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')

  const handleApplyCoupon = () => {
    setCouponError('')
    if (!couponInput.trim()) {
      setCouponError('Digite um código de cupom')
      return
    }
    
    if (applyCoupon(couponInput)) {
      setCouponInput('')
    } else {
      setCouponError('Cupom inválido')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-[var(--neutral-900)] mb-2 text-2xl font-bold">Seu Carrinho</h1>
        <p className="text-lg text-[var(--neutral-600)]">
          {itemCount === 0 ? 'Seu carrinho está vazio' : `${itemCount} ${itemCount === 1 ? 'item' : 'itens'} no carrinho`}
        </p>
      </div>

      {itemCount === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border-2 border-[var(--neutral-200)] p-16 text-center"
        >
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-[var(--primary)]" />
            </div>
            <h2 className="text-[var(--neutral-900)] mb-4 font-bold text-xl">Seu carrinho está vazio</h2>
            <p className="text-[var(--neutral-600)] mb-8">
              Adicione produtos ao seu carrinho para continuar comprando
            </p>
            <button
              onClick={() => router.push('/produtos')}
              className="bg-gradient-to-br from-[var(--primary)] via-[#2847a0] to-[#1a2d5f] text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-[var(--primary)]/30 hover:shadow-2xl hover:shadow-[var(--primary)]/40 transition-all inline-flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Continuar Comprando
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => {
                const { id, name, sku, partNumber, brandName, price, thumbnail } = item.product
                const productCode = sku || partNumber

                return (
                  <motion.div
                    key={id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, x: -100 }}
                    className="bg-white rounded-2xl border-2 border-[var(--neutral-200)] p-6 hover:border-[var(--primary)]/30 transition-all"
                  >
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 bg-gradient-to-br from-slate-50 to-white rounded-xl overflow-hidden border-2 border-[var(--neutral-200)]">
                          <ImageWithFallback
                            src={thumbnail || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300'}
                            alt={name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-4 mb-3">
                          <div>
                            <h3 className="font-bold text-lg text-[var(--neutral-900)] mb-2 line-clamp-2">
                              {name}
                            </h3>
                            {productCode && (
                              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--primary)]/5 px-3 py-1.5 rounded-lg border border-[var(--primary)]/20">
                                <Tag className="w-3.5 h-3.5 text-[var(--primary)]" />
                                <span className="text-sm font-mono font-bold text-[var(--primary)]">
                                  {productCode}
                                </span>
                              </div>
                            )}
                            {brandName && (
                              <p className="text-sm text-[var(--neutral-600)] mt-2">
                                Marca: <span className="font-semibold">{brandName}</span>
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 hover:text-red-600 h-fit"
                            aria-label={`Remover ${name}`}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-4 mt-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-[var(--neutral-600)] font-medium">Qtd:</span>
                            <div className="flex items-center gap-2 bg-[var(--neutral-100)] rounded-xl p-1">
                              <button
                                onClick={() => updateQuantity(id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-[var(--primary)] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-inherit"
                                aria-label="Diminuir quantidade"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center font-bold text-[var(--neutral-900)]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-[var(--primary)] hover:text-white transition-all"
                                aria-label="Aumentar quantidade"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-black text-[var(--primary)]">
                              R$ {(price * item.quantity).toFixed(2)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-xs text-[var(--neutral-500)] mt-1">
                                R$ {price.toFixed(2)} cada
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            <button
              onClick={clearCart}
              className="w-full py-3 px-4 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2 font-semibold"
            >
              <Trash2 className="w-4 h-4" />
              Limpar Carrinho
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border-2 border-[var(--neutral-200)] p-6 sticky top-24">
              <h2 className="font-bold text-xl text-[var(--neutral-900)] mb-6">Resumo do Pedido</h2>

              <div className="mb-6">
                <label htmlFor="coupon-input" className="block text-sm font-semibold text-[var(--neutral-700)] mb-3">
                  Cupom de Desconto
                </label>
                
                {coupon ? (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-bold text-green-900">{coupon.code}</div>
                        <div className="text-xs text-green-700">{coupon.description}</div>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="p-1 hover:bg-green-100 rounded-lg transition-colors"
                      aria-label="Remover cupom"
                    >
                      <X className="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        id="coupon-input"
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value.toUpperCase())
                          setCouponError('')
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                        placeholder="PRIMEIRA10"
                        className="flex-1 px-4 py-3 border-2 border-[var(--neutral-200)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors font-mono uppercase"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-6 py-3 bg-[var(--primary)] text-white rounded-xl hover:bg-[#1a2d5f] transition-all font-semibold"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-sm text-red-600" role="alert">{couponError}</p>
                    )}
                    <p className="text-xs text-[var(--neutral-500)]">
                      Cupons disponíveis: PRIMEIRA10, FRETE50, BLACK20
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-[var(--neutral-200)] pt-6 space-y-4">
                <div className="flex justify-between text-[var(--neutral-700)]">
                  <span>Subtotal</span>
                  <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span className="font-semibold">- R$ {discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t-2 border-[var(--neutral-200)] pt-4">
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-lg font-semibold text-[var(--neutral-900)]">Total</span>
                    <div className="text-right">
                      <div className="text-3xl font-black text-[var(--primary)]">
                        R$ {total.toFixed(2)}
                      </div>
                      {discount > 0 && (
                        <div className="text-xs text-green-600 font-semibold mt-1">
                          Você economizou R$ {discount.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/checkout')}
                    className="w-full bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-4 rounded-2xl font-black shadow-xl shadow-green-600/40 hover:shadow-2xl hover:shadow-green-600/50 transition-all flex items-center justify-center gap-2 text-lg mb-3"
                  >
                    <span>Finalizar Compra</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => router.push('/produtos')}
                    className="w-full border-2 border-[var(--primary)] text-[var(--primary)] py-3 rounded-2xl font-bold hover:bg-[var(--primary)]/5 transition-all"
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-[var(--neutral-200)]">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-[var(--neutral-600)]">
                    <Package className="w-5 h-5 text-green-600" />
                    <span>Entrega rápida e segura</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--neutral-600)]">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Peças originais garantidas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
