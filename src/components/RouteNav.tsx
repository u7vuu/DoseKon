import React from 'react';
import { RouteType } from '../types';
import { Pill, Syringe, ChevronDown, ChevronUp } from 'lucide-react';

interface RouteNavProps {
  activeRoute: RouteType | null;
  onSelectRoute: (route: RouteType) => void;
}

export const RouteNav: React.FC<RouteNavProps> = ({
  activeRoute,
  onSelectRoute,
}) => {
  const isSyrupOpen = activeRoute === 'Syrup';
  const isInjectionOpen = activeRoute === 'Injection';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      {/* Syrup & Oral Liquids Button */}
      <button
        id="btnRouteSyrup"
        type="button"
        onClick={() => onSelectRoute('Syrup')}
        aria-expanded={isSyrupOpen}
        className={`flex items-center justify-between p-4 rounded-xl text-left border-2 transition-all cursor-pointer shadow-[var(--shadow-sm)] ${
          isSyrupOpen
            ? 'bg-[var(--tab-active-bg)] text-[var(--tab-active-text)] border-[var(--amber)] ring-1 ring-[var(--amber)]/30'
            : 'bg-[var(--paper-surface)] hover:bg-[var(--paper-deep)]/60 text-[var(--ink)] border-[var(--line)]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
              isSyrupOpen
                ? 'bg-[var(--amber)] text-[#14221C]'
                : 'bg-[var(--amber-tint)] text-[var(--amber)]'
            }`}
          >
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base leading-tight flex items-center gap-2">
              <span>Syrup / Suspension / Oral Drops</span>
            </div>
            <div
              className={`font-ar text-xs mt-0.5 ${
                isSyrupOpen ? 'text-[var(--header-text-soft)]' : 'text-[var(--ink-soft)]'
              }`}
            >
              شراب / معلق / قطرات فموية
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`text-xs px-2.5 py-1 rounded-full font-mono font-bold ${
              isSyrupOpen
                ? 'bg-[var(--amber)]/20 text-[var(--amber)]'
                : 'bg-[var(--paper-deep)] text-[var(--ink-soft)]'
            }`}
          >
            Oral
          </div>
          {isSyrupOpen ? (
            <ChevronUp className="w-4 h-4 text-[var(--amber)] flex-shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[var(--ink-muted)] flex-shrink-0" />
          )}
        </div>
      </button>

      {/* Injectables Button */}
      <button
        id="btnRouteInjection"
        type="button"
        onClick={() => onSelectRoute('Injection')}
        aria-expanded={isInjectionOpen}
        className={`flex items-center justify-between p-4 rounded-xl text-left border-2 transition-all cursor-pointer shadow-[var(--shadow-sm)] ${
          isInjectionOpen
            ? 'bg-[var(--tab-active-bg)] text-[var(--tab-active-text)] border-[var(--indigo)] ring-1 ring-[var(--indigo)]/30'
            : 'bg-[var(--paper-surface)] hover:bg-[var(--paper-deep)]/60 text-[var(--ink)] border-[var(--line)]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
              isInjectionOpen
                ? 'bg-[var(--indigo)] text-white'
                : 'bg-[var(--indigo-tint)] text-[var(--indigo)]'
            }`}
          >
            <Syringe className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base leading-tight flex items-center gap-2">
              <span>Injectable — IV / IM</span>
            </div>
            <div
              className={`font-ar text-xs mt-0.5 ${
                isInjectionOpen ? 'text-[var(--header-text-soft)]' : 'text-[var(--ink-soft)]'
              }`}
            >
              مضادات وريدية وعضلية
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`text-xs px-2.5 py-1 rounded-full font-mono font-bold ${
              isInjectionOpen
                ? 'bg-[var(--indigo)]/20 text-[var(--indigo)]'
                : 'bg-[var(--paper-deep)] text-[var(--ink-soft)]'
            }`}
          >
            Vial/Amp
          </div>
          {isInjectionOpen ? (
            <ChevronUp className="w-4 h-4 text-[var(--indigo)] flex-shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[var(--ink-muted)] flex-shrink-0" />
          )}
        </div>
      </button>
    </div>
  );
};
