import '@/styles/global.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloating } from '@/components/layout/WhatsAppFloating'
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://mgtratorpecas.com.br'),
  title: {
    default: 'MG Tratorpeças - E-commerce de Peças para Máquinas Pesadas',
    template: '%s | MG Tratorpeças',
  },
  description:
    'E-commerce especializado em peças originais para maquinas pesadas e máquinas pesadas. Estoque completo Caterpillar, Volvo, Case, JCB. Compre online com entrega rápida em MG.',
  keywords: [
    'peças para maquinas pesadas',
    'peças caterpillar',
    'peças volvo',
    'peças case',
    'e-commerce MG',
    'comprar peças online',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
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
