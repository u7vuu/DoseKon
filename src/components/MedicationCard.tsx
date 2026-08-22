import React from 'react';
import { Medication } from '../types';
import { AlertTriangle, Clock, Syringe, Sparkles } from 'lucide-react';

interface MedicationCardProps {
  medication: Medication;
  weight: number | null;
  accent: string;
  accentTint: string;
}

export const MedicationCard: React.FC<MedicationCardProps> = ({
  medication,
  weight,
  accent,
  accentTint,
}) => {
  return (
    <div
      id={`medCard-${medication.id}`}
      style={{
        borderTopColor: accent,
      }}
      className="med-card bg-[var(--paper-surface)] border border-[var(--line)] border-t-4 rounded-xl p-4 sm:p-5 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all relative flex flex-col justify-between"
    >
      <div>
        {/* Top Title Row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="font-display font-semibold text-lg sm:text-xl text-[var(--ink)] leading-snug">
                {medication.name}
              </h3>
              {medication.isPOM && (
                <span className="text-[10px] font-black tracking-wider text-[var(--red)] bg-[var(--red-tint)] px-1.5 py-0.5 rounded-sm border border-[var(--red)]/20 uppercase">
                  POM
                </span>
              )}
              {medication.generation && (
                <span
                  className="inline-flex gap-1 items-center align-middle ml-1"
                  title={`${medication.generation}st/nd/rd Generation Cephalosporin`}
                >
                  <i
                    className={`w-1.5 h-1.5 rounded-full ${
                      medication.generation >= 1 ? 'bg-[var(--amber)]' : 'bg-[var(--line)]'
                    }`}
                  />
                  <i
                    className={`w-1.5 h-1.5 rounded-full ${
                      medication.generation >= 2 ? 'bg-[var(--amber)]' : 'bg-[var(--line)]'
                    }`}
                  />
                  <i
                    className={`w-1.5 h-1.5 rounded-full ${
                      medication.generation >= 3 ? 'bg-[var(--amber)]' : 'bg-[var(--line)]'
                    }`}
                  />
                </span>
              )}
            </div>

            {medication.generic && (
              <div className="text-xs text-[var(--ink-soft)] font-medium mt-0.5 italic">
                {medication.generic}
              </div>
            )}
          </div>

          {/* Category Chip */}
          <span
            style={{
              backgroundColor: accentTint,
              color: accent,
            }}
            className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 border border-black/5"
          >
            {medication.categoryTag}
          </span>
        </div>

        {/* Dosage Guidelines text line */}
        {medication.dosageLine && (
          <div className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed mb-3 whitespace-pre-line bg-[var(--paper-deep)]/40 p-2.5 rounded-lg border border-[var(--line-subtle)]">
            {medication.dosageLine}
          </div>
        )}

        {/* Oral Liquid Concentrations & Live Calculations */}
        {medication.concs && medication.concs.length > 0 && (
          <div className="space-y-2 mt-3 pt-1 border-t border-[var(--line-subtle)]">
            {medication.concs.map((conc, idx) => {
              const unit = conc.unit || 'mL';
              let doseResultText = `— ${unit}/dose`;
              let hasActiveResult = false;

              if (weight && weight > 0) {
                if (conc.factor) {
                  const val = weight * conc.factor;
                  doseResultText =
                    unit === 'drops'
                      ? `${Math.round(val)} drops/dose`
                      : `${val.toFixed(2)} ${unit}`;
                  hasActiveResult = true;
                } else if (conc.factorMin && conc.factorMax) {
                  const minVal = (weight * conc.factorMin).toFixed(2);
                  const maxVal = (weight * conc.factorMax).toFixed(2);
                  doseResultText = `${minVal}–${maxVal} ${unit}`;
                  hasActiveResult = true;
                }
              }

              return (
                <div
                  key={idx}
                  className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 items-center py-1.5 border-b border-dashed border-[var(--line)] last:border-none"
                >
                  {/* Concentration strength label */}
                  <div className="min-w-0">
                    {conc.isAugHighDose ? (
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-mono text-xs sm:text-sm font-bold text-[var(--ink)] bg-[var(--paper-deep)] px-2 py-0.5 rounded border border-[var(--line)]">
                          642 mg / 5 mL
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-[var(--ink-soft)]">
                          <span className="font-bold text-[var(--red)] bg-[var(--red-tint)] px-1.5 py-0.2 rounded">
                            BID
                          </span>
                          <span className="italic">High dose regimen</span>
                        </div>
                      </div>
                    ) : (
                      <span className="inline-block font-mono text-xs sm:text-sm font-semibold text-[var(--ink)] bg-[var(--paper-deep)] px-2 py-0.5 rounded border border-[var(--line)]">
                        {conc.label}
                      </span>
                    )}

                    {/* Formula description */}
                    <div className="text-[11px] font-mono text-[var(--ink-muted)] mt-0.5">
                      {conc.factor
                        ? `kg × ${conc.factor}${unit === 'drops' ? ' drops' : ''}`
                        : conc.factorMin && conc.factorMax
                        ? `kg × ${conc.factorMin}–${conc.factorMax}`
                        : ''}
                    </div>
                  </div>

                  {/* Calculated Dose output box */}
                  <div className="flex flex-col items-end">
                    <div
                      className={`font-mono text-xs sm:text-sm font-bold px-2.5 py-1 rounded-md text-center min-w-[84px] transition-all border ${
                        hasActiveResult
                          ? 'bg-[var(--teal-tint)] text-[var(--teal)] border-[var(--teal)] shadow-xs scale-102'
                          : 'bg-[var(--paper-deep)] text-[var(--ink-muted)] border-[var(--line)]'
                      }`}
                    >
                      {doseResultText}
                    </div>
                    {conc.freq && (
                      <span className="text-[10px] font-medium text-[var(--ink-soft)] mt-0.5">
                        {conc.freq}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Injectables: Strengths and Vial Groups */}
        {medication.strengths && medication.strengths.length > 0 && (
          <div className="flex flex-wrap gap-1.5 my-2.5">
            {medication.strengths.map((str, idx) => (
              <span
                key={idx}
                className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-[var(--paper-deep)] border border-[var(--line)] text-[var(--ink)]"
              >
                {str}
              </span>
            ))}
          </div>
        )}

        {medication.vialGroups && (
          <div className="space-y-3 mt-3 pt-2 border-t border-[var(--line)]">
            {medication.vialGroups.map((vg, idx) => (
              <div key={idx} className="space-y-1.5">
                <span
                  style={{
                    color: accent,
                    backgroundColor: accentTint,
                  }}
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded inline-block"
                >
                  {vg.label}
                </span>

                {vg.routes.map((r, rIdx) => (
                  <div
                    key={rIdx}
                    className="flex items-start gap-2 text-xs text-[var(--ink-soft)] leading-snug py-1 border-b border-dashed border-[var(--line-subtle)] last:border-none"
                  >
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded uppercase flex-shrink-0 mt-0.5 ${
                        r.route === 'IV'
                          ? 'bg-[var(--indigo-tint)] text-[var(--indigo)] border border-[var(--indigo)]/20'
                          : 'bg-[var(--slate-tint)] text-[var(--slate)] border border-[var(--slate)]/20'
                      }`}
                    >
                      {r.route}
                    </span>
                    <span className="flex-1">{r.text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {medication.routeRows && (
          <div className="space-y-1.5 mt-2.5 pt-2 border-t border-[var(--line)]">
            {medication.routeRows.map((r, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-[var(--ink-soft)] leading-snug py-1 border-b border-dashed border-[var(--line-subtle)] last:border-none"
              >
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded uppercase flex-shrink-0 mt-0.5 ${
                    r.route === 'IV'
                      ? 'bg-[var(--indigo-tint)] text-[var(--indigo)] border border-[var(--indigo)]/20'
                      : 'bg-[var(--slate-tint)] text-[var(--slate)] border border-[var(--slate)]/20'
                  }`}
                >
                  {r.route}
                </span>
                <span className="flex-1">{r.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Administration Notes */}
        {medication.adminNote && (
          <div className="text-xs text-[var(--ink-soft)] leading-relaxed mt-3 pt-2 border-t border-dashed border-[var(--line)]">
            <span className="font-bold text-[var(--ink)]">Note: </span>
            <span>{medication.adminNote}</span>
          </div>
        )}
      </div>

      {/* Contraindication / Warning Badge */}
      {medication.warnNote && (
        <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--red-tint)] text-[var(--red)] border border-[var(--red)]/20 text-xs font-bold">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{medication.warnNote}</span>
        </div>
      )}
    </div>
  );
};
