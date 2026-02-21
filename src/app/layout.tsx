import '@/styles/global.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloating } from '@/components/layout/WhatsAppFloating'
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title:
    'MG Trator Peças - E-commerce de Peças para Tratores e Máquinas Pesadas',
  description:
    'E-commerce especializado em peças originais para tratores e máquinas pesadas. Estoque completo Caterpillar, Volvo, Case, JCB. Compre online com entrega rápida em MG.',
  keywords: [
    'peças para tratores',
    'peças caterpillar',
    'peças volvo',
    'peças case',
    'e-commerce MG',
    'comprar peças online',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pt-BR'>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloating />
        </CartProvider>
      </body>
    </html>
  )
}
