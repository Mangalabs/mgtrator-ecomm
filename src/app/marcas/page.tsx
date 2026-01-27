import { Metadata } from 'next'
import { MarcasPageClient } from '@/components/marcas/MarcasPageClient'

export const metadata: Metadata = {
  title: 'Marcas Atendidas - Caterpillar, Volvo, Case, JCB, John Deere, Komatsu | MG Trator',
  description: 'Peças genuínas e compatíveis para as principais marcas de tratores e máquinas pesadas. Distribuidor autorizado com garantia original e pronta entrega em MG.',
  keywords: ['peças Caterpillar', 'peças Volvo', 'peças Case', 'peças JCB', 'peças John Deere', 'peças Komatsu', 'distribuidor autorizado', 'peças genuínas', 'Contagem MG'],
}

export default function MarcasPage() {
  return <MarcasPageClient />
}