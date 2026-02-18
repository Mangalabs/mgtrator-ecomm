import 'server-only'

import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  Product,
  ProductFilters,
} from '@/data/types'
import { slugify } from '@/lib/utils'

const BASE_URL =
  process.env.MGTRATOR_BACKEND_URL ||
  process.env.ECOM_BACKEND_URL ||
  process.env.INVENTORY_BACKEND_URL

const DEFAULT_REVALIDATE = Number(
  process.env.MGTRATOR_BACKEND_REVALIDATE_SECONDS ||
    process.env.GESTAOCLICK_REVALIDATE_SECONDS ||
    60,
)

type BackendListResponse = {
  products: Record<string, unknown>[]
  pagination?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
    hasMore?: boolean
  }
}

type BackendProduct = Record<string, unknown>

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

const getImages = (data: BackendProduct): string[] => {
  const candidates = [
    data.foto,
    data.fotos,
    data.photos,
    data.photo,
    data.imagem,
    data.imagem_url,
    data.image,
    data.image_url,
    data.url_imagem,
    data.url_foto,
    data.thumbnail,
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
    } else if (candidate && typeof candidate === 'object') {
      const url = (candidate as Record<string, unknown>).url
      if (typeof url === 'string') extracted.push(url)
    }
  }

  return extracted.filter(Boolean)
}

const mapProduct = (data: BackendProduct): Product => {
  const id =
    getString(data.id) ||
    getString(data.clickId) ||
    getString(data.click_id) ||
    getString(data.barcode)
  const name = getString(data.name) || getString(data.nome, 'Produto')
  const code =
    getString(data.codigo_interno) ||
    getString(data.internalCode) ||
    getString(data.codigo) ||
    getString(data.barcode) ||
    id
  const description =
    getString(data.descricao) ||
    getString(data.description) ||
    'Descrição não informada.'
  const images = getImages(data)
  const thumbnail = images[0] || ''
  const stockQuantity = toNumber(
    data.currentStock ?? data.estoque ?? data.stock ?? data.quantity,
  )
  const ncmCode =
    getValueString(data.ncm) ||
    getValueString(data.NCM) ||
    getValueString(data.ncm_code) ||
    getValueString(data.ncmCodigo) ||
    getValueString(data.ncm_codigo) ||
    getValueString(data.ncmChapter) ||
    getValueString(data.ncm_chapter) ||
    getObjectField(data.ncm, ['codigo', 'code', 'id']) ||
    getObjectField(data.NCM, ['codigo', 'code', 'id'])
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
    getObjectField(data.CEST, ['codigo', 'code', 'id'])
  const cestDescription =
    getString(data.cest_descricao) ||
    getString(data.cest_description) ||
    getString(data.cestDescricao) ||
    getString(data.cest_desc) ||
    getObjectField(data.cest, ['descricao', 'description', 'desc']) ||
    getObjectField(data.CEST, ['descricao', 'description', 'desc'])

  const hasClassification = Boolean(ncmCode || cestCode)
  const backendCategory = getString(data.category)
  const categoryName = hasClassification
    ? ncmCode
      ? `NCM ${ncmCode}${ncmDescription ? ` - ${ncmDescription}` : ''}`
      : `CEST ${cestCode}${cestDescription ? ` - ${cestDescription}` : ''}`
    : backendCategory
  const categoryId = hasClassification
    ? ncmCode || cestCode || ''
    : getString(data.categoryId) || backendCategory
  const brandName =
    getString(data.brandName) ||
    getString(data.brand) ||
    getString(data.marca) ||
    getString(data.fabricante) ||
    'MG Trator'

  return {
    id,
    name,
    code,
    slug: slugify(`${name}-${code}`),
    description,
    price:
      toNumber(data.price) ||
      toNumber(data.preco) ||
      toNumber(data.valor_venda) ||
      0,
    categoryId,
    categoryName,
    brandId: slugify(brandName) || 'mg-trator',
    brandName,
    images,
    thumbnail,
    inStock: Boolean(data.inStock) || stockQuantity > 0,
    stockQuantity,
    sku: code,
    partNumber: getString(data.partNumber) || code,
    deliveryType: 'pronta-entrega',
    isFeatured: Boolean(data.isFeatured),
    isNew: Boolean(data.isNew),
    createdAt: getString(data.createdAt) || new Date().toISOString(),
    updatedAt: getString(data.updatedAt) || new Date().toISOString(),
  }
}

const buildUrl = (path: string, params?: URLSearchParams) => {
  const url = new URL(`${BASE_URL}${path}`)
  if (params) {
    params.forEach((value, key) => url.searchParams.set(key, value))
  }
  return url
}

