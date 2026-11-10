import type { CatalogLine, CatalogLineId } from './types'
import { siteConfig } from './site'
import { storesData } from './stores'

// Catálogo adaptado dos PDFs em `public/catalogos/`. Fotos provisórias
// extraídas dos PDFs (ver docs/catalogo-plan.md); nomes sugeridos pelo site e
// pendentes de revisão pela loja.

const IMG_AMARELA = '/catalogo/linha-amarela'
const IMG_VERDE = '/catalogo/linha-verde'

export const catalogLines: CatalogLine[] = [
  {
    id: 'linha-amarela',
    brand: 'MG Tratorpeças',
    title: 'Peças para linha amarela',
    description:
      'Componentes de reposição para motores, transmissão, hidráulica e sistema elétrico de máquinas pesadas Volvo, SDLG, Deutz, CAT e XCMG.',
    heroImage: `${IMG_AMARELA}/escavadeira.webp`,
    contacts: storesData.map((store) => ({
      label: store.name.replace('Unidade ', ''),
      phoneFormatted: store.contact.phoneFormatted,
      whatsapp: store.contact.whatsapp ?? siteConfig.contact.whatsapp,
    })),
    pdf: { href: '/catalogos/catalogo-linha-amarela.pdf', size: '1 MB' },
    brands: ['Volvo', 'SDLG', 'Deutz', 'CAT', 'XCMG', 'Fleetguard', 'Parker Racor', 'Donaldson'],
    categories: [
      {
        id: 'motor',
        name: 'Motor',
        description: 'Peças internas e injeção para motores diesel.',
        items: [
          {
            id: 'kit-motor',
            name: 'Kit de motor',
            description: 'Pistão, camisa, anéis e jogo de juntas para retífica.',
            image: `${IMG_AMARELA}/kit-motor.webp`,
          },
          {
            id: 'bronzinas',
            name: 'Bronzinas',
            description: 'Bronzinas de biela e de mancal.',
            image: `${IMG_AMARELA}/bronzinas.webp`,
          },
          {
            id: 'bico-injetor',
            name: 'Bico injetor',
            description: 'Injetores para sistemas common rail.',
            image: `${IMG_AMARELA}/bico-injetor.webp`,
          },
        ],
      },
      {
        id: 'filtracao',
        name: 'Filtração',
        description: 'Filtros originais e homologados para manutenção preventiva.',
        items: [
          {
            id: 'filtros-oleo-combustivel',
            name: 'Filtros de óleo e combustível',
            description: 'Filtros lubrificantes e de combustível para motores diesel.',
            image: `${IMG_AMARELA}/filtros-oleo-combustivel.webp`,
          },
          {
            id: 'filtros-separadores',
            name: 'Filtros separadores de água',
            description: 'Separadores de água e elementos de combustível.',
            image: `${IMG_AMARELA}/filtros-separadores.webp`,
          },
        ],
      },
      {
        id: 'hidraulica',
        name: 'Hidráulica',
        description: 'Componentes do sistema hidráulico de escavadeiras e carregadeiras.',
        items: [
          {
            id: 'bomba-hidraulica',
            name: 'Bomba hidráulica principal',
            description: 'Bombas de pistão para escavadeiras.',
            image: `${IMG_AMARELA}/bomba-hidraulica.webp`,
          },
        ],
      },
      {
        id: 'eletrica',
        name: 'Elétrica e eletrônica',
        description: 'Geração de energia e gerenciamento do motor.',
        items: [
          {
            id: 'alternador',
            name: 'Alternador',
            description: 'Alternadores para motores de máquinas pesadas.',
            image: `${IMG_AMARELA}/alternador.webp`,
          },
          {
            id: 'modulo-ecu',
            name: 'Módulo de controle do motor (ECU)',
            description: 'Centrais eletrônicas de gerenciamento do motor.',
            image: `${IMG_AMARELA}/modulo-ecu.webp`,
          },
        ],
      },
    ],
  },
  {
    id: 'linha-verde',
    brand: 'MG Agro',
    title: 'Peças para máquinas agrícolas',
    description:
      'Reposição para plantadeiras, pulverizadores e colheitadeiras, com o atendimento da MG Tratorpeças no campo.',
    heroImage: `${IMG_VERDE}/trator-campo.webp`,
    contacts: [
      {
        label: siteConfig.agroContact.name,
        phoneFormatted: siteConfig.agroContact.phoneFormatted,
        whatsapp: siteConfig.agroContact.whatsapp,
      },
    ],
    pdf: { href: '/catalogos/catalogo-mg-agro.pdf', size: '13 MB' },
    brands: [],
    categories: [
      {
        id: 'plantadeira',
        name: 'Plantadeira',
        description: 'Distribuição de sementes e linhas de plantio.',
        items: [
          {
            id: 'disco-dosador',
            name: 'Disco dosador de sementes',
            description: 'Discos perfurados para dosadores a vácuo.',
            image: `${IMG_VERDE}/disco-dosador.webp`,
          },
          {
            id: 'condutor-sementes',
            name: 'Condutor de sementes',
            description: 'Tubo de descida da semente até o sulco.',
            image: `${IMG_VERDE}/condutor-sementes.webp`,
          },
          {
            id: 'mangueira-condutora',
            name: 'Mangueira condutora',
            description: 'Mangueira sanfonada para condução de sementes e adubo.',
            image: `${IMG_VERDE}/mangueira-condutora.webp`,
          },
          {
            id: 'roda-limitadora',
            name: 'Roda limitadora de profundidade',
            description: 'Controla a profundidade de deposição da semente.',
            image: `${IMG_VERDE}/roda-limitadora.webp`,
          },
          {
            id: 'raspador-disco',
            name: 'Raspador de disco',
            description: 'Mantém os discos de corte livres de terra e palha.',
            image: `${IMG_VERDE}/raspador-disco.webp`,
          },
        ],
      },
      {
        id: 'pulverizador',
        name: 'Pulverizador',
        description: 'Aplicação, bombeamento e chassi de pulverizadores.',
        items: [
          {
            id: 'pontas-pulverizacao',
            name: 'Pontas de pulverização',
            description: 'Pontas em várias vazões, identificadas por cor.',
            image: `${IMG_VERDE}/pontas-pulverizacao.webp`,
          },
          {
            id: 'porta-bico',
            name: 'Porta-bico',
            description: 'Corpo de bico com fixação na barra.',
            image: `${IMG_VERDE}/porta-bico.webp`,
          },
          {
            id: 'filtros-bico',
            name: 'Filtros de bico',
            description: 'Filtros de malha para proteger as pontas.',
            image: `${IMG_VERDE}/filtros-bico.webp`,
          },
          {
            id: 'bomba-centrifuga',
            name: 'Bomba centrífuga',
            description: 'Bomba de calda com acionamento hidráulico.',
            image: `${IMG_VERDE}/bomba-centrifuga.webp`,
          },
          {
            id: 'bolsao-ar',
            name: 'Bolsão de ar da suspensão',
            description: 'Mola pneumática para suspensão.',
            image: `${IMG_VERDE}/bolsao-ar.webp`,
          },
          {
            id: 'pastilhas-freio',
            name: 'Pastilhas de freio',
            description: 'Jogo de pastilhas com pinos e travas.',
            image: `${IMG_VERDE}/pastilhas-freio.webp`,
          },
          {
            id: 'corrente',
            name: 'Corrente de transmissão',
            description: 'Correntes de rolos para acionamentos.',
            image: `${IMG_VERDE}/corrente.webp`,
          },
        ],
      },
      {
        id: 'colheitadeira',
        name: 'Colheitadeira',
        description: 'Plataforma de corte, trilha, limpeza e transmissão.',
        items: [
          {
            id: 'dedo-plataforma',
            name: 'Dedo duplo da plataforma',
            description: 'Guia das navalhas na plataforma de corte.',
            image: `${IMG_VERDE}/dedo-plataforma.webp`,
          },
          {
            id: 'facas-picador',
            name: 'Facas do picador de palha',
            description: 'Facas lisas e serrilhadas para o picador.',
            image: `${IMG_VERDE}/facas-picador.webp`,
          },
          {
            id: 'peneira',
            name: 'Peneira de limpeza',
            description: 'Peneira do sistema de limpeza de grãos.',
            image: `${IMG_VERDE}/peneira.webp`,
          },
          {
            id: 'mancal',
            name: 'Mancal com rolamento',
            description: 'Mancal flangeado com colar de travamento.',
            image: `${IMG_VERDE}/mancal.webp`,
          },
          {
            id: 'polia',
            name: 'Polia',
            description: 'Polias para acionamentos por correia.',
            image: `${IMG_VERDE}/polia.webp`,
          },
          {
            id: 'correias',
            name: 'Correias',
            description: 'Correias em V e multivias.',
            image: `${IMG_VERDE}/correias.webp`,
          },
          {
            id: 'filtros-ar',
            name: 'Filtros de ar',
            description: 'Elementos primário e secundário.',
            image: `${IMG_VERDE}/filtros-ar.webp`,
          },
        ],
      },
    ],
  },
]

export const getCatalogLine = (id: CatalogLineId) =>
  catalogLines.find((line) => line.id === id)
