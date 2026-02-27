import { CompanyInfo } from './types'

export const companyData: CompanyInfo = {
  id: 'mg-trator-pecas',
  name: 'MG Tratorpeças',
  legalName: 'MG Tratorpeças Ltda.',
  cnpj: '12.345.678/0001-90',

  logo: 'https://mgtratorpecas.com.br/assets/logo_mgtratorpecas_png_branco-BQx3whQg.png',
  logoWhite:
    'https://mgtratorpecas.com.br/assets/logo_mgtratorpecas_png_branco-BQx3whQg.png',

  tagline: 'Peças Originais para maquinas pesadas e Máquinas Pesadas',
  description:
    'Distribuidora especializada em peças originais para maquinas pesadas e máquinas pesadas em Contagem e Betim/MG.',
  foundedYear: 2014,

  email: {
    contact: 'contato@mgtratorpecas.com.br',
    sales: 'vendas@mgtratorpecas.com.br',
    support: 'suporte@mgtratorpecas.com.br',
  },

  phone: {
    main: '+553133684500',
    secondary: '+553133684600',
    whatsapp: '+5563999828455',
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
    number: '404',
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
