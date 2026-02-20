import {
  Eye,
  Clock,
  Plane,
  Zap,
  Tag,
  ShoppingCart,
  MessageCircle,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useCart } from '@/contexts/CartContext'
import { useMemo } from 'react'
import { getWhatsAppUrl } from '@/lib/whatsapp'

const IS_CATALOG_MODE = true

interface ProductCardProps {
  id: string | number
  name: string
  price: number
  image: string
  code?: string
  partNumber?: string
  originalPrice?: number
  stock?: string
  brand?: string
  deliveryType?: 'pronta-entrega' | 'sob-encomenda' | 'importado'
  estimatedDays?: string
  stockQuantity?: number
  thumbnail?: string
  onQuickView?: () => void
  showInstallments?: boolean
  installmentsCount?: number
}

export function ProductCard({
  id,
  name,
  code,
  partNumber,
  price,
  originalPrice = 0,
  image,
  brand = '',
  deliveryType = 'pronta-entrega',
  estimatedDays,
  stockQuantity = 0,
  thumbnail,
  onQuickView,
  showInstallments = false,
  installmentsCount = 0,
}: ProductCardProps) {
  const { addItem } = useCart()

  const productDetails = useMemo(() => {
    const finalPrice = Number(price) || 0
    const finalOriginalPrice = Number(originalPrice) || 0
    const hasDiscount = finalOriginalPrice > finalPrice
    const discountPercent = hasDiscount
      ? Math.round(
          ((finalOriginalPrice - finalPrice) / finalOriginalPrice) * 100,
        )
      : 0
    const [priceMajor, priceMinor] = finalPrice.toFixed(2).split('.')

    return {
      code: code ?? partNumber ?? '',
      partNumber: partNumber ?? '',
      thumbnail: thumbnail ?? image,
      url: `/produtos/${id}`,
      finalPrice,
      finalOriginalPrice,
      hasDiscount,
      discountPercent,
      priceMajor,
      priceMinor,
    }
  }, [code, partNumber, thumbnail, image, id, price, originalPrice])

  const deliveryConfig = {
    'pronta-entrega': {
      Icon: Zap,
      label: 'Pronta Entrega',
      style: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      iconColor: 'text-emerald-600',
    },
    'sob-encomenda': {
      Icon: Clock,
      label: 'Sob Encomenda',
      style: 'bg-orange-50 border-orange-200 text-orange-700',
      iconColor: 'text-orange-600',
    },
    importado: {
      Icon: Plane,
      label: 'Importado',
      style: 'bg-blue-50 border-blue-200 text-blue-700',
      iconColor: 'text-blue-600',
    },
  }[deliveryType]

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: String(id),
      name,
      price: productDetails.finalPrice,
      thumbnail: productDetails.thumbnail,
      sku: productDetails.code,
      code: productDetails.code,
      partNumber: productDetails.partNumber,
      brandName: brand,
      stockQuantity,
      slug: '',
      description: '',
      categoryId: '',
      categoryName: '',
      brandId: '',
      images: [],
      inStock: stockQuantity > 0,
      createdAt: '',
      updatedAt: '',
    })
  }

  const handleConsult = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(getWhatsAppUrl(name, productDetails.code), '_blank')
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className='group relative bg-white rounded-3xl border border-[var(--neutral-200)] overflow-hidden hover:border-[var(--primary)]/30 hover:shadow-[0_32px_64px_-12px_rgba(33,58,119,0.18)] transition-all duration-500 flex flex-col h-full'
      aria-label={`Produto: ${name}`}>
      <div className='absolute inset-0 bg-gradient-to-br from-[var(--primary)]/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none' />

      <div className='relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50/50 p-8'>
        <Link
          href={productDetails.url}
          className='block w-full h-full focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/20 transition-all cursor-pointer'
          aria-label={`Ver detalhes de ${name}`}>
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className='w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          ) : (
            <div className='w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs'>
              Sem Imagem
            </div>
          )}
        </Link>

        <div className='absolute top-4 left-4 right-4 flex items-start justify-end gap-2 pointer-events-none'>
          {!IS_CATALOG_MODE && productDetails.hasDiscount && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className='bg-gradient-to-br from-red-500 to-red-600 text-white px-3 py-1.5 rounded-xl shadow-lg'>
              <span className='text-xs font-black'>
                -{productDetails.discountPercent}%
              </span>
            </motion.div>
          )}
        </div>

        {onQuickView && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              onQuickView()
            }}
            className='absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl border border-gray-100 z-10 cursor-pointer'
            aria-label='Visualização rápida'>
            <Eye className='w-5 h-5 text-[var(--primary)]' />
          </motion.button>
        )}
      </div>

      <div className='relative flex-1 flex flex-col p-6 gap-4'>
        <Link
          href={productDetails.url}
          className='block text-left w-full focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 rounded-lg -m-1 p-1 transition-all group/title cursor-pointer'>
          <h3 className='text-gray-900 font-bold text-lg leading-snug line-clamp-2 min-h-[3.5rem] group-hover/title:text-[var(--primary)] transition-colors duration-300'>
            {name}
          </h3>
        </Link>

        {productDetails.code && (
          <div className='inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg self-start'>
            <Tag className='w-3.5 h-3.5 text-gray-500' />
            <span className='text-xs text-gray-600 font-mono font-bold tracking-wide'>
              {productDetails.code}
            </span>
          </div>
        )}

        <div className='space-y-2 mt-2'>
          {!IS_CATALOG_MODE ? (
            <>
              {productDetails.hasDiscount && (
                <div className='flex items-center gap-2 flex-wrap'>
                  <span className='text-sm text-gray-400 line-through'>
                    R$ {productDetails.finalOriginalPrice.toFixed(2)}
                  </span>
                  <span className='text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md'>
                    Economize {productDetails.discountPercent}%
                  </span>
                </div>
              )}

              <div className='flex items-baseline gap-1.5'>
                <span className='text-sm text-gray-500 font-semibold'>R$</span>
                <span className='text-3xl font-black text-[var(--primary)] leading-none'>
                  {productDetails.priceMajor}
                </span>
                <span className='text-lg font-black text-[var(--primary)]/80 leading-none'>
                  ,{productDetails.priceMinor}
                </span>
              </div>

              {showInstallments && installmentsCount > 0 && (
                <div className='text-xs text-gray-600'>
                  ou{' '}
                  <span className='font-bold text-gray-900'>
                    {installmentsCount}x de R${' '}
                    {(productDetails.finalPrice / installmentsCount)
                      .toFixed(2)
                      .replace('.', ',')}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-bold text-gray-500 uppercase tracking-wide'>
                Preço sob consulta
              </span>
              <div className='h-0.5 w-12 bg-gray-200 mt-1'></div>
            </div>
          )}
        </div>

        {!IS_CATALOG_MODE && (
          <div
            className={`${deliveryConfig.style} border px-3 py-2 rounded-lg flex items-center gap-2 mt-auto`}>
            <deliveryConfig.Icon
              className={`w-4 h-4 ${deliveryConfig.iconColor}`}
            />
            <span className='text-xs font-bold'>
              {deliveryConfig.label}
              {estimatedDays && deliveryType !== 'pronta-entrega' && (
                <span className='opacity-70 ml-1'>• {estimatedDays}</span>
              )}
            </span>
          </div>
        )}

        <div
          className={`flex flex-col gap-2.5 ${IS_CATALOG_MODE ? 'mt-auto' : 'pt-2'}`}>
          {!IS_CATALOG_MODE && stockQuantity <= 5 && stockQuantity > 0 && (
            <div className='bg-amber-50 border border-amber-200 text-amber-800 px-3 py-2 rounded-lg text-xs font-bold text-center'>
              Apenas {stockQuantity}{' '}
              {stockQuantity === 1 ? 'unidade' : 'unidades'} disponível
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={IS_CATALOG_MODE ? handleConsult : handleAddToCart}
            className={`w-full ${IS_CATALOG_MODE ? 'bg-gradient-to-r from-[#25D366] to-[#128C7E]' : 'bg-gradient-to-br from-[var(--primary)] to-[#1a2d5f]'} text-white py-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group/cart`}
            aria-label={
              IS_CATALOG_MODE
                ? 'Solicitar cotação'
                : `Adicionar ${name} ao carrinho`
            }>
            {IS_CATALOG_MODE ? (
              <MessageCircle className='w-5 h-5' />
            ) : (
              <ShoppingCart className='w-5 h-5 transition-transform group-hover/cart:scale-110' />
            )}
            <span>
              {IS_CATALOG_MODE ? 'Solicitar cotação' : 'COMPRAR AGORA'}
            </span>
          </motion.button>

          <Link href={productDetails.url} className='w-full block'>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className='w-full border border-gray-300 bg-white text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] py-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer'>
              <Eye className='w-4 h-4' />
              <span>Ver Detalhes</span>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}