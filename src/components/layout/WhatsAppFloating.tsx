'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { CONTACTS, WHATSAPP_MESSAGES } from '@/lib/constants'
import { generateWhatsAppLink } from '@/lib/utils'

export const WhatsAppFloating = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsApp = () => {
    window.open(generateWhatsAppLink(CONTACTS.whatsapp.number, WHATSAPP_MESSAGES.default), '_blank')
    setIsOpen(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-6 w-80 mb-4"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Fale Conosco!</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Precisa de ajuda ou quer fazer um orçamento?
                </p>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 mb-4">
              Estamos online e prontos para atender você!
            </p>
            
            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#20BD5A] transition shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Iniciar Conversa
            </button>

            <p className="text-xs text-slate-500 text-center mt-3">
              Resposta em até 5 minutos
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-[#25D366] text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:shadow-[0_10px_40px_rgba(37,211,102,0.4)] transition-all"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        
        <span className="absolute w-16 h-16 bg-[#25D366] rounded-full animate-ping opacity-20"></span>
      </motion.button>
    </div>
  )
}
