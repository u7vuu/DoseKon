import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      id="appFooter"
      className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-16 text-xs text-[var(--ink-soft)] leading-relaxed border-t border-[var(--line)] mt-12 space-y-6"
    >
      {/* Medical Safety Disclaimer */}
      <div className="space-y-1.5 bg-[var(--paper-deep)]/60 p-4 rounded-xl border border-[var(--line)]">
        <div className="flex items-center gap-1.5 font-bold text-[var(--ink)]">
          <ShieldCheck className="w-4 h-4 text-[var(--teal)]" />
          <span>Clinical Practice Notice · تنويه الممارسة السريرية</span>
        </div>
        <p className="text-xs text-[var(--ink-soft)]">
          Quick recalculation reference only — always verify the maximum daily dose, clinical context, and this same information against the original reference source before dispensing or administering.
        </p>
        <p className="font-ar text-xs text-[var(--ink-muted)]">
          مرجع سريع لإعادة الحساب فقط — يرجى دائماً مراجعة الجرعة القصوى اليومية والحالة السريرية وهذه المعلومات نفسها في المصدر الأصلي قبل الصرف أو الإعطاء.
        </p>
      </div>

      {/* Copyright */}
      <div className="pt-2 text-center text-xs text-[var(--ink-muted)] font-mono space-y-1">
        <div>© 2026 Farmakon Course - All Rights Reserved.</div>
        <div>Designed and developed by PH. Ahmed Hassan Al-Luwaizi</div>
      </div>
    </footer>
  );
};

