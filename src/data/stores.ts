import { Store } from './types';

export const storesData: Store[] = [
  {
    id: 'store-contagem-centro',
    name: 'Unidade Centro',
    slug: 'contagem-centro',
    
    address: {
      street: 'Av. Industrial',
      number: '1250',
      neighborhood: 'Centro',
      city: 'Contagem',
      state: 'MG',
      zipCode: '32040-000',
      country: 'BR'
    },
    
    coordinates: {
      latitude: -19.9320,
      longitude: -44.0540
    },
    
    contact: {
      phone: '+553133684500',
      phoneFormatted: '(31) 3368-4500',
      whatsapp: '+5531998753200',
      email: 'contato@mgtratorpecas.com.br'
    },
    
    openingHours: [
      { dayOfWeek: 0, dayName: 'Domingo', opens: '', closes: '', isClosed: true },
      { dayOfWeek: 1, dayName: 'Segunda-feira', opens: '08:00', closes: '18:00', isClosed: false },
      { dayOfWeek: 2, dayName: 'Terça-feira', opens: '08:00', closes: '18:00', isClosed: false },
      { dayOfWeek: 3, dayName: 'Quarta-feira', opens: '08:00', closes: '18:00', isClosed: false },
      { dayOfWeek: 4, dayName: 'Quinta-feira', opens: '08:00', closes: '18:00', isClosed: false },
      { dayOfWeek: 5, dayName: 'Sexta-feira', opens: '08:00', closes: '18:00', isClosed: false },
      { dayOfWeek: 6, dayName: 'Sábado', opens: '08:00', closes: '13:00', isClosed: false }
    ],
    
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    
    isMainStore: true,
    isActive: true,
    createdAt: '2014-01-15T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  },
  
  {
    id: 'store-betim-industrial',
    name: 'Unidade Industrial',
    slug: 'betim-industrial',
    
    address: {
      street: 'Rua das Máquinas',
      number: '850',
      neighborhood: 'Distrito Industrial',
      city: 'Betim',
      state: 'MG',
      zipCode: '32600-000',
      country: 'BR'
    },
    
    coordinates: {
      latitude: -19.9678,
      longitude: -44.1989
    },
    
    contact: {
      phone: '+553133684600',
      phoneFormatted: '(31) 3368-4600',
      whatsapp: '+5531998753200',
      email: 'vendas@mgtratorpecas.com.br'
    },
    
    openingHours: [
      { dayOfWeek: 0, dayName: 'Domingo', opens: '', closes: '', isClosed: true },
      { dayOfWeek: 1, dayName: 'Segunda-feira', opens: '08:00', closes: '18:00', isClosed: false },
      { dayOfWeek: 2, dayName: 'Terça-feira', opens: '08:00', closes: '18:00', isClosed: false },
      { dayOfWeek: 3, dayName: 'Quarta-feira', opens: '08:00', closes: '18:00', isClosed: false },
      { dayOfWeek: 4, dayName: 'Quinta-feira', opens: '08:00', closes: '18:00', isClosed: false },
      { dayOfWeek: 5, dayName: 'Sexta-feira', opens: '08:00', closes: '18:00', isClosed: false },
      { dayOfWeek: 6, dayName: 'Sábado', opens: '08:00', closes: '13:00', isClosed: false }
    ],
    
    image: 'https://images.unsplash.com/photo-1565611539019-31102942e5c9?w=800',
    
    isMainStore: false,
    isActive: true,
    createdAt: '2017-03-20T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  }
];
