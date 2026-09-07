import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  CreditCard, 
  MapPin, 
  ArrowRight,
  Receipt,
  Download
} from 'lucide-react';
import { Product, SelectedVariants, EMIPlanOption, CheckoutApplication } from '../../types';
import { MarketplaceApiService } from '../../services/marketplaceApi';
import { formatINR } from '../../utils/emiCalculator';

interface CheckoutModalProps {
  product: Product;
  selectedVariants: SelectedVariants;
  selectedPlan: EMIPlanOption;
  finalPrice: number;
  availableLimit: number;
  onClose: () => void;
  onSuccess: (application: CheckoutApplication) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  product,
  selectedVariants,
  selectedPlan,
  finalPrice,
  availableLimit,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState<'review' | 'address' | 'processing' | 'success'>('review');
  const [fullName, setFullName] = useState('Rahul Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [addressLine, setAddressLine] = useState('Flat 402, Sunshine Residency, Bandra West');
  const [city, setCity] = useState('Mumbai');
  const [pincode, setPincode] = useState('400050');
  const [error, setError] = useState<string | null>(null);
  const [completedApplication, setCompletedApplication] = useState<CheckoutApplication | null>(null);

  const selectedStorageObj = product.variants.storage?.find((s) => s.id === selectedVariants.storage);
  const selectedColorObj = product.variants.colors?.find((c) => c.id === selectedVariants.color);

  const handleAuthorizeOrder = async () => {
    setStep('processing');
    setError(null);

    try {
      const result = await MarketplaceApiService.submitOrderApplication({
        productId: product.id,
        productName: product.name,
        brand: product.brand,
        imageUrl: product.imageUrl,
        selectedVariants,
        finalPrice,
        selectedEMIPlan: selectedPlan,
        userAddress: {
          fullName,
          phone,
          addressLine,
          city,
          pincode
        },
        availableLimit
      });

      setCompletedApplication(result);
      setStep('success');
      onSuccess(result);
    } catch (err: any) {
      setError(err.message || 'Authorization failed. Please try again.');
      setStep('address');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs">
              1Fi
            </div>
            <h3 className="text-sm font-bold text-slate-100">
              {step === 'success' ? 'Application Approved!' : '1Fi Mutual Fund Credit Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* STEP 1: REVIEW & FINANCING */}
          {step === 'review' && (
            <div className="space-y-4">
              {/* Product Brief */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 object-contain rounded-xl bg-slate-900 p-1 border border-slate-800"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-100 truncate">{product.name}</h4>
                  <p className="text-[11px] text-slate-400">
                    {selectedStorageObj?.name} • {selectedColorObj?.name}
                  </p>
                  <p className="text-xs font-black text-emerald-400 mt-0.5">
                    {formatINR(finalPrice)}
                  </p>
                </div>
              </div>

              {/* Selected EMI Plan Card */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Selected Financing Option</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                    {selectedPlan.interestRateAnnual === 0 ? '0% No-Cost EMI' : `${selectedPlan.interestRateAnnual}% Interest`}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-xl font-black text-white">
                      {formatINR(selectedPlan.monthlyInstallment)}
                    </span>
                    <span className="text-xs text-slate-400"> / month</span>
                  </div>
                  <span className="text-xs font-bold text-slate-300">
                    {selectedPlan.tenureMonths} Monthly Payments
                  </span>
                </div>

                <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300 font-medium">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Additional Cashback:
                  </span>
                  <span className="font-bold">₹{(selectedPlan.cashbackAmount || 7500).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Mutual Fund Collateral Pledge Note */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
                <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-slate-300 font-semibold">Mutual Fund Backed Credit Facility</p>
                  <p className="text-[11px] leading-relaxed">
                    Units equivalent to {formatINR(selectedPlan.principalAmount)} in your connected mutual fund portfolio will be held as collateral. No sales will be triggered and compounding continues normally.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep('address')}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
              >
                <span>Continue to Delivery Address</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: ADDRESS & CONFIRMATION */}
          {step === 'address' && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
                <span className="font-bold text-slate-200">Enter Shipping Address</span>
                <span className="text-slate-500">Step 2 of 2</span>
              </div>

              {error && (
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
                  {error}
                </div>
              )}

              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Mobile Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Delivery Street Address</label>
                  <textarea
                    rows={2}
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Pincode</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('review')}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleAuthorizeOrder}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize & Place Order</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP: PROCESSING */}
          {step === 'processing' && (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto" />
              <h4 className="text-sm font-bold text-slate-100">Simulating 1Fi Mutual Fund Credit Approval...</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Pledging collateral with depository and allocating zero-interest EMI schedule in database.
              </p>
            </div>
          )}

          {/* STEP: SUCCESS */}
          {step === 'success' && completedApplication && (
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-black text-white">Order Confirmed!</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Order ID: <strong className="text-emerald-400">{completedApplication.orderId}</strong>
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-left space-y-2 text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Product:</span>
                  <span className="font-bold text-slate-100 truncate max-w-[200px]">{product.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Monthly Installment:</span>
                  <span className="font-bold text-emerald-400">
                    {formatINR(selectedPlan.monthlyInstallment)} / month ({selectedPlan.tenureMonths} mo)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Cashback Credited:</span>
                  <span className="font-bold text-emerald-400">
                    ₹{(selectedPlan.cashbackAmount || 7500).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">First Auto-Debit:</span>
                  <span className="font-bold text-slate-200">{selectedPlan.firstDueDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Delivery To:</span>
                  <span className="font-medium text-slate-200">{addressLine}, {city} - {pincode}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <Receipt className="w-4 h-4 flex-shrink-0" />
                <span>An SMS and invoice have been dispatched to {phone}.</span>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
              >
                Continue Browsing 1Fi Marketplace
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
