import { Store } from './types';

export type ExtendedStore = Store & {
  mapEmbed: string;
  mapsLink: string;
  /** Perfil da unidade no Google Empresas. */
  googleBusinessUrl: string;
  /** Segunda a sexta; horários no formato HH:MM (schema.org). */
  hours: { opens: string; closes: string; label: string };
  features: string[];
};

export const storesData: ExtendedStore[] = [
  {
    id: 'store-sao-luis',
    name: 'Unidade São Luís',
    slug: 'sao-luis',
    isActive: true,
    address: {
      street: 'Av. Guajajaras',
      number: '402',
      complement: 'Tirirical',
      neighborhood: 'Tirirical',
      city: 'São Luís',
      state: 'MA',
      zipCode: '65055-285',
      country: 'Brasil',
    },

    coordinates: {
      latitude: -2.5765194,
      longitude: -44.239688
    },

    contact: {
      phone: '+5598991620972',
      phoneFormatted: '(98) 99162-0972',
      whatsapp: '5598991620972',
      email: 'comercial@mgtratorpecas.com.br'
    },
    image: '/fachada-saoluis.jpeg',
    features: ['Estacionamento Próprio', 'Fácil Acesso ', 'Sala de Espera Climatizada', 'Contato Direto com Especialista'],
    isMainStore: true,
    createdAt: '2014-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d296.24523649344457!2d-44.23968796725404!3d-2.5765193724946753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7f69ab0f5328e97%3A0xaea389787bb7ac44!2sMg%20Tratorpe%C3%A7as!5e0!3m2!1spt-BR!2sbr!4v1771627619764!5m2!1spt-BR!2sbr',
    mapsLink: 'https://maps.app.goo.gl/mLQSrLrvR9zhW5Kn9',
    googleBusinessUrl: 'https://share.google/21D4uheFiMRyqyJ2Y',
    hours: { opens: '08:00', closes: '18:00', label: 'Segunda a Sexta: 8h às 18h' },
  },
  {
    id: 'store-araguaina',
    name: 'Unidade Araguaína',
    slug: 'araguaina',
    isActive: true,
    address: {
      street: 'Av. Cônego João Lima',
      number: 'Quadra 50, Lote 55',
      neighborhood: 'Jardim dos Ipês II',
      city: 'Araguaína',
      state: 'TO',
      zipCode: '77820-160',
      country: 'Brasil',
    },
    // Pino do perfil no Google Empresas.
    coordinates: {
      latitude: -7.1699374,
      longitude: -48.23669,
    },
    contact: {
      phone: '+5563999828455',
      phoneFormatted: '(63) 99982-8455',
      whatsapp: '5563999828455',
      email: 'comercial@mgtratorpecas.com.br'
    },
    features: [],
    isMainStore: false,
    createdAt: '2026-10-28T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    mapEmbed: 'https://www.google.com/maps?q=-7.1699374,-48.23669&z=17&output=embed',
    mapsLink: 'https://share.google/Gnjk18UqPqOIkylEh',
    googleBusinessUrl: 'https://share.google/Gnjk18UqPqOIkylEh',
    hours: { opens: '08:00', closes: '17:48', label: 'Segunda a Sexta: 8h às 17h48' },
  },
];
