import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  Lock, 
  Info, 
  CheckCircle2, 
  ChevronRight,
  Copy,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { Product, SelectedVariants, EMIPlanOption } from '../../types';
import { MarketplaceApiService } from '../../services/marketplaceApi';
import { formatINR } from '../../utils/emiCalculator';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onProceedToCheckout: (product: Product, variants: SelectedVariants, emiPlan: EMIPlanOption, finalPrice: number) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onProceedToCheckout
}) => {
  // Selected variant state
  const defaultStorage = product.variants.storage?.[0]?.id || '256gb';
  const defaultColor = product.variants.colors?.[0]?.id || 'cosmic-orange';

  const [selectedVariants, setSelectedVariants] = useState<SelectedVariants>({
    storage: defaultStorage,
    color: defaultColor
  });

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [emiPlans, setEmiPlans] = useState<EMIPlanOption[]>([]);
  const [selectedTenure, setSelectedTenure] = useState<number>(12);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>('400001');
  const [isPincodeValid, setIsPincodeValid] = useState<boolean>(true);

  // Gallery images
  const allImages = product.galleryUrls && product.galleryUrls.length > 0 
    ? product.galleryUrls 
    : [product.imageUrl];

  // Dynamic final price calculation
  const finalPrice = MarketplaceApiService.calculateDynamicPrice(product, selectedVariants);

  // Fetch or compute dynamic EMI plans whenever variants or down payment changes
  useEffect(() => {
    let isMounted = true;
    MarketplaceApiService.getDynamicEMIPlans(product, selectedVariants, downPayment).then((plans) => {
      if (isMounted && plans.length > 0) {
        setEmiPlans(plans);
        // Ensure selected tenure is available
        const exists = plans.some((p) => p.tenureMonths === selectedTenure);
        if (!exists) {
          setSelectedTenure(plans[0].tenureMonths);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [product, selectedVariants, downPayment]);

  const selectedPlan = emiPlans.find((p) => p.tenureMonths === selectedTenure) || emiPlans[0];

  const handleShare = () => {
    const url = window.location.origin + `/products/${product.slug || product.id}`;
    navigator.clipboard?.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const selectedStorageObj = product.variants.storage?.find((s) => s.id === selectedVariants.storage);
  const selectedColorObj = product.variants.colors?.find((c) => c.id === selectedVariants.color);

  return (
    <div className="space-y-6 pb-28 max-w-2xl mx-auto">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Copy unique product URL"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">URL Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share URL</span>
              </>
            )}
          </button>

          <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Product Showcase Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 md:p-6 space-y-6 shadow-xl">
        {/* Gallery Section */}
        <div className="space-y-3">
          <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-slate-800/80">
            <img
              src={allImages[activeImageIndex] || product.imageUrl}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md">
                {product.badge}
              </span>
            )}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-900/90 border border-slate-800 text-slate-300 backdrop-blur-md">
              ★ {product.rating} ({product.reviewsCount.toLocaleString()} ratings)
            </div>
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex items-center justify-center gap-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded-xl bg-slate-950 p-1 border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-emerald-500 scale-105'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Title & Brand */}
        <div className="border-b border-slate-800/80 pb-4 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{product.brand}</span>
            <span className="text-xs text-slate-600">•</span>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              1Fi Mutual Fund Verified
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-100 leading-tight">
            {product.name} {selectedStorageObj ? selectedStorageObj.name : ''}
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed pt-1">
            {product.shortDesc}
          </p>
        </div>

        {/* Price & Savings Block */}
        <div className="flex items-baseline justify-between flex-wrap gap-2 pb-2">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-black text-white">
                {formatINR(finalPrice)}
              </span>
              {product.originalMrp > finalPrice && (
                <span className="text-sm md:text-base text-slate-500 line-through">
                  {formatINR(product.originalMrp)}
                </span>
              )}
              {product.originalMrp > finalPrice && (
                <span className="text-xs font-bold text-emerald-400">
                  Save {formatINR(product.originalMrp - finalPrice)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Inclusive of all taxes & doorstep delivery</p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-right">
            <span className="text-[10px] font-semibold text-slate-300 block">Guaranteed Benefit</span>
            <span className="text-xs font-bold text-emerald-300">
              ₹{(product.cashbackAmount || 7500).toLocaleString('en-IN')} Cashback
            </span>
          </div>
        </div>

        {/* Color / Finish Selector */}
        {product.variants.colors && product.variants.colors.length > 0 && (
          <div className="space-y-2 pt-1 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                Finish: <span className="text-emerald-400 font-semibold">{selectedColorObj?.name}</span>
              </span>
              <span className="text-[11px] text-slate-500">
                Available in {product.variants.colors.length} finishes
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.variants.colors.map((color) => {
                const isSelected = selectedVariants.color === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => setSelectedVariants({ ...selectedVariants, color: color.id })}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-slate-800/90 border-emerald-500 text-slate-100 shadow-md ring-1 ring-emerald-500/50'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-slate-600 shadow-inner flex items-center justify-center"
                      style={{ backgroundColor: color.hexCode }}
                    >
                      {isSelected && (
                        <Check className={`w-2.5 h-2.5 ${color.hexCode === '#FFFFFF' || color.hexCode === '#E5E7EB' ? 'text-black' : 'text-white'}`} />
                      )}
                    </div>
                    <span>{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Storage / Configuration Selector */}
        {product.variants.storage && product.variants.storage.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                Storage: <span className="text-emerald-400 font-semibold">{selectedStorageObj?.name}</span>
              </span>
              {selectedStorageObj?.ram && (
                <span className="text-[11px] text-slate-400">RAM: {selectedStorageObj.ram}</span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.variants.storage.map((storage) => {
                const isSelected = selectedVariants.storage === storage.id;
                return (
                  <button
                    key={storage.id}
                    onClick={() => setSelectedVariants({ ...selectedVariants, storage: storage.id })}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-slate-800/90 border-emerald-500 text-slate-100 ring-1 ring-emerald-500/50'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <p className="text-xs font-bold">{storage.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {storage.priceDelta > 0 ? `+${formatINR(storage.priceDelta)}` : 'Included'}
                    </p>
                    {storage.badge && (
                      <span className="mt-1 inline-block px-1.5 py-0.2 rounded text-[8px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300">
                        {storage.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Snapmint Style Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800/80">
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/60 flex items-center gap-2 text-slate-300">
            <RotateCcw className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-[11px] leading-tight font-medium">2 Days Service Replacement</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/60 flex items-center gap-2 text-slate-300">
            <Award className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-[11px] leading-tight font-medium">Top Brand Guarantee</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/60 flex items-center gap-2 text-slate-300">
            <Truck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-[11px] leading-tight font-medium">Free Express Delivery</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/60 flex items-center gap-2 text-slate-300">
            <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-[11px] leading-tight font-medium">Secure 1Fi Transaction</span>
          </div>
        </div>

        {/* Seller & Delivery Info */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2.5 text-xs text-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">
              Sold by: <strong className="text-slate-200">{product.seller?.name || 'Balaji Infocom'}</strong>
            </span>
            <span className="text-emerald-400 font-semibold">★ {product.seller?.rating || 4.8} / 5</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>{product.deliveryEstimate}</span>
          </div>

          {/* Pincode checker */}
          <div className="flex items-center gap-2 pt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={pincode}
              maxLength={6}
              onChange={(e) => {
                setPincode(e.target.value);
                setIsPincodeValid(e.target.value.length === 6);
              }}
              placeholder="Enter Pincode"
              className="w-28 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
            />
            {isPincodeValid && (
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Delivery Available
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1Fi MUTUAL FUND BACKED EMI PLANS SECTION (Flagship Specification) */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-5 md:p-6 space-y-5 shadow-2xl shadow-emerald-500/5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h2 className="text-base md:text-lg font-black text-white">
                EMI plans backed by mutual funds
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Pledge your mutual fund investments without selling. Keep compounding!
            </p>
          </div>

          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Zero Liquidation
          </span>
        </div>

        {/* Mutual Fund Financial Benefit Explainer */}
        <div className="p-3.5 rounded-2xl bg-emerald-950/25 border border-emerald-500/20 text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-300 font-bold">
            <TrendingUp className="w-4 h-4" />
            <span>Why choose Mutual Fund Backed EMI?</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Instead of breaking your SIP or liquidating funds and triggering capital gains tax, 1Fi pledges your units as collateral. Your investments stay invested and continue growing at their historic rate while you pay your monthly installment.
          </p>
        </div>

        {/* Down Payment Options Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Down payment amount</span>
            <span className="text-slate-200 font-bold">{formatINR(downPayment)}</span>
          </div>
          <div className="flex items-center gap-2">
            {[0, 10000, 25000, 50000].map((dp) => (
              <button
                key={dp}
                onClick={() => setDownPayment(dp)}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                  downPayment === dp
                    ? 'bg-emerald-500 text-slate-950 border-emerald-500 font-bold shadow-md shadow-emerald-500/10'
                    : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {dp === 0 ? '₹0 Down' : formatINR(dp)}
              </button>
            ))}
          </div>
        </div>

        {/* Selectable EMI Plan Cards List (Matching PDF screenshot exactly) */}
        <div className="space-y-2.5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Select Tenure & Monthly Installment
          </p>

          <div className="space-y-2">
            {emiPlans.map((plan) => {
              const isSelected = selectedTenure === plan.tenureMonths;
              return (
                <div
                  key={plan.tenureMonths}
                  onClick={() => setSelectedTenure(plan.tenureMonths)}
                  className={`relative p-3.5 md:p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                      : 'bg-slate-950/60 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Left: Radio Selector + Monthly Calculation */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                          : 'border-slate-600 bg-transparent'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>

                    <div>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-base md:text-lg font-black text-slate-100">
                          {formatINR(plan.monthlyInstallment)}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          x {plan.tenureMonths} months
                        </span>

                        {/* Interest Badge: 0% or 10.5% as specified in PDF */}
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            plan.interestRateAnnual === 0
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                          }`}
                        >
                          {plan.interestRateAnnual === 0 ? '0% interest' : `${plan.interestRateAnnual}% interest`}
                        </span>
                      </div>

                      {/* Cashback info as in PDF: "Additional cashback of ₹7,500" */}
                      <p className="text-[11px] font-semibold text-emerald-400 mt-0.5">
                        Additional cashback of ₹{(plan.cashbackAmount || product.cashbackAmount || 7500).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Right: Total Breakdown */}
                  <div className="text-right hidden sm:block">
                    <p className="text-[11px] text-slate-400">Total payable</p>
                    <p className="text-xs font-bold text-slate-200">
                      {formatINR(plan.totalPayable)}
                    </p>
                    <p className="text-[9px] text-slate-500">1st Due: {plan.firstDueDate}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Plan Detailed Breakdown */}
        {selectedPlan && (
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-2 text-slate-300">
            <div className="flex items-center justify-between text-slate-400">
              <span>Principal Financed:</span>
              <span className="text-slate-200 font-semibold">{formatINR(selectedPlan.principalAmount)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Annual Interest Rate:</span>
              <span className="text-slate-200 font-semibold">
                {selectedPlan.interestRateAnnual === 0 ? '0% (Subsidized No-Cost)' : `${selectedPlan.interestRateAnnual}% p.a.`}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Processing Fee:</span>
              <span className="text-emerald-400 font-semibold">₹0 (Waived for 1Fi users)</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>First Monthly Due Date:</span>
              <span className="text-slate-200 font-semibold">{selectedPlan.firstDueDate}</span>
            </div>
            <div className="border-t border-slate-800 pt-2 flex items-center justify-between font-bold">
              <span>Total Amount to Pay:</span>
              <span className="text-emerald-400 text-sm">{formatINR(selectedPlan.totalPayable)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Specifications Accordion */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 md:p-6 space-y-3">
        <h3 className="text-sm font-bold text-slate-200">Product Specifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {Object.entries(product.specifications).map(([key, val]) => (
            <div key={key} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">{key}</span>
              <span className="text-slate-200 font-medium">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FIXED BOTTOM CTA BAR (Exact Match to 1Fi & Snapmint guidelines) */}
      {/* ========================================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 px-4 py-3 shadow-2xl">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Selected 1Fi EMI Plan
            </p>
            <p className="text-sm md:text-base font-black text-slate-100">
              {formatINR(selectedPlan.monthlyInstallment)}
              <span className="text-xs font-medium text-slate-400"> / month</span>
            </p>
            <p className="text-[10px] font-bold text-emerald-400">
              Earn ₹{(selectedPlan.cashbackAmount || 7500).toLocaleString('en-IN')} cashback on this order
            </p>
          </div>

          <button
            onClick={() => onProceedToCheckout(product, selectedVariants, selectedPlan, finalPrice)}
            className="flex-1 max-w-xs py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs md:text-sm flex flex-col items-center justify-center transition-all shadow-lg shadow-emerald-500/25 active:scale-[0.99]"
          >
            <span>Buy on {selectedPlan.tenureMonths} months EMI</span>
            <span className="text-[10px] font-semibold text-slate-900 opacity-90">
              Instant Mutual Fund Approval →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
