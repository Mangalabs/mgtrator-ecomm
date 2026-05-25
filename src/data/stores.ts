import { Store } from './types'

export type ExtendedStore = Store & {
  mapEmbed: string
  mapsLink: string
  features: string[]
}

export const storesData: ExtendedStore[] = [
  {
    id: 'store-sao-luis',
    name: 'MG Tratorpeças',
    slug: 'unidade-sao-luis',
    isActive: true,
    address: {
      street: 'Av. Guajajaras',
      number: '404',
      complement: 'Tirirical',
      neighborhood: 'Tirirical',
      city: 'São Luís',
      state: 'MA',
      zipCode: '65055-285',
      country: 'Brasil',
    },

    coordinates: {
      latitude: -2.5765194,
      longitude: -44.239688,
    },

    contact: {
      phone: '85991911540',
      phoneFormatted: '(85) 9191-1540',
      whatsapp: '(85) 9191-1540',
      email: 'comercial@mgtratorpecas.com.br',
    },
    image: '/fachada-saoluis.jpeg',
    features: [
      'Estacionamento Próprio',
      'Fácil Acesso ',
      'Sala de Espera Climatizada',
      'Contato Direto com Especialista',
    ],
    isMainStore: true,
    createdAt: '2014-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d296.24523649344457!2d-44.23968796725404!3d-2.5765193724946753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7f69ab0f5328e97%3A0xaea389787bb7ac44!2sMg%20Tratorpe%C3%A7as!5e0!3m2!1spt-BR!2sbr!4v1771627619764!5m2!1spt-BR!2sbr',
    mapsLink: 'https://maps.app.goo.gl/mLQSrLrvR9zhW5Kn9',
  },
]
