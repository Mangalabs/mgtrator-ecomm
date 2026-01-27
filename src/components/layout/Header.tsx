'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Phone, MapPin, ShoppingCart, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { motion, AnimatePresence } from 'motion/react'
import { products } from '@/data/mockData'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  
  const pathname = usePathname()
  const router = useRouter()
  const { itemCount, total } = useCart()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const query = searchQuery.toLowerCase()
      
      const filtered = products.filter((product) => {
        const checkField = (field: any) => 
          field ? String(field).toLowerCase().includes(query) : false

        return (
          checkField(product.name) ||
          checkField(product.sku) || 
          checkField(product.code) ||
          checkField(product.brandName) ||
          checkField(product.brand) || 
          checkField(product.category) ||
          checkField(product.compatibility) ||
          checkField(product.description)
        )
      }).slice(0, 5) 
      
      setFilteredProducts(filtered)
      setShowSuggestions(true)
    } else {
      setFilteredProducts([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
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
    { name: 'Contato', href: '/contato', id: 'contato' }
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
      setShowSuggestions(false)
    }
  }

  const handleProductClick = (product: any) => {
    const identifier = product.slug || product.id
    router.push(`/produtos/${identifier}`)
    setSearchQuery('')
    setShowSuggestions(false)
  }

  const handleViewAllResults = () => {
    if (searchQuery.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setShowSuggestions(false)
    }
  }

  return (
    <>
      <div className="bg-gradient-to-r from-[#213A77] to-[#1a2d5f] text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a href="tel:+553133684500" className="hover:underline">
                (31) 3368-4500
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>São Luis/MA e Araguaína/TO</span>
            </div>
          </div>
          <span>Seg–Sex | 8h–17h</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-lg py-2' : 'shadow-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
              aria-label="Ir para página inicial"
            >
              <img
                src="https://mgtratorpecas.com.br/assets/logo_mgtratorpecas_png_branco-BQx3whQg.png"
                alt="MG Trator Peças"
                className="h-12 w-auto"
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(15%) sepia(58%) saturate(2786%) hue-rotate(210deg)'
                }}
              />
            </Link>

            <div className="hidden lg:flex flex-1 max-w-xl mx-10" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                  placeholder="Buscar por código, marca ou modelo..."
                  className="w-full h-11 pl-12 pr-24 rounded-full border-2 border-gray-200 focus:border-[var(--primary)] focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--primary)] hover:bg-[#1a4fa8] text-white px-4 py-2 rounded-full transition-all flex items-center gap-2 font-bold text-sm"
                >
                  <Search className="w-4 h-4" />
                  Buscar
                </button>

                {showSuggestions && filteredProducts.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden z-50 max-h-[500px] overflow-y-auto">
                    <div className="p-2">
                      {filteredProducts.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product)}
                          className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all group text-left"
                        >
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                            <img
                              src={product.thumbnail || product.image} 
                              alt={product.name}
                              className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-gray-900 truncate group-hover:text-[var(--primary)] transition-colors">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {product.brandName || product.brand} • Cód: {product.sku || product.code}
                            </div>
                            <div className="text-lg font-black text-[var(--primary)] mt-1">
                              R$ {product.price?.toFixed(2).replace('.', ',')}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                              <Search className="w-5 h-5" />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={handleViewAllResults}
                      className="w-full p-3 bg-gray-50 border-t-2 border-gray-200 hover:bg-gray-100 transition-all font-bold text-[var(--primary)] text-sm flex items-center justify-center gap-2"
                    >
                      Ver todos os resultados para "{searchQuery}"
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {showSuggestions && searchQuery.trim().length >= 2 && filteredProducts.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6 text-center z-50">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium mb-2">Nenhum produto encontrado</p>
                    <p className="text-sm text-gray-500">Tente buscar por outro termo</p>
                  </div>
                )}
              </form>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-sm transition-colors px-2 py-1 rounded ${
                    isActive(item.href)
                      ? 'text-[var(--primary)] font-semibold'
                      : 'text-gray-700 hover:text-[var(--primary)]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 ml-4">
              <Link
                href="/carrinho"
                className="relative p-2 rounded-full hover:bg-gray-100 group transition-all"
                aria-label="Carrinho"
                title={itemCount > 0 ? `Total: R$ ${total.toFixed(2)}` : 'Carrinho vazio'}
              >
                <ShoppingCart className="w-6 h-6 text-[var(--primary)] group-hover:scale-110 transition-transform" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
                    >
                      {itemCount > 99 ? '99+' : itemCount}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-[var(--primary)]" />
                ) : (
                  <Menu className="w-6 h-6 text-[var(--primary)]" />
                )}
              </button>
            </div>
          </div>

          <div className="lg:hidden pb-4 pt-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                placeholder="Buscar peças..."
                className="w-full h-11 pl-12 pr-20 rounded-full border-2 border-gray-200 focus:border-[var(--primary)] focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--primary)] text-white p-2 rounded-full hover:bg-[#1a4fa8] transition-all"
              >
                <Search className="w-5 h-5" />
              </button>

              {showSuggestions && filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                  <div className="p-2">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-left"
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                          <img
                            src={product.thumbnail || product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-gray-900 truncate">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                             {product.brandName || product.brand}
                          </div>
                          <div className="text-base font-black text-[var(--primary)]">
                            R$ {product.price?.toFixed(2).replace('.', ',')}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={handleViewAllResults}
                    className="w-full p-3 bg-gray-50 border-t-2 border-gray-200 font-bold text-[var(--primary)] text-sm"
                  >
                    Ver todos os resultados
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-md animate-slide-down">
            <nav className="flex flex-col p-4 gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-left px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-[var(--primary)] font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      
      <style jsx>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </>
  )
}