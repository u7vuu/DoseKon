import React, { useState, useEffect, useMemo, useRef } from 'react';
import { RouteType } from './types';
import { syrupCategories, injectionCategories } from './data/medications';
import { Header } from './components/Header';
import { DoseCalculator } from './components/DoseCalculator';
import { RouteNav } from './components/RouteNav';
import { SearchBar } from './components/SearchBar';
import { MedicationCard } from './components/MedicationCard';
import { Footer } from './components/Footer';
import { AlertCircle, Layers } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeRoute, setActiveRoute] = useState<RouteType | null>(null);
  const [weight, setWeight] = useState<string>('');
  const [searchQuerySyrup, setSearchQuerySyrup] = useState<string>('');
  const [searchQueryInjection, setSearchQueryInjection] = useState<string>('');

  // Synchronize theme with data-theme attribute on document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const parsedWeight = useMemo(() => {
    const val = parseFloat(weight);
    return !isNaN(val) && val > 0 ? val : null;
  }, [weight]);

  const handleToggleRoute = (route: RouteType) => {
    setActiveRoute((prev) => {
      const next = prev === route ? null : route;
      if (next) {
        setTimeout(() => {
          const targetId = next === 'Syrup' ? 'routeGroupSyrup' : 'routeGroupInjection';
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
      return next;
    });
  };

  const handleApplyWeight = (w: number) => {
    setWeight(w.toString());
    setActiveRoute('Syrup');
    setTimeout(() => {
      const el = document.getElementById('doseCalculatorBox');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  const handleCalculatorEnter = () => {
    const searchBox = document.getElementById('searchContainerWrap');
    if (searchBox) {
      searchBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Jump to specific drug card
  const handleDrugJump = (medicationId: string, medicationName?: string) => {
    if (activeRoute === 'Syrup' && medicationName) {
      setSearchQuerySyrup(medicationName);
    } else if (activeRoute === 'Injection' && medicationName) {
      setSearchQueryInjection(medicationName);
    }

    setTimeout(() => {
      const card = document.getElementById(`medCard-${medicationId}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.remove('jump-highlight');
        void card.offsetWidth; // trigger reflow
        card.classList.add('jump-highlight');
        setTimeout(() => card.classList.remove('jump-highlight'), 1600);
      }
    }, 100);
  };

  // Flattened lists for search suggestion indexing
  const allSyrupMeds = useMemo(() => {
    return syrupCategories.flatMap((cat) => cat.medications);
  }, []);

  const allInjectionMeds = useMemo(() => {
    return injectionCategories.flatMap((cat) => cat.medications);
  }, []);

  // Filtered categories for Syrup route
  const filteredSyrupCategories = useMemo(() => {
    const q = searchQuerySyrup.trim().toLowerCase();
    if (!q) return syrupCategories;

    return syrupCategories
      .map((cat) => {
        const matchingMeds = cat.medications.filter(
          (med) =>
            med.name.toLowerCase().includes(q) ||
            (med.generic && med.generic.toLowerCase().includes(q)) ||
            med.categoryTag.toLowerCase().includes(q) ||
            med.dosageLine.toLowerCase().includes(q)
        );
        return {
          ...cat,
          medications: matchingMeds,
        };
      })
      .filter((cat) => cat.medications.length > 0);
  }, [searchQuerySyrup]);

  const visibleSyrupCount = useMemo(() => {
    return filteredSyrupCategories.reduce(
      (acc, cat) => acc + cat.medications.length,
      0
    );
  }, [filteredSyrupCategories]);

  // Filtered categories for Injection route
  const filteredInjectionCategories = useMemo(() => {
    const q = searchQueryInjection.trim().toLowerCase();
    if (!q) return injectionCategories;

    return injectionCategories
      .map((cat) => {
        const matchingMeds = cat.medications.filter(
          (med) =>
            med.name.toLowerCase().includes(q) ||
            (med.generic && med.generic.toLowerCase().includes(q)) ||
            med.categoryTag.toLowerCase().includes(q) ||
            med.dosageLine.toLowerCase().includes(q)
        );
        return {
          ...cat,
          medications: matchingMeds,
        };
      })
      .filter((cat) => cat.medications.length > 0);
  }, [searchQueryInjection]);

  const visibleInjectionCount = useMemo(() => {
    return filteredInjectionCategories.reduce(
      (acc, cat) => acc + cat.medications.length,
      0
    );
  }, [filteredInjectionCategories]);

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] flex flex-col font-sans transition-colors duration-200">
      {/* Header with leading DoseKon branding and Age Estimator */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onApplyWeight={handleApplyWeight}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {/* Route Navigation: Stacked grid with toggle expand/collapse */}
        <RouteNav
          activeRoute={activeRoute}
          onSelectRoute={handleToggleRoute}
        />

        {/* ============================================================ */}
        {/* ROUTE GROUP 1: SYRUP / SUSPENSION / ORAL DROPS */}
        {/* ============================================================ */}
        {activeRoute === 'Syrup' && (
          <div id="routeGroupSyrup" className="space-y-6">
            {/* Live Weight-based mL Dose Calculator */}
            <DoseCalculator
              weight={weight}
              onWeightChange={setWeight}
              onEnterPress={handleCalculatorEnter}
            />

            {/* Scoped Search Bar */}
            <SearchBar
              query={searchQuerySyrup}
              onQueryChange={setSearchQuerySyrup}
              onSelectSuggestion={handleDrugJump}
              medications={allSyrupMeds}
              visibleCount={visibleSyrupCount}
              totalCount={allSyrupMeds.length}
            />

            {/* No Results Fallback */}
            {visibleSyrupCount === 0 && (
              <div className="text-center py-16 px-4 bg-[var(--paper-surface)] border border-[var(--line)] rounded-2xl shadow-xs">
                <AlertCircle className="w-8 h-8 text-[var(--ink-muted)] mx-auto mb-2 opacity-60" />
                <h3 className="font-display font-semibold text-lg text-[var(--ink)]">
                  No medication matches your search
                </h3>
                <p className="font-ar text-sm text-[var(--ink-soft)] mt-1">
                  لا يوجد دواء مطابق لبحثك في قسم الشراب والمعلق
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuerySyrup('')}
                  className="mt-4 px-4 py-2 text-xs font-bold rounded-lg bg-[var(--paper-deep)] hover:bg-[var(--line)] text-[var(--ink)] cursor-pointer"
                >
                  Clear search · مسح البحث
                </button>
              </div>
            )}

            {/* Medication Category Sections */}
            {filteredSyrupCategories.map((category) => (
              <section
                key={category.id}
                id={`categorySection-${category.id}`}
                className="scroll-mt-20 pt-4"
              >
                {/* Section Header */}
                <div
                  style={{
                    borderBottomColor: category.accent,
                  }}
                  className="flex items-baseline justify-between gap-3 pb-2.5 mb-4 border-b-2"
                >
                  <div className="flex items-baseline gap-3">
                    <h2
                      style={{ color: category.accent }}
                      className="font-display font-semibold text-xl sm:text-2xl tracking-tight"
                    >
                      {category.titleEn}
                    </h2>
                    <span className="font-ar text-xs sm:text-sm font-medium text-[var(--ink-soft)]">
                      {category.titleAr}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-medium text-[var(--ink-muted)]">
                    {category.medications.length} {category.medications.length === 1 ? 'med' : 'meds'}
                  </span>
                </div>

                {/* Medication Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.medications.map((med) => (
                    <MedicationCard
                      key={med.id}
                      medication={med}
                      weight={parsedWeight}
                      accent={category.accent}
                      accentTint={category.accentTint}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ============================================================ */}
        {/* ROUTE GROUP 2: INJECTABLE — IV / IM */}
        {/* ============================================================ */}
        {activeRoute === 'Injection' && (
          <div id="routeGroupInjection" className="space-y-6">
            {/* Injectable Clinical Instruction Notice */}
            <div className="p-4 rounded-xl bg-[var(--indigo-tint)] text-[var(--indigo)] border border-[var(--indigo)]/20 text-xs sm:text-sm leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Injectable Reconstitution &amp; Administration Protocols</span>
              </div>
              <p>
                Injectable dosing requires individual reconstitution and fluid compatibility checks. Refer to the precise solvent volumes, route specifications (IV infusion vs. IM), and infusion duration notes below.
              </p>
              <p className="font-ar text-xs text-[var(--ink-soft)] pt-1">
                تنبيه: التراكيز وأحجام المذيبات أدناه معروضة للتوضيح السريري، ويجب مطابقة حجم المذيب المذكور بدقة والالتزام بمدة التسريب الوريدي وموانع الاستعمال لكل دواء.
              </p>
            </div>

            {/* Scoped Search Bar for Injectables */}
            <SearchBar
              query={searchQueryInjection}
              onQueryChange={setSearchQueryInjection}
              onSelectSuggestion={handleDrugJump}
              medications={allInjectionMeds}
              visibleCount={visibleInjectionCount}
              totalCount={allInjectionMeds.length}
            />

            {/* No Results Fallback */}
            {visibleInjectionCount === 0 && (
              <div className="text-center py-16 px-4 bg-[var(--paper-surface)] border border-[var(--line)] rounded-2xl shadow-xs">
                <AlertCircle className="w-8 h-8 text-[var(--ink-muted)] mx-auto mb-2 opacity-60" />
                <h3 className="font-display font-semibold text-lg text-[var(--ink)]">
                  No medication matches your search
                </h3>
                <p className="font-ar text-sm text-[var(--ink-soft)] mt-1">
                  لا يوجد دواء مطابق لبحثك في قسم الحقن
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQueryInjection('')}
                  className="mt-4 px-4 py-2 text-xs font-bold rounded-lg bg-[var(--paper-deep)] hover:bg-[var(--line)] text-[var(--ink)] cursor-pointer"
                >
                  Clear search · مسح البحث
                </button>
              </div>
            )}

            {/* Injectable Category Sections */}
            {filteredInjectionCategories.map((category) => (
              <section
                key={category.id}
                id={`categorySection-${category.id}`}
                className="scroll-mt-20 pt-2"
              >
                {/* Section Header */}
                <div
                  style={{
                    borderBottomColor: category.accent,
                  }}
                  className="flex items-baseline justify-between gap-3 pb-2.5 mb-4 border-b-2"
                >
                  <div className="flex items-baseline gap-3">
                    <h2
                      style={{ color: category.accent }}
                      className="font-display font-semibold text-xl sm:text-2xl tracking-tight"
                    >
                      {category.titleEn}
                    </h2>
                    <span className="font-ar text-xs sm:text-sm font-medium text-[var(--ink-soft)]">
                      {category.titleAr}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-medium text-[var(--ink-muted)]">
                    {category.medications.length} {category.medications.length === 1 ? 'med' : 'meds'}
                  </span>
                </div>

                {/* Medication Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.medications.map((med) => (
                    <MedicationCard
                      key={med.id}
                      medication={med}
                      weight={null}
                      accent={category.accent}
                      accentTint={category.accentTint}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Footer with disclaimer, relocated copyright, and developer credits */}
      <Footer />
    </div>
  );
}
