import React, { useState } from 'react';
import { Scale, ChevronDown, Moon, Sun, ShieldAlert, Sparkles, Users } from 'lucide-react';
import { AgeUnit, AgeRange } from '../types';
import { CreditsModal } from './CreditsModal';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onApplyWeight: (weight: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onApplyWeight,
}) => {
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [isAgeCalcOpen, setIsAgeCalcOpen] = useState(false);
  const [ageValue, setAgeValue] = useState('');
  const [ageUnit, setAgeUnit] = useState<AgeUnit>('years');

  // Age to weight calculation
  const calculateWeight = (): { weight: number; range: AgeRange } | null => {
    const val = parseFloat(ageValue);
    if (isNaN(val) || val <= 0) return null;

    const months = ageUnit === 'months' ? val : val * 12;
    const years = months / 12;

    let weight = 0;
    let range: AgeRange = 'child';

    if (months < 12) {
      weight = (months + 9) / 2;
      range = 'infant';
    } else if (years <= 8) {
      weight = years * 2 + 8;
      range = 'child';
    } else {
      weight = years * 2 + 9;
      range = 'older';
    }

    return { weight: Number(weight.toFixed(1)), range };
  };

  const estResult = calculateWeight();

  const handleUseWeight = () => {
    if (estResult) {
      onApplyWeight(estResult.weight);
    }
  };

  return (
    <header
      id="appHeader"
      className="bg-[var(--header-bg)] text-[var(--header-text)] pt-7 pb-6 px-4 sm:px-6 md:px-8 border-b-4 border-[var(--amber)] shadow-md transition-colors duration-200"
    >
      <div className="max-w-5xl mx-auto">
        {/* Top Bar: Brand Title first + Theme toggle & Credits button */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1
                id="appBrandTitle"
                className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--header-text)] leading-tight"
              >
                DoseKon
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--amber)]/20 text-[var(--amber)] border border-[var(--amber)]/35">
                <Sparkles className="w-3 h-3" /> Farmakon Course
              </span>
            </div>
            <div className="text-xs sm:text-sm font-medium text-[var(--amber)] tracking-wide uppercase mt-1">
              Pediatric Dosing Reference · مرجع جرعات الأطفال
            </div>
          </div>

          {/* Top Actions: Credits & Theme switcher */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0 flex-wrap justify-end">
            {/* Distinct bilingual Credits/Team trigger button */}
            <button
              id="creditsTriggerBtn"
              onClick={() => setIsCreditsOpen(true)}
              type="button"
              aria-label="View credits and supervision"
              title="Credits & Supervision · فريق العمل والإشراف"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--header-text)] bg-[var(--amber)]/15 hover:bg-[var(--amber)]/25 border border-[var(--amber)]/40 hover:border-[var(--amber)]/60 transition-all cursor-pointer select-none shadow-xs group"
            >
              <Users className="w-3.5 h-3.5 text-[var(--amber)] group-hover:scale-110 transition-transform" />
              <span className="font-sans">Credits</span>
              <span className="text-[var(--header-text-muted)] text-[10px]">·</span>
              <span className="font-ar font-normal text-[11px] text-[var(--header-text-soft)]">الفريق</span>
            </button>

            {/* Theme switcher */}
            <button
              id="themeToggleBtn"
              onClick={onToggleTheme}
              type="button"
              aria-label="Toggle dark mode"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[var(--header-text-soft)] bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 transition-all cursor-pointer select-none"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[var(--amber)]" />
                  <span className="hidden md:inline">Light Paper</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[var(--sky)]" />
                  <span className="hidden md:inline">Dark Clinical</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Subtitles (English & Arabic) */}
        <div className="space-y-1 mt-2">
          <p className="text-sm sm:text-base font-normal text-[var(--header-text-soft)] leading-relaxed">
            Antibiotic &amp; Symptomatic Dosing — Syrup, Suspension &amp; Injectables
          </p>
          <p className="text-sm sm:text-base font-normal text-[var(--header-text-soft)] opacity-90 font-ar leading-relaxed">
            جدول جرعات المضادات الحيوية والأدوية الشائعة — شراب ومعلق ومضادات وريدية/عضلية للأطفال
          </p>
        </div>

        {/* Clinical divider ticks */}
        <div className="clinical-ticks" />

        {/* Age -> Weight Estimator Accordion Trigger */}
        <div className="mt-3">
          <button
            id="ageEstimatorToggle"
            type="button"
            onClick={() => setIsAgeCalcOpen(!isAgeCalcOpen)}
            className={`w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
              isAgeCalcOpen
                ? 'bg-[var(--teal)]/30 border-[var(--teal)] text-[var(--header-text)]'
                : 'bg-[var(--teal)]/15 hover:bg-[var(--teal)]/25 border-[var(--teal)]/40 text-[var(--header-text)]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[var(--teal)] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <Scale className="w-3.5 h-3.5" />
              </span>
              <span className="font-medium">Don't know the weight? Estimate from age</span>
            </div>

            <div className="flex items-center gap-2 font-ar text-xs text-[var(--header-text-soft)] font-normal">
              <span className="hidden md:inline">تقدير الوزن من العمر</span>
              <ChevronDown
                className={`w-4 h-4 text-[var(--teal-tint)] transition-transform duration-200 ${
                  isAgeCalcOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </button>

          {/* Estimator Form Panel */}
          {isAgeCalcOpen && (
            <div
              id="ageEstimatorDrawer"
              className="mt-3 bg-black/30 border border-white/10 rounded-2xl p-4 sm:p-5 transition-all"
            >
              <div className="flex flex-wrap items-center gap-3.5">
                {/* Age Input */}
                <div className="relative">
                  <input
                    id="ageNumberInput"
                    type="number"
                    min="0"
                    step="0.5"
                    inputMode="decimal"
                    placeholder="Age / العمر"
                    value={ageValue}
                    onChange={(e) => setAgeValue(e.target.value)}
                    className="w-28 sm:w-32 bg-[var(--paper-surface)] text-[var(--ink)] font-semibold text-sm rounded-lg px-3 py-2 border-1.5 border-[var(--amber)] outline-none focus:ring-2 focus:ring-[var(--amber)]/40"
                  />
                </div>

                {/* Unit Select */}
                <div className="relative">
                  <select
                    id="ageUnitSelect"
                    value={ageUnit}
                    onChange={(e) => setAgeUnit(e.target.value as AgeUnit)}
                    className="appearance-none bg-[var(--paper-surface)] text-[var(--ink)] font-medium text-xs sm:text-sm rounded-lg px-3.5 pr-8 py-2 border-1.5 border-[var(--amber)] outline-none cursor-pointer focus:ring-2 focus:ring-[var(--amber)]/40"
                  >
                    <option value="years">Years / سنوات</option>
                    <option value="months">Months / أشهر</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[var(--ink-soft)] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Approximation Display */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono">
                  <span className="text-sm text-[var(--header-text-muted)]">≈</span>
                  <span
                    id="estimatedWeightValue"
                    className="text-base font-bold text-[var(--header-text)]"
                  >
                    {estResult ? estResult.weight : '—'}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-[var(--header-text-soft)]">
                    kg
                  </span>
                </div>

                {/* Apply Weight Button */}
                <button
                  id="applyEstimatedWeightBtn"
                  type="button"
                  disabled={!estResult}
                  onClick={handleUseWeight}
                  className="px-4 py-2 rounded-lg font-bold text-xs sm:text-sm bg-[var(--amber)] text-[#14221C] hover:bg-[#C99133] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
                >
                  Use this weight · استخدام هذا الوزن
                </button>
              </div>

              {/* Standard Pediatric Formula Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
                <div
                  className={`px-3 py-2 rounded-lg text-xs font-mono text-center border transition-all ${
                    estResult?.range === 'infant'
                      ? 'bg-[var(--teal)]/40 text-[var(--header-text)] border-[var(--teal)] ring-1 ring-[var(--teal)]'
                      : 'bg-white/5 text-[var(--header-text-soft)] border-white/10'
                  }`}
                >
                  <span className="font-semibold">under 1y</span> · (mo + 9) ÷ 2
                </div>
                <div
                  className={`px-3 py-2 rounded-lg text-xs font-mono text-center border transition-all ${
                    estResult?.range === 'child'
                      ? 'bg-[var(--teal)]/40 text-[var(--header-text)] border-[var(--teal)] ring-1 ring-[var(--teal)]'
                      : 'bg-white/5 text-[var(--header-text-soft)] border-white/10'
                  }`}
                >
                  <span className="font-semibold">1–8y</span> · (yr × 2) + 8
                </div>
                <div
                  className={`px-3 py-2 rounded-lg text-xs font-mono text-center border transition-all ${
                    estResult?.range === 'older'
                      ? 'bg-[var(--teal)]/40 text-[var(--header-text)] border-[var(--teal)] ring-1 ring-[var(--teal)]'
                      : 'bg-white/5 text-[var(--header-text-soft)] border-white/10'
                  }`}
                >
                  <span className="font-semibold">8y+</span> · (yr × 2) + 9
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-3 flex items-start gap-2 text-xs text-[var(--header-text-muted)] leading-relaxed">
                <ShieldAlert className="w-3.5 h-3.5 text-[var(--amber)] flex-shrink-0 mt-0.5" />
                <div>
                  <span>
                    Estimated weight from age — use the child's actual measured weight whenever available.
                  </span>
                  <div className="font-ar text-[var(--header-text-muted)] mt-0.5">
                    تقدير للوزن حسب العمر — استخدم الوزن الفعلي المقاس متى ما توفر.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Credits & Supervision Modal */}
      <CreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
      />
    </header>
  );
};
