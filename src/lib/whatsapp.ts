import { siteConfig } from '@/data/site'

export const getWhatsAppUrl = (productName?: string, productCode?: string) => {
  const baseUrl = siteConfig.contact.whatsappLink

  if (!productName) {
    return baseUrl
  }

  const codeText = productCode ? `\nCódigo: *${productCode}*` : ''
  const message = `Olá! Gostaria de consultar a peça:\n\n*${productName}*${codeText}\n\nPoderia me passar mais informações sobre valores e disponibilidade?`

  return `${baseUrl}?text=${encodeURIComponent(message)}`
}