const fetchBackend = async (path: string, params?: URLSearchParams) => {
  if (!BASE_URL) {
    throw new Error('Backend URL não configurada')
  }

  const response = await fetch(buildUrl(path, params).toString(), {
    next: { revalidate: DEFAULT_REVALIDATE },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados (${response.status})`)
  }

  return (await response.json()) as BackendListResponse
}

export const hasBackendConfig = () => Boolean(BASE_URL)

const buildPagination = (
  page: number,
  limit: number,
  count: number,
  pagination?: BackendListResponse['pagination'],
) => {
  const inferredHasMore = pagination?.hasMore ?? (count === limit && count > 0)
  const total =
    pagination?.total ?? (inferredHasMore ? page * limit + 1 : count)
  const totalPages =
    pagination?.totalPages ?? (total > 0 ? Math.ceil(total / limit) : 0)
  const hasNext = inferredHasMore || page < totalPages

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrev: page > 1,
  }
}

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

const backendNotConfigured = (
  pagination?: PaginationParams,
): ApiResponse<PaginatedResponse<Product>> => {
  const page = pagination?.page || 1
  const limit = pagination?.limit || 12

  return {
    success: false,
    message: 'Backend de catálogo não configurado',
    error: 'BACKEND_NOT_CONFIGURED',
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

const fetchCatalog = async (params: URLSearchParams) =>
  fetchBackend('/product/catalog', params)

const fetchWithClickData = async (params: URLSearchParams) =>
  fetchBackend('/products/with-click-data', params)

const buildParams = (
  filters: ProductFilters | undefined,
  page: number,
  limit: number,
) => {
  const params = new URLSearchParams()
  params.set('page', String(page))
  params.set('limit', String(limit))
  if (filters?.search) {
    params.set('search', filters.search)
  }
  if (filters?.categoryId) {
    params.set('category', filters.categoryId)
  }
  params.set('inStock', filters?.inStock === false ? 'false' : 'true')
  return params
}

export const getBackendProducts = async (
  filters?: ProductFilters,
  pagination?: PaginationParams,
): Promise<ApiResponse<PaginatedResponse<Product>>> => {
  if (!BASE_URL) {
    return backendNotConfigured(pagination)
  }

  try {
    const page = pagination?.page || 1
    const limit = pagination?.limit || 20

    const params = buildParams(filters, page, limit)
    let response: BackendListResponse

    try {
      response = await fetchCatalog(params)
    } catch {
      response = await fetchWithClickData(params)
    }

    const mapped = response.products.map(mapProduct)
    const paginationInfo = response.pagination
      ? {
          page: response.pagination.page ?? page,
          limit: response.pagination.limit ?? limit,
          total: response.pagination.total ?? mapped.length,
          totalPages:
            response.pagination.totalPages ??
            Math.ceil((response.pagination.total ?? mapped.length) / limit),
          hasNext:
            response.pagination.hasMore ??
            page <
              (response.pagination.totalPages ??
                Math.ceil(
                  (response.pagination.total ?? mapped.length) / limit,
                )),
          hasPrev: page > 1,
        }
      : buildPagination(page, limit, mapped.length, response.pagination)

    return {
      success: true,
      data: {
        data: mapped,
        pagination: paginationInfo,
      },
    }
  } catch {
    return fallbackPaginated(filters, pagination)
  }
}

export const getBackendProductById = async (
  id: string,
): Promise<ApiResponse<Product | null>> => {
  const response = await getBackendProducts(undefined, { page: 1, limit: 200 })
  const match = response.data?.data.find(
    (product) => product.id === id || product.code === id,
  )

  return {
    success: Boolean(match),
    data: match || null,
  }
}

export const getBackendProductBySlug = async (
  slug: string,
): Promise<ApiResponse<Product | null>> => {
  const response = await getBackendProducts(undefined, { page: 1, limit: 200 })
  const match = response.data?.data.find((product) => product.slug === slug)

  return {
    success: Boolean(match),
    data: match || null,
  }
}

export const getBackendFeaturedProducts = async (
  limit = 8,
): Promise<ApiResponse<Product[]>> => {
  const response = await getBackendProducts(undefined, { page: 1, limit })
  return {
    success: response.success,
    data: response.data?.data || [],
  }
}

export const getBackendRelatedProducts = async (
  productId: string,
  limit = 4,
): Promise<ApiResponse<Product[]>> => {
  const productResponse = await getBackendProductById(productId)
  if (!productResponse.data) {
    return { success: true, data: [] }
  }

  const productsResponse = await getBackendProducts(
    { categoryId: productResponse.data.categoryId },
    { page: 1, limit: limit + 1 },
  )

  const related = (productsResponse.data?.data || []).filter(
    (product) => product.id !== productId,
  )

  return { success: true, data: related.slice(0, limit) }
}
