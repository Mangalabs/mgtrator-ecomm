import { Metadata } from 'next'
import { CarrinhoPageClient } from '@/components/carrinho/CarrinhoPageClient'
import { Link } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Carrinho de Compras | MG Tratorpeças',
  description: 'Revise seu carrinho de compras. Peças originais para maquinas pesadas e máquinas pesadas com entrega rápida para Contagem e Betim.',
  robots: 'noindex, nofollow'
}

export default function CarrinhoPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-[var(--neutral-600)] hover:text-[var(--primary)] transition-colors">
                Início
              </Link>
              <span className="text-[var(--neutral-400)]">/</span>
              <span className="text-[var(--primary)] font-semibold">Carrinho</span>
            </div>
          </div>
        </div>

        <CarrinhoPageClient />
        
      </div>
    </>
  )
}
