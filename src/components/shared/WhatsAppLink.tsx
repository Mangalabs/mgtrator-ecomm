'use client'

import type { AnchorHTMLAttributes } from 'react'
import { trackWhatsAppClick, type WhatsAppClick } from '@/lib/tracking'

type WhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  tracking: WhatsAppClick
}

// Link de WhatsApp com evento `whatsapp_click`; usável em Server Components.
// Não define target/rel: cada uso mantém os atributos que já tinha.
export const WhatsAppLink = ({ href, tracking, onClick, ...props }: WhatsAppLinkProps) => (
  <a
    href={href}
    onClick={(event) => {
      trackWhatsAppClick(href, tracking)
      onClick?.(event)
    }}
    {...props}
  />
)
