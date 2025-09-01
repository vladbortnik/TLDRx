import { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "./input.jsx";
import { Button } from "./button.jsx";
import { PlatformFilter } from "./PlatformFilter.jsx";

export function SearchSection({
  searchQuery,
  onSearchChange,
  selectedPlatform,
  onPlatformChange,
  platforms,
  resultsCount,
  isLoading = false,
  osPlatforms = []
}) {
  const searchInputRef = useRef(null);

  // Focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus({ preventScroll: true });
    }
  }, []);

  const clearSearch = () => {
    onSearchChange('');
    searchInputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search commands..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20 h-12 text-base"
            aria-label="Search commands"
            aria-describedby="search-results-count"
          />
          
          {/* Clear Search Button */}
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0 text-slate-400 hover:text-slate-300"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Platform Filters */}
        <div className="text-center">
          <p className="text-slate-400 text-sm mb-3">Platform (select one):</p>
          <div className="flex flex-wrap justify-center gap-3">
            {platforms.map((platform) => (
              <PlatformFilter
                key={platform.id}
                platform={platform}
                isSelected={selectedPlatform === platform.id}
                onToggle={onPlatformChange}
              />
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center">
          <p 
            id="search-results-count"
            className="text-slate-400 text-sm"
            aria-live="polite"
          >
            {isLoading ? (
              'Searching...'
            ) : resultsCount !== undefined ? (
              `${resultsCount} command${resultsCount !== 1 ? 's' : ''} found`
            ) : (
              'Enter a search term to find commands'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}