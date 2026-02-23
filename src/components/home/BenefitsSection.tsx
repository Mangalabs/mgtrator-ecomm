'use client'

import { motion } from 'motion/react'
import { Shield, Award, Truck, Headphones } from 'lucide-react'
import { KEY_BENEFITS } from '@/lib/constants'

const iconMap = {
  Shield,
  Award,
  Truck,
  Headphones,
}

export const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#213A77]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FDCC19]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-black text-4xl md:text-5xl text-slate-900 mb-5">
            Peças Originais com Garantia Total
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Distribuidora especializada com estoque completo para manter suas operações funcionando
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {KEY_BENEFITS.map((benefit, idx) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap]
            
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-slate-200 p-8 text-center hover:shadow-2xl hover:border-[#213A77]/50 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#213A77] to-[#1a2d5e] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-black text-xl text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{benefit.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
