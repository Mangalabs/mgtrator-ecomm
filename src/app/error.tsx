'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center px-4'>
      <div className='max-w-2xl w-full text-center'>
        <div className='inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-8'>
          <AlertCircle className='w-12 h-12 text-red-600' />
        </div>

        <h1 className='font-black text-4xl md:text-5xl text-slate-900 mb-4'>
          Algo Deu Errado
        </h1>
        <p className='text-xl text-slate-600 mb-12'>
          Desculpe, ocorreu um erro inesperado. Nossa equipe foi notificada e
          está trabalhando para resolver.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className='bg-slate-100 rounded-xl p-6 mb-8 text-left'>
            <p className='font-mono text-sm text-slate-700 break-all'>
              {error.message}
            </p>
          </div>
        )}

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button
            onClick={reset}
            className='inline-flex items-center justify-center gap-3 bg-[#213A77] hover:bg-[#1a2d5e] text-white px-8 py-4 rounded-xl font-bold transition'>
            <RefreshCw className='w-5 h-5' />
            Tentar Novamente
          </button>

          <Link
            href='/'
            className='inline-flex items-center justify-center gap-3 bg-white border-2 border-slate-200 hover:border-[#213A77] text-slate-900 px-8 py-4 rounded-xl font-bold transition'>
            <Home className='w-5 h-5' />
            Voltar para Home
          </Link>
        </div>

        <div className='mt-12 bg-white rounded-2xl border-2 border-slate-200 p-6'>
          <p className='text-slate-700'>
            Se o problema persistir, entre em contato conosco pelo{' '}
            <a
              href='https://tintim.link/whatsapp/d6ae85fb-b33f-4b08-b29b-e9b0ee72942a/135f8540-2a5d-4573-b52f-338b7b4d4d39'
              className='text-[#213A77] hover:underline font-semibold'>
              WhatsApp
            </a>{' '}
            ou{' '}
            <Link
              href='/contato'
              className='text-[#213A77] hover:underline font-semibold'>
              formulário de contato
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
