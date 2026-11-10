import { siteConfig } from '@/data/site'

export const getWhatsAppUrl = (
  productName?: string,
  productCode?: string,
  whatsapp: string = siteConfig.contact.whatsapp,
) => {
  const baseUrl = `https://wa.me/${whatsapp}`
  
  if (!productName) {
    return `${baseUrl}?text=${encodeURIComponent('Olá! Gostaria de falar com um consultor e solicitar um orçamento.')}`
  }
  
  const codeText = productCode ? `\nCódigo: *${productCode}*` : ''
  const message = `Olá! Gostaria de consultar a peça:\n\n*${productName}*${codeText}\n\nPoderia me passar mais informações sobre valores e disponibilidade?`
  
  return `${baseUrl}?text=${encodeURIComponent(message)}`
}