import React from 'react';
import { ShopTab } from '../../types';
import { Sparkles, Store, Building2 } from 'lucide-react';

interface ShopHeaderTabsProps {
  activeTab: ShopTab;
  onSelectTab: (tab: ShopTab) => void;
}

export const ShopHeaderTabs: React.FC<ShopHeaderTabsProps> = ({
  activeTab,
  onSelectTab
}) => {
  const tabs: { id: ShopTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    {
      id: 'top-brands',
      label: 'Top Brands',
      icon: Building2
    },
    {
      id: 'nearby-stores',
      label: 'Nearby Stores',
      icon: Store
    },
    {
      id: 'marketplace',
      label: '1Fi Marketplace',
      icon: Sparkles,
      badge: '0% EMI'
    }
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800/80 sticky top-[57px] z-20 px-4 py-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex-1 min-w-[125px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all relative whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
