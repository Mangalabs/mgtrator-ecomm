import { Product, Brand, Category, BlogPost, Store } from './types'


export const categories = [
  {
    id: '1',
    name: 'Filtros',
    slug: 'filtros',
    productCount: 234,
    description: '',
    image: '',
    order: 1,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Sistema Hidráulico',
    slug: 'sistema-hidraulico',
    productCount: 189,
    description: '',
    image: '',
    order: 2,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '3',
    name: 'Sistema Elétrico',
    slug: 'sistema-eletrico',
    productCount: 156,
    description: '',
    image: '',
    order: 3,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '4',
    name: 'Sistema de Freios',
    slug: 'sistema-de-freios',
    productCount: 98,
    description: '',
    image: '',
    order: 4,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '5',
    name: 'Transmissão',
    slug: 'transmissao',
    productCount: 145,
    description: '',
    image: '',
    order: 5,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '6',
    name: 'Sistema de Arrefecimento',
    slug: 'arrefecimento',
    productCount: 87,
    description: '',
    image: '',
    order: 6,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '7',
    name: 'Sensores',
    slug: 'sensores',
    productCount: 112,
    description: '',
    image: '',
    order: 7,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '8',
    name: 'Motor',
    slug: 'motor',
    productCount: 267,
    description: '',
    image: '',
    order: 8,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
]

export const brands = [
  {
    id: '1',
    name: 'Caterpillar',
    slug: 'caterpillar',
    logo: 'https://images.unsplash.com/photo-1523585895729-a4bb980d5c14?w=200',
    description:
      'Líder mundial em equipamentos de construção e mineração. Peças genuínas e compatíveis com toda linha CAT.',
    productCount: 450,
    order: 1,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Volvo',
    slug: 'volvo',
    logo: 'https://images.unsplash.com/photo-1644004482249-cdad1f0da74c?w=200',
    description:
      'Excelência sueca em máquinas pesadas. Qualidade e durabilidade comprovadas mundialmente.',
    productCount: 320,
    order: 2,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Carlos Eduardo Silva',
    company: 'Construtora Alicerce',
    role: 'Gerente de Manutenção',
    image: 'https://images.unsplash.com/photo-1753161023962-665967602405?w=150',
    text: 'Trabalho com a MG Tratorpeças há mais de 5 anos. Sempre encontro as peças que preciso com qualidade e entrega rápida. Equipe muito atenciosa e profissional.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcelo Ferreira',
    company: 'Transportes Ferreira Ltda',
    role: 'Proprietário',
    image: 'https://images.unsplash.com/photo-1753161023962-665967602405?w=150',
    text: 'Peças genuínas com preço justo. Já evitei muitos problemas usando peças de qualidade da MG. Recomendo para quem trabalha sério.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ana Paula Costa',
    company: 'Mineração Serra Grande',
    role: 'Coordenadora de Suprimentos',
    text: 'Excelente atendimento e variedade de produtos. Conseguimos reduzir o tempo de parada das nossas máquinas graças ao estoque completo da MG Tratorpeças.',
    image: 'https://images.unsplash.com/photo-1753161023962-665967602405?w=150',
    rating: 5,
  },
]

export const faq = [
  {
    id: 1,
    question: 'As peças são genuínas ou compatíveis?',
    answer:
      'Trabalhamos com peças genuínas originais de fábrica e também com peças compatíveis de alta qualidade certificadas. Todas as peças possuem garantia e procedência comprovada.',
  },
  {
    id: 2,
    question: 'Qual o prazo de entrega?',
    answer:
      'O prazo de entrega varia conforme a região e disponibilidade do produto. Para a região metropolitana, entregas em até 24h. Para outras regiões do Brasil, de 3 a 7 dias úteis. Consulte-nos para prazos específicos.',
  },
  {
    id: 3,
    question: 'Vocês fazem entrega para todo o Brasil?',
    answer:
      'Sim! Realizamos entregas para todo o território nacional através de transportadoras parceiras confiáveis. Frete calculado conforme destino e peso da mercadoria.',
  },
  {
    id: 4,
    question: 'As peças têm garantia?',
    answer:
      'Todas as nossas peças possuem garantia. Peças genuínas: 12 meses de garantia de fábrica. Peças compatíveis: 6 meses de garantia. Consulte detalhes específicos de cada produto.',
  },
  {
    id: 5,
    question: 'Como faço para saber qual peça é compatível com minha máquina?',
    answer:
      'Nossa equipe técnica especializada está pronta para auxiliar. Entre em contato via WhatsApp ou telefone informando o modelo e série do seu equipamento. Também aceitamos fotos da peça antiga para identificação.',
  },
  {
    id: 6,
    question: 'Vocês vendem no Mercado Livre?',
    answer:
      'Sim! Temos loja oficial no Mercado Livre com diversos produtos disponíveis. Você pode comprar com a segurança da plataforma ou diretamente conosco via WhatsApp para condições especiais.',
  },
  {
    id: 7,
    question: 'Posso retirar na loja física?',
    answer:
      'Sim! Você pode retirar pessoalmente em uma de nossas duas unidades. Consulte endereços e horários na página de Lojas. Recomendamos confirmar disponibilidade antes de se deslocar.',
  },
]

export const stores: Store[] = [
  {
    id: '1',
    name: 'MG TratorPeças - São Luis',
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
    coordinates: { latitude: 0, longitude: 0 },
    contact: {
      phone: '(31) 3368-4500',
      phoneFormatted: '(31) 3368-4500',
      whatsapp: '(63) 99982-8455',
      email: 'centro@mgtratopecas.com.br',
    },
    image: 'https://images.unsplash.com/photo-1731847999830-6f71b78d720e?w=600',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
]

