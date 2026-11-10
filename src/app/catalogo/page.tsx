import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { catalogLines } from '@/data/catalog'
import PageHero from '@/components/common/PageHero'

export const metadata: Metadata = {
  title: 'Catálogo de peças',
  description:
    'Catálogo MG Tratorpeças: peças para máquinas pesadas da linha amarela e, pela MG Agro, peças para máquinas agrícolas.',
  alternates: { canonical: 'https://www.mgtratorpecas.com.br/catalogo' },
}

export default function CatalogoPage() {
  return (
    <>
      <PageHero
        title='Catálogo de peças'
        description='Escolha a linha da sua máquina e consulte a peça direto pelo WhatsApp.'
        breadcrumbs={[{ label: 'Catálogo', href: '' }]}
      />

      <div className='mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-2 md:py-16'>
        {catalogLines.map((line) => {
          const isAgro = line.id === 'linha-verde'
          const itemCount = line.categories.reduce((total, c) => total + c.items.length, 0)

          return (
            <Link
              key={line.id}
              href={`/catalogo/${line.id}`}
              className={`group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-lg border-b-[6px] border-secondary p-6 text-white focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-secondary md:p-8 ${
                isAgro ? 'bg-agro-deep' : 'bg-ink'
              }`}>
              {isAgro ? (
                <>
                  <Image
                    src={line.heroImage}
                    alt=''
                    fill
                    sizes='(min-width: 768px) 50vw, 100vw'
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-agro-deep via-agro-deep/85 to-agro-deep/30' />
                </>
              ) : (
                <Image
                  src={line.heroImage}
                  alt=''
                  width={309}
                  height={234}
                  className='mb-auto w-[60%] max-w-[260px] self-end'
                />
              )}

              <div className='relative'>
                <Image
                  src={isAgro ? '/logo-mgagro.png' : '/logo.png'}
                  alt={line.brand}
                  width={isAgro ? 72 : 140}
                  height={isAgro ? 72 : 69}
                  className={isAgro ? 'mb-3 rounded-lg bg-white p-1' : 'mb-3 h-auto'}
                />
                <h2 className={isAgro ? 'text-agro-lime' : 'text-white'}>{line.title}</h2>
                <p className='mt-2 max-w-md text-white/85'>
                  {line.categories.map((c) => c.name).join(', ')}. {itemCount} itens no
                  catálogo.
                </p>
                <span className='mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-secondary px-5 font-semibold text-ink transition-colors group-hover:bg-secondary-light'>
                  Ver peças
                  <ArrowRight className='h-5 w-5' aria-hidden='true' />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
