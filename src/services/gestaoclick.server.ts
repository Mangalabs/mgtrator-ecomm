import 'server-only'

import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  Product,
  ProductFilters,
} from '@/data/types'
import { slugify } from '@/lib/utils'

const normalizeBaseUrl = (value?: string) =>
  value?.replace(/\/$/, '').replace(/\/api$/, '')

const BASE_URL =
  normalizeBaseUrl(process.env.GESTAOCLICK_BASE_URL) ||
  normalizeBaseUrl(process.env.CLICK_API_URL) ||
  'https://api.gestaoclick.com'
const ACCESS_TOKEN =
  process.env.GESTAOCLICK_ACCESS_TOKEN || process.env.CLICK_API_ACCESS_TOKEN
const SECRET_TOKEN =
  process.env.GESTAOCLICK_SECRET_TOKEN || process.env.CLICK_API_PRIVATE_TOKEN
const STORE_ID =
  process.env.GESTAOCLICK_LOJA_ID || process.env.CLICK_API_STORE_ID
const DEFAULT_REVALIDATE = Number(
  process.env.GESTAOCLICK_REVALIDATE_SECONDS || 60,
)
const IN_STOCK_CACHE_TTL_MS = 5 * 60 * 1000

// let inStockCache: { products: Product[]; cachedAt: number } | null = null
// let cacheBuildPromise: Promise<void> | null = null

const hasCredentials = Boolean(ACCESS_TOKEN && SECRET_TOKEN)

type GestaoclickListResponse<T> = {
  code: number
  status: string
  meta?: {
    total_registros?: number
    total_da_pagina?: number
    pagina_atual?: number
    limite_por_pagina?: number
    total_paginas?: number
    total_registros_pagina?: number
  }
  data: T[]
}

type GestaoclickProduct = Record<string, unknown>

const toNumber = (value: unknown): number => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const normalized = value.replace(',', '.')
    const parsed = Number(normalized)
    return Number.isFinite(parsed) ? parsed : 0
  }
  return 0
}

const getString = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value : fallback

const getValueString = (value: unknown): string =>
  typeof value === 'string'
    ? value
    : typeof value === 'number'
      ? String(value)
      : ''

const getObjectField = (value: unknown, keys: string[]): string => {
  if (!value || typeof value !== 'object') return ''
  const record = value as Record<string, unknown>
  for (const key of keys) {
    const extracted = getValueString(record[key])
    if (extracted) return extracted
  }
  return ''
}

const dedupeByCode = (products: Product[]) => {
  const mapped = new Map<string, Product>()
  products.forEach((product) => {
    const key = product.code ? `${product.code}::${product.name}` : product.id
    const existing = mapped.get(key)
    if (!existing) {
      mapped.set(key, product)
      return
    }

    const existingStock = existing.stockQuantity ?? 0
    const nextStock = product.stockQuantity ?? 0
    if (nextStock > existingStock) {
      mapped.set(key, product)
    }
  })

  return Array.from(mapped.values())
}

const getImages = (data: GestaoclickProduct): string[] => {
  const candidates = [
    data.fotos,
    data.imagens,
    data.imagem,
    data.imagem_url,
    data.url_imagem,
    data.foto,
    data.foto_url,
    data.url_foto,
    data.galeria,
  ]

  const extracted: string[] = []

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      candidate.forEach((item) => {
        if (typeof item === 'string') extracted.push(item)
        if (item && typeof item === 'object') {
          const url = (item as Record<string, unknown>).url
          if (typeof url === 'string') extracted.push(url)
        }
      })
    } else if (typeof candidate === 'string') {
      extracted.push(candidate)
    }
  }

  return extracted.filter(Boolean)
}

