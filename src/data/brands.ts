import { Brand } from './types';

export const brandsData: Brand[] = [
  {
    id: 'brand-caterpillar',
    name: 'Caterpillar',
    slug: 'caterpillar',
    
    logo: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400',
    logoDark: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400',
    
    description: 'Líder mundial em equipamentos de construção e mineração',
    fullDescription: 'A Caterpillar é a líder mundial em fabricação de equipamentos de construção, mineração e motores. Com mais de 95 anos de história, oferece produtos robustos e confiáveis para os segmentos mais exigentes.',
    
    website: 'https://www.caterpillar.com',
    countryOfOrigin: 'Estados Unidos',
    establishedYear: 1925,
    
    productCount: 150,
    categories: ['escavadeiras', 'carregadeiras', 'tratores'],
    
    isFeatured: true,
    order: 1,
    isActive: true,
    
    seoTitle: 'Peças Originais Caterpillar | MG Trator Peças',
    seoDescription: 'Peças originais Caterpillar para escavadeiras, carregadeiras e tratores. Estoque completo e pronta entrega em MG.',
    
    createdAt: '2014-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  },
  
  {
    id: 'brand-volvo',
    name: 'Volvo',
    slug: 'volvo',
    
    logo: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',
    logoDark: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',
    
    description: 'Referência em escavadeiras e carregadeiras de alto desempenho',
    fullDescription: 'A Volvo Construction Equipment é reconhecida mundialmente pela qualidade, inovação e sustentabilidade de seus equipamentos. Oferece soluções completas para construção e mineração.',
    
    website: 'https://www.volvoce.com',
    countryOfOrigin: 'Suécia',
    establishedYear: 1832,
    
    productCount: 120,
    categories: ['escavadeiras', 'carregadeiras', 'retroescavadeiras'],
    
    isFeatured: true,
    order: 2,
    isActive: true,
    
    seoTitle: 'Peças Originais Volvo | MG Trator Peças',
    seoDescription: 'Peças originais Volvo para equipamentos de construção e mineração. Distribuidor autorizado em Contagem e Betim/MG.',
    
    createdAt: '2014-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  },
  
  {
    id: 'brand-komatsu',
    name: 'Komatsu',
    slug: 'komatsu',
    
    logo: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=400',
    logoDark: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=400',
    
    description: 'Tecnologia japonesa para máquinas de construção e mineração',
    fullDescription: 'A Komatsu é uma das maiores fabricantes de equipamentos de construção e mineração do mundo. Com tecnologia avançada e durabilidade comprovada, é escolha de grandes mineradoras.',
    
    website: 'https://www.komatsu.com.br',
    countryOfOrigin: 'Japão',
    establishedYear: 1921,
    
    productCount: 95,
    categories: ['escavadeiras', 'carregadeiras', 'tratores'],
    
    isFeatured: true,
    order: 3,
    isActive: true,
    
    seoTitle: 'Peças Originais Komatsu | MG Trator Peças',
    seoDescription: 'Peças originais Komatsu para equipamentos de mineração. Estoque completo para escavadeiras, carregadeiras e tratores.',
    
    createdAt: '2014-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  },
  
  {
    id: 'brand-case',
    name: 'Case',
    slug: 'case',
    
    logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
    logoDark: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
    
    description: 'Especialista em retroescavadeiras e equipamentos versáteis',
    fullDescription: 'A Case é referência mundial em retroescavadeiras, oferecendo equipamentos versáteis e confiáveis para construção civil e obras de infraestrutura.',
    
    website: 'https://www.casece.com',
    countryOfOrigin: 'Estados Unidos',
    establishedYear: 1842,
    
    productCount: 80,
    categories: ['retroescavadeiras', 'carregadeiras', 'escavadeiras'],
    
    isFeatured: false,
    order: 4,
    isActive: true,
    
    seoTitle: 'Peças Originais Case | MG Trator Peças',
    seoDescription: 'Peças originais Case para retroescavadeiras e carregadeiras. Distribuidor autorizado em MG com pronta entrega.',
    
    createdAt: '2015-06-10T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  },
  
  {
    id: 'brand-jcb',
    name: 'JCB',
    slug: 'jcb',
    
    logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400',
    logoDark: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400',
    
    description: 'Inovação britânica em equipamentos de construção',
    fullDescription: 'A JCB é uma das principais fabricantes de equipamentos de construção do mundo, conhecida por sua inovação e pela icônica retroescavadeira amarela.',
    
    website: 'https://www.jcb.com',
    countryOfOrigin: 'Reino Unido',
    establishedYear: 1945,
    
    productCount: 70,
    categories: ['retroescavadeiras', 'carregadeiras', 'manipuladores'],
    
    isFeatured: false,
    order: 5,
    isActive: true,
    
    seoTitle: 'Peças Originais JCB | MG Trator Peças',
    seoDescription: 'Peças originais JCB para equipamentos de construção. Estoque para retroescavadeiras e carregadeiras em MG.',
    
    createdAt: '2016-02-18T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  },
  
  {
    id: 'brand-john-deere',
    name: 'John Deere',
    slug: 'john-deere',
    
    logo: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',
    logoDark: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',
    
    description: 'Tradição em tratores e equipamentos agrícolas/florestais',
    fullDescription: 'A John Deere é líder mundial em equipamentos agrícolas e florestais, com vasta experiência também em tratores para construção e terraplanagem.',
    
    website: 'https://www.deere.com.br',
    countryOfOrigin: 'Estados Unidos',
    establishedYear: 1837,
    
    productCount: 65,
    categories: ['tratores', 'carregadeiras', 'motoniveladoras'],
    
    isFeatured: false,
    order: 6,
    isActive: true,
    
    seoTitle: 'Peças Originais John Deere | MG Trator Peças',
    seoDescription: 'Peças originais John Deere para tratores e equipamentos pesados. Distribuidor autorizado em Contagem e Betim/MG.',
    
    createdAt: '2016-08-25T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  }
];
