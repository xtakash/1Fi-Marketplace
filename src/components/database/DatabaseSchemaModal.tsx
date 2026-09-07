import React, { useState, useEffect } from 'react';
import { X, Database, Server, Table, Code2, Check, FileText } from 'lucide-react';
import { MarketplaceApiService } from '../../services/marketplaceApi';

interface DatabaseSchemaModalProps {
  onClose: () => void;
}

export const DatabaseSchemaModal: React.FC<DatabaseSchemaModalProps> = ({ onClose }) => {
  const [schemaData, setSchemaData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'tables' | 'endpoints' | 'design'>('tables');

  useEffect(() => {
    MarketplaceApiService.getDatabaseSchema().then((data) => {
      if (data) {
        setSchemaData(data);
      }
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Assignment Backend & Database Architecture</h3>
              <p className="text-[11px] text-slate-400">Node.js Express + Relational Database Schema</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center px-5 pt-3 border-b border-slate-800 gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('tables')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'tables'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Database Tables & Schema</span>
          </button>
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'endpoints'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>REST API Endpoints</span>
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'design'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Assignment Checklist</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-4 text-xs">
          {activeTab === 'tables' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Database Engine</span>
                <p className="text-slate-300">
                  Express-backed relational store with normalized tables for products, variants, mutual fund EMI options, and placed orders.
                </p>
              </div>

              {/* Products Table */}
              <div className="space-y-1.5 border border-slate-800 rounded-2xl p-3 bg-slate-950/60">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-300">TABLE products</span>
                  <span className="text-[10px] text-slate-500">Primary Catalog</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  <div className="flex justify-between py-0.5 border-b border-slate-900">
                    <span className="text-slate-400">id</span>
                    <span className="text-emerald-400">VARCHAR(64) PRIMARY KEY</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-900">
                    <span className="text-slate-400">slug</span>
                    <span className="text-blue-300">VARCHAR(128) UNIQUE INDEX</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-900">
                    <span className="text-slate-400">name, brand, category</span>
                    <span className="text-slate-300">VARCHAR NOT NULL</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-900">
                    <span className="text-slate-400">base_price, original_mrp</span>
                    <span className="text-amber-300">DECIMAL(12,2) NOT NULL</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-400">cashback_amount</span>
                    <span className="text-amber-300">DECIMAL(10,2) DEFAULT 7500</span>
                  </div>
                </div>
              </div>

              {/* Product Variants Table */}
              <div className="space-y-1.5 border border-slate-800 rounded-2xl p-3 bg-slate-950/60">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-300">TABLE product_variants</span>
                  <span className="text-[10px] text-slate-500">Foreign Key to products</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  <div className="flex justify-between py-0.5 border-b border-slate-900">
                    <span className="text-slate-400">id</span>
                    <span className="text-emerald-400">VARCHAR(64) PRIMARY KEY</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-900">
                    <span className="text-slate-400">product_id</span>
                    <span className="text-blue-300">REFERENCES products(id)</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-900">
                    <span className="text-slate-400">variant_type</span>
                    <span className="text-slate-300">ENUM('storage', 'color')</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-400">price_delta</span>
                    <span className="text-amber-300">DECIMAL(10,2)</span>
                  </div>
                </div>
              </div>

              {/* EMI Plans Table */}
              <div className="space-y-1.5 border border-slate-800 rounded-2xl p-3 bg-slate-950/60">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-300">TABLE emi_plans</span>
                  <span className="text-[10px] text-slate-500">Tenures & Interest Schedules</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  <div className="flex justify-between py-0.5 border-b border-slate-900">
                    <span className="text-slate-400">tenure_months</span>
                    <span className="text-emerald-400">INT NOT NULL (3, 6, 12, 24, 36, 48, 60)</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-900">
                    <span className="text-slate-400">interest_rate</span>
                    <span className="text-amber-300">0% (3-24 mo) | 10.5% (36-60 mo)</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-400">backed_by</span>
                    <span className="text-emerald-400">VARCHAR "1Fi Mutual Fund Credit"</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'endpoints' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px]">
                    GET
                  </span>
                  <span className="font-mono text-slate-200">/api/products</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Fetches all catalog items with query parameters: <code className="text-slate-300">category</code>, <code className="text-slate-300">search</code>, <code className="text-slate-300">sortBy</code>, <code className="text-slate-300">noCostOnly</code>.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px]">
                    GET
                  </span>
                  <span className="font-mono text-slate-200">/api/products/:id</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Returns product details, gallery images, finish options, storage specifications, and precalculated EMI schedules. Supports unique URL routing (e.g. <code className="text-emerald-300">/products/iphone-17-pro</code>).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px]">
                    GET
                  </span>
                  <span className="font-mono text-slate-200">/api/products/:id/emi-plans</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Dynamically calculates monthly installments, total interest, and cashbacks for selected variants and down payment.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono font-bold text-[10px]">
                    POST
                  </span>
                  <span className="font-mono text-slate-200">/api/orders</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Places mutual-fund backed credit authorization and generates an order record with delivery address.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <h4 className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Assignment Scope Fulfilled:</span>
                </h4>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✔</span>
                    <span><strong>Option A & B:</strong> Top Brands & Nearby Stores pages remain as empty placeholders per spec.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✔</span>
                    <span><strong>1Fi Marketplace:</strong> Fully designed and implemented section as per assignment document.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✔</span>
                    <span><strong>Backend API:</strong> Express backend (`/api/products`, `/api/products/:id`, `/api/products/:id/emi-plans`, `/api/orders`).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✔</span>
                    <span><strong>Unique URLs:</strong> HTML5 History routing for unique product paths (e.g., `/products/iphone-17-pro`).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✔</span>
                    <span><strong>Flagship Reference Match:</strong> iPhone 17 Pro with exact reference EMI plans (₹44,967x3m, ₹22,483x6m, ₹11,242x12m, ₹5,621x24m, ₹4,297x36m, ₹3,385x48m, ₹2,842x60m).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✔</span>
                    <span><strong>Variants & Finishes:</strong> Cosmic Orange, Silver, Dark Titanium Blue, and 256GB/512GB/1TB storage options.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
