import React from 'react';
import { Home, CreditCard, ShoppingBag, ReceiptText, User } from 'lucide-react';

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab = 'shop',
  onTabChange
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'credit', label: 'Credit', icon: CreditCard },
    { id: 'shop', label: 'Shop', icon: ShoppingBag, badge: 'Marketplace' },
    { id: 'pay', label: 'Pay', icon: ReceiptText },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="sticky bottom-0 z-30 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeTab;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange && onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-emerald-400' : ''}`} />
                {item.badge && isActive && (
                  <span className="absolute -top-1 -right-2.5 w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">
                {item.label}
              </span>
              {isActive && (
                <div className="w-4 h-0.5 rounded-full bg-emerald-400 mt-0.5 shadow-sm shadow-emerald-400/50" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
