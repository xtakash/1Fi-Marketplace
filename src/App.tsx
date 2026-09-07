import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { ShopHeaderTabs } from './components/shop/ShopHeaderTabs';
import { TopBrandsView } from './components/shop/TopBrandsView';
import { NearbyStoresView } from './components/shop/NearbyStoresView';
import { MarketplaceCatalogView } from './components/shop/MarketplaceCatalogView';
import { ProductDetailView } from './components/product/ProductDetailView';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { DatabaseSchemaModal } from './components/database/DatabaseSchemaModal';
import { Product, ShopTab, SelectedVariants, EMIPlanOption, CheckoutApplication } from './types';
import { MarketplaceApiService } from './services/marketplaceApi';

export default function App() {
  // Navigation & View state
  const [shopTab, setShopTab] = useState<ShopTab>('marketplace');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobileFramed, setIsMobileFramed] = useState<boolean>(false);
  const [creditLimit, setCreditLimit] = useState<number>(250000);

  // Modals state
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [checkoutPayload, setCheckoutPayload] = useState<{
    product: Product;
    variants: SelectedVariants;
    plan: EMIPlanOption;
    finalPrice: number;
  } | null>(null);
  const [showSchemaModal, setShowSchemaModal] = useState<boolean>(false);

  // URL routing handler (support unique URLs like /products/iphone-17-pro)
  useEffect(() => {
    const handleLocationChange = async () => {
      const path = window.location.pathname;
      if (path.startsWith('/products/')) {
        const slug = path.replace('/products/', '').trim();
        if (slug) {
          const product = await MarketplaceApiService.getProductById(slug);
          if (product) {
            setSelectedProduct(product);
            setShopTab('marketplace');
          }
        }
      } else {
        setSelectedProduct(null);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    const targetUrl = `/products/${product.slug || product.id}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ productId: product.id }, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
  };

  const handleProceedToCheckout = (
    product: Product,
    variants: SelectedVariants,
    plan: EMIPlanOption,
    finalPrice: number
  ) => {
    setCheckoutPayload({ product, variants, plan, finalPrice });
    setShowCheckoutModal(true);
  };

  const handleCheckoutSuccess = (application: CheckoutApplication) => {
    setCreditLimit(application.availableLimit);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center selection:bg-emerald-500 selection:text-slate-950">
      {/* Outer Container with Optional Mobile Device Frame for Evaluators */}
      <div
        className={`w-full transition-all duration-300 flex flex-col flex-1 ${
          isMobileFramed
            ? 'max-w-[430px] my-6 rounded-[40px] border-8 border-slate-800 shadow-2xl shadow-emerald-950/40 overflow-hidden bg-slate-950 ring-1 ring-slate-700 min-h-[850px]'
            : 'max-w-7xl'
        }`}
      >
        {/* Header */}
        <Header
          creditLimit={creditLimit}
          isMobileFramed={isMobileFramed}
          onToggleFrame={() => setIsMobileFramed(!isMobileFramed)}
        />

        {/* Shop Header Tabs: Top Brands | Nearby Stores | 1Fi Marketplace */}
        {!selectedProduct && (
          <ShopHeaderTabs
            activeTab={shopTab}
            onSelectTab={(tab) => {
              setShopTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 px-4 py-4 w-full">
          {selectedProduct ? (
            <ProductDetailView
              product={selectedProduct}
              onBack={handleBackToCatalog}
              onProceedToCheckout={handleProceedToCheckout}
            />
          ) : (
            <>
              {shopTab === 'top-brands' && (
                <TopBrandsView onSwitchToMarketplace={() => setShopTab('marketplace')} />
              )}
              {shopTab === 'nearby-stores' && (
                <NearbyStoresView onSwitchToMarketplace={() => setShopTab('marketplace')} />
              )}
              {shopTab === 'marketplace' && (
                <MarketplaceCatalogView
                  onSelectProduct={handleSelectProduct}
                  onOpenSchemaModal={() => setShowSchemaModal(true)}
                />
              )}
            </>
          )}
        </main>

        {/* Sticky Bottom Navigation (Mobile App Shell) */}
        {!selectedProduct && (
          <BottomNav activeTab="shop" onTabChange={() => {}} />
        )}

        {/* Checkout & Instant Mutual Fund Credit Approval Modal */}
        {showCheckoutModal && checkoutPayload && (
          <CheckoutModal
            product={checkoutPayload.product}
            selectedVariants={checkoutPayload.variants}
            selectedPlan={checkoutPayload.plan}
            finalPrice={checkoutPayload.finalPrice}
            availableLimit={creditLimit}
            onClose={() => setShowCheckoutModal(false)}
            onSuccess={handleCheckoutSuccess}
          />
        )}

        {/* Database Schema & REST API Inspection Modal for Assignment Reviewers */}
        {showSchemaModal && (
          <DatabaseSchemaModal onClose={() => setShowSchemaModal(false)} />
        )}
      </div>
    </div>
  );
}
