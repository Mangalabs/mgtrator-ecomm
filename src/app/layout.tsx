import '@/styles/global.css'

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloating } from '@/components/layout/WhatsAppFloating'
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#0055A4',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mgtratorpecas.com.br'),

  title: {
    default: 'MG Tratorpeças | Peças para Máquinas Pesadas',
    template: '%s | MG Tratorpeças',
  },

  description:
    'Especialistas em peças originais e de reposição para máquinas pesadas da linha amarela. Estoque completo Caterpillar, Volvo, Case e JCB. Entrega para todo o Brasil.',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'MG Tratorpeças | Peças para Máquinas Pesadas',
    description:
      'Estoque completo de peças para escavadeiras, carregadeiras e mais. Compre com especialistas.',
    url: 'https://www.mgtratorpecas.com.br/',
    siteName: 'MG Tratorpeças',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://www.mgtratorpecas.com.br/logo-azul.png',
        width: 1200,
        height: 630,
        alt: 'MG Tratorpeças - Linha Amarela',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'MG Tratorpeças | Peças para Máquinas Pesadas',
    description:
      'Estoque completo de peças para escavadeiras e carregadeiras.',
    images: ['https://www.mgtratorpecas.com.br/logo-azul.png'],
  },

  alternates: {
    canonical: 'https://www.mgtratorpecas.com.br/',
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