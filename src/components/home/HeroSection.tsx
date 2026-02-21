'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, ArrowRight, MessageCircle, Shield, Award } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { HERO_SLIDES, CONTACTS, WHATSAPP_MESSAGES } from '@/lib/constants'
import { generateWhatsAppLink } from '@/lib/utils'

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)

  const handleWhatsApp = () => {
    window.open(generateWhatsAppLink(CONTACTS.whatsapp.number, WHATSAPP_MESSAGES.default), '_blank')
  }

  return (
    <section 
      className="relative bg-gradient-to-br from-slate-900 via-[#213A77] to-slate-900 overflow-hidden flex items-center"
      style={{ height: 'calc(100vh - 110px)' }}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#FDCC19]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
        
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      <div className="hidden lg:block absolute inset-y-0 left-0 w-full lg:w-[55%]">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[currentSlide].image}
              alt={HERO_SLIDES[currentSlide].alt}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              sizes="(max-width: 1024px) 50vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#213A77]/60 via-[#213A77]/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 max-w-md"
            >
              <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 lg:p-8 shadow-2xl">
                <span className="inline-block bg-gradient-to-r from-[#FDCC19] to-[#f4d348] text-black px-4 py-2 rounded-xl font-black text-xs uppercase mb-4 shadow-lg">
                  {HERO_SLIDES[currentSlide].tag}
                </span>
                <h2 className="text-white font-black text-2xl lg:text-3xl mb-3 leading-tight">
                  {HERO_SLIDES[currentSlide].title}
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-[#FDCC19] to-transparent rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute left-8 lg:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
          <button 
            onClick={prevSlide} 
            className="w-12 h-12 lg:w-14 lg:h-14 backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all shadow-xl"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </button>
          <button 
            onClick={nextSlide} 
            className="w-12 h-12 lg:w-14 lg:h-14 backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all shadow-xl"
            aria-label="Próximo slide"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </button>
        </div>

        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 flex flex-col gap-3 z-20">
          {HERO_SLIDES.map((slide, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            >
              <div className={`w-2 rounded-full transition-all duration-500 ${index === currentSlide ? 'h-12 lg:h-16 bg-gradient-to-b from-[#FDCC19] to-[#f4d348]' : 'h-6 lg:h-8 bg-white/40 hover:bg-white/60'}`}></div>
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full lg:w-[45%] lg:ml-auto h-full flex items-center z-10">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-8 md:py-12 lg:py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mb-6 md:mb-8 lg:mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] mb-4 md:mb-6 lg:mb-8">
              <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="block text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">Peças</motion.span>
              <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="block text-white/90 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">Para</motion.span>
              <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="block text-transparent bg-gradient-to-r from-[#FDCC19] via-[#ffd93d] to-[#FDCC19] bg-clip-text drop-shadow-[0_0_40px_rgba(253,204,25,0.5)]">Máquinas</motion.span>
              <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="block text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">Pesadas</motion.span>
            </h1>
            <div className="h-1 w-50 bg-gradient-to-r from-[#FDCC19] to-transparent rounded-full"></div>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }} className="text-sm md:text-base lg:text-lg xl:text-xl text-white/80 leading-relaxed mb-6 md:mb-8 lg:mb-10 max-w-xl backdrop-blur-sm">
            <strong className="text-white">Distribuidora especializada</strong> em <strong className="text-[#FDCC19]">peças para tratores</strong>, escavadeiras e equipamentos <strong className="text-[#FDCC19]">Caterpillar, Volvo, Case e JCB</strong>. <span className="text-white/90">Estoque completo em <strong>Minas Gerais</strong> com entrega para todo Brasil.</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }} className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-10 lg:mb-12">
            <Link href="/produtos" className="group relative bg-gradient-to-r from-[#FDCC19] via-[#ffd93d] to-[#FDCC19] text-black px-6 py-4 md:px-8 md:py-5 rounded-2xl font-black text-sm md:text-base lg:text-lg overflow-hidden shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              <span className="relative flex items-center justify-center gap-2 md:gap-3">
                <span>VER CATÁLOGO</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>

            <button onClick={handleWhatsApp} className="group backdrop-blur-xl bg-white/10 border-2 border-white/30 hover:bg-white/20 text-white px-6 py-4 md:px-8 md:py-5 rounded-2xl font-black text-sm md:text-base lg:text-lg transition-all shadow-2xl flex items-center justify-center gap-2 md:gap-3 hover:scale-105 hover:-translate-y-1">
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
              <span>WHATSAPP</span>
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8 lg:mb-10">
            <motion.div whileHover={{ y: -5, scale: 1.05 }} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl md:rounded-2xl p-3 md:p-5 text-center shadow-xl hover:shadow-2xl transition-all">
              <div className="text-2xl md:text-3xl lg:text-4xl font-black text-[#FDCC19] mb-1 drop-shadow-[0_0_10px_rgba(253,204,25,0.5)]">10+</div>
              <div className="text-[10px] md:text-xs lg:text-sm font-bold text-white/90 uppercase">Anos</div>
            </motion.div>

            <motion.div whileHover={{ y: -5, scale: 1.05 }} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl md:rounded-2xl p-3 md:p-5 text-center shadow-xl hover:shadow-2xl transition-all">
              <Shield className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-[#FDCC19] mx-auto mb-1 md:mb-2 drop-shadow-[0_0_10px_rgba(253,204,25,0.5)]" />
              <div className="text-[10px] md:text-xs lg:text-sm font-bold text-white/90 uppercase">Originais</div>
            </motion.div>

            <motion.div whileHover={{ y: -5, scale: 1.05 }} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl md:rounded-2xl p-3 md:p-5 text-center shadow-xl hover:shadow-2xl transition-all">
              <Award className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-[#FDCC19] mx-auto mb-1 md:mb-2 drop-shadow-[0_0_10px_rgba(253,204,25,0.5)]" />
              <div className="text-[10px] md:text-xs lg:text-sm font-bold text-white/90 uppercase">Garantia</div>
            </motion.div>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {['Caterpillar', 'Volvo', 'Case', 'JCB', 'Komatsu'].map((brand, idx) => (
              <motion.button 
                key={brand} 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                whileHover={{ scale: 1.1, y: -2 }} 
                transition={{ delay: 1.2 + idx * 0.1 }} 
                onClick={() => window.location.href = `/marcas#${brand.toLowerCase()}`}
                className="backdrop-blur-lg bg-white/10 border border-white/20 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-bold hover:bg-[#FDCC19] hover:text-black hover:border-[#FDCC19] transition-all cursor-pointer shadow-lg"
              >
                {brand}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
