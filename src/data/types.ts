export type Timestamp = Date | string

export interface BaseEntity {
  id: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface SeoFields {
  seoTitle?: string
  seoDescription?: string
}

export interface BaseAddress {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Address extends BaseAddress {
  type: 'shipping' | 'billing'
  recipientName: string
  cpfCnpj?: string
  phone: string
}

export type DeliveryType = 'pronta-entrega' | 'sob-encomenda' | 'importado'

export interface ProductSpecification {
  label: string
  value: string
}

export interface Product extends BaseEntity {
  code: string
  name: string
  slug: string
  description: string
  fullDescription?: string
  price: number
  originalPrice?: number
  discount?: number
  categoryId: string
  categoryName: string
  brandId: string
  brandName: string
  images: string[]
  thumbnail: string
  inStock: boolean
  stockQuantity?: number
  sku: string
  partNumber: string
  specifications?: ProductSpecification[]
  compatibility?: string[]
  warranty?: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  tags?: string[]
  deliveryType?: DeliveryType
  isFeatured?: boolean
  isNew?: boolean
  rating?: number
  reviewCount?: number
}

export interface Category extends BaseEntity, SeoFields {
  name: string
  slug: string
  description: string
  image: string
  icon?: string
  parentId?: string
  productCount: number
  order: number
  isActive: boolean
}

export interface Brand extends BaseEntity, SeoFields {
  name: string
  slug: string
  logo: string
  logoDark?: string
  description: string
  fullDescription?: string
  website?: string
  countryOfOrigin?: string
  establishedYear?: number
  productCount: number
  categories?: string[]
  isFeatured?: boolean
  order: number
  isActive: boolean
}

export interface OpeningHours {
  dayOfWeek: number
  dayName: string
  opens: string
  closes: string
  isClosed: boolean
}

export interface Store extends BaseEntity {
  name: string
  slug: string
  address: BaseAddress
  coordinates: {
    latitude: number
    longitude: number
  }
  contact: {
    phone: string
    phoneFormatted: string
    whatsapp?: string
    email: string
  }
  openingHours: OpeningHours[]
  image?: string
  isMainStore?: boolean
  isActive: boolean
}

export interface CompanyInfo {
  id: string
  name: string
  legalName: string
  cnpj: string
  logo: string
  logoWhite: string
  tagline: string
  description: string
  foundedYear: number
  email: {
    contact: string
    sales: string
    support?: string
  }
  phone: {
    main: string
    secondary?: string
    whatsapp: string
  }
  social: {
    instagram?: string
    facebook?: string
    linkedin?: string
    youtube?: string
  }
  marketplaces?: {
    mercadoLivre?: string
  }
  address: BaseAddress
  specialties: {
    equipments: string[]
    brands: string[]
    segments: string[]
  }
  stats: {
    yearsInMarket: number
    companiesServed: string
    productsInStock: string
    unitsCount: number
  }
  certifications?: string[]
  paymentMethods?: string[]
  updatedAt: Timestamp
}

export interface BlogPost extends BaseEntity, SeoFields {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  author: {
    name: string
    avatar?: string
    role?: string
  }
  category: string
  tags?: string[]
  publishedAt: Timestamp
  readTime?: number
  views?: number
  isPublished: boolean
}

export interface ProductFilters {
  categoryId?: string
  brandId?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  search?: string
  tags?: string[]
  isFeatured?: boolean
  isNew?: boolean
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface CartItem {
  product: Product
  quantity: number
  addedAt: Timestamp
}

export interface Coupon {
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minPurchase?: number
  maxDiscount?: number
  expiresAt?: Timestamp
}

export interface CouponCode {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  description: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  itemCount: number
  coupon?: Coupon
}

export interface OrderItem {
  productId: string
  productName: string
  productCode: string
  productImage: string
  quantity: number
  unitPrice: number
  total: number
}

export type PaymentMethod = 'pix' | 'credit_card' | 'debit_card' | 'bank_slip' | 'cash'

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'cancelled'

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface Order extends BaseEntity {
  orderNumber: string
  customerId?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  shippingAddress: Address
  billingAddress?: Address
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus
  couponCode?: string
  couponDiscount?: number
  shippingMethod?: ShippingOption
  trackingCode?: string
  notes?: string
  paidAt?: Timestamp
  shippedAt?: Timestamp
  deliveredAt?: Timestamp
  cancelledAt?: Timestamp
}

export interface ShippingOption {
  id: string
  name: string
  price: number
  estimatedDays: string
  carrier: string
}

export interface CheckoutFormData {
  customerName: string
  customerEmail: string
  customerPhone: string
  cpfCnpj: string
  shippingAddress: Address
  useSameAddress: boolean
  billingAddress?: Address
  paymentMethod: PaymentMethod
  acceptTerms: boolean
  acceptNewsletter?: boolean
  notes?: string
}

export interface PaymentIntent {
  id: string
  orderId: string
  amount: number
  currency: string
  status: PaymentStatus
  paymentMethod: PaymentMethod
  pixQrCode?: string
  pixQrCodeUrl?: string
  pixCopyPaste?: string
  installments?: number
  cardBrand?: string
  cardLastDigits?: string
  boletoUrl?: string
  boletoBarcode?: string
  boletoDueDate?: Timestamp
  createdAt: Timestamp
  expiresAt?: Timestamp
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface ApiError {
  success: false
  error: string
  code?: string
  details?: string
}