const mapProduct = (data: GestaoclickProduct): Product => {
  const id = getString(data.id, '') || String(data.id ?? '')
  const name = getString(data.nome, 'Produto')
  const code =
    getString(data.codigo_interno) ||
    getString(data.codigo) ||
    getString(data.codigo_barra) ||
    id
  const description =
    getString(data.descricao) ||
    getString(data.observacoes) ||
    'Descrição não informada.'

  const images = getImages(data)
  const thumbnail = images[0] || ''

  const price = toNumber(data.valor_venda) || toNumber(data.valor_custo) || 0
  const baseStock = toNumber(data.estoque)
  const variations = Array.isArray(data.variacoes) ? data.variacoes : []
  const variationsStock = variations.reduce((total, entry) => {
    if (!entry || typeof entry !== 'object') return total
    const record = entry as Record<string, unknown>
    const variation = record.variacao as Record<string, unknown> | undefined
    if (!variation) return total
    return total + toNumber(variation.estoque)
  }, 0)
  const stockQuantity = baseStock > 0 ? baseStock : variationsStock

  const ncmCode =
    getValueString(data.ncm) ||
    getValueString(data.NCM) ||
    getValueString(data.ncm_code) ||
    getValueString(data.ncmCodigo) ||
    getValueString(data.ncm_codigo) ||
    getValueString((data as Record<string, unknown>).fiscal) ||
    getObjectField(data.ncm, ['codigo', 'code', 'id']) ||
    getObjectField(data.NCM, ['codigo', 'code', 'id']) ||
    getObjectField((data as Record<string, unknown>).fiscal, ['ncm', 'NCM'])
  const ncmDescription =
    getString(data.ncm_descricao) ||
    getString(data.ncm_description) ||
    getString(data.ncmDescricao) ||
    getString(data.ncm_desc) ||
    getObjectField(data.ncm, ['descricao', 'description', 'desc']) ||
    getObjectField(data.NCM, ['descricao', 'description', 'desc'])
  const cestCode =
    getValueString(data.cest) ||
    getValueString(data.CEST) ||
    getValueString(data.cest_code) ||
    getValueString(data.cestCodigo) ||
    getValueString(data.cest_codigo) ||
    getObjectField(data.cest, ['codigo', 'code', 'id']) ||
    getObjectField(data.CEST, ['codigo', 'code', 'id']) ||
    getObjectField((data as Record<string, unknown>).fiscal, ['cest', 'CEST'])
  const cestDescription =
    getString(data.cest_descricao) ||
    getString(data.cest_description) ||
    getString(data.cestDescricao) ||
    getString(data.cest_desc) ||
    getObjectField(data.cest, ['descricao', 'description', 'desc']) ||
    getObjectField(data.CEST, ['descricao', 'description', 'desc'])

  const hasClassification = Boolean(ncmCode || cestCode)
  const fallbackCategory =
    getString((data as Record<string, unknown>).nome_grupo) ||
    getString((data as Record<string, unknown>).grupo) ||
    ''
  const categoryName = hasClassification
    ? ncmCode
      ? `NCM ${ncmCode}${ncmDescription ? ` - ${ncmDescription}` : ''}`
      : `CEST ${cestCode}${cestDescription ? ` - ${cestDescription}` : ''}`
    : fallbackCategory
  const categoryId = hasClassification
    ? ncmCode || cestCode || ''
    : fallbackCategory
  const brandName =
    getString(data.marca) || getString(data.fabricante) || 'MG Trator'

  return {
    id,
    name,
    code,
    slug: slugify(`${name}-${code}`),
    description,
    price,
    categoryId,
    categoryName,
    brandId: slugify(brandName) || 'mg-trator',
    brandName,
    images,
    thumbnail,
    inStock: stockQuantity > 0,
    stockQuantity,
    sku: code,
    partNumber: getString(data.codigo_barra, code),
    deliveryType: 'pronta-entrega',
    isFeatured: Boolean(data.destaque),
    isNew: Boolean(data.novo),
    createdAt: getString(data.cadastrado_em) || new Date().toISOString(),
    updatedAt: getString(data.modificado_em) || new Date().toISOString(),
  }
}

const buildHeaders = () => ({
  'access-token': ACCESS_TOKEN ?? '',
  'secret-access-token': SECRET_TOKEN ?? '',
})

