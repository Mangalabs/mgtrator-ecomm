'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Product, CartItem, CouponCode } from '@/data/types'
import { toast } from 'sonner'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
  coupon: CouponCode | null
  subtotal: number
  discount: number
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const AVAILABLE_COUPONS: Record<string, CouponCode> = {
  'PRIMEIRA10': {
    code: 'PRIMEIRA10',
    discount: 0.10,
    type: 'percentage',
    description: '10% de desconto na primeira compra'
  },
  'FRETE50': {
    code: 'FRETE50',
    discount: 50,
    type: 'fixed',
    description: 'R$ 50 de desconto no frete'
  },
  'BLACK20': {
    code: 'BLACK20',
    discount: 0.20,
    type: 'percentage',
    description: '20% de desconto Black Friday'
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [coupon, setCoupon] = useState<CouponCode | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('mg-trator-cart')
        const savedCoupon = localStorage.getItem('mg-trator-coupon')
        
        if (savedCart) {
          try {
            setItems(JSON.parse(savedCart))
          } catch (e) {
            console.error('Error loading cart:', e)
          }
        }
        
        if (savedCoupon) {
          try {
            setCoupon(JSON.parse(savedCoupon))
          } catch (e) {
            console.error('Error loading coupon:', e)
          }
        }
        setIsInitialized(true)
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('mg-trator-cart', JSON.stringify(items))
    }
  }, [items, isInitialized])

  useEffect(() => {
    if (isInitialized) {
      if (coupon) {
        localStorage.setItem('mg-trator-coupon', JSON.stringify(coupon))
      } else {
        localStorage.removeItem('mg-trator-coupon')
      }
    }
  }, [coupon, isInitialized])

  const addItem = (product: Product, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === product.id)

      if (existingItem) {
        toast.success(`Quantidade atualizada!`, {
          description: `${product.name} - ${existingItem.quantity + quantity} unidades`
        })
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      toast.success('Produto adicionado ao carrinho!', {
        description: product.name
      })

      return [
        ...currentItems,
        {
          product,
          quantity,
          addedAt: new Date()
        }
      ]
    })
  }

  const removeItem = (productId: string) => {
    setItems((currentItems) => {
      const item = currentItems.find(i => i.product.id === productId)
      if (item) {
        toast.info('Produto removido', {
          description: item.product.name
        })
      }
      return currentItems.filter((item) => item.product.id !== productId)
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    setCoupon(null)
    toast.info('Carrinho limpo')
  }

  const applyCoupon = (code: string): boolean => {
    const upperCode = code.toUpperCase()
    const foundCoupon = AVAILABLE_COUPONS[upperCode]

    if (!foundCoupon) {
      toast.error('Cupom inválido', {
        description: 'O código informado não existe ou expirou'
      })
      return false
    }

    setCoupon(foundCoupon)
    toast.success('Cupom aplicado!', {
      description: foundCoupon.description
    })
    return true
  }

  const removeCoupon = () => {
    setCoupon(null)
    toast.info('Cupom removido')
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  
  const discount = coupon
    ? coupon.type === 'percentage'
      ? subtotal * coupon.discount
      : coupon.discount
    : 0

  const total = Math.max(0, subtotal - discount)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
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
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}