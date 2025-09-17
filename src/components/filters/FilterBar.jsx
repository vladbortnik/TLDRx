import React from 'react';
import { Filter, X } from 'lucide-react';
import { PlatformFilterButton } from './PlatformFilterButton.jsx';

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
    <div className="flex items-center gap-3">
      {/* Platform filter buttons */}
      <div className="flex items-center gap-2">
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
          flex items-center gap-2 px-4 py-2 rounded-lg
          text-sm font-medium
          transition-all duration-300
          transform hover:scale-105 active:scale-95
          pointer-events-auto
          ${selectedCategories.length > 0
            ? 'border border-yellow-400 bg-yellow-400/10 text-yellow-400 hover:border-yellow-300 hover:bg-yellow-400/20'
            : 'border border-white/20 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10 hover:text-white'
          }
        `}
      >
        <Filter className="w-4 h-4" />
        Advanced filters
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
            flex items-center justify-center w-10 h-10 rounded-lg
            border border-red-400/30 bg-red-500/10
            text-red-400 hover:text-red-300
            hover:border-red-400/50 hover:bg-red-500/20
            transition-all duration-300
            transform hover:scale-105 active:scale-95
            pointer-events-auto
          "
          title="Clear all filters"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}