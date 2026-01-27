'use client'

import { motion } from 'motion/react'
import { MessageCircle, Phone, ArrowRight, Package, Zap, Check } from 'lucide-react'
import { CONTACTS, WHATSAPP_MESSAGES, CTA_STATS } from '@/lib/constants'
import { generateWhatsAppLink } from '@/lib/utils'

const iconMap = {
  Package,
  Zap,
  Check,
}

export const CTASection = () => {
  const handleWhatsApp = () => {
    window.open(generateWhatsAppLink(CONTACTS.whatsapp.number, WHATSAPP_MESSAGES.default), '_blank')
  }

  return (
    <section className="py-20 bg-gradient-to-br from-[#213A77] via-[#1a2d5e] to-[#213A77] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FDCC19] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-black text-4xl md:text-5xl text-white mb-6">
            Precisa de Peças com Urgência?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Solicite um orçamento agora e receba atendimento especializado para suas necessidades
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={handleWhatsApp}
              className="group bg-gradient-to-r from-[#25D366] to-[#20BD5A] text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Orçamento via WhatsApp</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>

            <a
              href={`tel:+${CONTACTS.whatsapp.number}`}
              className="group bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3"
            >
              <Phone className="w-6 h-6" />
              <span>{CONTACTS.whatsapp.formatted}</span>
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {CTA_STATS.map((stat, idx) => {
              const Icon = iconMap[stat.icon as keyof typeof iconMap]
              
              return (
                <div key={idx} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                  <Icon className="w-10 h-10 text-[#FDCC19] mx-auto mb-3" />
                  <div className="font-black text-3xl text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-blue-100 font-semibold">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
