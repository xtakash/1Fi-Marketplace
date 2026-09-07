import React from 'react';
import { MapPin, Bell, ShieldCheck, Sparkles, Smartphone, Monitor } from 'lucide-react';

interface HeaderProps {
  creditLimit: number;
  isMobileFramed: boolean;
  onToggleFrame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  creditLimit,
  isMobileFramed,
  onToggleFrame
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand & Location */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-emerald-500/20">
              1Fi
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white hidden xs:inline">
              1Fi <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Shop</span>
            </span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Delivery Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate max-w-[120px] sm:max-w-[180px] font-medium text-slate-300">
              Bengaluru 560038
            </span>
          </div>
        </div>

        {/* Right stats & actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Credit Limit Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">1Fi Credit:</span>
            <span className="font-bold text-white">₹{creditLimit.toLocaleString('en-IN')}</span>
          </div>

          {/* Device Frame View Switcher for Evaluators */}
          <button
            onClick={onToggleFrame}
            title={isMobileFramed ? "Switch to Full Screen Responsive" : "Switch to Mobile Device Frame"}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700/60"
          >
            {isMobileFramed ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">Full Width</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">Mobile Frame</span>
              </>
            )}
          </button>

          {/* Notifications */}
          <button
            className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      </div>
    </header>
  );
};