const fetchGestaoclick = async <T>(path: string, params?: URLSearchParams) => {
  const url = new URL(`${BASE_URL}${path}`)
  if (params) {
    params.forEach((value, key) => url.searchParams.set(key, value))
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch(url.toString(), {
      headers: buildHeaders(),
      next: { revalidate: DEFAULT_REVALIDATE },
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados (${response.status})`)
    }

    return (await response.json()) as T
  } finally {
    clearTimeout(timeoutId)
  }
}

export const hasGestaoclickConfig = () => hasCredentials

const fallbackPaginated = (
  _filters?: ProductFilters,
  pagination?: PaginationParams,
): ApiResponse<PaginatedResponse<Product>> => {
  const page = pagination?.page || 1
  const limit = pagination?.limit || 12

  return {
    success: true,
    data: {
      data: [],
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: page > 1,
      },
    },
  }
}

export const getGestaoclickProducts = async (
  filters?: ProductFilters,
  pagination?: PaginationParams,
): Promise<ApiResponse<PaginatedResponse<Product>>> => {
  if (!hasCredentials) {
    return fallbackPaginated(filters, pagination)
  }

  try {
    const params = new URLSearchParams()
    if (STORE_ID) {
      params.set('loja_id', STORE_ID)
    }
    if (filters?.search) {
      const trimmed = filters.search.trim()
      if (trimmed) {
        const isCodeSearch = /^\d+$/.test(trimmed)
        if (isCodeSearch) {
          params.set('codigo', trimmed)
        } else {
          params.set('nome', trimmed)
        }
      }
    }
    if (filters?.categoryId && /^\d+$/.test(filters.categoryId)) {
      params.set('grupo_id', filters.categoryId)
    }
    if (filters?.inStock !== undefined) {
      params.set('ativo', filters.inStock ? '1' : '0')
    }

    const page = pagination?.page || 1
    const limit = pagination?.limit || 20
    
    params.set('pagina', String(page))
    params.set('limite', String(limit))

    const response = await fetchGestaoclick<
      GestaoclickListResponse<GestaoclickProduct>
    >('/api/produtos', params)

    const refineProducts = (products: Product[]) => {
      let filtered = dedupeByCode(products)

      const search = filters?.search?.toLowerCase()
      if (search) {
        filtered = filtered.filter((product) =>
          [
            product.name,
            product.description,
            product.code,
            product.brandName,
            product.categoryName,
          ]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(search)),
        )
      }

      if (filters?.categoryId) {
        filtered = filtered.filter((product) => {
          const categoryMatch = [
            product.categoryId.toLowerCase(),
            product.categoryName.toLowerCase(),
            slugify(product.categoryName),
          ]
          return categoryMatch.includes(filters.categoryId!.toLowerCase())
        })
      }

      if (filters?.brandId) {
        filtered = filtered.filter((product) =>
          [
            product.brandId.toLowerCase(),
            product.brandName.toLowerCase(),
          ].includes(filters.brandId!.toLowerCase()),
        )
      }

      return filtered
    }

    const aggregated = response.data.map(mapProduct)
    const refined = refineProducts(aggregated)

    const total = response.meta?.total_registros ?? refined.length
    const totalPages = response.meta?.total_paginas ?? Math.ceil(total / limit)

    return {
      success: true,
      data: {
        data: refined,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    }
  } catch {
    return fallbackPaginated(filters, pagination)
  }
}

export const getGestaoclickProductById = async (
  id: string,
): Promise<ApiResponse<Product | null>> => {
  if (!hasCredentials) {
    return {
      success: true,
      data: null,
    }
  }

  try {
    const response = await fetchGestaoclick<{ data: GestaoclickProduct }>(
      `/api/produtos/${id}`,
    )

    return {
      success: true,
      data: response.data ? mapProduct(response.data) : null,
    }
  } catch {
    return {
      success: false,
      data: null,
      error: 'Erro ao buscar produto',
    }
  }
}

export const getGestaoclickProductBySlug = async (
  slug: string,
): Promise<ApiResponse<Product | null>> => {
  if (/^\d+$/.test(slug)) {
    return getGestaoclickProductById(slug)
  }

  const response = await getGestaoclickProducts(
    { search: slug },
    { page: 1, limit: 50 },
  )
  const match = response.data?.data.find((product) => product.slug === slug)

  return {
    success: Boolean(match),
    data: match || null,
  }
}

export const getGestaoclickFeaturedProducts = async (
  limit = 8,
): Promise<ApiResponse<Product[]>> => {
  const response = await getGestaoclickProducts(undefined, { page: 1, limit })
  return {
    success: response.success,
    data: response.data?.data || [],
  }
}

export const getGestaoclickRelatedProducts = async (
  productId: string,
  limit = 4,
): Promise<ApiResponse<Product[]>> => {
  const productResponse = await getGestaoclickProductById(productId)
  if (!productResponse.data) {
    return { success: true, data: [] }
  }

  const productsResponse = await getGestaoclickProducts(
    { categoryId: productResponse.data.categoryId },
    { page: 1, limit: limit + 1 },
  )

  const related = (productsResponse.data?.data || []).filter(
    (product) => product.id !== productId,
  )

  return { success: true, data: related.slice(0, limit) }
}
