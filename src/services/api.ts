import {
  Product,
  Category,
  Brand,
  Store,
  CompanyInfo,
  ProductFilters,
  PaginationParams,
  PaginatedResponse,
  ApiResponse,
} from '../data/types'

import {
  categories as categoriesData,
  brands as brandsData,
  stores as storesData,
} from '../data/mockData'

import { companyData } from '../data/company'
import {
  getGestaoclickFeaturedProducts,
  getGestaoclickProductById,
  getGestaoclickProductBySlug,
  getGestaoclickProducts,
  getGestaoclickRelatedProducts,
  hasGestaoclickConfig,
} from './gestaoclick.server'
import {
  getBackendFeaturedProducts,
  getBackendProductById,
  getBackendProductBySlug,
  getBackendProducts,
  getBackendRelatedProducts,
  hasBackendConfig,
} from './backend.server'

const simulateNetworkDelay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const successResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
})

const errorResponse = <T>(error: string, data: T): ApiResponse<T> => ({
  success: false,
  error,
  data,
})

const emptyPaginated = (
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

export const getProducts = async (
  filters?: ProductFilters,
  pagination?: PaginationParams,
): Promise<ApiResponse<PaginatedResponse<Product>>> => {
  if (hasBackendConfig()) {
    return getBackendProducts(filters, pagination)
  }

  if (hasGestaoclickConfig()) {
    return getGestaoclickProducts(filters, pagination)
  }

  return emptyPaginated(pagination)
}

export const getProductById = async (
  id: string,
): Promise<ApiResponse<Product | null>> => {
  if (hasBackendConfig()) {
    return getBackendProductById(id)
  }

  if (hasGestaoclickConfig()) {
    return getGestaoclickProductById(id)
  }

  return successResponse(null)
}

export const getProductBySlug = async (
  slug: string,
): Promise<ApiResponse<Product | null>> => {
  if (hasBackendConfig()) {
    return getBackendProductBySlug(slug)
  }

  if (hasGestaoclickConfig()) {
    return getGestaoclickProductBySlug(slug)
  }

  return successResponse(null)
}

export const getFeaturedProducts = async (
  limit: number = 8,
): Promise<ApiResponse<Product[]>> => {
  if (hasBackendConfig()) {
    return getBackendFeaturedProducts(limit)
  }

  if (hasGestaoclickConfig()) {
    return getGestaoclickFeaturedProducts(limit)
  }

  return successResponse([])
}

export const getRelatedProducts = async (
  productId: string,
  limit: number = 4,
): Promise<ApiResponse<Product[]>> => {
  if (hasBackendConfig()) {
    return getBackendRelatedProducts(productId, limit)
  }

  if (hasGestaoclickConfig()) {
    return getGestaoclickRelatedProducts(productId, limit)
  }

  return successResponse([])
}

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  await simulateNetworkDelay()

  try {
    const active = categoriesData
      .filter((c) => c.isActive)
      .sort((a, b) => a.order - b.order)
    return successResponse(active)
  } catch (error) {
    return errorResponse('Erro ao buscar categorias', [])
  }
}

export const getCategoryById = async (
  id: string,
): Promise<ApiResponse<Category | null>> => {
  await simulateNetworkDelay()

  try {
    const category = categoriesData.find((c) => c.id === id)
    return successResponse(category || null)
  } catch (error) {
    return errorResponse('Erro ao buscar categoria', null)
  }
}

export const getCategoryBySlug = async (
  slug: string,
): Promise<ApiResponse<Category | null>> => {
  await simulateNetworkDelay()

  try {
    const category = categoriesData.find((c) => c.slug === slug)
    return successResponse(category || null)
  } catch (error) {
    return errorResponse('Erro ao buscar categoria', null)
  }
}

export const getBrands = async (): Promise<ApiResponse<Brand[]>> => {
  await simulateNetworkDelay()

  try {
    const active = brandsData
      .filter((b) => b.isActive)
      .sort((a, b) => a.order - b.order)
    return successResponse(active)
  } catch (error) {
    return errorResponse('Erro ao buscar marcas', [])
  }
}

export const getBrandById = async (
  id: string,
): Promise<ApiResponse<Brand | null>> => {
  await simulateNetworkDelay()

  try {
    const brand = brandsData.find((b) => b.id === id)
    return successResponse(brand || null)
  } catch (error) {
    return errorResponse('Erro ao buscar marca', null)
  }
}

export const getBrandBySlug = async (
  slug: string,
): Promise<ApiResponse<Brand | null>> => {
  await simulateNetworkDelay()

  try {
    const brand = brandsData.find((b) => b.slug === slug)
    return successResponse(brand || null)
  } catch (error) {
    return errorResponse('Erro ao buscar marca', null)
  }
}

export const getFeaturedBrands = async (): Promise<ApiResponse<Brand[]>> => {
  await simulateNetworkDelay()

  try {
    const featured = brandsData
      .filter((b) => b.isActive)
      .sort((a, b) => a.order - b.order)
    return successResponse(featured)
  } catch (error) {
    return errorResponse('Erro ao buscar marcas em destaque', [])
  }
}

export const getStores = async (): Promise<ApiResponse<Store[]>> => {
  await simulateNetworkDelay()

  try {
    const active = storesData.filter((s) => s.isActive)
    return successResponse(active)
  } catch (error) {
    return errorResponse('Erro ao buscar lojas', [])
  }
}

export const getStoreById = async (
  id: string,
): Promise<ApiResponse<Store | null>> => {
  await simulateNetworkDelay()

  try {
    const store = storesData.find((s) => s.id === id)
    return successResponse(store || null)
  } catch (error) {
    return errorResponse('Erro ao buscar loja', null)
  }
}

export const getCompanyInfo = async (): Promise<ApiResponse<CompanyInfo>> => {
  await simulateNetworkDelay()

  try {
    return successResponse(companyData)
  } catch (error) {
    return errorResponse('Erro ao buscar informações da empresa', companyData)
  }
}

export const api = {
  getProducts,
  getProductById,
  getProductBySlug,
  getFeaturedProducts,
  getRelatedProducts,

  getCategories,
  getCategoryById,
  getCategoryBySlug,

  getBrands,
  getBrandById,
  getBrandBySlug,
  getFeaturedBrands,

  getStores,
  getStoreById,

  getCompanyInfo,
}

export default api
