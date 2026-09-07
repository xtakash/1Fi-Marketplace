export type ShopTab = 'top-brands' | 'nearby-stores' | 'marketplace';

export type ProductCategory = 
  | 'all'
  | 'smartphones'
  | 'laptops'
  | 'audio'
  | 'wearables'
  | 'tablets'
  | 'gaming';

export interface ProductVariantOption {
  id: string;
  name: string;
  priceDelta: number;
  hexCode?: string;
  badge?: string;
  ram?: string;
  imageUrl?: string;
}

export interface ProductVariants {
  storage?: ProductVariantOption[];
  colors?: ProductVariantOption[];
  ram?: ProductVariantOption[];
}

export interface Product {
  id: string;
  slug?: string;
  name: string;
  brand: string;
  category: ProductCategory;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured?: boolean;
  badge?: string;
  basePrice: number;
  originalMrp: number;
  discountPercentage: number;
  imageUrl: string;
  galleryUrls: string[];
  shortDesc: string;
  description: string;
  highlights: string[];
  specifications: Record<string, string>;
  warranty: string;
  deliveryEstimate: string;
  seller?: {
    name: string;
    rating: number;
    dispatchTime: string;
    deliveryWindow: string;
  };
  variants: ProductVariants;
  availableTenures: number[]; // e.g. [3, 6, 12, 24, 36, 48, 60]
  noCostTenures: number[];    // e.g. [3, 6, 12, 24]
  minDownPayment?: number;
  cashbackAmount?: number;
}

export interface EMIPlanOption {
  tenureMonths: number;
  isNoCost: boolean;
  interestRateAnnual: number;
  processingFee: number;
  monthlyInstallment: number;
  principalAmount: number;
  totalInterest: number;
  totalPayable: number;
  downPayment: number;
  interestSavings?: number;
  monthlyPrincipal?: number;
  monthlyInterest?: number;
  firstDueDate?: string;
  cashbackAmount?: number;
  backedBy?: string;
}

export interface SelectedVariants {
  storage?: string;
  color?: string;
  ram?: string;
}

export interface FilterOptions {
  category: ProductCategory;
  searchQuery: string;
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'emi-asc';
  noCostOnly: boolean;
  priceRange?: [number, number];
}

export interface CheckoutApplication {
  productId: string;
  productName: string;
  brand: string;
  imageUrl: string;
  selectedVariants: SelectedVariants;
  finalPrice: number;
  selectedEMIPlan: EMIPlanOption;
  userAddress: {
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    pincode: string;
  };
  creditApproved: boolean;
  availableLimit: number;
  orderId: string;
  timestamp: string;
}
