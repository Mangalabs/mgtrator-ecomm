'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Phone, MapPin, ShoppingCart, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { motion, AnimatePresence } from 'motion/react'
import { Product } from '@/data/types'
import { siteConfig } from '@/data/site'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const showSuggestions = searchQuery.trim().length >= 2

  const pathname = usePathname()
  const router = useRouter()
  const { itemCount } = useCart()

  useEffect(() => {
    const controller = new AbortController()

    const fetchSuggestions = async () => {
      if (searchQuery.trim().length < 2) {
        setSuggestions([])
        return
      }

      try {
        setIsSearching(true)
        const params = new URLSearchParams()
        params.set('search', searchQuery.trim())
        params.set('limit', '5')
        
        const response = await fetch(
          `/api/products?${params.toString().replace(/\+/g, '%20')}`,
          { signal: controller.signal },
        )
        const data = await response.json()
        setSuggestions(data?.data?.data || [])
      } catch (error) {
        setSuggestions([])
      } finally {
        setIsSearching(false)
      }
    }

    const timer = setTimeout(() => {
      fetchSuggestions()
    }, 300)

    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [searchQuery])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSuggestions([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const menuItems = [
    { name: 'Início', href: '/', id: 'home' },
    { name: 'Produtos', href: '/produtos', id: 'produtos' },
    { name: 'Lojas', href: '/lojas', id: 'lojas' },
    { name: 'Contato', href: '/contato', id: 'contato' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/busca?search=${searchQuery.trim()}`)
      setSearchQuery('')
      setSuggestions([])
    }
  }

  const handleProductClick = (product: Product) => {
    router.push(`/produtos/${product.id}`)
    setSearchQuery('')
    setSuggestions([])
  }

  const handleViewAllResults = () => {
    if (searchQuery.trim()) {
      router.push(`/busca?search=${searchQuery.trim()}`)
      setSearchQuery('')
      setSuggestions([])
    }
  }

  const handleInputChange = (value: string) => {
    setSearchQuery(value)
  }

  return (
    <>
      <div className='bg-gradient-to-r from-[#213A77] to-[#1a2d5f] text-white hidden md:block'>
        <div className='max-w-7xl mx-auto h-7 flex items-center justify-between text-sm px-4 lg:px-8'>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2'>
              <Phone className='w-4 h-4' />
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className='hover:text-yellow-200 transition-colors'>
                {siteConfig.contact.phoneFormatted}
              </a>
            </div>
            <div className='flex items-center gap-2'>
              <MapPin className='w-4 h-4' />
              <span>{siteConfig.location.city}</span>
            </div>
          </div>
          <span>{siteConfig.businessHours.short}</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-lg py-2' : 'shadow-sm py-1'
        }`}>
        <div className='max-w-9/10 mx-auto px-4'>
          <div className='flex items-center justify-between'>
            <Link href='/'>
              <Image
                src={siteConfig.images.logo}
                alt={siteConfig.name}
                height={siteConfig.images.logoHeight}
                width={siteConfig.images.logoWidth}
                style={siteConfig.images.logoStyle}
              />
            </Link>

            <div
              className='hidden lg:flex flex-1 max-w-xl md:max-w-md xl:max-w-2xl mx-10'
              ref={searchRef}>
              <form onSubmit={handleSearch} className='relative w-full'>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder='Buscar por código, marca ou modelo...'
                  className='w-full h-11 pl-12 pr-24 rounded-full border-2 border-gray-200 focus:border-[var(--primary)] focus:outline-none'
                />
                <button
                  type='submit'
                  className='absolute right-1 top-1/2 -translate-y-1/2 bg-[var(--primary)] text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#1a2d5f] transition-colors'>
                  Buscar
                </button>

                {showSuggestions && suggestions.length > 0 && (
                  <div className='absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 z-50 overflow-hidden'>
                    <div className='p-2'>
                      {suggestions.map((product) => (
                        <button
                          key={product.id}
                          type='button'
                          onClick={() => handleProductClick(product)}
                          className='w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl text-left transition-colors'>
                          <div className='w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0'>
                            <Image
                              src={
                                product.thumbnail ||
                                product.images?.[0] ||
                                siteConfig.images.productPlaceholder
                              }
                              alt={product.name}
                              width={48}
                              height={48}
                              className='w-full h-full object-contain p-1'
                            />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='font-bold text-gray-900 truncate text-sm'>
                              {product.name}
                            </div>
                            <div className='text-xs text-gray-500'>
                              {product.brandName || product.code}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <button
                      type='button'
                      onClick={handleViewAllResults}
                      className='w-full p-3 bg-gray-50 border-t border-gray-100 font-bold text-[var(--primary)] text-xs hover:bg-gray-100 transition-colors'>
                      Ver todos os resultados
                    </button>
                  </div>
                )}

                {showSuggestions &&
                  searchQuery.trim().length >= 2 &&
                  !isSearching &&
                  suggestions.length === 0 && (
                    <div className='absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6 text-center z-50 text-sm text-gray-600'>
                      Nenhum produto encontrado
                    </div>
                  )}
              </form>
            </div>

            <nav className='hidden lg:flex items-center gap-4 xl:gap-8 flex-shrink-0 mr-6'>
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-sm xl:text-base whitespace-nowrap transition-colors hover:text-[var(--primary)] ${
                    isActive(item.href)
                      ? 'text-[var(--primary)] font-bold'
                      : 'text-gray-600 font-medium'
                  }`}>
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className='flex items-center gap-2 sm:gap-4 flex-shrink-0'>
              {/* <Link href='/carrinho' className='relative p-2 group'>
                <ShoppingCart className='w-6 h-6 text-[var(--primary)] group-hover:scale-110 transition-transform' />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className='absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white'>
                      {itemCount > 99 ? '99+' : itemCount}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link> */}
              <div className='hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-4 opacity-70 ml-2 xl:ml-4 ml-4'>
                <div className='relative h-22 w-28'>
                  <Image
                    src='/volvo-logo.png'
                    alt='Volvo Logo'
                    fill
                    className='object-contain'
                  />
                </div>
                <div className='h-4 w-px bg-gray-300'></div>
                <div className='relative h-12 w-20'>
                  <Image
                    src='/cat-logo.png'
                    alt='Caterpillar Logo'
                    fill
                    className='object-contain'
                  />
                </div>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='lg:hidden p-2 text-[var(--primary)] hover:bg-gray-100 rounded-lg transition-colors ml-auto relative z-10'>
                {isMenuOpen ? (
                  <X className='w-6 h-6 sm:w-7 sm:h-7' />
                ) : (
                  <Menu className='w-6 h-6 sm:w-7 sm:h-7' />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 overflow-hidden'>
              <div className='p-4 space-y-6'>
                <div className='flex items-center justify-center gap-6 py-2 border-b border-gray-100 opacity-80'>
                  <div className='relative h-6 w-16'>
                    <Image
                      src='https://download.logo.wine/logo/Volvo/Volvo-Logo.wine.png'
                      alt='Volvo Logo'
                      fill
                      className='object-contain'
                    />
                  </div>
                  <div className='relative h-6 w-16'>
                    <Image
                      src='https://brandlogos.net/wp-content/uploads/2022/09/cat-logo_brandlogos.net_tl5q3-512x512.png'
                      alt='Caterpillar Logo'
                      fill
                      className='object-contain'
                    />
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    handleSearch(e)
                    setIsMenuOpen(false)
                  }}
                  className='relative w-full'>
                  <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder='Buscar produtos...'
                    className='w-full h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 focus:border-[var(--primary)] focus:outline-none text-base'
                  />
                </form>

                <nav className='flex flex-col gap-2'>
                  {menuItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-5 py-4 rounded-xl text-lg sm:text-base transition-colors ${
                        isActive(item.href)
                          ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-bold'
                          : 'text-gray-700 font-medium hover:bg-gray-50'
                      }`}>
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
