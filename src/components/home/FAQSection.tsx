'use client'

import { FAQItem } from '@/components/common/FAQItem'
import { faq } from '@/data/mockData'

export const FAQSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#213A77] to-[#1a2d5e] rounded-2xl shadow-xl shadow-[#213A77]/20 mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-black text-4xl md:text-5xl bg-gradient-to-r from-[#213A77] to-[#1a2d5e] bg-clip-text text-transparent mb-5">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossas peças, serviços e formas de atendimento
          </p>
        </div>

        <div className="space-y-4">
          {faq.map((item, index) => (
            <FAQItem 
              key={item.id} 
              question={item.question} 
              answer={item.answer}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
