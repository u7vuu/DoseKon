import React, { useState, useRef, useEffect } from 'react';
import { Search, X, CornerDownLeft } from 'lucide-react';
import { Medication } from '../types';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSelectSuggestion: (medicationId: string, medicationName: string) => void;
  medications: Medication[];
  visibleCount: number;
  totalCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  onSelectSuggestion,
  medications,
  visibleCount,
  totalCount,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Build searchable items list
  const searchItems = React.useMemo(() => {
    const list: { id: string; name: string; generic?: string }[] = [];
    medications.forEach((med) => {
      list.push({ id: med.id, name: med.name, generic: med.generic });
    });
    return list;
  }, [medications]);

  // Suggestions filter
  const suggestions = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return searchItems
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.generic && item.generic.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [query, searchItems]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    onQueryChange('');
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsDropdownOpen(false);
      if (suggestions.length > 0) {
        onSelectSuggestion(suggestions[0].id, suggestions[0].name);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      id="searchContainerWrap"
      className="relative mb-6 z-20"
    >
      <div className="flex items-center gap-3 bg-[var(--paper-surface)] border-1.5 border-[var(--line)] focus-within:border-[var(--amber)] rounded-xl px-3.5 py-2.5 shadow-[var(--shadow-sm)] transition-all">
        <Search className="w-4 h-4 text-[var(--ink-muted)] flex-shrink-0" />

        <input
          id="drugSearchInput"
          type="text"
          autoComplete="off"
          enterKeyHint="search"
          placeholder="Search medication… ابحث عن دواء (Amoxicillin, Augmentin, Cefixime, Paracetamol…)"
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value);
            setIsDropdownOpen(e.target.value.trim().length > 0);
          }}
          onFocus={() => {
            if (query.trim().length > 0) setIsDropdownOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-sm sm:text-base text-[var(--ink)] placeholder-[var(--ink-muted)] outline-none"
        />

        {/* Counter Badge */}
        {query.trim().length > 0 && (
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-[var(--paper-deep)] text-[var(--ink-soft)] whitespace-nowrap">
            {visibleCount} / {totalCount}
          </span>
        )}

        {/* Clear button */}
        {query.trim().length > 0 && (
          <button
            id="clearSearchBtn"
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md bg-[var(--paper-deep)] hover:bg-[var(--line)] text-[var(--ink-soft)] transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        )}
      </div>

      {/* Dropdown Suggestions */}
      {isDropdownOpen && suggestions.length > 0 && (
        <div
          id="searchDropdown"
          className="absolute left-0 right-0 top-full mt-1.5 bg-[var(--paper-surface)] border border-[var(--line)] rounded-xl shadow-[var(--shadow-md)] overflow-hidden z-30 py-1"
        >
          {suggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectSuggestion(item.id, item.name);
                setIsDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 hover:bg-[var(--paper-deep)] flex items-center justify-between transition-colors cursor-pointer border-b border-[var(--line-subtle)] last:border-none"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-sm text-[var(--ink)]">
                  {item.name}
                </span>
                {item.generic && (
                  <span className="text-xs text-[var(--ink-muted)] italic">
                    {item.generic}
                  </span>
                )}
              </div>
              <CornerDownLeft className="w-3.5 h-3.5 text-[var(--teal)] opacity-60" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
