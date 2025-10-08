import React from 'react';
import { Filter, X } from 'lucide-react';
import { PlatformFilterButton } from './PlatformFilterButton.jsx';

/**
 * Mobile-responsive filter bar with platform toggles and advanced filters
 * Adapts button sizes and text visibility based on screen size
 */

export function FilterBar({
  selectedPlatforms = [],
  selectedCategories = [],
  onPlatformChange,
  onAdvancedFiltersToggle,
  onClearAll
}) {
  const platforms = ['linux', 'macos', 'windows'];
  const hasActiveFilters = selectedPlatforms.length > 0 || selectedCategories.length > 0;

  const handlePlatformToggle = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      onPlatformChange(selectedPlatforms.filter(p => p !== platform));
    } else {
      onPlatformChange([...selectedPlatforms, platform]);
    }
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap">
      {/* Platform filter buttons */}
      <div className="flex items-center gap-1 sm:gap-2">
        {platforms.map((platform) => (
          <PlatformFilterButton
            key={platform}
            platform={platform}
            isSelected={selectedPlatforms.includes(platform)}
            onClick={handlePlatformToggle}
          />
        ))}
      </div>

      {/* Advanced filters button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onAdvancedFiltersToggle();
        }}
        className={`
          flex items-center gap-1.5 px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg
          text-xs sm:text-sm font-medium
          transition-all duration-300
          transform hover:scale-105 active:scale-95
          pointer-events-auto flex-shrink-0
          ${selectedCategories.length > 0
            ? 'border border-yellow-400 bg-yellow-400/10 text-yellow-400 hover:border-yellow-300 hover:bg-yellow-400/20'
            : 'border border-white/20 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10 hover:text-white'
          }
        `}
      >
        <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Advanced filters</span>
        <span className="sm:hidden">Filters</span>
      </button>

      {/* Clear all button - only show when filters are active */}
      {hasActiveFilters && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClearAll();
          }}
          className="
            flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg
            border border-red-400/30 bg-red-500/10
            text-red-400 hover:text-red-300
            hover:border-red-400/50 hover:bg-red-500/20
            transition-all duration-300
            transform hover:scale-105 active:scale-95
            pointer-events-auto flex-shrink-0
          "
          title="Clear all filters"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      )}
    </div>
  );
}