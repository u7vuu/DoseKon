import React, { useEffect } from 'react';
import { Send, Instagram, X, Users } from 'lucide-react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="creditsModalBackdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="creditsModalTitle"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Modal Container */}
      <div
        id="creditsModalContent"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[var(--paper-surface)] text-[var(--ink)] rounded-2xl border-2 border-[var(--line)] shadow-2xl p-5 sm:p-6 transition-all relative overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--line)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--amber)]/15 text-[var(--amber)] flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="creditsModalTitle"
                className="font-display font-semibold text-base sm:text-lg text-[var(--ink)] leading-tight"
              >
                Credits &amp; Supervision
              </h2>
              <div className="font-ar text-xs text-[var(--ink-muted)]">
                فريق العمل والإشراف العلمي
              </div>
            </div>
          </div>

          <button
            id="closeCreditsModalBtn"
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two-card credits layout */}
        <div className="space-y-3.5">
          {/* Developer Credit Card */}
          <div className="flex items-center gap-3.5 bg-[var(--paper-deep)]/50 p-3.5 rounded-xl border border-[var(--line)] shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[var(--amber)]/20 border-2 border-[var(--amber)] flex items-center justify-center font-bold text-sm text-[var(--ink)] flex-shrink-0">
              AL
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-xs text-[var(--ink-soft)]">
                Designed &amp; developed by
              </div>
              <div className="font-bold text-sm text-[var(--ink)] truncate">
                PH. Ahmed Hassan Al-Luwaizi
              </div>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <a
                  href="https://t.me/u7vuu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--teal)] hover:underline font-semibold text-xs"
                >
                  <Send className="w-3 h-3" />
                  <span>t.me/u7vuu</span>
                </a>
                <a
                  href="https://ig.me/u/u7vuu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--coral)] hover:underline font-semibold text-xs"
                >
                  <Instagram className="w-3 h-3" />
                  <span>ig.me/u/u7vuu</span>
                </a>
              </div>
            </div>
          </div>

          {/* Scientific Supervisor Credit Card */}
          <div className="flex items-center gap-3.5 bg-[var(--paper-deep)]/50 p-3.5 rounded-xl border border-[var(--line)] shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[var(--teal)]/20 border-2 border-[var(--teal)] flex items-center justify-center font-bold text-sm text-[var(--ink)] flex-shrink-0">
              FK
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-xs text-[var(--ink-soft)]">
                Scientific content supervised by
              </div>
              <div className="font-bold text-sm text-[var(--ink)] truncate">
                FARMAKON | PH. Karar Fadhil
              </div>
              <div className="mt-1.5">
                <a
                  href="https://t.me/Farma1kon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--teal)] hover:underline font-semibold text-xs"
                >
                  <Send className="w-3 h-3" />
                  <span>t.me/Farma1kon</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal footer note */}
        <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--ink-muted)] font-mono">
          <span>DoseKon v1.2</span>
          <span>© 2026 Farmakon Course</span>
        </div>
      </div>
    </div>
  );
};
