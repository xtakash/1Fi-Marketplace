import React from 'react';
import { Sparkles, ShieldCheck, ChevronRight } from 'lucide-react';
import { Product } from '../../types';
import { formatINR } from '../../utils/emiCalculator';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  // Compute minimum monthly EMI
  const maxTenure = Math.max(...product.availableTenures, 12);
  const estimatedMinEMI = Math.round(product.basePrice / maxTenure);
  const hasNoCost = product.noCostTenures && product.noCostTenures.length > 0;
  const cashback = product.cashbackAmount || 7500;

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800/90 hover:border-emerald-500/40 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 cursor-pointer flex flex-col justify-between"
    >
      {/* Top badges */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {product.badge}
            </span>
          )}
          {hasNoCost && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
              0% EMI Available
            </span>
          )}
        </div>
        <span className="text-[11px] font-medium text-slate-400">
          ★ {product.rating.toFixed(1)}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative w-full aspect-square bg-slate-950/80 rounded-xl overflow-hidden mb-3.5 flex items-center justify-center p-3 border border-slate-800/60">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Subtle Mutual Fund Tag */}
        <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-md bg-slate-950/90 backdrop-blur-md border border-slate-800 text-[10px] text-emerald-400 flex items-center justify-between">
          <span className="flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Backed by Mutual Funds
          </span>
          <span className="font-semibold text-slate-300">1Fi Credit</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-1.5 flex-1">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{product.brand}</p>
        <h3 className="text-sm font-bold text-slate-100 line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
          {product.name}
        </h3>

        {/* Color swatches preview */}
        {product.variants.colors && product.variants.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[10px] text-slate-500">Finishes:</span>
            <div className="flex items-center gap-1">
              {product.variants.colors.map((c) => (
                <div
                  key={c.id}
                  className="w-2.5 h-2.5 rounded-full border border-slate-700/80"
                  style={{ backgroundColor: c.hexCode }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pricing & EMI block */}
      <div className="pt-3.5 mt-3 border-t border-slate-800/80">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-base font-extrabold text-slate-100">
            {formatINR(product.basePrice)}
          </span>
          {product.originalMrp > product.basePrice && (
            <span className="text-xs text-slate-500 line-through">
              {formatINR(product.originalMrp)}
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="text-[10px] font-bold text-emerald-400">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* EMI highlight */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 mb-2">
          <div>
            <p className="text-[10px] text-slate-400">Monthly EMI from</p>
            <p className="text-xs font-bold text-emerald-400">
              {formatINR(estimatedMinEMI)}/mo
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300">
              ₹{cashback.toLocaleString('en-IN')} Cashback
            </span>
          </div>
        </div>

        {/* Action button */}
        <button
          className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-emerald-500 text-slate-200 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200"
        >
          <span>Select EMI Plan</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
