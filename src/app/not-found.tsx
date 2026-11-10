import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export const metadata = {
  title: 'Página não encontrada',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center px-4'>
      <div className='max-w-2xl w-full text-center'>
        <div className='mb-8'>
          <h1 className='font-black text-9xl md:text-[200px] bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent leading-none'>
            404
          </h1>
        </div>

        <h2 className='font-black text-3xl md:text-4xl text-slate-900 mb-4'>
          Página Não Encontrada
        </h2>
        <p className='text-xl text-slate-600 mb-12'>
          Desculpe, não conseguimos encontrar a página que você está procurando.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
          <Link
            href='/'
            className='inline-flex items-center justify-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl font-bold transition'>
            <Home className='w-5 h-5' />
            Voltar para Home
          </Link>

          <Link
            href='/catalogo'
            className='inline-flex items-center justify-center gap-3 bg-white border-2 border-slate-200 hover:border-[var(--primary)] text-slate-900 px-8 py-4 rounded-xl font-bold transition'>
            <Search className='w-5 h-5' />
            Ver catálogo
          </Link>
        </div>

        <div className='bg-white rounded-2xl border-2 border-slate-200 p-8'>
          <h3 className='font-bold text-lg text-slate-900 mb-4'>
            Você pode estar procurando por:
          </h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Link href='/catalogo/linha-amarela' className='text-[var(--primary)] hover:underline'>
              Linha amarela
            </Link>
            <Link href='/catalogo/linha-verde' className='text-[var(--primary)] hover:underline'>
              MG Agro
            </Link>
            <Link href='/lojas' className='text-[var(--primary)] hover:underline'>
              Lojas
            </Link>
            <Link href='/contato' className='text-[var(--primary)] hover:underline'>
              Contato
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
