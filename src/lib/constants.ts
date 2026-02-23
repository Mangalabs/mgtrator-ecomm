export const COMPANY_INFO = {
  name: 'MG Tratorpeças',
  legalName: 'MG Tratorpeças Ltda',
  tagline: 'Especialistas em Peças para Máquinas Pesadas',
  foundedYear: 2013,
} as const

export const CONTACTS = {
  whatsapp: {
    number: '5563999828455',
    formatted: '(31) 9 9875-3200',
    link: 'https://wa.me/5563999828455',
  },
  phone: {
    main: '63999828455',
    formatted: '(31) 9 9875-3200',
  },
  email: {
    contact: 'contato@mgtratorpecas.com.br',
    sales: 'vendas@mgtratorpecas.com.br',
  },
  social: {
    instagram: 'https://instagram.com/mgtratorpecas',
    facebook: 'https://facebook.com/mgtratorpecas',
  },
} as const

export const WHATSAPP_MESSAGES = {
  default: 'Olá! Vim pelo site e gostaria de solicitar um orçamento de peças.',
  product: (productName: string) => 
    `Olá! Tenho interesse no produto: ${productName}. Gostaria de solicitar um orçamento.`,
  catalog: 'Olá! Gostaria de receber informações sobre o catálogo completo de peças.',
  quote: 'Olá! Gostaria de solicitar um orçamento personalizado.',
  support: 'Olá! Preciso de suporte técnico para identificar uma peça.',
} as const

export const HERO_SLIDES = [
  {
    image: 'https://mgtratorpecas.com.br/assets/volvo3-DL2x94P-.jpg',
    title: 'Escavadeiras Caterpillar',
    tag: 'Premium',
    alt: 'Escavadeira Caterpillar em operação',
  },
  {
    image: 'https://images.unsplash.com/photo-1764114441097-6a475eca993d?w=1920&q=80',
    title: 'Peças Industriais',
    tag: 'Originais',
    alt: 'Peças industriais para máquinas pesadas',
  },
  {
    image: 'https://images.unsplash.com/photo-1692279847642-f72fa37b9e88?w=1920&q=80',
    title: 'Equipamentos Pesados',
    tag: 'Certificado',
    alt: 'Equipamentos pesados em construção',
  },
] as const

export const COMPANY_STATS = {
  yearsInMarket: '10+',
  productsInStock: '+5k',
  responseTime: '24h',
  certifiedParts: '100%',
} as const

export const FEATURED_BRANDS = [
  'Caterpillar',
  'Volvo',
  'Case',
  'JCB',
  'Komatsu',
  'John Deere',
] as const

export const EQUIPMENT_TYPES = {
  excavators: 'Escavadeiras',
  loaders: 'Carregadeiras',
  backhoes: 'Retroescavadeiras',
  tractors: 'maquinas pesadas',
  bulldozers: 'maquinas pesadas de Esteira',
  graders: 'Motoniveladoras',
} as const

export const BUSINESS_SEGMENTS = {
  construction: 'Construção Civil',
  mining: 'Mineração',
  earthmoving: 'Terraplanagem',
  agriculture: 'Agricultura',
  forestry: 'Silvicultura',
} as const

export const SERVICE_REGIONS = {
  primary: ['Contagem', 'Betim', 'Belo Horizonte'],
  secondary: ['Minas Gerais', 'Brasil'],
} as const

export const KEY_BENEFITS = [
  {
    id: 'warranty',
    title: 'Garantia de Procedência',
    description: 'Todas as peças com certificado de garantia e origem comprovada.',
    icon: 'Shield',
  },
  {
    id: 'genuine',
    title: 'Peças Genuínas e Compatíveis',
    description: 'Estoque completo de peças originais de fábrica e alternativas certificadas.',
    icon: 'Award',
  },
  {
    id: 'delivery',
    title: 'Entrega para Todo Brasil',
    description: 'Logística eficiente com entrega expressa e nacional.',
    icon: 'Truck',
  },
  {
    id: 'support',
    title: 'Suporte Técnico Especializado',
    description: 'Equipe qualificada para auxiliar na identificação da peça correta.',
    icon: 'Headphones',
  },
] as const

export const WHY_CHOOSE_US = [
  {
    title: 'Peças Genuínas com Garantia de Fábrica',
    description: 'Trabalhamos exclusivamente com peças originais certificadas, garantindo compatibilidade total e durabilidade comprovada.',
  },
  {
    title: 'Alternativas Compatíveis Certificadas',
    description: 'Opções de peças alternativas de alta qualidade, devidamente certificadas e testadas.',
  },
  {
    title: 'Atendimento Técnico Especializado',
    description: 'Equipe técnica experiente para auxiliar na identificação correta da peça.',
  },
  {
    title: 'Entrega Rápida para Todo o Brasil',
    description: 'Logística eficiente com entrega expressa na região metropolitana.',
  },
  {
    title: 'Estoque Completo e Disponibilidade Imediata',
    description: 'Mantemos estoque permanente dos itens mais procurados.',
  },
  {
    title: 'Duas Unidades em Minas Gerais',
    description: 'Lojas físicas em Contagem e Betim para melhor atender.',
  },
] as const

export const CTA_STATS = [
  {
    icon: 'Package',
    value: '+5k',
    label: 'Peças em Estoque',
  },
  {
    icon: 'Zap',
    value: '24h',
    label: 'Resposta Garantida',
  },
  {
    icon: 'Check',
    value: '100%',
    label: 'Peças Certificadas',
  },
] as const

export const PAYMENT_METHODS = [
  'Dinheiro',
  'PIX',
  'Cartão de Crédito',
  'Cartão de Débito',
  'Boleto Bancário',
  'Transferência Bancária',
] as const

export const ROUTES = {
  home: '/',
  products: '/produtos',
  product: (slug: string) => `/produtos/${slug}`,
  category: (slug: string) => `/categoria/${slug}`,
  brands: '/marcas',
  brand: (slug: string) => `/marcas/${slug}`,
  stores: '/lojas',
  contact: '/contato',
  about: '/sobre',
  blog: '/blog',
  blogPost: (slug: string) => `/blog/${slug}`,
} as const

export const SEO_DEFAULTS = {
  siteName: 'MG Tratorpeças',
  titleTemplate: '%s | MG Tratorpeças',
  description: 'Distribuidora especializada em peças originais para maquinas pesadas e máquinas pesadas. Estoque completo Caterpillar, Volvo, Case, JCB.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://mgtratorpecas.com.br',
  twitterHandle: '@mgtratorpecas',
  ogImage: '/og-image.jpg',
  locale: 'pt_BR',
} as const

export const PAGINATION = {
  defaultLimit: 12,
  productsPerPage: 12,
  blogPostsPerPage: 9,
} as const

export const ANIMATION = {
  fast: 200,
  normal: 300,
  slow: 500,
  slideshow: 5000,
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  modal: 50,
  popup: 60,
  floatingButton: 70,
  header: 80,
  toast: 90,
  tooltip: 100,
} as const

export const STORAGE_KEYS = {
  recentSearches: 'mg-trator-recent-searches',
  viewedProducts: 'mg-trator-viewed-products',
  exitIntentShown: 'mg-trator-exit-intent-shown',
} as const
