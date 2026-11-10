import Image from 'next/image'
import Link from 'next/link'
import { Download, MessageCircle } from 'lucide-react'
import type { CatalogLine } from '@/data/types'
import { catalogLines } from '@/data/catalog'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CatalogItemCard } from './CatalogItemCard'

interface CatalogLinePageProps {
  line: CatalogLine
}

export const CatalogLinePage = ({ line }: CatalogLinePageProps) => {
  const isAgro = line.id === 'linha-verde'
  const itemWhatsapp = line.contacts[0].whatsapp

  return (
    <div className={isAgro ? 'bg-agro-deep text-white' : 'bg-(--neutral-50) text-ink'}>
      <div className={`relative overflow-hidden ${isAgro ? 'bg-agro-deep' : 'bg-ink'}`}>
        {isAgro && (
          <>
            <Image
              src={line.heroImage}
              alt=''
              fill
              priority
              sizes='100vw'
              className='object-cover object-center'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-agro-deep via-agro-deep/90 to-agro-deep/40' />
          </>
        )}

        <div className='relative mx-auto grid max-w-7xl gap-8 px-4 pt-2 pb-12 md:grid-cols-[1fr_auto] md:items-end md:pb-16'>
          <div className='max-w-2xl'>
            <Breadcrumbs
              items={[
                { label: 'Catálogo', href: '/catalogo' },
                { label: isAgro ? 'Linha verde' : 'Linha amarela' },
              ]}
            />

            <nav aria-label='Linhas do catálogo' className='mb-8 flex flex-wrap gap-2'>
              {catalogLines.map((other) => {
                const current = other.id === line.id
                return (
                  <Link
                    key={other.id}
                    href={`/catalogo/${other.id}`}
                    aria-current={current ? 'page' : undefined}
                    className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                      current
                        ? 'border-secondary bg-secondary text-ink'
                        : 'border-white/30 text-white hover:border-white'
                    }`}>
                    {other.id === 'linha-verde' ? 'Linha verde (MG Agro)' : 'Linha amarela'}
                  </Link>
                )
              })}
            </nav>

            <Image
              src={isAgro ? '/logo-mgagro-sm.webp' : '/logo.png'}
              alt={line.brand}
              width={isAgro ? 88 : 180}
              height={isAgro ? 88 : 89}
              className={isAgro ? 'mb-5 rounded-lg bg-white p-1' : 'mb-4 h-auto'}
            />
            <h1 className={isAgro ? 'text-agro-lime' : 'text-white'}>{line.title}</h1>
            <p className='mt-3 max-w-xl text-lg! text-white/85'>{line.description}</p>

            <div className='mt-8 flex flex-wrap gap-3'>
              {line.contacts.map((contact) => (
                <a
                  key={contact.whatsapp}
                  href={getWhatsAppUrl(undefined, undefined, contact.whatsapp)}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex min-h-12 items-center gap-2 rounded-md bg-secondary px-5 font-semibold text-ink transition-colors hover:bg-secondary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
                  <MessageCircle className='h-5 w-5' aria-hidden='true' />
                  <span>
                    WhatsApp {contact.label}
                    <span className='sr-only'>, {contact.phoneFormatted}</span>
                  </span>
                </a>
              ))}
              <a
                href={line.pdf.href}
                download
                className='inline-flex min-h-12 items-center gap-2 rounded-md border border-white/40 px-5 font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
                <Download className='h-5 w-5' aria-hidden='true' />
                Baixar catálogo
                <span className='text-sm font-normal text-white/70'>PDF, {line.pdf.size}</span>
              </a>
            </div>
          </div>

          {!isAgro && (
            <Image
              src={line.heroImage}
              alt='Escavadeira de linha amarela'
              width={309}
              height={234}
              priority
              className='hidden w-[320px] md:block lg:w-[380px]'
            />
          )}
        </div>
      </div>

      <div className='mx-auto max-w-7xl px-4'>
        <nav
          aria-label='Categorias'
          className={`flex flex-wrap gap-x-6 border-b py-3 ${
            isAgro ? 'border-white/15' : 'border-ink/10'
          }`}>
          {line.categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className={`inline-flex min-h-11 shrink-0 items-center text-sm font-semibold underline-offset-4 hover:underline ${
                isAgro ? 'text-white' : 'text-primary'
              }`}>
              {category.name}
              <span className={`ml-1.5 font-normal ${isAgro ? 'text-white/60' : 'text-(--neutral-500)'}`}>
                {category.items.length}
              </span>
            </a>
          ))}
        </nav>

        {line.categories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-titulo`}
            className='scroll-mt-24 py-8! md:py-10!'>
            <div className='mb-6 max-w-2xl'>
              <h2
                id={`${category.id}-titulo`}
                className={isAgro ? 'text-agro-lime' : 'text-ink'}>
                {isAgro ? `Peças para ${category.name.toLowerCase()}` : category.name}
              </h2>
              <p className={`mt-1 ${isAgro ? 'text-white/75' : 'text-(--neutral-600)'}`}>
                {category.description}
              </p>
            </div>

            <ul className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6'>
              {category.items.map((item) => (
                <CatalogItemCard key={item.id} item={item} whatsapp={itemWhatsapp} dark={isAgro} />
              ))}
            </ul>
          </section>
        ))}

        {line.brands.length > 0 && (
          <div className='border-t border-ink/10 py-8'>
            <h2 className='text-xl! text-ink'>Marcas atendidas</h2>
            <p className='mt-2 text-(--neutral-600)'>{line.brands.join(', ')}.</p>
          </div>
        )}

        <div
          className={`mb-0 grid gap-6 border-t py-10 md:grid-cols-[1fr_auto] md:items-center ${
            isAgro ? 'border-white/15' : 'border-ink/10'
          }`}>
          <div>
            <h2 className={`text-2xl! ${isAgro ? 'text-agro-lime' : 'text-ink'}`}>
              Não encontrou a peça?
            </h2>
            <p className={`mt-1 max-w-xl ${isAgro ? 'text-white/75' : 'text-(--neutral-600)'}`}>
              O catálogo mostra uma seleção. Envie o código da peça ou o modelo da máquina e
              confirmamos a disponibilidade.
            </p>
          </div>
          <a
            href={getWhatsAppUrl(undefined, undefined, itemWhatsapp)}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-secondary px-5 font-semibold text-ink transition-colors hover:bg-secondary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'>
            <MessageCircle className='h-5 w-5' aria-hidden='true' />
            Enviar pelo WhatsApp
          </a>
        </div>

        <p className={`pb-10 text-xs! ${isAgro ? 'text-white/60' : 'text-(--neutral-500)'}`}>
          Imagens ilustrativas. A aplicação de cada peça é confirmada no atendimento.
        </p>
      </div>
    </div>
  )
}
