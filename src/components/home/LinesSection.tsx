import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import type { CatalogLine } from '@/data/types'
import { catalogLines } from '@/data/catalog'
import { getWhatsAppUrl } from '@/lib/whatsapp'

const panelPhotos: Record<CatalogLine['id'], string> = {
  'linha-amarela': '/escavadeira-cat.jpg',
  'linha-verde': '/catalogo/linha-verde/trator-campo.webp',
}

const LinePanel = ({ line }: { line: CatalogLine }) => {
  const isAgro = line.id === 'linha-verde'

  return (
    <div
      className={`relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-xl border-b-[6px] border-secondary p-6 md:p-8 lg:min-h-[400px] ${
        isAgro ? 'bg-agro-deep' : 'bg-ink'
      }`}>
      <Image
        src={panelPhotos[line.id]}
        alt=''
        fill
        sizes='(min-width: 768px) 45vw, 100vw'
        className='object-cover'
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          isAgro
            ? 'from-agro-deep via-agro-deep/80 to-agro-deep/10'
            : 'from-ink via-ink/80 to-ink/10'
        }`}
      />

      <div className='relative'>
        <Image
          src={isAgro ? '/logo-mgagro.png' : '/logo.png'}
          alt={line.brand}
          width={isAgro ? 72 : 150}
          height={isAgro ? 72 : 74}
          className={isAgro ? 'mb-3 rounded-lg bg-white p-1' : 'mb-2 h-auto'}
        />
        <h3 className={`text-3xl! ${isAgro ? 'text-agro-lime' : 'text-white'}`}>{line.title}</h3>
        <p className='mt-2 max-w-md text-white/85'>
          {line.categories.map((category) => category.name).join(', ')}.
        </p>

        <div className='mt-5 flex flex-wrap gap-3'>
          <Link
            href={`/catalogo/${line.id}`}
            className='inline-flex min-h-12 items-center gap-2 rounded-md bg-secondary px-5 font-semibold text-ink transition-colors hover:bg-secondary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
            Ver catálogo
            <ArrowRight className='h-5 w-5' aria-hidden='true' />
          </Link>
          <a
            href={getWhatsAppUrl(undefined, undefined, line.contacts[0].whatsapp)}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex min-h-12 items-center gap-2 rounded-md border border-white/40 px-5 font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
            <MessageCircle className='h-5 w-5' aria-hidden='true' />
            WhatsApp {isAgro ? 'MG Agro' : line.contacts[0].label}
          </a>
        </div>
      </div>
    </div>
  )
}

export const LinesSection = () => {
  return (
    <div className='bg-[#F5F5F5]'>
      <div className='w-full max-w-9/10 mx-auto px-4 py-12'>
        <h2 className='font-black text-3xl text-blue-900 uppercase font-bold'>Nossas linhas</h2>
        <div className='h-2 md:w-72 rounded-full bg-linear-to-r from-blue-900 to-blue-200/5'></div>
        <p className='mt-4 max-w-2xl text-slate-600'>
          Peças para máquinas pesadas da linha amarela e, com a MG Agro, para máquinas agrícolas.
        </p>

        <div className='mt-8 grid gap-6 md:grid-cols-2'>
          {catalogLines.map((line) => (
            <LinePanel key={line.id} line={line} />
          ))}
        </div>
      </div>
    </div>
  )
}
