import React from 'react';
import { Calculator, Info } from 'lucide-react';

interface DoseCalculatorProps {
  weight: string;
  onWeightChange: (val: string) => void;
  onEnterPress?: () => void;
}

export const DoseCalculator: React.FC<DoseCalculatorProps> = ({
  weight,
  onWeightChange,
  onEnterPress,
}) => {
  return (
    <div
      id="doseCalculatorBox"
      className="bg-[var(--paper-surface)] border-1.5 border-[var(--line)] rounded-2xl p-4 sm:p-6 shadow-[var(--shadow-sm)] mb-6 transition-colors"
    >
      <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-[var(--teal)]">
        <Calculator className="w-4 h-4 text-[var(--teal)]" />
        <span>Live Weight-Based mL Dose Engine · حاسبة الجرعة حسب الوزن</span>
      </div>

      {/* Main Equation line */}
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap bg-[var(--paper-deep)]/40 p-3 sm:p-4 rounded-xl border border-[var(--line)]">
        {/* Weight Part */}
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--ink)]">
            Weight
          </span>
          <div className="relative inline-flex items-center">
            <input
              id="weightInput"
              type="number"
              min="0"
              step="0.1"
              inputMode="decimal"
              placeholder="kg"
              value={weight}
              onChange={(e) => onWeightChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onEnterPress?.();
                }
              }}
              className="w-24 sm:w-28 bg-[var(--paper-surface)] text-[var(--ink)] font-mono font-bold text-center text-base sm:text-lg rounded-lg px-2 py-1.5 border-1.5 border-[var(--amber)] outline-none focus:ring-2 focus:ring-[var(--amber)]/40 transition-all shadow-inner"
            />
            <span className="ml-1 text-xs font-bold text-[var(--ink-soft)] bg-[var(--paper-deep)] border border-[var(--line)] rounded-full px-2 py-0.5">
              kg
            </span>
          </div>
        </div>

        {/* Multiplication Symbol */}
        <span className="text-xl sm:text-2xl font-black text-[var(--amber)] leading-none select-none">
          ×
        </span>

        {/* Factor */}
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--ink)]">
          Factor
        </span>

        {/* Equals Symbol */}
        <span className="text-xl sm:text-2xl font-black text-[var(--amber)] leading-none select-none">
          =
        </span>

        {/* Output descriptor */}
        <div className="flex items-center gap-1.5 bg-[var(--teal-tint)] text-[var(--teal)] px-3 py-1.5 rounded-lg font-bold text-xs sm:text-sm border border-[var(--teal)]/20 shadow-xs">
          <span>Dose per administration / الجرعة لكل مرة</span>
        </div>
      </div>

      {/* Instructional Hint */}
      <div className="mt-3.5 flex items-start gap-2 text-xs text-[var(--ink-soft)] leading-relaxed">
        <Info className="w-3.5 h-3.5 text-[var(--amber)] flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p>
            Enter the child's weight once — every card below updates automatically.
            <span className="font-semibold text-[var(--ink)]"> &ldquo;×N/day&rdquo; </span>
            is the frequency (doses per day), not part of the multiplication.
          </p>
          <p className="font-ar text-[var(--ink-muted)]">
            أدخل وزن الطفل بالكيلوغرام مرة واحدة ليتم حساب جميع الجرعات تلقائياً. &ldquo;×N/day&rdquo; تعني عدد مرات الإعطاء يومياً وليست جزءاً من الضرب.
          </p>
        </div>
      </div>
    </div>
  );
};
