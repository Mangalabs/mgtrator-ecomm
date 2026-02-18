'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Phone, MapPin, ShoppingCart, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { motion, AnimatePresence } from 'motion/react'
import { Product } from '@/data/types'

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
        const response = await fetch(
          `/api/products?q=${encodeURIComponent(searchQuery.trim())}&limit=5`,
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

    fetchSuggestions()

    return () => controller.abort()
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
        setSearchQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const menuItems = [
    { name: 'Início', href: '/', id: 'home' },
    { name: 'Produtos', href: '/produtos', id: 'produtos' },
    { name: 'Marcas', href: '/marcas', id: 'marcas' },
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
      router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const handleProductClick = (product: Product) => {
    const identifier = product.slug || product.id
    router.push(`/produtos/${identifier}`)
    setSearchQuery('')
  }

  const handleViewAllResults = () => {
    if (searchQuery.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const handleInputChange = (value: string) => {
    setSearchQuery(value)
  }

  return (
    <>
      <div className='bg-gradient-to-r from-[#213A77] to-[#1a2d5f] text-white hidden md:block'>
        <div className='max-w-7xl mx-auto px-4 h-10 flex items-center justify-between text-sm'>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2'>
              <Phone className='w-4 h-4' />
              <a href='tel:+553133684500' className='hover:underline'>
                (31) 3368-4500
              </a>
            </div>
            <div className='flex items-center gap-2'>
              <MapPin className='w-4 h-4' />
              <span>São Luis/MA e Araguaína/TO</span>
            </div>
          </div>
          <span>Seg–Sex | 8h–17h</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-lg py-2' : 'shadow-sm py-4'
        }`}>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex items-center justify-between'>
            <Link href='/' className='flex items-center gap-3'>
              <img
                src='https://mgtratorpecas.com.br/assets/logo_mgtratorpecas_png_branco-BQx3whQg.png'
                alt='MG Trator Peças'
                className='h-12 w-auto'
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(15%) sepia(58%) saturate(2786%) hue-rotate(210deg)',
                }}
              />
            </Link>

            <div
              className='hidden lg:flex flex-1 max-w-xl mx-10'
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
                  className='absolute right-1 top-1/2 -translate-y-1/2 bg-[var(--primary)] text-white px-4 py-1 rounded-full'>
                  Buscar
                </button>

                {showSuggestions && suggestions.length > 0 && (
                  <div className='absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 z-50'>
                    <div className='p-2'>
                      {suggestions.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product)}
                          className='w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl text-left'>
                          <div className='w-16 h-16 bg-gray-100 rounded-lg overflow-hidden'>
                            <img
                              src={product.thumbnail}
                              alt={product.name}
                              className='w-full h-full object-contain p-2'
                            />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='font-bold text-gray-900 truncate'>
                              {product.name}
                            </div>
                            <div className='text-xs text-gray-500'>
                              {product.brandName}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleViewAllResults}
                      className='w-full p-3 bg-gray-50 border-t-2 border-gray-200 font-bold text-[var(--primary)] text-sm'>
                      Ver todos os resultados
                    </button>
                  </div>
                )}

                {showSuggestions &&
                  searchQuery.trim().length >= 2 &&
                  !isSearching &&
                  suggestions.length === 0 && (
                    <div className='absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6 text-center z-50'>
                      Nenhum produto encontrado
                    </div>
                  )}
              </form>
            </div>

            <nav className='hidden lg:flex items-center gap-6'>
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={
                    isActive(item.href)
                      ? 'text-[var(--primary)] font-semibold'
                      : ''
                  }>
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* <div className='flex items-center gap-3 ml-4'>
              <Link href='/carrinho' className='relative p-2'>
                <ShoppingCart className='w-6 h-6 text-[var(--primary)]' />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center'>
                      {itemCount > 99 ? '99+' : itemCount}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='lg:hidden p-2'>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div> */}
          </div>
        </div>
      </header>
    </>
  )
}
