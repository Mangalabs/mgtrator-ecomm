'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface FAQItemProps {
  question: string
  answer: string
  index?: number
}

export const FAQItem = ({ question, answer, index = 0 }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-white border border-[var(--neutral-200)] rounded-2xl overflow-hidden hover:border-[var(--primary)]/30 hover:shadow-lg transition-all duration-300">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 flex items-start gap-4 text-left focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/20 focus:ring-inset transition-all"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
        >
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-[var(--primary)] shadow-lg shadow-[var(--primary)]/30' 
              : 'bg-[var(--primary)]/10 group-hover:bg-[var(--primary)]/20'
          }`}>
            <HelpCircle 
              className={`w-5 h-5 transition-colors duration-300 ${
                isOpen ? 'text-white' : 'text-[var(--primary)]'
              }`} 
              aria-hidden="true" 
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-[var(--neutral-900)] pr-2 transition-colors duration-300 leading-relaxed ${
              isOpen ? 'text-[var(--primary)]' : 'group-hover:text-[var(--primary)]'
            }`}>
              {question}
            </h3>
          </div>

          <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-[var(--primary)]/10 rotate-180' 
              : 'bg-[var(--neutral-100)] group-hover:bg-[var(--primary)]/10'
          }`}>
            <ChevronDown
              className="w-4 h-4 text-[var(--primary)] transition-transform duration-300"
              aria-hidden="true"
            />
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              id={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
              role="region"
              aria-label="Resposta da pergunta"
            >
              <div className="px-6 pb-6 pl-[72px]">
                <div className="border-l-4 border-[var(--primary)]/20 pl-4 py-1">
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-[var(--neutral-700)] leading-relaxed"
                  >
                    {answer}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
