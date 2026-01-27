/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  Product, 
  Category, 
  Brand, 
  Store, 
  CompanyInfo,
  ProductFilters,
  PaginationParams,
  PaginatedResponse,
  ApiResponse
} from '../data/types';

import { 
  products as productsData, 
  categories as categoriesData, 
  brands as brandsData, 
  stores as storesData 
} from '../data/mockData';

import { companyData } from '../data/company';

const simulateNetworkDelay = (ms: number = 300) => 
  new Promise(resolve => setTimeout(resolve, ms));

const successResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data
});

const errorResponse = (error: string) => ({
  success: false,
  error,
  data: null as any
});

export const getProducts = async (
  filters?: ProductFilters,
  pagination?: PaginationParams
): Promise<ApiResponse<PaginatedResponse<Product>>> => {
  await simulateNetworkDelay();
  
  try {
    let filtered = [...productsData];
    
    if (filters) {
      if (filters.categoryId) {
        filtered = filtered.filter(p => p.categoryId === filters.categoryId);
      }
      if (filters.brandId) {
        filtered = filtered.filter(p => p.brandId === filters.brandId);
      }
      if (filters.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice!);
      }
      if (filters.inStock !== undefined) {
        filtered = filtered.filter(p => p.inStock === filters.inStock);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.partNumber.toLowerCase().includes(search)
        );
      }
      if (filters.isFeatured !== undefined) {
        filtered = filtered.filter(p => p.isFeatured === filters.isFeatured);
      }
      if (filters.isNew !== undefined) {
        filtered = filtered.filter(p => p.isNew === filters.isNew);
      }
    }
    
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedData = filtered.slice(startIndex, endIndex);
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    
    return successResponse({
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    return errorResponse('Erro ao buscar produtos');
  }
};

export const getProductById = async (id: string): Promise<ApiResponse<Product | null>> => {
  await simulateNetworkDelay();
  
  try {
    const product = productsData.find(p => p.id === id);
    return successResponse(product || null);
  } catch (error) {
    return errorResponse('Erro ao buscar produto');
  }
};

export const getProductBySlug = async (slug: string): Promise<ApiResponse<Product | null>> => {
  await simulateNetworkDelay();
  
  try {
    const product = productsData.find(p => p.slug === slug);
    return successResponse(product || null);
  } catch (error) {
    return errorResponse('Erro ao buscar produto');
  }
};

export const getFeaturedProducts = async (limit: number = 8): Promise<ApiResponse<Product[]>> => {
  await simulateNetworkDelay();
  
  try {
    const featured = productsData.filter(p => p.isFeatured).slice(0, limit);
    return successResponse(featured);
  } catch (error) {
    return errorResponse('Erro ao buscar produtos em destaque');
  }
};

export const getRelatedProducts = async (productId: string, limit: number = 4): Promise<ApiResponse<Product[]>> => {
  await simulateNetworkDelay();
  
  try {
    const product = productsData.find(p => p.id === productId);
    if (!product) return successResponse([]);
    
    const related = productsData
      .filter(p => p.id !== productId && p.categoryId === product.categoryId)
      .slice(0, limit);
    
    return successResponse(related);
  } catch (error) {
    return errorResponse('Erro ao buscar produtos relacionados');
  }
};

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  await simulateNetworkDelay();
  
  try {
    const active = categoriesData
      .filter(c => c.isActive)
      .sort((a, b) => a.order - b.order);
    return successResponse(active);
  } catch (error) {
    return errorResponse('Erro ao buscar categorias');
  }
};

export const getCategoryById = async (id: string): Promise<ApiResponse<Category | null>> => {
  await simulateNetworkDelay();
  
  try {
    const category = categoriesData.find(c => c.id === id);
    return successResponse(category || null);
  } catch (error) {
    return errorResponse('Erro ao buscar categoria');
  }
};

export const getCategoryBySlug = async (slug: string): Promise<ApiResponse<Category | null>> => {
  await simulateNetworkDelay();
  
  try {
    const category = categoriesData.find(c => c.slug === slug);
    return successResponse(category || null);
  } catch (error) {
    return errorResponse('Erro ao buscar categoria');
  }
};

export const getBrands = async (): Promise<ApiResponse<Brand[]>> => {
  await simulateNetworkDelay();
  
  try {
    const active = brandsData
      .filter(b => b.isActive)
      .sort((a, b) => a.order - b.order);
    return successResponse(active);
  } catch (error) {
    return errorResponse('Erro ao buscar marcas');
  }
};

export const getBrandById = async (id: string): Promise<ApiResponse<Brand | null>> => {
  await simulateNetworkDelay();
  
  try {
    const brand = brandsData.find(b => b.id === id);
    return successResponse(brand || null);
  } catch (error) {
    return errorResponse('Erro ao buscar marca');
  }
};

export const getBrandBySlug = async (slug: string): Promise<ApiResponse<Brand | null>> => {
  await simulateNetworkDelay();
  
  try {
    const brand = brandsData.find(b => b.slug === slug);
    return successResponse(brand || null);
  } catch (error) {
    return errorResponse('Erro ao buscar marca');
  }
};

export const getFeaturedBrands = async (): Promise<ApiResponse<Brand[]>> => {
  await simulateNetworkDelay();
  
  try {
    const featured = brandsData
      .filter(b => b.isActive)
      .sort((a, b) => a.order - b.order);
    return successResponse(featured);
  } catch (error) {
    return errorResponse('Erro ao buscar marcas em destaque');
  }
};

export const getStores = async (): Promise<ApiResponse<Store[]>> => {
  await simulateNetworkDelay();
  
  try {
    const active = storesData.filter(s => s.isActive);
    return successResponse(active);
  } catch (error) {
    return errorResponse('Erro ao buscar lojas');
  }
};

export const getStoreById = async (id: string): Promise<ApiResponse<Store | null>> => {
  await simulateNetworkDelay();
  
  try {
    const store = storesData.find(s => s.id === id);
    return successResponse(store || null);
  } catch (error) {
    return errorResponse('Erro ao buscar loja');
  }
};

export const getCompanyInfo = async (): Promise<ApiResponse<CompanyInfo>> => {
  await simulateNetworkDelay();
  
  try {
    return successResponse(companyData);
  } catch (error) {
    return errorResponse('Erro ao buscar informações da empresa');
  }
};

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
  
};

export default api;