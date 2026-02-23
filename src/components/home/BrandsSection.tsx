'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { brands } from '@/data/mockData'

export const BrandsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#213A77]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FDCC19]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-black text-4xl md:text-5xl text-slate-900 mb-5">
            Marcas Atendidas
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Trabalhamos com as principais marcas do mercado mundial de máquinas pesadas
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={`/categoria/${brand.slug}`}
                className="block bg-white/90 backdrop-blur-sm p-8 rounded-3xl border-2 border-slate-200 hover:border-[#213A77]/50 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="mb-2 flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={80}
                      height={80}
                      className="object-contain grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <div className="font-black text-sm text-slate-900 group-hover:text-[#213A77] transition-colors">
                    {brand.name}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/marcas"
            className="group inline-flex items-center gap-3 border-2 border-[#213A77] text-[#213A77] px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#213A77] hover:text-white transition-all"
          >
            <span>Ver Todas as Marcas</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
