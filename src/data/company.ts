import { CompanyInfo } from './types'

export const companyData: CompanyInfo = {
  id: 'mg-trator-pecas',
  name: 'MG Tratorpeças',
  legalName: 'MG Tratorpeças Ltda.',
  cnpj: '12.345.678/0001-90',

  logo: 'https://mgtratorpecas.com.br/assets/logo_mgtratorpecas_png_branco-BQx3whQg.png',
  logoWhite:
    'https://mgtratorpecas.com.br/assets/logo_mgtratorpecas_png_branco-BQx3whQg.png',

  tagline: 'Peças para máquinas pesadas e agrícolas',
  description:
    'Peças para máquinas pesadas da linha amarela e máquinas agrícolas (MG Agro), com unidades em São Luís/MA e Araguaína/TO.',
  foundedYear: 2014,

  email: {
    contact: 'comercial@mgtratorpecas.com.br',
    sales: 'comercial@mgtratorpecas.com.br',
  },

  phone: {
    main: '+5598991620972',
    secondary: '+5563999828455',
    whatsapp: '+5598991620972',
  },

  social: {
    instagram: 'https://www.instagram.com/mg_tratorpecas_/',
    facebook: 'https://facebook.com/mgtratorpecas',
    linkedin: 'https://linkedin.com/company/mgtratorpecas',
  },

  marketplaces: {
    mercadoLivre: 'https://www.mercadolivre.com.br/perfil/MGTRATORPECAS',
  },
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

  specialties: {
    equipments: [
      'Escavadeiras',
      'Carregadeiras',
      'Retroescavadeiras',
      'maquinas pesadas',
    ],
    brands: ['Caterpillar', 'Volvo', 'Case', 'JCB', 'John Deere', 'Komatsu'],
    segments: ['Construção Civil', 'Mineração', 'Terraplanagem'],
  },

  stats: {
    yearsInMarket: 10,
    companiesServed: '+3.000',
    productsInStock: '+5.000',
    unitsCount: 2,
  },

  certifications: ['ISO 9001:2015', 'Distribuidor Autorizado Caterpillar'],

  paymentMethods: ['PIX', 'Cartões', 'Boleto', 'Transferência'],

  updatedAt: new Date().toISOString(),
}
