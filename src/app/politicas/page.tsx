import { Metadata } from 'next'
import { PoliticasPageClient } from '@/components/politicas/PoliticasPageClient'

export const metadata: Metadata = {
  title: 'Políticas e Termos - Privacidade, Trocas, Garantia | MG Trator Peças',
  description: 'Conheça nossas políticas de privacidade (LGPD), trocas e devoluções, garantia, entrega e termos de uso. Compre com segurança e transparência na MG Trator Peças.',
  keywords: ['política de privacidade LGPD', 'política de trocas e devoluções', 'garantia peças tratores', 'termos de uso e-commerce', 'política de entrega'],
}

export default function PoliticasPage() {
  return (
    <>
      <PoliticasPageClient />
    </>
  )
}
