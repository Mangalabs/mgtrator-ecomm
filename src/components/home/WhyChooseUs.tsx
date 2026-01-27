'use client'

import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { WHY_CHOOSE_US } from '@/lib/constants'

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50/50" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-black text-4xl md:text-5xl text-slate-900 mb-5">
            Por Que Escolher a MG Trator Peças?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Experiência e confiabilidade que garantem a continuidade das suas operações
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4 bg-gradient-to-br from-white to-slate-50/50 rounded-3xl border-2 border-slate-200 p-8 hover:shadow-xl transition-all"
            >
              <div className="flex-shrink-0">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-black text-xl text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-700 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
            Nossa equipe técnica está preparada para auxiliar na identificação correta da peça necessária, 
            garantindo compatibilidade total com seu equipamento. <strong>Aceitamos pedidos via WhatsApp, 
            telefone ou através de nossa loja no Mercado Livre.</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
