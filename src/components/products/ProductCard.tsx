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
import { siteConfig } from '@/data/site'

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
  }[deliveryType] || {
    Icon: Zap,
    label: 'Pronta Entrega',
    style: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    iconColor: 'text-emerald-600',
  }

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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className='group relative bg-white rounded-2xl md:rounded-3xl border border-[var(--neutral-200)] overflow-hidden hover:border-[var(--primary)]/30 hover:shadow-[0_16px_32px_-8px_rgba(33,58,119,0.15)] md:hover:shadow-[0_32px_64px_-12px_rgba(33,58,119,0.18)] transition-all duration-300 md:duration-500 flex flex-col h-full'
      aria-label={`Produto: ${name}`}>
      <div className='hidden md:block absolute inset-0 bg-gradient-to-br from-[var(--primary)]/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0' />

      {productDetails.code && (
        <div className='absolute top-3 left-3 z-20 max-w-[calc(100%-60px)]'>
          <div className='inline-flex items-center gap-1.5 md:gap-2 bg-blue-50 px-2 py-1 md:px-2.5 md:py-1.5 rounded-md border border-blue-200 shadow-sm'>
            <Tag className='w-3 h-3 text-blue-500 flex-shrink-0' />
            <span className='text-[10px] sm:text-xs text-blue-700 font-mono font-bold tracking-wide truncate'>
              {productDetails.code}
            </span>
          </div>
        </div>
      )}

      <div className='absolute top-3 right-3 z-20 flex flex-col gap-2'>
        {!IS_CATALOG_MODE && productDetails.hasDiscount && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className='bg-gradient-to-br from-red-500 to-red-600 text-white px-2 py-1 rounded-lg shadow-md self-end'>
            <span className='text-[10px] font-black'>
              -{productDetails.discountPercent}%
            </span>
          </motion.div>
        )}
      </div>

      <div className='relative w-full pt-14 pb-4 flex justify-center items-center bg-gradient-to-br from-gray-50 via-white to-gray-50/50 z-10'>
        <Link
          href={productDetails.url}
          className='relative w-[65%] max-w-[180px] aspect-square block focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/20 transition-all cursor-pointer rounded-xl'
          aria-label={`Ver detalhes de ${name}`}>
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className='object-contain md:group-hover:scale-105 transition-transform duration-500 ease-out'
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            />
          ) : (
            <Image
              src={siteConfig.images.productPlaceholder}
              alt='Imagem indisponível'
              fill
              className='object-contain opacity-50'
            />
          )}
        </Link>

        {onQuickView && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              onQuickView()
            }}
            className='hidden md:flex absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md border border-gray-200 cursor-pointer text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'
            aria-label='Visualização rápida'>
            <Eye className='w-4 h-4' />
          </motion.button>
        )}
      </div>

      <div className='relative flex-1 flex flex-col p-4 sm:p-5 md:p-6 lg:p-6 gap-3 md:gap-4 border-t border-gray-100 bg-white z-10'>
        <Link
          href={productDetails.url}
          className='block text-left w-full focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 rounded-lg -m-1 p-1 transition-all group/title cursor-pointer'>
          <h4 className='text-gray-900 font-bold text-sm sm:text-base md:text-lg leading-snug line-clamp-2 min-h-[2.75rem] sm:min-h-[3rem] md:min-h-[3.5rem] md:group-hover/title:text-[var(--primary)] transition-colors duration-300'>
            {name}
          </h4>
        </Link>
        <div className='space-y-1.5 md:space-y-2 mt-auto'>
          {!IS_CATALOG_MODE ? (
            <>
              {productDetails.hasDiscount && (
                <div className='flex items-center gap-2 flex-wrap'>
                  <span className='text-xs sm:text-sm text-gray-400 line-through'>
                    R${' '}
                    {productDetails.finalOriginalPrice
                      .toFixed(2)
                      .replace('.', ',')}
                  </span>
                  <span className='text-[10px] sm:text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 md:px-2 md:py-1 rounded'>
                    Economize {productDetails.discountPercent}%
                  </span>
                </div>
              )}

              <div className='flex items-baseline gap-1 md:gap-1.5'>
                <span className='text-xs sm:text-sm text-gray-500 font-semibold'>
                  R$
                </span>
                <span className='text-xl sm:text-2xl md:text-3xl font-black text-[var(--primary)] leading-none'>
                  {productDetails.priceMajor}
                </span>
                <span className='text-sm sm:text-base md:text-lg font-black text-[var(--primary)]/80 leading-none'>
                  ,{productDetails.priceMinor}
                </span>
              </div>

              {showInstallments && installmentsCount > 0 && (
                <div className='text-[10px] sm:text-xs text-gray-600'>
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
              <span className='text-[10px] sm:text-xs md:text-sm font-bold text-green-500 uppercase tracking-wide'>
                Preço sob consulta
              </span>
              <div className='h-0.5 w-8 md:w-12 bg-green-200 mt-0.5 md:mt-1 rounded-full'></div>
            </div>
          )}
        </div>

        {!IS_CATALOG_MODE && (
          <div
            className={`${deliveryConfig.style} border px-2 py-1.5 md:px-3 md:py-2 rounded-md md:rounded-lg flex items-center gap-1.5 md:gap-2`}>
            <deliveryConfig.Icon
              className={`w-3 h-3 md:w-4 md:h-4 ${deliveryConfig.iconColor} flex-shrink-0`}
            />
            <span className='text-[10px] sm:text-xs font-bold leading-tight line-clamp-1'>
              {deliveryConfig.label}
              {estimatedDays && deliveryType !== 'pronta-entrega' && (
                <span className='opacity-70 ml-1 font-normal'>
                  • {estimatedDays}
                </span>
              )}
            </span>
          </div>
        )}

        <div
          className={`flex flex-col gap-2 md:gap-2.5 ${!IS_CATALOG_MODE ? 'pt-1 md:pt-2' : ''}`}>
          {!IS_CATALOG_MODE && stockQuantity <= 5 && stockQuantity > 0 && (
            <div className='bg-amber-50 border border-amber-200 text-amber-800 px-2 py-1.5 md:px-3 md:py-2 rounded-md md:rounded-lg text-[10px] sm:text-xs font-bold text-center'>
              Apenas {stockQuantity}{' '}
              {stockQuantity === 1 ? 'unidade' : 'unidades'}!
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={IS_CATALOG_MODE ? handleConsult : handleAddToCart}
            className={`w-full ${IS_CATALOG_MODE ? 'bg-gradient-to-r from-[#0f0f62] to-[#12128c]' : 'bg-[var(--primary)] hover:bg-[#1a2d5f]'} text-white py-2.5 sm:py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-xs sm:text-sm shadow-md md:shadow-lg transition-all flex items-center justify-center gap-1.5 md:gap-2`}
            aria-label={
              IS_CATALOG_MODE
                ? 'Solicitar cotação'
                : `Adicionar ${name} ao carrinho`
            }>
            {IS_CATALOG_MODE ? (
              <MessageCircle className='w-4 h-4 md:w-5 md:h-5 flex-shrink-0' />
            ) : (
              <ShoppingCart className='w-4 h-4 md:w-5 md:h-5 flex-shrink-0' />
            )}
            <span className='truncate max-w-[140px] sm:max-w-none'>
              {IS_CATALOG_MODE ? 'Cotação' : 'Comprar'}
            </span>
          </motion.button>

          <Link href={productDetails.url} className='w-full block'>
            <div className='w-full border border-blue-800 bg-gray-50/50 hover:bg-white text-blue-800 md:hover:border-[var(--primary)] md:hover:text-[var(--primary)] py-2 sm:py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold text-[10px] sm:text-xs transition-all flex items-center justify-center gap-1.5 md:gap-2 cursor-pointer'>
              <Eye className='w-3 h-3 md:w-4 md:h-4' />
              <span>Ver Detalhes</span>
            </div>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
