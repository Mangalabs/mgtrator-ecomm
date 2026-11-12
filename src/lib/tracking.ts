// Eventos para o Google Tag Manager (dataLayer). A tag de conversão do
// Google Ads é configurada no GTM; o site só emite os eventos.

export type WhatsAppSource =
  | 'floating'
  | 'footer'
  | 'header'
  | 'home_lines'
  | 'catalog_item'
  | 'catalog_general'
  | 'contact_page'
  | 'stores_page'
  | 'policies_page'
  | 'error_page'

export type WhatsAppLine = 'linha_amarela' | 'linha_verde'

export interface WhatsAppClick {
  source: WhatsAppSource
  line?: WhatsAppLine
  product?: string
  /** Unidade de destino: `sao_luis`, `araguaina` ou `mg_agro`. */
  unit?: string
}

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] }

/** `linha-verde` -> `linha_verde` */
export const toTrackingLine = (lineId: string) => lineId.replace(/-/g, '_') as WhatsAppLine

/** `sao-luis` -> `sao_luis` */
export const toTrackingUnit = (slug: string) => slug.replace(/-/g, '_')

const phoneFromUrl = (url: string) => url.match(/wa\.me\/(\d+)/)?.[1] ?? ''

/**
 * Registra o clique no WhatsApp. Chame de forma síncrona no handler do clique,
 * antes da navegação ou do `window.open`. Todos os campos vão sempre, vazios
 * quando não se aplicam, para o GTM não herdar valores do evento anterior.
 * Não envia dados do visitante: o telefone é o número da loja.
 */
export const trackWhatsAppClick = (url: string, click: WhatsAppClick) => {
  try {
    const w = window as DataLayerWindow
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({
      event: 'whatsapp_click',
      whatsapp_source: click.source,
      whatsapp_line: click.line ?? '',
      whatsapp_product: click.product ?? '',
      whatsapp_unit: click.unit ?? '',
      whatsapp_phone: phoneFromUrl(url),
    })
  } catch {
    // O rastreamento nunca pode impedir o contato.
  }
}

/** Para botões: registra o clique e abre o WhatsApp em nova aba. */
export const openWhatsApp = (url: string, click: WhatsAppClick) => {
  trackWhatsAppClick(url, click)
  window.open(url, '_blank')
}
