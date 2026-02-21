import { Product } from './types';

export const productsData: Product[] = [
  {
    id: 'prod-001',
    name: 'Filtro de Óleo Caterpillar 1R-0739',
    slug: 'filtro-oleo-caterpillar-1r-0739',
    description: 'Filtro de óleo original Caterpillar para motores C15, C18 e 3406E',
    fullDescription: 'Filtro de óleo hidráulico original Caterpillar 1R-0739. Garante máxima proteção e eficiência do motor, removendo impurezas e partículas. Compatível com diversos modelos de escavadeiras, carregadeiras e tratores de esteira Caterpillar.',

    price: 285.90,
    originalPrice: 320.00,
    discount: 11,

    categoryId: 'cat-filtros',
    categoryName: 'Filtros',
    brandId: 'brand-caterpillar',
    brandName: 'Caterpillar',

    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',

    inStock: true,
    stockQuantity: 45,
    sku: 'CAT-FO-1R0739',
    partNumber: '1R-0739',

    specifications: [
      { label: 'Part Number', value: '1R-0739' },
      { label: 'Marca', value: 'Caterpillar' },
      { label: 'Tipo', value: 'Filtro de Óleo Hidráulico' },
      { label: 'Aplicação', value: 'Motores C15, C18, 3406E' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: [
      'Caterpillar 320D',
      'Caterpillar 330D',
      'Caterpillar 336D',
      'Caterpillar 966H',
      'Caterpillar 972H'
    ],

    warranty: '12 meses contra defeitos de fabricação',
    weight: 1.2,
    dimensions: { length: 15, width: 15, height: 20 },
    tags: ['filtro', 'óleo', 'caterpillar', 'original', 'motor'],

    isFeatured: true,
    isNew: false,
    rating: 4.8,
    reviewCount: 23,

    createdAt: '2023-01-10T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-002',
    name: 'Cilindro Hidráulico Volvo 14589129',
    slug: 'cilindro-hidraulico-volvo-14589129',
    description: 'Cilindro hidráulico de braço original Volvo para escavadeiras EC210 e EC240',
    fullDescription: 'Cilindro hidráulico original Volvo 14589129 para braço de escavadeiras. Construído com materiais de alta resistência, oferece durabilidade e desempenho superiores mesmo nas condições mais severas de trabalho.',

    price: 4850.00,
    originalPrice: 5200.00,
    discount: 7,

    categoryId: 'cat-sistemas-hidraulicos',
    categoryName: 'Sistemas Hidráulicos',
    brandId: 'brand-volvo',
    brandName: 'Volvo',

    images: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800',
      'https://images.unsplash.com/photo-1565611539019-31102942e5c9?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',

    inStock: true,
    stockQuantity: 8,
    sku: 'VOL-CH-14589129',
    partNumber: '14589129',

    specifications: [
      { label: 'Part Number', value: '14589129' },
      { label: 'Marca', value: 'Volvo' },
      { label: 'Tipo', value: 'Cilindro Hidráulico' },
      { label: 'Aplicação', value: 'Braço de Escavadeira' },
      { label: 'Garantia', value: '24 meses' }
    ],

    compatibility: [
      'Volvo EC210',
      'Volvo EC240',
      'Volvo EC290'
    ],

    warranty: '24 meses contra defeitos de fabricação',
    weight: 85.5,
    dimensions: { length: 180, width: 25, height: 25 },
    tags: ['cilindro', 'hidraulico', 'volvo', 'escavadeira', 'braço'],

    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewCount: 12,

    createdAt: '2023-02-15T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-003',
    name: 'Esteira Komatsu 208-32-00300',
    slug: 'esteira-komatsu-208-32-00300',
    description: 'Link de esteira original Komatsu para tratores D65 e D85',
    fullDescription: 'Link de esteira original Komatsu 208-32-00300 fabricado em aço temperado de alta resistência. Projetado para oferecer máxima durabilidade em aplicações severas de mineração e terraplanagem.',

    price: 385.00,

    categoryId: 'cat-tratores',
    categoryName: 'Tratores de Esteira',
    brandId: 'brand-komatsu',
    brandName: 'Komatsu',

    images: [
      'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=400',

    inStock: true,
    stockQuantity: 156,
    sku: 'KOM-EST-20832300',
    partNumber: '208-32-00300',

    specifications: [
      { label: 'Part Number', value: '208-32-00300' },
      { label: 'Marca', value: 'Komatsu' },
      { label: 'Tipo', value: 'Link de Esteira' },
      { label: 'Material', value: 'Aço Temperado' },
      { label: 'Garantia', value: '18 meses' }
    ],

    compatibility: [
      'Komatsu D65EX',
      'Komatsu D65PX',
      'Komatsu D85EX',
      'Komatsu D85MS'
    ],

    warranty: '18 meses contra defeitos de fabricação',
    weight: 12.8,
    dimensions: { length: 35, width: 20, height: 8 },
    tags: ['esteira', 'link', 'komatsu', 'trator', 'mineração'],

    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewCount: 34,

    createdAt: '2023-03-20T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-004',
    name: 'Bomba Hidráulica Case 87588897',
    slug: 'bomba-hidraulica-case-87588897',
    description: 'Bomba hidráulica principal original Case para retroescavadeiras 580N',
    fullDescription: 'Bomba hidráulica de engrenagens original Case 87588897. Componente crítico para o sistema hidráulico da retroescavadeira, garantindo pressão e vazão adequadas para todos os movimentos da máquina.',

    price: 6750.00,
    originalPrice: 7200.00,
    discount: 6,

    categoryId: 'cat-sistemas-hidraulicos',
    categoryName: 'Sistemas Hidráulicos',
    brandId: 'brand-case',
    brandName: 'Case',

    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',

    inStock: true,
    stockQuantity: 5,
    sku: 'CASE-BH-87588897',
    partNumber: '87588897',

    specifications: [
      { label: 'Part Number', value: '87588897' },
      { label: 'Marca', value: 'Case' },
      { label: 'Tipo', value: 'Bomba Hidráulica de Engrenagens' },
      { label: 'Pressão Máxima', value: '250 bar' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: [
      'Case 580N',
      'Case 580SM',
      'Case 580 Super N'
    ],

    warranty: '12 meses contra defeitos de fabricação',
    weight: 28.5,
    dimensions: { length: 40, width: 35, height: 30 },
    tags: ['bomba', 'hidraulica', 'case', 'retroescavadeira'],

    isFeatured: true,
    isNew: false,
    rating: 4.7,
    reviewCount: 8,

    createdAt: '2023-04-05T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-005',
    name: 'Motor Completo Caterpillar C15 ACERT',
    slug: 'motor-completo-caterpillar-c15-acert',
    description: 'Motor diesel completo Caterpillar C15 ACERT remanufaturado',
    fullDescription: 'Motor diesel completo Caterpillar C15 ACERT remanufaturado pela Caterpillar Reman. Processo de remanufatura idêntico ao de um motor novo, com garantia total. Ideal para retrofitting de escavadeiras e carregadeiras.',

    price: 125000.00,
    originalPrice: 145000.00,
    discount: 14,

    categoryId: 'cat-motores',
    categoryName: 'Motores e Componentes',
    brandId: 'brand-caterpillar',
    brandName: 'Caterpillar',

    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',

    inStock: true,
    stockQuantity: 2,
    sku: 'CAT-MOT-C15ACERT',
    partNumber: 'C15-ACERT-REMAN',

    specifications: [
      { label: 'Modelo', value: 'C15 ACERT' },
      { label: 'Marca', value: 'Caterpillar Reman' },
      { label: 'Potência', value: '435 HP @ 2100 RPM' },
      { label: 'Cilindrada', value: '15.2 L' },
      { label: 'Configuração', value: '6 cilindros em linha' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: [
      'Caterpillar 336D',
      'Caterpillar 349D',
      'Caterpillar 972H',
      'Caterpillar 980H'
    ],

    warranty: '12 meses ou 2.000 horas',
    weight: 1850,
    dimensions: { length: 220, width: 120, height: 140 },
    tags: ['motor', 'c15', 'caterpillar', 'remanufaturado', 'diesel'],

    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewCount: 5,

    createdAt: '2023-05-10T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-006',
    name: 'Filtro de Ar Volvo 21337557',
    slug: 'filtro-ar-volvo-21337557',
    description: 'Filtro de ar primário original Volvo para escavadeiras e carregadeiras',
    fullDescription: 'Filtro de ar primário original Volvo 21337557. Proteção superior contra poeira e impurezas, essencial para manter o desempenho e longevidade do motor em ambientes de mineração e construção.',

    price: 195.00,
    originalPrice: 220.00,
    discount: 11,

    categoryId: 'cat-filtros',
    categoryName: 'Filtros',
    brandId: 'brand-volvo',
    brandName: 'Volvo',

    images: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',

    inStock: true,
    stockQuantity: 67,
    sku: 'VOL-FA-21337557',
    partNumber: '21337557',

    specifications: [
      { label: 'Part Number', value: '21337557' },
      { label: 'Marca', value: 'Volvo' },
      { label: 'Tipo', value: 'Filtro de Ar Primário' },
      { label: 'Eficiência', value: '99.9%' },
      { label: 'Garantia', value: '6 meses' }
    ],

    compatibility: [
      'Volvo EC210',
      'Volvo EC240',
      'Volvo L120',
      'Volvo L150'
    ],

    warranty: '6 meses contra defeitos de fabricação',
    weight: 2.8,
    dimensions: { length: 40, width: 25, height: 25 },
    tags: ['filtro', 'ar', 'volvo', 'motor'],

    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewCount: 19,

    createdAt: '2023-06-12T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-007',
    name: 'Kit Embreagem John Deere AT347450',
    slug: 'kit-embreagem-john-deere-at347450',
    description: 'Kit de embreagem completo original John Deere para tratores série 6',
    fullDescription: 'Kit de embreagem original John Deere AT347450 incluindo disco, platô e rolamento. Garante transmissão suave de potência e longa vida útil, essencial para tratores em operação intensiva.',

    price: 3850.00,

    categoryId: 'cat-transmissao',
    categoryName: 'Transmissão',
    brandId: 'brand-john-deere',
    brandName: 'John Deere',

    images: [
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',

    inStock: true,
    stockQuantity: 12,
    sku: 'JD-EMB-AT347450',
    partNumber: 'AT347450',

    specifications: [
      { label: 'Part Number', value: 'AT347450' },
      { label: 'Marca', value: 'John Deere' },
      { label: 'Tipo', value: 'Kit Embreagem Completo' },
      { label: 'Conteúdo', value: 'Disco + Platô + Rolamento' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: [
      'John Deere 6110',
      'John Deere 6130',
      'John Deere 6145',
      'John Deere 6165'
    ],

    warranty: '12 meses contra defeitos de fabricação',
    weight: 18.5,
    dimensions: { length: 45, width: 45, height: 15 },
    tags: ['embreagem', 'transmissao', 'john deere', 'trator'],

    isFeatured: false,
    isNew: true,
    rating: 4.9,
    reviewCount: 7,

    createdAt: '2023-11-01T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-008',
    name: 'Caçamba Escavadeira JCB 1200mm',
    slug: 'cacamba-escavadeira-jcb-1200mm',
    description: 'Caçamba de escavação original JCB 1200mm para retroescavadeiras 3CX',
    fullDescription: 'Caçamba de escavação original JCB com largura de 1200mm. Construída em aço de alta resistência com dentes intercambiáveis. Ideal para escavação em solos médios a duros.',

    price: 8950.00,
    originalPrice: 9500.00,
    discount: 6,

    categoryId: 'cat-retroescavadeiras',
    categoryName: 'Retroescavadeiras',
    brandId: 'brand-jcb',
    brandName: 'JCB',

    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400',

    inStock: true,
    stockQuantity: 4,
    sku: 'JCB-CAC-1200',
    partNumber: 'JCB-CAC-1200-3CX',

    specifications: [
      { label: 'Marca', value: 'JCB' },
      { label: 'Tipo', value: 'Caçamba de Escavação' },
      { label: 'Largura', value: '1200mm' },
      { label: 'Capacidade', value: '0.28 m³' },
      { label: 'Material', value: 'Aço SAE 1045' },
      { label: 'Garantia', value: '24 meses' }
    ],

    compatibility: [
      'JCB 3CX',
      'JCB 4CX'
    ],

    warranty: '24 meses contra defeitos de fabricação',
    weight: 285,
    dimensions: { length: 120, width: 80, height: 60 },
    tags: ['caçamba', 'escavacao', 'jcb', 'retroescavadeira'],

    isFeatured: false,
    isNew: false,
    rating: 4.6,
    reviewCount: 4,

    createdAt: '2023-07-18T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-009',
    name: 'Radiador Komatsu 20Y-03-31121',
    slug: 'radiador-komatsu-20y-03-31121',
    description: 'Radiador original Komatsu para escavadeiras PC200 e PC210',
    fullDescription: 'Radiador de arrefecimento original Komatsu 20Y-03-31121. Sistema de colmeia em cobre-alumínio de alta eficiência para máxima dissipação de calor mesmo em condições extremas de operação.',

    price: 5450.00,

    categoryId: 'cat-escavadeiras',
    categoryName: 'Escavadeiras',
    brandId: 'brand-komatsu',
    brandName: 'Komatsu',

    images: [
      'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=400',

    inStock: true,
    stockQuantity: 6,
    sku: 'KOM-RAD-20Y31121',
    partNumber: '20Y-03-31121',

    specifications: [
      { label: 'Part Number', value: '20Y-03-31121' },
      { label: 'Marca', value: 'Komatsu' },
      { label: 'Tipo', value: 'Radiador Cobre-Alumínio' },
      { label: 'Dimensões', value: '1050 x 650 x 80 mm' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: [
      'Komatsu PC200-8',
      'Komatsu PC210-8',
      'Komatsu PC220-8'
    ],

    warranty: '12 meses contra defeitos de fabricação',
    weight: 42,
    dimensions: { length: 105, width: 65, height: 8 },
    tags: ['radiador', 'arrefecimento', 'komatsu', 'escavadeira'],

    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewCount: 9,

    createdAt: '2023-08-22T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-010',
    name: 'Filtro Combustível Caterpillar 1R-0750',
    slug: 'filtro-combustivel-caterpillar-1r-0750',
    description: 'Filtro separador de água e combustível Caterpillar 1R-0750',
    fullDescription: 'Filtro separador de água e combustível Caterpillar 1R-0750. Proteção avançada contra contaminação, removendo água e impurezas do combustível antes de chegar ao sistema de injeção.',

    price: 165.00,
    originalPrice: 185.00,
    discount: 11,

    categoryId: 'cat-filtros',
    categoryName: 'Filtros',
    brandId: 'brand-caterpillar',
    brandName: 'Caterpillar',

    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',

    inStock: true,
    stockQuantity: 89,
    sku: 'CAT-FC-1R0750',
    partNumber: '1R-0750',

    specifications: [
      { label: 'Part Number', value: '1R-0750' },
      { label: 'Marca', value: 'Caterpillar' },
      { label: 'Tipo', value: 'Separador Água/Combustível' },
      { label: 'Eficiência', value: '98.7%' },
      { label: 'Garantia', value: '6 meses' }
    ],

    compatibility: [
      'Caterpillar 320D',
      'Caterpillar 330D',
      'Caterpillar 950H',
      'Caterpillar 966H',
      'Caterpillar D6T'
    ],

    warranty: '6 meses contra defeitos de fabricação',
    weight: 0.95,
    dimensions: { length: 12, width: 12, height: 18 },
    tags: ['filtro', 'combustivel', 'caterpillar', 'separador'],

    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 42,

    createdAt: '2023-09-05T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  // ============================================
  // NOVAS PEÇAS - EXPANSÃO DO CATÁLOGO
  // ============================================
  
  {
    id: 'prod-011',
    name: 'Pistão Motor Caterpillar 2558458',
    slug: 'pistao-motor-caterpillar-2558458',
    description: 'Pistão completo com anéis para motor Caterpillar 3116',
    fullDescription: 'Pistão original Caterpillar 2558458 para motor 3116. Inclui conjunto completo com anéis de compressão e óleo. Fabricado em liga de alumínio de alta resistência térmica.',

    price: 895.00,
    originalPrice: 1050.00,
    discount: 15,

    categoryId: 'cat-motores',
    categoryName: 'Motores e Componentes',
    brandId: 'brand-caterpillar',
    brandName: 'Caterpillar',

    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',

    inStock: true,
    stockQuantity: 24,
    sku: 'CAT-PIST-2558458',
    partNumber: '2558458',

    specifications: [
      { label: 'Part Number', value: '2558458' },
      { label: 'Marca', value: 'Caterpillar' },
      { label: 'Aplicação', value: 'Motor 3116' },
      { label: 'Material', value: 'Liga de Alumínio' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['Caterpillar 320B', 'Caterpillar 320BL', 'Caterpillar 320BN'],
    warranty: '12 meses contra defeitos de fabricação',
    weight: 2.1,
    dimensions: { length: 15, width: 15, height: 20 },
    tags: ['pistao', 'motor', 'caterpillar', '3116'],

    isFeatured: false,
    isNew: true,
    rating: 4.9,
    reviewCount: 15,

    createdAt: '2024-01-10T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-012',
    name: 'Válvula Hidráulica Volvo 11707959',
    slug: 'valvula-hidraulica-volvo-11707959',
    description: 'Válvula de controle hidráulico principal Volvo',
    fullDescription: 'Válvula de controle principal original Volvo 11707959. Controla os movimentos da lança, braço e caçamba. Sistema de carretéis para máxima precisão e durabilidade.',

    price: 8750.00,

    categoryId: 'cat-sistemas-hidraulicos',
    categoryName: 'Sistemas Hidráulicos',
    brandId: 'brand-volvo',
    brandName: 'Volvo',

    images: ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',

    inStock: true,
    stockQuantity: 3,
    sku: 'VOL-VH-11707959',
    partNumber: '11707959',

    specifications: [
      { label: 'Part Number', value: '11707959' },
      { label: 'Marca', value: 'Volvo' },
      { label: 'Tipo', value: 'Válvula de Controle Principal' },
      { label: 'Seções', value: '4 seções' },
      { label: 'Garantia', value: '18 meses' }
    ],

    compatibility: ['Volvo EC210B', 'Volvo EC240B'],
    warranty: '18 meses contra defeitos de fabricação',
    weight: 52,
    dimensions: { length: 65, width: 30, height: 25 },
    tags: ['valvula', 'hidraulica', 'volvo', 'controle'],

    isFeatured: false,
    isNew: false,
    rating: 5.0,
    reviewCount: 6,

    createdAt: '2024-02-05T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-013',
    name: 'Bomba Injetora Komatsu 6743-71-1131',
    slug: 'bomba-injetora-komatsu-6743-71-1131',
    description: 'Bomba injetora diesel original Komatsu para motor S6D125',
    fullDescription: 'Bomba injetora de combustível original Komatsu 6743-71-1131 para motor S6D125. Sistema de injeção mecânico de alta pressão, remanufaturada com garantia.',

    price: 12500.00,
    originalPrice: 14500.00,
    discount: 14,

    categoryId: 'cat-motores',
    categoryName: 'Motores e Componentes',
    brandId: 'brand-komatsu',
    brandName: 'Komatsu',

    images: ['https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=400',

    inStock: true,
    stockQuantity: 4,
    sku: 'KOM-BI-674371113',
    partNumber: '6743-71-1131',

    specifications: [
      { label: 'Part Number', value: '6743-71-1131' },
      { label: 'Marca', value: 'Komatsu' },
      { label: 'Aplicação', value: 'Motor S6D125' },
      { label: 'Tipo', value: 'Bomba Injetora Mecânica' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['Komatsu PC400', 'Komatsu PC450', 'Komatsu WA470'],
    warranty: '12 meses ou 1.500 horas',
    weight: 45,
    dimensions: { length: 50, width: 35, height: 40 },
    tags: ['bomba', 'injetora', 'komatsu', 'diesel'],

    isFeatured: true,
    isNew: false,
    rating: 4.8,
    reviewCount: 11,

    createdAt: '2024-03-12T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-014',
    name: 'Eixo Cardan Case 242274A1',
    slug: 'eixo-cardan-case-242274a1',
    description: 'Eixo cardan completo para retroescavadeiras Case',
    fullDescription: 'Eixo cardan original Case 242274A1 para transmissão de potência. Fabricado em aço forjado com cruzetas e juntas homocinéticas de alta resistência.',

    price: 3450.00,

    categoryId: 'cat-transmissao',
    categoryName: 'Transmissão',
    brandId: 'brand-case',
    brandName: 'Case',

    images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',

    inStock: true,
    stockQuantity: 7,
    sku: 'CASE-EC-242274A1',
    partNumber: '242274A1',

    specifications: [
      { label: 'Part Number', value: '242274A1' },
      { label: 'Marca', value: 'Case' },
      { label: 'Tipo', value: 'Eixo Cardan Completo' },
      { label: 'Material', value: 'Aço Forjado' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['Case 580M', 'Case 580N', 'Case 590'],
    warranty: '12 meses contra defeitos de fabricação',
    weight: 38,
    dimensions: { length: 120, width: 15, height: 15 },
    tags: ['eixo', 'cardan', 'case', 'transmissao'],

    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewCount: 8,

    createdAt: '2024-04-08T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-015',
    name: 'Turbocompressor John Deere RE508857',
    slug: 'turbocompressor-john-deere-re508857',
    description: 'Turbo original John Deere para motores série 6068',
    fullDescription: 'Turbocompressor original John Deere RE508857 para motores 6068. Aumenta a potência e eficiência do motor, essencial para tratores em operações pesadas.',

    price: 6850.00,
    originalPrice: 7500.00,
    discount: 9,

    categoryId: 'cat-motores',
    categoryName: 'Motores e Componentes',
    brandId: 'brand-john-deere',
    brandName: 'John Deere',

    images: ['https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',

    inStock: true,
    stockQuantity: 6,
    sku: 'JD-TURBO-RE508857',
    partNumber: 'RE508857',

    specifications: [
      { label: 'Part Number', value: 'RE508857' },
      { label: 'Marca', value: 'John Deere' },
      { label: 'Aplicação', value: 'Motor 6068' },
      { label: 'Tipo', value: 'Turbocompressor' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['John Deere 6140D', 'John Deere 6155D', 'John Deere 6180J'],
    warranty: '12 meses contra defeitos de fabricação',
    weight: 18.5,
    dimensions: { length: 40, width: 35, height: 35 },
    tags: ['turbo', 'motor', 'john deere', 'potencia'],

    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 14,

    createdAt: '2024-05-15T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-016',
    name: 'Vedação Kit Motor JCB 320/09210',
    slug: 'vedacao-kit-motor-jcb-320-09210',
    description: 'Kit completo de vedações para motor JCB 444',
    fullDescription: 'Kit completo de juntas e vedações original JCB 320/09210 para motor 444. Inclui junta de cabeçote, cárter, tampa de válvulas e retentores.',

    price: 1850.00,

    categoryId: 'cat-motores',
    categoryName: 'Motores e Componentes',
    brandId: 'brand-jcb',
    brandName: 'JCB',

    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400',

    inStock: true,
    stockQuantity: 15,
    sku: 'JCB-VED-32009210',
    partNumber: '320/09210',

    specifications: [
      { label: 'Part Number', value: '320/09210' },
      { label: 'Marca', value: 'JCB' },
      { label: 'Aplicação', value: 'Motor 444' },
      { label: 'Conteúdo', value: 'Kit Completo de Vedações' },
      { label: 'Garantia', value: '6 meses' }
    ],

    compatibility: ['JCB 3CX', 'JCB 4CX', 'JCB JS220'],
    warranty: '6 meses contra defeitos de fabricação',
    weight: 4.2,
    dimensions: { length: 40, width: 30, height: 10 },
    tags: ['vedacao', 'junta', 'jcb', 'motor'],

    isFeatured: false,
    isNew: false,
    rating: 4.6,
    reviewCount: 9,

    createdAt: '2024-06-20T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-017',
    name: 'Corrente Esteira Caterpillar 8E-5378',
    slug: 'corrente-esteira-caterpillar-8e-5378',
    description: 'Link de corrente para esteiras Caterpillar D6',
    fullDescription: 'Link de corrente de esteira original Caterpillar 8E-5378 para tratores D6. Aço temperado de alta resistência para operações severas.',

    price: 425.00,

    categoryId: 'cat-tratores',
    categoryName: 'Tratores de Esteira',
    brandId: 'brand-caterpillar',
    brandName: 'Caterpillar',

    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',

    inStock: true,
    stockQuantity: 245,
    sku: 'CAT-EST-8E5378',
    partNumber: '8E-5378',

    specifications: [
      { label: 'Part Number', value: '8E-5378' },
      { label: 'Marca', value: 'Caterpillar' },
      { label: 'Tipo', value: 'Link de Esteira' },
      { label: 'Material', value: 'Aço Temperado' },
      { label: 'Garantia', value: '18 meses' }
    ],

    compatibility: ['Caterpillar D6N', 'Caterpillar D6T', 'Caterpillar D6R'],
    warranty: '18 meses contra defeitos de fabricação',
    weight: 14.5,
    dimensions: { length: 40, width: 22, height: 10 },
    tags: ['esteira', 'corrente', 'caterpillar', 'd6'],

    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewCount: 28,

    createdAt: '2024-07-10T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-018',
    name: 'Alternador Volvo 20801604',
    slug: 'alternador-volvo-20801604',
    description: 'Alternador 28V 100A original Volvo',
    fullDescription: 'Alternador original Volvo 20801604 de 28 volts e 100 amperes. Sistema de carga elétrica para escavadeiras e carregadeiras.',

    price: 2850.00,
    originalPrice: 3200.00,
    discount: 11,

    categoryId: 'cat-escavadeiras',
    categoryName: 'Escavadeiras',
    brandId: 'brand-volvo',
    brandName: 'Volvo',

    images: ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',

    inStock: true,
    stockQuantity: 11,
    sku: 'VOL-ALT-20801604',
    partNumber: '20801604',

    specifications: [
      { label: 'Part Number', value: '20801604' },
      { label: 'Marca', value: 'Volvo' },
      { label: 'Voltagem', value: '28V' },
      { label: 'Amperagem', value: '100A' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['Volvo EC210', 'Volvo EC240', 'Volvo L120', 'Volvo L150'],
    warranty: '12 meses contra defeitos de fabricação',
    weight: 12.5,
    dimensions: { length: 30, width: 25, height: 20 },
    tags: ['alternador', 'eletrica', 'volvo', '28v'],

    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewCount: 12,

    createdAt: '2024-08-05T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-019',
    name: 'Motor de Partida Komatsu 600-813-4130',
    slug: 'motor-partida-komatsu-600-813-4130',
    description: 'Motor de partida 24V original Komatsu',
    fullDescription: 'Motor de partida original Komatsu 600-813-4130 de 24 volts. Alta torque para partidas confiáveis mesmo em temperaturas extremas.',

    price: 2450.00,

    categoryId: 'cat-escavadeiras',
    categoryName: 'Escavadeiras',
    brandId: 'brand-komatsu',
    brandName: 'Komatsu',

    images: ['https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=400',

    inStock: true,
    stockQuantity: 9,
    sku: 'KOM-MP-6008134130',
    partNumber: '600-813-4130',

    specifications: [
      { label: 'Part Number', value: '600-813-4130' },
      { label: 'Marca', value: 'Komatsu' },
      { label: 'Voltagem', value: '24V' },
      { label: 'Potência', value: '7.5 kW' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['Komatsu PC200', 'Komatsu PC220', 'Komatsu PC300'],
    warranty: '12 meses contra defeitos de fabricação',
    weight: 16.8,
    dimensions: { length: 35, width: 20, height: 20 },
    tags: ['motor', 'partida', 'komatsu', 'eletrica'],

    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewCount: 17,

    createdAt: '2024-09-15T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-020',
    name: 'Disco Freio Case 47128120',
    slug: 'disco-freio-case-47128120',
    description: 'Disco de freio original Case para retroescavadeiras',
    fullDescription: 'Disco de freio original Case 47128120 para sistema de freios de serviço. Material compósito de alta fricção e resistência térmica.',

    price: 1250.00,

    categoryId: 'cat-retroescavadeiras',
    categoryName: 'Retroescavadeiras',
    brandId: 'brand-case',
    brandName: 'Case',

    images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',

    inStock: true,
    stockQuantity: 18,
    sku: 'CASE-DF-47128120',
    partNumber: '47128120',

    specifications: [
      { label: 'Part Number', value: '47128120' },
      { label: 'Marca', value: 'Case' },
      { label: 'Tipo', value: 'Disco de Freio' },
      { label: 'Diâmetro', value: '280mm' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['Case 580N', 'Case 580SM', 'Case 590'],
    warranty: '12 meses contra defeitos de fabricação',
    weight: 8.5,
    dimensions: { length: 30, width: 30, height: 5 },
    tags: ['freio', 'disco', 'case', 'seguranca'],

    isFeatured: false,
    isNew: false,
    rating: 4.6,
    reviewCount: 10,

    createdAt: '2024-10-20T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-021',
    name: 'Rolamento Escavadeira Caterpillar 171-9425',
    slug: 'rolamento-escavadeira-caterpillar-171-9425',
    description: 'Rolamento de giro original Caterpillar',
    fullDescription: 'Rolamento de giro original Caterpillar 171-9425 para torre giratória de escavadeiras. Fabricado com esferas de alta precisão e resistência.',

    price: 18500.00,
    originalPrice: 21000.00,
    discount: 12,

    categoryId: 'cat-escavadeiras',
    categoryName: 'Escavadeiras',
    brandId: 'brand-caterpillar',
    brandName: 'Caterpillar',

    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',

    inStock: true,
    stockQuantity: 2,
    sku: 'CAT-ROL-1719425',
    partNumber: '171-9425',

    specifications: [
      { label: 'Part Number', value: '171-9425' },
      { label: 'Marca', value: 'Caterpillar' },
      { label: 'Tipo', value: 'Rolamento de Giro' },
      { label: 'Diâmetro Externo', value: '2100mm' },
      { label: 'Garantia', value: '24 meses' }
    ],

    compatibility: ['Caterpillar 320D', 'Caterpillar 323D'],
    warranty: '24 meses contra defeitos de fabricação',
    weight: 485,
    dimensions: { length: 220, width: 220, height: 25 },
    tags: ['rolamento', 'giro', 'caterpillar', 'escavadeira'],

    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewCount: 7,

    createdAt: '2024-11-01T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-022',
    name: 'Mangueira Hidráulica Volvo 14524472',
    slug: 'mangueira-hidraulica-volvo-14524472',
    description: 'Mangueira de alta pressão original Volvo',
    fullDescription: 'Mangueira hidráulica de alta pressão original Volvo 14524472. Fabricada com múltiplas camadas de reforço em aço, suporta até 350 bar.',

    price: 685.00,

    categoryId: 'cat-sistemas-hidraulicos',
    categoryName: 'Sistemas Hidráulicos',
    brandId: 'brand-volvo',
    brandName: 'Volvo',

    images: ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',

    inStock: true,
    stockQuantity: 32,
    sku: 'VOL-MH-14524472',
    partNumber: '14524472',

    specifications: [
      { label: 'Part Number', value: '14524472' },
      { label: 'Marca', value: 'Volvo' },
      { label: 'Tipo', value: 'Mangueira Alta Pressão' },
      { label: 'Pressão Máxima', value: '350 bar' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['Volvo EC210', 'Volvo EC240'],
    warranty: '12 meses contra defeitos de fabricação',
    weight: 3.2,
    dimensions: { length: 180, width: 8, height: 8 },
    tags: ['mangueira', 'hidraulica', 'volvo', 'alta pressao'],

    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewCount: 14,

    createdAt: '2024-11-10T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-023',
    name: 'Tensor Esteira John Deere AT189228',
    slug: 'tensor-esteira-john-deere-at189228',
    description: 'Tensor de esteira original John Deere',
    fullDescription: 'Tensor de esteira original John Deere AT189228 para tratores de esteira. Sistema de ajuste hidráulico automático para tensão ideal.',

    price: 4250.00,

    categoryId: 'cat-tratores',
    categoryName: 'Tratores de Esteira',
    brandId: 'brand-john-deere',
    brandName: 'John Deere',

    images: ['https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',

    inStock: true,
    stockQuantity: 6,
    sku: 'JD-TENS-AT189228',
    partNumber: 'AT189228',

    specifications: [
      { label: 'Part Number', value: 'AT189228' },
      { label: 'Marca', value: 'John Deere' },
      { label: 'Tipo', value: 'Tensor Hidráulico' },
      { label: 'Sistema', value: 'Ajuste Automático' },
      { label: 'Garantia', value: '18 meses' }
    ],

    compatibility: ['John Deere 700J', 'John Deere 750J', 'John Deere 850J'],
    warranty: '18 meses contra defeitos de fabricação',
    weight: 38,
    dimensions: { length: 60, width: 30, height: 30 },
    tags: ['tensor', 'esteira', 'john deere', 'trator'],

    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewCount: 9,

    createdAt: '2024-11-18T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-024',
    name: 'Braço Escavadeira JCB 333/D7164',
    slug: 'braco-escavadeira-jcb-333-d7164',
    description: 'Braço completo original JCB para escavadeiras JS',
    fullDescription: 'Braço de escavadeira original JCB 333/D7164 completo com buchas e pinos. Estrutura reforçada em aço de alta resistência.',

    price: 24500.00,
    originalPrice: 27000.00,
    discount: 9,

    categoryId: 'cat-escavadeiras',
    categoryName: 'Escavadeiras',
    brandId: 'brand-jcb',
    brandName: 'JCB',

    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400',

    inStock: true,
    stockQuantity: 2,
    sku: 'JCB-BRA-333D7164',
    partNumber: '333/D7164',

    specifications: [
      { label: 'Part Number', value: '333/D7164' },
      { label: 'Marca', value: 'JCB' },
      { label: 'Tipo', value: 'Braço Completo' },
      { label: 'Comprimento', value: '3.2m' },
      { label: 'Garantia', value: '24 meses' }
    ],

    compatibility: ['JCB JS220', 'JCB JS240'],
    warranty: '24 meses contra defeitos de fabricação',
    weight: 1250,
    dimensions: { length: 320, width: 50, height: 40 },
    tags: ['braco', 'escavadeira', 'jcb', 'estrutura'],

    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewCount: 5,

    createdAt: '2024-11-25T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-025',
    name: 'Filtro Transmissão Caterpillar 3I-0610',
    slug: 'filtro-transmissao-caterpillar-3i-0610',
    description: 'Filtro de transmissão original Caterpillar',
    fullDescription: 'Filtro de transmissão hidráulica original Caterpillar 3I-0610. Protege contra contaminação e garante vida útil estendida da transmissão.',

    price: 425.00,
    originalPrice: 485.00,
    discount: 12,

    categoryId: 'cat-filtros',
    categoryName: 'Filtros',
    brandId: 'brand-caterpillar',
    brandName: 'Caterpillar',

    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',

    inStock: true,
    stockQuantity: 54,
    sku: 'CAT-FT-3I0610',
    partNumber: '3I-0610',

    specifications: [
      { label: 'Part Number', value: '3I-0610' },
      { label: 'Marca', value: 'Caterpillar' },
      { label: 'Tipo', value: 'Filtro de Transmissão' },
      { label: 'Eficiência', value: '99.5%' },
      { label: 'Garantia', value: '6 meses' }
    ],

    compatibility: ['Caterpillar 950H', 'Caterpillar 962H', 'Caterpillar 966H'],
    warranty: '6 meses contra defeitos de fabricação',
    weight: 1.8,
    dimensions: { length: 25, width: 15, height: 15 },
    tags: ['filtro', 'transmissao', 'caterpillar'],

    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewCount: 21,

    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-026',
    name: 'Pinhão Volvo 11172907',
    slug: 'pinhao-volvo-11172907',
    description: 'Pinhão de transmissão final Volvo',
    fullDescription: 'Pinhão de transmissão final original Volvo 11172907. Engrenagem cônica temperada e retificada para máxima durabilidade.',

    price: 3850.00,

    categoryId: 'cat-transmissao',
    categoryName: 'Transmissão',
    brandId: 'brand-volvo',
    brandName: 'Volvo',

    images: ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',

    inStock: true,
    stockQuantity: 5,
    sku: 'VOL-PIN-11172907',
    partNumber: '11172907',

    specifications: [
      { label: 'Part Number', value: '11172907' },
      { label: 'Marca', value: 'Volvo' },
      { label: 'Tipo', value: 'Pinhão Cônico' },
      { label: 'Material', value: 'Aço Temperado' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['Volvo L120', 'Volvo L150', 'Volvo L180'],
    warranty: '12 meses contra defeitos de fabricação',
    weight: 22.5,
    dimensions: { length: 35, width: 25, height: 25 },
    tags: ['pinhao', 'transmissao', 'volvo', 'engrenagem'],

    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewCount: 8,

    createdAt: '2024-12-05T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-027',
    name: 'Sapata Esteira Komatsu 20Y-32-11140',
    slug: 'sapata-esteira-komatsu-20y-32-11140',
    description: 'Sapata de esteira 600mm Komatsu',
    fullDescription: 'Sapata de esteira original Komatsu 20Y-32-11140 com largura de 600mm. Aço forjado e tratado termicamente para aplicações em mineração.',

    price: 685.00,

    categoryId: 'cat-tratores',
    categoryName: 'Tratores de Esteira',
    brandId: 'brand-komatsu',
    brandName: 'Komatsu',

    images: ['https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=400',

    inStock: true,
    stockQuantity: 86,
    sku: 'KOM-SAP-20Y3211140',
    partNumber: '20Y-32-11140',

    specifications: [
      { label: 'Part Number', value: '20Y-32-11140' },
      { label: 'Marca', value: 'Komatsu' },
      { label: 'Tipo', value: 'Sapata de Esteira' },
      { label: 'Largura', value: '600mm' },
      { label: 'Garantia', value: '18 meses' }
    ],

    compatibility: ['Komatsu D65', 'Komatsu D85'],
    warranty: '18 meses contra defeitos de fabricação',
    weight: 28.5,
    dimensions: { length: 60, width: 30, height: 12 },
    tags: ['sapata', 'esteira', 'komatsu', 'mineracao'],

    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewCount: 25,

    createdAt: '2024-12-08T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-028',
    name: 'Cilindro Direção Case 87427827',
    slug: 'cilindro-direcao-case-87427827',
    description: 'Cilindro de direção hidráulica Case',
    fullDescription: 'Cilindro de direção hidráulica original Case 87427827 para retroescavadeiras. Sistema de direção assistida com alta precisão e resposta rápida.',

    price: 2950.00,

    categoryId: 'cat-retroescavadeiras',
    categoryName: 'Retroescavadeiras',
    brandId: 'brand-case',
    brandName: 'Case',

    images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',

    inStock: true,
    stockQuantity: 7,
    sku: 'CASE-CD-87427827',
    partNumber: '87427827',

    specifications: [
      { label: 'Part Number', value: '87427827' },
      { label: 'Marca', value: 'Case' },
      { label: 'Tipo', value: 'Cilindro de Direção' },
      { label: 'Curso', value: '200mm' },
      { label: 'Garantia', value: '18 meses' }
    ],

    compatibility: ['Case 580N', 'Case 580SM', 'Case 580 Super N'],
    warranty: '18 meses contra defeitos de fabricação',
    weight: 18.5,
    dimensions: { length: 85, width: 15, height: 15 },
    tags: ['cilindro', 'direcao', 'case', 'hidraulica'],

    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewCount: 11,

    createdAt: '2024-12-10T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-029',
    name: 'Compressor Ar Condicionado John Deere RE69716',
    slug: 'compressor-ar-condicionado-john-deere-re69716',
    description: 'Compressor de ar condicionado original John Deere',
    fullDescription: 'Compressor de ar condicionado original John Deere RE69716. Sistema de climatização eficiente para conforto do operador em longas jornadas.',

    price: 4250.00,
    originalPrice: 4800.00,
    discount: 11,

    categoryId: 'cat-carregadeiras',
    categoryName: 'Carregadeiras',
    brandId: 'brand-john-deere',
    brandName: 'John Deere',

    images: ['https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',

    inStock: true,
    stockQuantity: 4,
    sku: 'JD-COMP-RE69716',
    partNumber: 'RE69716',

    specifications: [
      { label: 'Part Number', value: 'RE69716' },
      { label: 'Marca', value: 'John Deere' },
      { label: 'Tipo', value: 'Compressor A/C' },
      { label: 'Refrigerante', value: 'R134a' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['John Deere 544K', 'John Deere 624K', 'John Deere 644K'],
    warranty: '12 meses contra defeitos de fabricação',
    weight: 15.2,
    dimensions: { length: 35, width: 30, height: 30 },
    tags: ['compressor', 'ar condicionado', 'john deere', 'cabine'],

    isFeatured: false,
    isNew: true,
    rating: 4.9,
    reviewCount: 6,

    createdAt: '2024-12-12T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-030',
    name: 'Caixa Fusíveis JCB 728/52100',
    slug: 'caixa-fusiveis-jcb-728-52100',
    description: 'Caixa de fusíveis elétrica completa JCB',
    fullDescription: 'Caixa de fusíveis elétrica original JCB 728/52100 com todos os relés e fusíveis. Central de distribuição elétrica para retroescavadeiras.',

    price: 1650.00,

    categoryId: 'cat-retroescavadeiras',
    categoryName: 'Retroescavadeiras',
    brandId: 'brand-jcb',
    brandName: 'JCB',

    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400',

    inStock: true,
    stockQuantity: 12,
    sku: 'JCB-CF-72852100',
    partNumber: '728/52100',

    specifications: [
      { label: 'Part Number', value: '728/52100' },
      { label: 'Marca', value: 'JCB' },
      { label: 'Tipo', value: 'Caixa de Fusíveis' },
      { label: 'Voltagem', value: '24V' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['JCB 3CX', 'JCB 4CX'],
    warranty: '12 meses contra defeitos de fabricação',
    weight: 2.8,
    dimensions: { length: 30, width: 20, height: 12 },
    tags: ['fusivel', 'eletrica', 'jcb', 'seguranca'],

    isFeatured: false,
    isNew: false,
    rating: 4.6,
    reviewCount: 8,

    createdAt: '2024-12-14T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-031',
    name: 'Bomba Água Caterpillar 196-8845',
    slug: 'bomba-agua-caterpillar-196-8845',
    description: 'Bomba d\'água do motor Caterpillar C9',
    fullDescription: 'Bomba d\'água original Caterpillar 196-8845 para motor C9. Garante circulação adequada do líquido de arrefecimento e temperatura ideal do motor.',

    price: 1850.00,
    originalPrice: 2100.00,
    discount: 12,

    categoryId: 'cat-motores',
    categoryName: 'Motores e Componentes',
    brandId: 'brand-caterpillar',
    brandName: 'Caterpillar',

    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',

    inStock: true,
    stockQuantity: 16,
    sku: 'CAT-BA-1968845',
    partNumber: '196-8845',

    specifications: [
      { label: 'Part Number', value: '196-8845' },
      { label: 'Marca', value: 'Caterpillar' },
      { label: 'Aplicação', value: 'Motor C9' },
      { label: 'Tipo', value: 'Bomba Centrífuga' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['Caterpillar 329D', 'Caterpillar 336D', 'Caterpillar 950H'],
    warranty: '12 meses contra defeitos de fabricação',
    weight: 8.5,
    dimensions: { length: 30, width: 25, height: 20 },
    tags: ['bomba', 'agua', 'caterpillar', 'arrefecimento'],

    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewCount: 13,

    createdAt: '2024-12-15T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-032',
    name: 'Sensor Temperatura Volvo 21176217',
    slug: 'sensor-temperatura-volvo-21176217',
    description: 'Sensor de temperatura do líquido de arrefecimento Volvo',
    fullDescription: 'Sensor de temperatura original Volvo 21176217 para monitoramento do líquido de arrefecimento. Precisão e resposta rápida para proteção do motor.',

    price: 285.00,

    categoryId: 'cat-escavadeiras',
    categoryName: 'Escavadeiras',
    brandId: 'brand-volvo',
    brandName: 'Volvo',

    images: ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',

    inStock: true,
    stockQuantity: 38,
    sku: 'VOL-SENS-21176217',
    partNumber: '21176217',

    specifications: [
      { label: 'Part Number', value: '21176217' },
      { label: 'Marca', value: 'Volvo' },
      { label: 'Tipo', value: 'Sensor de Temperatura' },
      { label: 'Faixa', value: '-40°C a +150°C' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['Volvo EC210', 'Volvo EC240', 'Volvo EC290'],
    warranty: '12 meses contra defeitos de fabricação',
    weight: 0.15,
    dimensions: { length: 8, width: 5, height: 5 },
    tags: ['sensor', 'temperatura', 'volvo', 'eletrica'],

    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewCount: 16,

    createdAt: '2024-12-16T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-033',
    name: 'Correia Ventilador Komatsu 6731-61-1550',
    slug: 'correia-ventilador-komatsu-6731-61-1550',
    description: 'Correia em V para ventilador motor Komatsu',
    fullDescription: 'Correia em V original Komatsu 6731-61-1550 para ventilador e alternador. Composto de borracha de alta resistência e reforço em kevlar.',

    price: 165.00,

    categoryId: 'cat-motores',
    categoryName: 'Motores e Componentes',
    brandId: 'brand-komatsu',
    brandName: 'Komatsu',

    images: ['https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=400',

    inStock: true,
    stockQuantity: 72,
    sku: 'KOM-COR-673161155',
    partNumber: '6731-61-1550',

    specifications: [
      { label: 'Part Number', value: '6731-61-1550' },
      { label: 'Marca', value: 'Komatsu' },
      { label: 'Tipo', value: 'Correia em V' },
      { label: 'Comprimento', value: '1650mm' },
      { label: 'Garantia', value: '6 meses' }
    ],

    compatibility: ['Komatsu PC200', 'Komatsu PC220', 'Komatsu WA320'],
    warranty: '6 meses contra defeitos de fabricação',
    weight: 0.8,
    dimensions: { length: 165, width: 3, height: 2 },
    tags: ['correia', 'ventilador', 'komatsu', 'motor'],

    isFeatured: false,
    isNew: false,
    rating: 4.6,
    reviewCount: 22,

    createdAt: '2024-12-17T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-034',
    name: 'Anel Vedação Case 131406A1',
    slug: 'anel-vedacao-case-131406a1',
    description: 'Anel de vedação para cilindro hidráulico Case',
    fullDescription: 'Kit de anéis de vedação original Case 131406A1 para cilindros hidráulicos. Inclui selos, O-rings e anéis raspadores em poliuretano.',

    price: 385.00,

    categoryId: 'cat-sistemas-hidraulicos',
    categoryName: 'Sistemas Hidráulicos',
    brandId: 'brand-case',
    brandName: 'Case',

    images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',

    inStock: true,
    stockQuantity: 45,
    sku: 'CASE-AV-131406A1',
    partNumber: '131406A1',

    specifications: [
      { label: 'Part Number', value: '131406A1' },
      { label: 'Marca', value: 'Case' },
      { label: 'Tipo', value: 'Kit de Vedações' },
      { label: 'Material', value: 'Poliuretano' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['Case 580N', 'Case 580SM', 'Case 590'],
    warranty: '12 meses contra defeitos de fabricação',
    weight: 1.2,
    dimensions: { length: 20, width: 15, height: 5 },
    tags: ['vedacao', 'anel', 'case', 'cilindro'],

    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewCount: 18,

    createdAt: '2024-12-17T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  },
  
  {
    id: 'prod-035',
    name: 'Painel Instrumentos John Deere AT194969',
    slug: 'painel-instrumentos-john-deere-at194969',
    description: 'Painel de instrumentos digital John Deere',
    fullDescription: 'Painel de instrumentos digital original John Deere AT194969. Display LCD com todas as informações do trator: RPM, temperatura, pressão, horas.',

    price: 5850.00,
    originalPrice: 6500.00,
    discount: 10,

    categoryId: 'cat-carregadeiras',
    categoryName: 'Carregadeiras',
    brandId: 'brand-john-deere',
    brandName: 'John Deere',

    images: ['https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800'],
    thumbnail: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',

    inStock: true,
    stockQuantity: 3,
    sku: 'JD-PAIN-AT194969',
    partNumber: 'AT194969',

    specifications: [
      { label: 'Part Number', value: 'AT194969' },
      { label: 'Marca', value: 'John Deere' },
      { label: 'Tipo', value: 'Painel Digital' },
      { label: 'Display', value: 'LCD 7 polegadas' },
      { label: 'Garantia', value: '12 meses' }
    ],

    compatibility: ['John Deere 544K', 'John Deere 624K', 'John Deere 644K'],
    warranty: '12 meses contra defeitos de fabricação',
    weight: 2.5,
    dimensions: { length: 30, width: 25, height: 8 },
    tags: ['painel', 'instrumentos', 'john deere', 'digital'],

    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewCount: 4,

    createdAt: '2024-12-17T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    code: ''
  }
];
