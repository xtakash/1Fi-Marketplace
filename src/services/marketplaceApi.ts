import { Product, FilterOptions, EMIPlanOption, SelectedVariants, CheckoutApplication } from '../types';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { calculateEMIPlans } from '../utils/emiCalculator';

export class MarketplaceApiService {
  private static simulateError = false;

  public static setSimulateError(value: boolean) {
    this.simulateError = value;
  }

  public static isSimulatingError(): boolean {
    return this.simulateError;
  }

  /**
   * Fetches products from the backend API `/api/products` connected to the database
   */
  public static async getProducts(filters?: Partial<FilterOptions>): Promise<{ products: Product[]; totalCount: number }> {
    if (this.simulateError) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      throw new Error('Unable to connect to 1Fi Marketplace catalog servers. Please try again.');
    }

    try {
      const queryParams = new URLSearchParams();
      if (filters?.category) queryParams.set('category', filters.category);
      if (filters?.searchQuery) queryParams.set('search', filters.searchQuery);
      if (filters?.sortBy) queryParams.set('sortBy', filters.sortBy);
      if (filters?.noCostOnly) queryParams.set('noCostOnly', 'true');

      const response = await fetch(`/api/products?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      const data = await response.json();
      if (data.success && Array.isArray(data.products)) {
        return {
          products: data.products,
          totalCount: data.total ?? data.products.length
        };
      }
    } catch (err) {
      console.warn('Backend API request failed or running in client preview, falling back to local database store:', err);
    }

    // Fallback if backend API is offline
    await new Promise((resolve) => setTimeout(resolve, 250));
    let results = [...MOCK_PRODUCTS];

    if (filters?.category && filters.category !== 'all') {
      results = results.filter((p) => p.category === filters.category);
    }

    if (filters?.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q)
      );
    }

    if (filters?.noCostOnly) {
      results = results.filter((p) => p.noCostTenures.length > 0);
    }

    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          results.sort((a, b) => a.basePrice - b.basePrice);
          break;
        case 'price-desc':
          results.sort((a, b) => b.basePrice - a.basePrice);
          break;
        case 'emi-asc':
          results.sort((a, b) => {
            const maxA = Math.max(...a.availableTenures) || 12;
            const maxB = Math.max(...b.availableTenures) || 12;
            return a.basePrice / maxA - b.basePrice / maxB;
          });
          break;
        case 'popularity':
        default:
          results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
          break;
      }
    }

    return {
      products: results,
      totalCount: results.length
    };
  }

  /**
   * Fetches single product details by id or slug from `/api/products/:id`
   */
  public static async getProductById(id: string): Promise<Product | null> {
    if (this.simulateError) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      throw new Error('Failed to retrieve product details from 1Fi service.');
    }

    try {
      const response = await fetch(`/api/products/${encodeURIComponent(id)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.product) {
          return data.product;
        }
      }
    } catch (err) {
      console.warn('Direct API fetch failed, falling back to local catalog store:', err);
    }

    // Local fallback
    const item = MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id);
    return item ? JSON.parse(JSON.stringify(item)) : null;
  }

  /**
   * Calculates real-time dynamic EMI plans from backend `/api/products/:id/emi-plans`
   */
  public static async getDynamicEMIPlans(
    product: Product,
    selectedVariants?: SelectedVariants,
    downPayment: number = 0
  ): Promise<EMIPlanOption[]> {
    try {
      const params = new URLSearchParams();
      if (selectedVariants?.storage) params.set('storageId', selectedVariants.storage);
      if (selectedVariants?.color) params.set('colorId', selectedVariants.color);
      params.set('downPayment', String(downPayment));

      const response = await fetch(`/api/products/${encodeURIComponent(product.id)}/emi-plans?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.plans)) {
          return data.plans;
        }
      }
    } catch (err) {
      console.warn('EMI plans calculation API error, generating dynamically:', err);
    }

    // Client fallback computation
    const finalPrice = this.calculateDynamicPrice(product, selectedVariants);
    return calculateEMIPlans(
      finalPrice,
      downPayment,
      product.availableTenures,
      product.noCostTenures
    );
  }

  /**
   * Calculates dynamic price based on product variants
   */
  public static calculateDynamicPrice(product: Product, variants?: SelectedVariants): number {
    let price = product.basePrice;

    if (variants?.storage && product.variants.storage) {
      const storageOption = product.variants.storage.find((s) => s.id === variants.storage);
      if (storageOption) {
        price += storageOption.priceDelta;
      }
    }

    if (variants?.color && product.variants.colors) {
      const colorOption = product.variants.colors.find((c) => c.id === variants.color);
      if (colorOption) {
        price += colorOption.priceDelta;
      }
    }

    return price;
  }

  /**
   * Submits 1Fi instant credit verification & checkout submission to `/api/orders`
   */
  public static async submitOrderApplication(
    application: Omit<CheckoutApplication, 'orderId' | 'creditApproved' | 'timestamp'>
  ): Promise<CheckoutApplication> {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: application.productId,
          variantStorage: application.selectedVariants.storage,
          variantColor: application.selectedVariants.color,
          tenureMonths: application.selectedEMIPlan.tenureMonths,
          monthlyInstallment: application.selectedEMIPlan.monthlyInstallment,
          interestRate: application.selectedEMIPlan.interestRateAnnual,
          totalPayable: application.selectedEMIPlan.totalPayable,
          cashback: application.selectedEMIPlan.cashbackAmount || 7500,
          customerName: application.userAddress.fullName,
          phone: application.userAddress.phone,
          address: application.userAddress.addressLine,
          pincode: application.userAddress.pincode
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.order) {
          const remainingLimit = Math.max(0, application.availableLimit - application.selectedEMIPlan.principalAmount);
          return {
            ...application,
            orderId: data.order.orderId,
            creditApproved: true,
            availableLimit: remainingLimit,
            timestamp: data.order.createdAt
          };
        }
      }
    } catch (err) {
      console.warn('Orders API post failed, completing in-memory transaction:', err);
    }

    // Offline fallback
    await new Promise((resolve) => setTimeout(resolve, 400));
    const orderId = `1FI-${Math.floor(100000 + Math.random() * 900000)}`;
    const remainingLimit = Math.max(0, application.availableLimit - application.selectedEMIPlan.principalAmount);

    return {
      ...application,
      orderId,
      creditApproved: true,
      availableLimit: remainingLimit,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Retrieves Database Schema and seed statistics from backend
   */
  public static async getDatabaseSchema() {
    try {
      const res = await fetch('/api/database/schema');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Schema fetch error:', e);
    }
    return null;
  }
}
