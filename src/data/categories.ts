import { Category } from './types';

export const categoriesData: Category[] = [
  {
    id: 'cat-escavadeiras',
    name: 'Escavadeiras',
    slug: 'escavadeiras',
    description: 'Peças para escavadeiras hidráulicas de todos os portes',
    
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800',
    icon: 'Wrench',
    
    productCount: 245,
    order: 1,
    isActive: true,
    
    seoTitle: 'Peças para Escavadeiras Hidráulicas | MG Tratorpeças',
    seoDescription: 'Peças originais para escavadeiras Caterpillar, Volvo, Komatsu. Estoque completo de filtros, motores, sistemas hidráulicos e mais.',
    
    createdAt: '2014-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  },
  
  {
    id: 'cat-carregadeiras',
    name: 'Carregadeiras',
    slug: 'carregadeiras',
    description: 'Peças para pá carregadeiras e carregadeiras de rodas',
    
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800',
    icon: 'Truck',
    
    productCount: 198,
    order: 2,
    isActive: true,
    
    seoTitle: 'Peças para Carregadeiras | MG Tratorpeças',
    seoDescription: 'Peças originais para carregadeiras de rodas. Sistemas de transmissão, freios, hidráulicos e mais com pronta entrega.',
    
    createdAt: '2014-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  },
  
  {
    id: 'cat-retroescavadeiras',
    name: 'Retroescavadeiras',
    slug: 'retroescavadeiras',
    description: 'Peças para retroescavadeiras Case, JCB e outras marcas',
    
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    icon: 'Settings',
    
    productCount: 167,
    order: 3,
    isActive: true,
    
    seoTitle: 'Peças para Retroescavadeiras | MG Tratorpeças',
    seoDescription: 'Peças originais para retroescavadeiras Case e JCB. Caçambas, cilindros, componentes hidráulicos e motores.',
    
    createdAt: '2014-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  },
  
  {
    id: 'cat-maquinas pesadas',
    name: 'maquinas pesadas de Esteira',
    slug: 'maquinas pesadas-esteira',
    description: 'Peças para maquinas pesadas de esteira Caterpillar, Komatsu e John Deere',
    
    image: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=800',
    icon: 'Cog',
    
    productCount: 156,
    order: 4,
    isActive: true,
    
    seoTitle: 'Peças para maquinas pesadas de Esteira | MG Tratorpeças',
    seoDescription: 'Peças originais para maquinas pesadas de esteira. Esteiras, motores, transmissão e componentes para mineração e terraplanagem.',
    
    createdAt: '2014-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  },
  
  {
    id: 'cat-motores',
    name: 'Motores e Componentes',
    slug: 'motores-componentes',
    description: 'Motores diesel e componentes para máquinas pesadas',
    
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    icon: 'Package',
    
    productCount: 312,
    order: 5,
    isActive: true,
    
    seoTitle: 'Motores Diesel e Componentes | MG Tratorpeças',
    seoDescription: 'Motores diesel originais e componentes para maquinas pesadas e máquinas pesadas. Caterpillar, Volvo, Komatsu e mais.',
    
    createdAt: '2014-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  },
  
  {
    id: 'cat-filtros',
    name: 'Filtros',
    slug: 'filtros',
    description: 'Filtros de óleo, ar, combustível e hidráulicos',
    
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    icon: 'Filter',
    
    productCount: 428,
    order: 6,
    isActive: true,
    
    seoTitle: 'Filtros Originais para Máquinas Pesadas | MG Tratorpeças',
    seoDescription: 'Filtros originais de óleo, ar, combustível e hidráulicos. Maior estoque de Minas Gerais com pronta entrega.',
    
    createdAt: '2014-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  },
  
  {
    id: 'cat-sistemas-hidraulicos',
    name: 'Sistemas Hidráulicos',
    slug: 'sistemas-hidraulicos',
    description: 'Bombas, cilindros, válvulas e mangueiras hidráulicas',
    
    image: 'https://images.unsplash.com/photo-1565611539019-31102942e5c9?w=800',
    icon: 'Zap',
    
    productCount: 276,
    order: 7,
    isActive: true,
    
    seoTitle: 'Sistemas Hidráulicos para Máquinas Pesadas | MG Tratorpeças',
    seoDescription: 'Bombas, cilindros, válvulas e componentes hidráulicos originais. Atendimento especializado em MG.',
    
    createdAt: '2014-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  },
  
  {
    id: 'cat-transmissao',
    name: 'Transmissão',
    slug: 'transmissao',
    description: 'Componentes de transmissão, embreagens e diferenciais',
    
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
    icon: 'Activity',
    
    productCount: 189,
    order: 8,
    isActive: true,
    
    seoTitle: 'Transmissão para Máquinas Pesadas | MG Tratorpeças',
    seoDescription: 'Componentes de transmissão originais. Embreagens, diferenciais, eixos e mais com garantia de fábrica.',
    
    createdAt: '2014-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  }
];
