import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import type { CatalogContact, CatalogItem, CatalogLineId } from '@/data/types'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { toTrackingLine } from '@/lib/tracking'
import { WhatsAppLink } from '@/components/shared/WhatsAppLink'

interface CatalogItemCardProps {
  item: CatalogItem
  lineId: CatalogLineId
  contact: CatalogContact
  dark?: boolean
}

export const CatalogItemCard = ({ item, lineId, contact, dark = false }: CatalogItemCardProps) => {
  return (
    <li className='flex flex-col'>
      {/* Moldura âmbar herdada dos catálogos em PDF. */}
      <div className='relative aspect-square overflow-hidden rounded-md border-[3px] border-secondary bg-white'>
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes='(min-width: 1024px) 280px, (min-width: 640px) 30vw, 45vw'
          className='object-contain p-2'
        />
      </div>

      <h3
        className={`mt-3 text-lg! leading-tight! sm:text-xl! ${
          dark ? 'text-white' : 'text-ink'
        }`}>
        {item.name}
      </h3>
      <p
        className={`mt-1 mb-3 flex-1 text-sm! leading-snug! ${
          dark ? 'text-white/75' : 'text-(--neutral-600)'
        }`}>
        {item.description}
      </p>

      <WhatsAppLink
        href={getWhatsAppUrl(item.name, undefined, contact.whatsapp)}
        tracking={{
          source: 'catalog_item',
          line: toTrackingLine(lineId),
          product: item.name,
          unit: contact.unit,
        }}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`Consultar ${item.name} no WhatsApp`}
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-secondary px-3 text-sm font-semibold text-ink transition-colors hover:bg-secondary-light focus-visible:outline-2 focus-visible:outline-offset-2 ${
          dark ? 'focus-visible:outline-agro-lime' : 'focus-visible:outline-primary'
        }`}>
        <MessageCircle className='h-4 w-4 shrink-0' aria-hidden='true' />
        Consultar
      </WhatsAppLink>
    </li>
  )
}
