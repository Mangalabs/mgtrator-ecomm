'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { siteConfig } from '@/data/site'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'Início', href: '/', id: 'home' },
    { name: 'Catálogo', href: '/catalogo', id: 'catalogo' },
    { name: 'MG Agro', href: '/catalogo/linha-verde', id: 'mg-agro' },
    { name: 'Lojas', href: '/lojas', id: 'lojas' },
    { name: 'Contato', href: '/contato', id: 'contato' },
  ]

  // O item mais específico vence: /catalogo/linha-verde ativa só "MG Agro".
  const activeHref = menuItems
    .map((item) => item.href)
    .filter((href) => (href === '/' ? pathname === '/' : pathname.startsWith(href)))
    .sort((a, b) => b.length - a.length)[0]

  const isActive = (href: string) => href === activeHref

  return (
    <>
      <div className='bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white hidden md:block'>
        <div className='max-w-7xl mx-auto h-7 flex items-center justify-between text-sm px-4 lg:px-8'>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2'>
              <Phone className='w-4 h-4' />
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className='hover:text-[var(--secondary-light)] transition-colors'>
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
                      src='/volvo-logo.png'
                      alt='Volvo Logo'
                      fill
                      className='object-contain'
                    />
                  </div>
                  <div className='relative h-6 w-16'>
                    <Image
                      src='/cat-logo.png'
                      alt='Caterpillar Logo'
                      fill
                      className='object-contain'
                    />
                  </div>
                </div>

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
