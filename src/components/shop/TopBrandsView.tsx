import React from 'react';
import { Building2, ArrowRight } from 'lucide-react';
import { ShopTab } from '../../types';

interface TopBrandsViewProps {
  onSwitchToMarketplace: () => void;
}

export const TopBrandsView: React.FC<TopBrandsViewProps> = ({ onSwitchToMarketplace }) => {
  return (
    <div className="py-20 px-4 text-center max-w-md mx-auto">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
        <Building2 className="w-8 h-8" />
      </div>
      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/60 uppercase tracking-wider">
        Assignment Spec: Option A
      </span>
      <h2 className="text-xl font-bold text-slate-200 mt-3 mb-2">Top Brands</h2>
      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        No implementation is required for this section per assignment guidelines. Explore the fully implemented <strong>1Fi Marketplace</strong> for products and EMI selection.
      </p>
      <button
        onClick={onSwitchToMarketplace}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
      >
        <span>Open 1Fi Marketplace</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
