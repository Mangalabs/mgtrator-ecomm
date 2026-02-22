import { Metadata } from 'next'
import { PoliticasPageClient } from '@/components/politicas/PoliticasPageClient'

export const metadata: Metadata = {
  title: 'Políticas e Termos - Privacidade, Trocas, Garantia | MG Tratorpeças',
  description:
    'Conheça nossas políticas de privacidade (LGPD), trocas e devoluções, garantia, entrega e termos de uso. Compre com segurança e transparência na MG Tratorpeças.',
  keywords: [
    'política de privacidade LGPD',
    'política de trocas e devoluções',
    'garantia peças maquinas pesadas',
    'termos de uso e-commerce',
    'política de entrega',
  ],
  openGraph: {
    title:
      'Políticas e Termos - Privacidade, Trocas, Garantia | MG Tratorpeças',
    description:
      'Conheça nossas políticas de privacidade (LGPD), trocas e devoluções, garantia, entrega e termos de uso. Compre com segurança e transparência na MG Tratorpeças.',
    url: 'https://mgtratorpecas.com.br/politicas',
    siteName: 'MG Tratorpeças',
    locale: 'pt_BR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mgtratorpecas.com.br/politicas',
  },
}

export default function PoliticasPage() {
  return (
    <>
      <PoliticasPageClient />
    </>
  )
}
