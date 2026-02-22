import { Metadata } from 'next'
import { CheckoutPageClient } from '@/components/checkout/CheckoutPageClient'
import { Link } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Checkout - Finalizar Compra | MG Tratorpeças',
  description: 'Finalize sua compra de peças para maquinas pesadas e máquinas pesadas com segurança. Entregas para Contagem, Betim e região metropolitana de Belo Horizonte.',
  robots: 'noindex, nofollow'
}

export default function CheckoutPage() {
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
              <a href="/carrinho" className="text-[var(--neutral-600)] hover:text-[var(--primary)] transition-colors">
                Carrinho
              </a>
              <span className="text-[var(--neutral-400)]">/</span>
              <span className="text-[var(--primary)] font-semibold">Checkout</span>
            </div>
          </div>
        </div>

        <CheckoutPageClient />
        
      </div>
    </>
  )
}
